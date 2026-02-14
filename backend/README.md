# Amal Aggarwal Resume - Backend API

Express + TypeScript backend API for managing resume website content with MongoDB.

## Features

- RESTful API with Express.js and TypeScript
- MongoDB with Mongoose ODM
- JWT authentication for admin access
- Input validation with express-validator
- CORS enabled for frontend and admin portal
- Secure password hashing with bcrypt
- Environment-based configuration

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amal-resume
JWT_SECRET=your-very-secure-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

## Running the Server

### Development mode (with hot reload):
```bash
npm run dev
```

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register first admin user (one-time)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/change-password` - Change password (authenticated)

### Profile
- `GET /api/profile` - Get profile data (public)
- `PUT /api/profile` - Update profile (authenticated)

### Experience
- `GET /api/experience` - Get all experiences (public)
- `POST /api/experience` - Create experience (authenticated)
- `PUT /api/experience/:id` - Update experience (authenticated)
- `DELETE /api/experience/:id` - Delete experience (authenticated)
- `PUT /api/experience/reorder` - Reorder experiences (authenticated)

### Education
- `GET /api/education` - Get all education entries (public)
- `POST /api/education` - Create education (authenticated)
- `PUT /api/education/:id` - Update education (authenticated)
- `DELETE /api/education/:id` - Delete education (authenticated)

### Skills
- `GET /api/skills` - Get all skills (public)
- `POST /api/skills` - Create skill category (authenticated)
- `PUT /api/skills/:id` - Update skill category (authenticated)
- `DELETE /api/skills/:id` - Delete skill category (authenticated)

### Projects
- `GET /api/projects` - Get all projects (public)
- `POST /api/projects` - Create project (authenticated)
- `PUT /api/projects/:id` - Update project (authenticated)
- `DELETE /api/projects/:id` - Delete project (authenticated)

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this structure:
```json
{
  "success": true/false,
  "data": { ... } or "error": "error message"
}
```

## First-Time Setup

1. Start the server and MongoDB
2. Register the first admin user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-password","name":"Admin"}'
```

3. Use the returned token for authenticated requests

## Project Structure

```
backend/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth, validation, error handling
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── server.ts       # Entry point
├── .env                # Environment variables (create from .env.example)
├── package.json
└── tsconfig.json
```

## Deployment

### MongoDB Atlas Setup
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in production environment

### Deploy to Railway/Render
1. Push code to GitHub
2. Connect repository to Railway or Render
3. Set environment variables
4. Deploy

## Security Notes

- Never commit `.env` file to version control
- Use strong JWT_SECRET in production
- Enable HTTPS in production
- Implement rate limiting for production (optional)
- Regularly update dependencies

## License

MIT
