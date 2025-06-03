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
  private sheets: any = null;
  private auth: any = null;
  private isConfigured: boolean = false;

  constructor() {
    this.initializeService();
  }

  private initializeService() {
    try {
      // Check for single JSON credentials variable first (preferred method)
      if (process.env.GOOGLE_CREDENTIALS_JSON) {
        console.log('Using GOOGLE_CREDENTIALS_JSON for authentication');
        
        try {
          const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
          
          // Validate that we have the required fields
          const requiredFields = ['project_id', 'private_key', 'client_email'];
          const missingFields = requiredFields.filter(field => !credentials[field]);
          
          if (missingFields.length > 0) {
            console.error(`Missing required fields in GOOGLE_CREDENTIALS_JSON: ${missingFields.join(', ')}`);
            this.isConfigured = false;
            return;
          }

          // Initialize Google Auth with parsed credentials
          this.auth = new google.auth.GoogleAuth({
            credentials: {
              type: 'service_account',
              project_id: credentials.project_id,
              private_key_id: credentials.private_key_id,
              private_key: credentials.private_key.replace(/\\n/g, '\n'),
              client_email: credentials.client_email,
              client_id: credentials.client_id,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
          });

          this.sheets = google.sheets({ version: 'v4', auth: this.auth });
          this.isConfigured = true;
          console.log('Google Sheets service initialized successfully with JSON credentials');
          return;
          
        } catch (parseError) {
          console.error('Failed to parse GOOGLE_CREDENTIALS_JSON:', parseError);
          // Fall through to try individual variables
        }
      }

      // Fallback: Check if all required environment variables are present (old method)
      const requiredVars = [
        'GOOGLE_PROJECT_ID',
        'GOOGLE_PRIVATE_KEY_ID', 
        'GOOGLE_PRIVATE_KEY',
        'GOOGLE_CLIENT_EMAIL',
        'GOOGLE_CLIENT_ID'
      ];

      const missingVars = requiredVars.filter(varName => !process.env[varName]);
      
      if (missingVars.length > 0) {
        console.warn(`Google Sheets integration disabled: Missing environment variables: ${missingVars.join(', ')}`);
        console.warn('Consider using GOOGLE_CREDENTIALS_JSON for easier configuration');
        this.isConfigured = false;
        return;
      }

      console.log('Using individual environment variables for authentication');

      // Initialize Google Auth with individual environment variables
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
      this.isConfigured = true;
      console.log('Google Sheets service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Sheets service:', error);
      this.isConfigured = false;
    }
  }

  async addWaitlistEntry(entry: WaitlistEntry): Promise<boolean> {
    try {
      if (!this.isConfigured) {
        console.warn('Google Sheets integration is not configured');
        return false;
      }

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
      if (!this.isConfigured) {
        console.warn('Google Sheets integration is not configured');
        return false;
      }

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