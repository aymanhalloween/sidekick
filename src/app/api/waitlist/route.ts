import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { googleSheetsService } from '@/lib/googleSheets';

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
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

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

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, 'waitlist.json');
    
    // Read existing data or create empty array
    let existingData: WaitlistEntry[] = [];
    try {
      if (existsSync(filePath)) {
        const fileContent = await readFile(filePath, 'utf-8');
        existingData = JSON.parse(fileContent);
      }
    } catch (_error) {
      console.log('Creating new waitlist file');
      existingData = [];
    }

    // Add new entry regardless of existing emails
    existingData.push(entry);

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
    console.error('❌ Error processing waitlist submission:', error);
    
    // Provide more specific error information in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    return NextResponse.json(
      { 
        error: 'Internal server error',
        ...(isDevelopment && { details: error instanceof Error ? error.message : 'Unknown error' })
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve waitlist data (for admin use)
export async function GET(_request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'waitlist.json');
    
    if (!existsSync(filePath)) {
      return NextResponse.json({ entries: [], count: 0 });
    }

    const fileContent = await readFile(filePath, 'utf-8');
    const data: WaitlistEntry[] = JSON.parse(fileContent);

    // Return summary data (without sensitive info for security)
    const summary = data.map(entry => ({
      id: entry.id,
      name: entry.name,
      email: entry.email,
      timestamp: entry.timestamp,
      source: entry.source
    }));

    return NextResponse.json({
      entries: summary,
      count: data.length,
      latest: data[data.length - 1]?.timestamp
    });

  } catch (error) {
    console.error('Error retrieving waitlist data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 