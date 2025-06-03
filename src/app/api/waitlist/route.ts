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

    // Try multiple directory options for different hosting environments
    let dataDir = '';
    let filePath = '';
    let fileSystemWorking = false;

    // Option 1: Try the original data directory (works on local)
    try {
      dataDir = path.join(process.cwd(), 'data');
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true });
      }
      filePath = path.join(dataDir, 'waitlist.json');
      fileSystemWorking = true;
      console.log('✅ Using local data directory:', dataDir);
    } catch (error) {
      console.log('⚠️ Local data directory not writable, trying /tmp');
      
      // Option 2: Try /tmp directory (works on most hosting platforms)
      try {
        dataDir = '/tmp';
        filePath = path.join(dataDir, 'waitlist.json');
        fileSystemWorking = true;
        console.log('✅ Using temporary directory:', dataDir);
      } catch (tmpError) {
        console.error('❌ Neither local nor tmp directory writable:', tmpError);
        fileSystemWorking = false;
      }
    }

    // If file system isn't working, we'll rely only on Google Sheets
    let localSaveSuccess = false;
    let existingData: WaitlistEntry[] = [];

    if (fileSystemWorking) {
      // Read existing data or create empty array
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

      // Save to file
      try {
        await writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
        localSaveSuccess = true;
        console.log('✅ Successfully saved to local file');
      } catch (fileError) {
        console.error('⚠️ Failed to save to local file (but continuing with Google Sheets):', fileError);
        localSaveSuccess = false;
      }
    } else {
      console.log('⚠️ File system not available, relying on Google Sheets only');
    }

    // Try to save to Google Sheets (this is critical if file system doesn't work)
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
      console.error('❌ Google Sheets integration failed:', sheetsError);
      
      // If both local file and Google Sheets fail, return error
      if (!localSaveSuccess) {
        console.error('❌ Both local storage and Google Sheets failed');
        return NextResponse.json(
          { error: 'Failed to save submission. Please check your Google Sheets configuration or try again later.' },
          { status: 500 }
        );
      }
    }

    // Log for development
    console.log('New waitlist entry created:', {
      id: entry.id,
      name: entry.name,
      email: entry.email,
      timestamp: entry.timestamp,
      localSave: localSaveSuccess,
      sheetsSave: sheetsSuccess
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to waitlist',
        id: entry.id,
        savedTo: {
          local: localSaveSuccess,
          sheets: sheetsSuccess
        }
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