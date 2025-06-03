import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { googleSheetsService } from '../../../lib/googleSheets';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  additionalInfo?: string;
  timestamp: string;
  source: string;
}

export async function POST(request: NextRequest) {
  console.log('📥 Received waitlist submission request');
  
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('✅ Successfully parsed request body');
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    const requiredFields = ['name', 'email'];
    for (const field of requiredFields) {
      if (!body[field]) {
        console.error(`❌ Missing required field: ${field}`);
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    console.log('✅ Validation passed');

    // Create unique ID
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

    // Create waitlist entry
    const entry: WaitlistEntry = {
      id,
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      additionalInfo: body.additionalInfo || '',
      timestamp: body.timestamp || new Date().toISOString(),
      source: body.source || 'unknown'
    };

    console.log('✅ Created waitlist entry object');

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    console.log('📁 Data directory path:', dataDir);
    
    try {
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true });
        console.log('✅ Created data directory');
      }
    } catch (dirError) {
      console.error('❌ Failed to create data directory:', dirError);
      return NextResponse.json(
        { error: 'Failed to create data directory' },
        { status: 500 }
      );
    }

    const filePath = path.join(dataDir, 'waitlist.json');
    console.log('📄 File path:', filePath);
    
    // Read existing data or create empty array
    let existingData: WaitlistEntry[] = [];
    try {
      if (existsSync(filePath)) {
        const fileContent = await readFile(filePath, 'utf-8');
        existingData = JSON.parse(fileContent);
        console.log('✅ Successfully read existing data, entries:', existingData.length);
      } else {
        console.log('📝 No existing file, starting with empty array');
      }
    } catch (readError) {
      console.error('⚠️ Error reading existing file (starting fresh):', readError);
      existingData = [];
    }

    // Check for duplicate email
    const existingEntry = existingData.find(entry => entry.email === body.email);
    if (existingEntry) {
      console.log('⚠️ Duplicate email found:', body.email);
      return NextResponse.json(
        { error: 'Email already registered for waitlist' },
        { status: 409 }
      );
    }

    // Add new entry
    existingData.push(entry);
    console.log('✅ Added new entry to array');

    // Save to file (this is the critical part - if this fails, we should return an error)
    try {
      await writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
      console.log('✅ Successfully saved to local file');
    } catch (fileError) {
      console.error('❌ Failed to save to local file:', fileError);
      return NextResponse.json(
        { error: 'Failed to save submission. Please try again.' },
        { status: 500 }
      );
    }

    // Try to save to Google Sheets (optional - don't fail if this doesn't work)
    let sheetsSuccess = false;
    try {
      await googleSheetsService.addWaitlistEntry({
        name: entry.name,
        email: entry.email,
        phone: entry.phone,
        additionalInfo: entry.additionalInfo,
        timestamp: entry.timestamp,
        source: entry.source
      });
      sheetsSuccess = true;
      console.log('✅ Successfully saved to Google Sheets');
    } catch (sheetsError) {
      console.error('⚠️  Google Sheets integration failed (but local save succeeded):', sheetsError);
      // Don't return error here - local save succeeded
    }

    // Log for development
    console.log('New waitlist entry created:', {
      id: entry.id,
      name: entry.name,
      email: entry.email,
      timestamp: entry.timestamp,
      localSave: true,
      sheetsSave: sheetsSuccess
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to waitlist',
        id: entry.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Unexpected error processing waitlist submission:', error);
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Provide more specific error information in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    return NextResponse.json(
      { 
        error: 'Internal server error',
        ...(isDevelopment && { 
          details: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        })
      },
      { status: 500 }
    );
  }
} 