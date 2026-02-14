# Admin Portal - Amal Aggarwal Resume

Content management system for managing resume website data.

## Features

- Secure JWT authentication
- Manage profile information
- CRUD operations for experiences, education, skills, and projects
- Real-time updates to public website
- Protected routes with auth middleware

## Prerequisites

- Node.js (v18+)
- Backend API running on port 5000
- Admin account created via backend

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

## Running the Portal

### Development:
```bash
npm run dev
```

Portal runs on [http://localhost:3001](http://localhost:3001)

### Production:
```bash
npm run build
npm start
```

## First-Time Setup

### 1. Create Admin Account

Use the backend API to create your admin account:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "password": "your-secure-password",
    "name": "Your Name"
  }'
```

Note: Registration only works if no admin user exists yet (security measure).

### 2. Login

Go to [http://localhost:3001/login](http://localhost:3001/login) and login with your credentials.

## Using the Admin Portal

### Dashboard
- Overview of all content stats
- Quick links to manage different sections

### Profile Management
- Edit personal information
- Update contact details
- Add social media links
- Upload profile image (use image hosting services like Imgur, Cloudinary, etc.)

### Experience Management
- Add work experiences
- Edit existing entries
- Delete outdated experiences
- Add achievements as bullet points

### Education Management
- Manage educational background
- Add degrees and institutions
- Include GPA and achievements

### Skills Management
- Organize skills by categories
- Add/remove skill tags
- Reorder categories

### Projects Management
- Showcase portfolio projects
- Add project descriptions
- Link to live demos and source code
- Mark projects as featured
- Upload project images

## Security

- All routes except `/login` are protected
- JWT tokens expire after 7 days
- Tokens stored in localStorage
- Auto-redirect to login on token expiration
- Admin portal not indexed by search engines

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL` = Your production backend URL
4. Deploy

## Project Structure

```
admin/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── page.tsx          # Dashboard overview
│   │   │   ├── profile/          # Profile editor
│   │   │   ├── experience/       # Experience CRUD
│   │   │   ├── education/        # Education CRUD
│   │   │   ├── skills/           # Skills CRUD
│   │   │   └── projects/         # Projects CRUD
│   │   ├── login/                # Login page
│   │   └── layout.tsx            # Root layout
│   ├── components/
│   │   ├── AuthProvider.tsx      # Auth context
│   │   └── Sidebar.tsx           # Navigation
│   ├── lib/
│   │   ├── api.ts                # API client
│   │   └── auth.ts               # Auth utilities
│   └── types/
│       └── index.ts              # TypeScript types
└── package.json
```

## Tips

- **Profile Image**: Upload images to free services like [Imgur](https://imgur.com) or [Cloudinary](https://cloudinary.com), then paste the URL
- **Achievements**: Write one achievement per line in the textarea
- **Technologies**: Same as achievements - one technology per line
- **Dates**: Use the month picker for start/end dates
- **Current Position**: Check the "Current Position" box for ongoing roles

## Troubleshooting

### Can't Login
- Ensure backend is running on port 5000
- Check that admin account was created successfully
- Verify email/password are correct

### Changes Not Appearing on Public Site
- Check backend API is responding
- Verify frontend is fetching from correct API URL
- Clear browser cache and refresh

### Token Expired Error
- Tokens expire after 7 days
- Simply login again to get a new token

## License

MIT
