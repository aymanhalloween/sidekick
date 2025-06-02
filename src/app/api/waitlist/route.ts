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
    } catch (error) {
      console.log('Creating new waitlist file');
      existingData = [];
    }

    // Check for duplicate email
    const existingEntry = existingData.find(entry => entry.email === body.email);
    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already registered for waitlist' },
        { status: 409 }
      );
    }

    // Add new entry
    existingData.push(entry);

    // Save to file
    await writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');

    // Also save to Google Sheets
    try {
      await googleSheetsService.addWaitlistEntry({
        name: entry.name,
        email: entry.email,
        phone: entry.phone,
        additionalInfo: entry.additionalInfo,
        timestamp: entry.timestamp,
        source: entry.source
      });
    } catch (error) {
      console.error('Google Sheets integration failed, but local save succeeded:', error);
      // Continue with success response even if Google Sheets fails
    }

    // Log for development
    console.log('New waitlist entry:', {
      id: entry.id,
      name: entry.name,
      email: entry.email,
      timestamp: entry.timestamp
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
    console.error('Error processing waitlist submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve waitlist data (for admin use)
export async function GET(request: NextRequest) {
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