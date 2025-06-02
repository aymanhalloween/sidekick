# AI Assistant Landing Page

A modern, responsive landing page built with Next.js 15, React, TypeScript, and TailwindCSS for an AI executive assistant product.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all device sizes
- **Performance**: Optimized for speed with Next.js 15
- **Waitlist System**: Complete form submission and data management
- **Admin Dashboard**: View and manage waitlist submissions

## Tech Stack

- **Next.js 15** (App Router)
- **React 18** with TypeScript
- **TailwindCSS v4** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Hook Form** for form handling

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Waitlist System

### User Experience
- Users can access the waitlist form at `/waitlist`
- Comprehensive form collecting professional and personal information
- Form validation and error handling
- Success state with next steps

### Data Management
- Form submissions are stored in `/data/waitlist.json`
- API endpoints at `/api/waitlist` for CRUD operations
- Admin dashboard at `/admin/waitlist` for viewing submissions
- CSV export functionality for data analysis
- **Google Sheets integration** - Automatic real-time sync to Google Sheets

### API Endpoints

**POST /api/waitlist**
- Submit new waitlist entry
- Validates required fields
- Prevents duplicate email addresses
- Returns success confirmation with unique ID

**GET /api/waitlist**
- Retrieve all waitlist submissions (admin use)
- Returns summary statistics
- Includes entry count and latest submission time

### Admin Features
Access the admin dashboard at `/admin/waitlist` to:
- View all waitlist submissions in a table format
- See summary statistics (total entries, latest submission, high-value prospects)
- Export data as CSV for analysis
- View detailed information for each submission
- Refresh data in real-time

### Data Structure
Each waitlist entry includes:
- Personal information (name, email, phone)
- Professional details (job title, company, company size, website)
- Use case information (pain points, budget range)
- Marketing attribution (how they heard about us)
- Timestamp and source tracking

## Google Sheets Integration

The waitlist automatically syncs to Google Sheets for real-time collaboration and analysis.

### Quick Setup
1. Follow the detailed guide in `GOOGLE_SHEETS_SETUP.md`
2. Create a Google Cloud service account
3. Share your Google Sheet with the service account
4. Add credentials to `.env.local`
5. Restart your server

### Benefits
- ✅ Real-time sync - No manual exports needed
- ✅ Team collaboration - Share with colleagues  
- ✅ Always up-to-date - Automatic backups
- ✅ Easy analysis - Use Google Sheets features

## Project Structure

```
src/
├── app/
│   ├── waitlist/
│   │   └── page.tsx          # Waitlist form page
│   ├── admin/
│   │   └── waitlist/
│   │       └── page.tsx      # Admin dashboard
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts      # API endpoints
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── Hero.tsx              # Hero section
│   ├── ProblemSection.tsx    # Problem statement
│   ├── SolutionSection.tsx   # Solution overview
│   ├── FeaturesGrid.tsx      # Features showcase
│   ├── UseCases.tsx          # Use case examples
│   └── TestimonialsSection.tsx # Social proof
└── data/
    └── waitlist.json         # Waitlist submissions (auto-generated)
```

## Development Notes

- The `/data` directory is git-ignored to protect user privacy
- All CTA buttons now redirect to the dedicated waitlist page
- Form uses React Hook Form for optimal performance and validation
- Admin dashboard includes real-time refresh and export capabilities
- API includes proper error handling and duplicate prevention

## Deployment

When deploying to production:
1. Ensure the `/data` directory has write permissions
2. Consider migrating from JSON file storage to a proper database
3. Add authentication to the admin dashboard
4. Set up proper backup strategies for waitlist data

## Security Considerations

- Form validation on both client and server side
- Sanitized data storage to prevent injection attacks
- Admin dashboard should be protected with authentication in production
- Consider rate limiting for the API endpoints

Built with ❤️ for modern web experiences.
