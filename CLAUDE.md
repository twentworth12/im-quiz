# Incident Management Quiz - Project Instructions

## Overview
This is a lead generation quiz for incident.io that tests knowledge about incident management best practices. Users who score 80% or higher receive free SWAG.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Repository**: https://github.com/twentworth12/im-quiz

## Core Features

### 1. Quiz Functionality
- 10-15 multiple choice questions about incident management
- Questions cover topics like:
  - Incident response best practices
  - Post-mortem processes
  - On-call rotations
  - Incident severity levels
  - Communication during incidents
  - Tools and automation
- One question per page with progress indicator
- Ability to go back and change answers
- Timer optional (consider for engagement)

### 2. Lead Capture
- Form appears before quiz starts
- Required fields:
  - Full Name
  - Work Email
  - Company Name
  - Company Size (dropdown)
  - Role/Title
- Optional fields:
  - Phone Number
  - How did you hear about us?
- Email validation (must be business email, no gmail/yahoo/etc)

### 3. Scoring & Rewards
- Calculate percentage score
- 80% or higher: Show "Congratulations! You've earned free SWAG!" message
- Under 80%: Show "Thanks for participating!" with educational resources
- Display correct answers with explanations after completion
- Send results via email

### 4. Data Storage
- Store quiz results and lead info in database
- Track completion rates and scores
- Integration with CRM/marketing automation tool (specify which one)

## UI/UX Requirements
- Clean, professional design matching incident.io brand
- Mobile responsive
- Accessibility compliant (WCAG 2.1 AA)
- Smooth transitions between questions
- Loading states for form submission

## Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## Environment Variables
```
NEXT_PUBLIC_API_URL=
DATABASE_URL=
EMAIL_API_KEY=
CRM_API_KEY=
```

## Project Structure
```
/app
  /layout.tsx          # Root layout with metadata
  /page.tsx            # Landing page with lead form
  /quiz
    /page.tsx          # Quiz container
    /[question]/page.tsx # Dynamic question pages
  /results
    /page.tsx          # Results page with score
  /api
    /submit-lead       # API route for lead capture
    /submit-quiz       # API route for quiz results
    /send-email        # API route for email notifications
/components
  /LeadForm.tsx        # Lead capture form component
  /Quiz.tsx            # Quiz component
  /Question.tsx        # Individual question component
  /ProgressBar.tsx     # Quiz progress indicator
  /Results.tsx         # Results display component
/lib
  /questions.ts        # Quiz questions and answers
  /scoring.ts          # Scoring logic
  /validation.ts       # Form validation utilities
/styles
  /globals.css         # Global styles and Tailwind imports
```

## Quiz Questions Data Structure
```typescript
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
```

## Deployment Notes
- Auto-deploy from main branch to Vercel
- Environment variables set in Vercel dashboard
- Custom domain: quiz.incident.io (or similar)

## Analytics & Tracking
- Google Analytics or similar for:
  - Quiz start/completion rates
  - Drop-off points
  - Time spent on quiz
  - Conversion rates
- A/B testing capability for questions/messaging

## Security Considerations
- HTTPS only
- Rate limiting on API endpoints
- CAPTCHA on lead form if needed
- Data encryption for PII
- GDPR compliance for EU users

## Future Enhancements
- Question randomization
- Difficulty levels
- Retake functionality
- Social sharing of results
- Leaderboard (anonymized)
- Integration with incident.io platform