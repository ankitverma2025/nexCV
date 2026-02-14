# Amal Aggarwal Resume - Frontend

Public-facing resume website built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Features

- Responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle
- SEO optimized with Next.js metadata
- Server-side rendering (SSR) with Next.js App Router
- Smooth animations and transitions
- Modular component architecture

## Pages

- **Home** (`/`) - Hero section with profile introduction
- **Experience** (`/experience`) - Work experience timeline
- **Education** (`/education`) - Educational background
- **Skills** (`/skills`) - Technical skills organized by category
- **Projects** (`/projects`) - Portfolio projects showcase
- **Contact** (`/contact`) - Contact information and social links

## Prerequisites

- Node.js (v18 or higher)
- Backend API running on port 5000

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Running the Application

### Development mode:
```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Home page
│   │   ├── experience/   # Experience page
│   │   ├── education/    # Education page
│   │   ├── skills/       # Skills page
│   │   ├── projects/     # Projects page
│   │   ├── contact/      # Contact page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # Reusable components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Footer.tsx
│   │   ├── ExperienceCard.tsx
│   │   ├── EducationCard.tsx
│   │   ├── SkillsGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ThemeProvider.tsx
│   ├── lib/              # Utilities and API client
│   │   ├── api.ts
│   │   └── utils.ts
│   └── types/            # TypeScript type definitions
│       └── index.ts
├── public/               # Static assets
├── package.json
└── tailwind.config.ts
```

## Theme Toggle

The application supports dark and light themes:
- Click the sun/moon icon in the header to toggle
- Theme preference is saved in localStorage
- Respects system preference on first visit

## Customization

### Colors
Edit the color palette in [tailwind.config.ts](tailwind.config.ts):
```typescript
colors: {
  primary: {
    // Your color values
  }
}
```

### Fonts
The app uses Inter font from Google Fonts. Change in [app/layout.tsx](src/app/layout.tsx):
```typescript
import { YourFont } from 'next/font/google';
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = Your backend API URL
4. Deploy

The site will be live at your Vercel URL.

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Railway

## API Integration

All data is fetched from the backend API:
- Profile information
- Work experiences
- Education history
- Skills
- Projects

If the backend is unavailable, friendly error messages are displayed.

## Performance

- Optimized images with Next.js Image component
- Code splitting for faster page loads
- Client-side navigation with Next.js Router
- Minimal JavaScript bundle size

## License

MIT
