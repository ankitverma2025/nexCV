# nexCV - Multi-User Resume Platform

A professional, modern multi-user resume platform with a complete content management system. Each user can create their own personalized resume website. Built with Next.js, TypeScript, Tailwind CSS, Express, and MongoDB.

## Project Overview

This project consists of three main components:

1. **Backend API** (Express + MongoDB) - RESTful API for multi-user data management
2. **Frontend** (Next.js) - Public-facing resume websites
3. **Admin Portal** (Next.js) - Content management system for users

## Features

### Frontend (Public Website)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/Light theme toggle
- ✅ SEO optimized
- ✅ Smooth animations
- ✅ Modern UI with Tailwind CSS
- ✅ Multiple pages (Home, Experience, Education, Skills, Projects, Contact)

### Admin Portal
- ✅ Multi-user support with unique usernames
- ✅ User registration and secure JWT authentication
- ✅ Easy-to-use dashboard
- ✅ Complete CRUD operations for all content
- ✅ Real-time updates to public website
- ✅ Form validation
- ✅ Cloudinary image upload integration

### Backend API
- ✅ RESTful architecture
- ✅ MongoDB with Mongoose
- ✅ Multi-user support with username-based routing
- ✅ JWT authentication
- ✅ User data isolation
- ✅ Input validation
- ✅ CORS enabled
- ✅ Error handling

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator, Zod
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js v18 or higher
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin Portal
cd ../admin
npm install
```

### 2. Set Up Environment Variables

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/nexcv
JWT_SECRET=your-very-secure-secret-key-change-this
JWT_EXPIRES_IN=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

#### Frontend (.env.local)
```bash
cd frontend
cp .env.local.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_DEFAULT_USERNAME=amal
```

#### Admin Portal (.env.local)
```bash
cd admin
cp .env.local.example .env.local
```

Edit `admin/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

### 3. Start MongoDB

If using local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas (cloud) - update `MONGODB_URI` in backend `.env`

### 4. Start All Services

Open three terminal windows:

#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:5001

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:3000

#### Terminal 3 - Admin Portal:
```bash
cd admin
npm run dev
```
Admin portal runs on http://localhost:3001

### 5. Create User Account

Register a new user via the admin portal or API:

**Option 1: Via Admin Portal (Recommended)**
1. Go to http://localhost:3001
2. Click "Need an account? Register"
3. Fill in your details including a unique username
4. Your resume will be available at: `yoursite.com/username`

**Option 2: Via API**
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "amal@example.com",
    "password": "secure-password",
    "name": "Amal Aggarwal",
    "username": "amal"
  }'
```

**Note**: Multiple users can now register. Each gets their own isolated data and unique username.

### 6. Login to Admin Portal

1. Go to http://localhost:3001/login
2. Enter your email and password
3. Start managing your content!

## Project Structure

```
nexcv/
├── backend/              # Express API server
│   ├── src/
│   │   ├── config/      # Database connection
│   │   ├── controllers/ # Route handlers
│   │   ├── middleware/  # Auth, validation, errors
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API routes
│   │   └── server.ts    # Entry point
│   └── README.md
│
├── frontend/             # Public resume website
│   ├── src/
│   │   ├── app/         # Next.js pages
│   │   ├── components/  # React components
│   │   ├── lib/         # API client, utilities
│   │   └── types/       # TypeScript types
│   └── README.md
│
├── admin/                # Admin portal
│   ├── src/
│   │   ├── app/         # Admin pages
│   │   ├── components/  # Admin components
│   │   ├── lib/         # API client, auth
│   │   └── types/       # TypeScript types
│   └── README.md
│
└── README.md            # This file
```

## Usage Guide

### Managing Content

1. **Login** to admin portal (http://localhost:3001)
2. **Dashboard** - View content statistics
3. **Profile** - Edit personal information and contact details
4. **Experience** - Add/edit/delete work experiences
5. **Education** - Manage educational background
6. **Skills** - Organize skills by categories
7. **Projects** - Showcase portfolio projects

### Adding Content Examples

#### Adding Work Experience
1. Click "Experience" in sidebar
2. Click "+ Add Experience"
3. Fill in details (company, position, dates, achievements)
4. Click "Save"
5. Changes appear immediately on public website

#### Updating Profile
1. Click "Profile" in sidebar
2. Update any fields
3. Click "Save Profile"
4. Changes reflect on homepage

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin (one-time)
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/change-password` - Change password

### Public Endpoints (Username-based)
- `GET /api/profile/:username` - Get user's profile
- `GET /api/experience/:username` - Get user's experiences
- `GET /api/education/:username` - Get user's education
- `GET /api/skills/:username` - Get user's skills
- `GET /api/projects/:username` - Get user's projects

### Admin Endpoints (require authentication)
- `PUT /api/profile` - Update profile
- `POST /api/experience` - Create experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience
- Similar CRUD for education, skills, projects

## Deployment

### Backend (Railway/Render)

1. Create account on Railway or Render
2. Create new project
3. Connect GitHub repository
4. Set environment variables:
   - `MONGODB_URI` (from MongoDB Atlas)
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `CORS_ORIGIN` (your frontend URLs)
5. Deploy

### Frontend & Admin (Vercel)

1. Create account on Vercel
2. Import GitHub repository
3. Create two projects (frontend and admin)
4. Set environment variables for each:
   - `NEXT_PUBLIC_API_URL` (your backend URL)
5. Deploy

### MongoDB (Atlas)

1. Create free account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update backend `MONGODB_URI`

## Development Tips

### Resetting Database
```bash
mongo nexcv --eval "db.dropDatabase()"
```

### Viewing API Health
```
http://localhost:5001/health
```

### Building for Production

```bash
# Backend
cd backend && npm run build && npm start

# Frontend
cd frontend && npm run build && npm start

# Admin
cd admin && npm run build && npm start
```

## Customization

### Change Colors
Edit `tailwind.config.ts` in frontend and admin:
```typescript
colors: {
  primary: {
    // Your colors here
  }
}
```

### Add New Sections
1. Create new Mongoose model in `backend/src/models/`
2. Add controller in `backend/src/controllers/`
3. Create routes in `backend/src/routes/`
4. Add to frontend and admin

## Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify `.env` file exists and is correct
- Check port 5001 is not in use (port 5000 may be used by AirPlay on Mac)

### Can't login to admin
- Ensure backend is running
- Verify admin account was created
- Check browser console for errors

### Changes not appearing
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check backend API is responding
- Verify frontend is using correct API URL

### CORS errors
- Update `CORS_ORIGIN` in backend `.env`
- Restart backend after changing

## Security Recommendations

- ✅ Use strong JWT_SECRET in production
- ✅ Enable HTTPS in production
- ✅ Use environment variables for secrets
- ✅ Implement rate limiting (optional)
- ✅ Regular dependency updates
- ✅ Don't commit `.env` files

## Future Enhancements

Potential features to add:
- [ ] Dynamic routing for user resumes (e.g., `/[username]`)
- [ ] Homepage listing all users
- [ ] Contact form with email integration
- [ ] Blog section per user
- [ ] Resume PDF export
- [x] Image upload to cloud storage (Cloudinary) - ✅ Implemented
- [ ] Analytics dashboard
- [x] Multi-user support - ✅ Implemented
- [ ] Multi-language support
- [ ] Two-factor authentication
- [ ] Rich text editor for descriptions

## Support

For issues or questions:
1. Check the individual README files in each directory
2. Review the troubleshooting section
3. Check backend/frontend/admin logs

## License

MIT

---

**nexCV** - Made in India with pride 🇮🇳

Empowering professionals to showcase their journey!
