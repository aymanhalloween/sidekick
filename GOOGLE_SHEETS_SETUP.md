# Google Sheets Integration Setup

This guide will help you set up automatic Google Sheets integration for your waitlist submissions.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

## Step 2: Enable Google Sheets API

1. In Google Cloud Console, go to **APIs & Services > Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

## Step 3: Create a Service Account

1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > Service Account**
3. Give it a name (e.g., "waitlist-sheets-integration")
4. Click **Create and Continue**
5. Skip roles for now, click **Done**

## Step 4: Generate Service Account Key

1. In the Credentials page, click on your service account
2. Go to the **Keys** tab
3. Click **Add Key > Create New Key**
4. Select **JSON** format
5. Download the JSON file

## Step 5: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Waitlist Submissions" (or whatever you prefer)
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - Sheet ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

## Step 6: Share the Sheet with Service Account

1. In your Google Sheet, click **Share**
2. Add the service account email (found in your downloaded JSON file)
3. Give it **Editor** permissions
4. Click **Send**

## Step 7: Set Environment Variables

Create a `.env.local` file in your project root with:

```env
# Google Sheets Integration
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=your-private-key-id-from-json
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key from JSON (keep the quotes and newlines)\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-client-id-from-json
GOOGLE_SHEET_ID=your-sheet-id-from-step-5
```

## Step 8: Test the Integration

1. Restart your development server: `npm run dev`
2. Submit a test entry through your waitlist form
3. Check your Google Sheet - it should automatically add the entry!

## Sheet Structure

The integration will create these columns:
- **A**: Timestamp
- **B**: Name  
- **C**: Email
- **D**: Phone
- **E**: Additional Info
- **F**: Source

## Troubleshooting

- **"Sheets API has not been used"**: Make sure you enabled the Google Sheets API
- **"Permission denied"**: Check that you shared the sheet with the service account email
- **"Invalid credentials"**: Verify your environment variables match the JSON file exactly
- **"Sheet not found"**: Double-check your GOOGLE_SHEET_ID

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your service account JSON file secure
- Use different service accounts for development and production
- Consider setting up separate sheets for different environments

## Benefits

✅ **Real-time updates** - Entries appear immediately  
✅ **No manual export** - Always up-to-date  
✅ **Easy sharing** - Share with team members  
✅ **Built-in collaboration** - Multiple people can view/analyze  
✅ **Backup** - Both local JSON and Google Sheets  

Your waitlist will now automatically save to both a local JSON file and your Google Sheet! 