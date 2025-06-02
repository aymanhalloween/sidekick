import { google } from 'googleapis';

interface WaitlistEntry {
  name: string;
  email: string;
  phone?: string;
  additionalInfo?: string;
  timestamp: string;
  source: string;
}

export class GoogleSheetsService {
  private sheets;
  private auth;

  constructor() {
    // Initialize Google Auth with service account
    this.auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  async addWaitlistEntry(entry: WaitlistEntry): Promise<boolean> {
    try {
      if (!process.env.GOOGLE_SHEET_ID) {
        console.warn('Google Sheet ID not configured, skipping Google Sheets integration');
        return false;
      }

      // Prepare the row data
      const row = [
        new Date(entry.timestamp).toLocaleString(), // Formatted timestamp
        entry.name,
        entry.email,
        entry.phone || '',
        entry.additionalInfo || '',
        entry.source
      ];

      // Append the row to the sheet
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:F', // Adjust range based on your sheet structure
        valueInputOption: 'RAW',
        requestBody: {
          values: [row],
        },
      });

      console.log('Successfully added entry to Google Sheets');
      return true;
    } catch (error) {
      console.error('Error adding entry to Google Sheets:', error);
      return false;
    }
  }

  async initializeSheet(): Promise<boolean> {
    try {
      if (!process.env.GOOGLE_SHEET_ID) {
        console.warn('Google Sheet ID not configured');
        return false;
      }

      // Check if headers exist, if not add them
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A1:F1',
      });

      if (!response.data.values || response.data.values.length === 0) {
        // Add headers
        const headers = [
          'Timestamp',
          'Name', 
          'Email',
          'Phone',
          'Additional Info',
          'Source'
        ];

        await this.sheets.spreadsheets.values.update({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'Sheet1!A1:F1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers],
          },
        });

        console.log('Initialized Google Sheet with headers');
      }

      return true;
    } catch (error) {
      console.error('Error initializing Google Sheet:', error);
      return false;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService(); 