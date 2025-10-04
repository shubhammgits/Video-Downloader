# VideoDownloader Project Structure

```
video-downloader/
├── backend/                    # Backend server
│   ├── server.js              # Main backend server file
│   ├── package.json           # Backend dependencies
│   ├── package-lock.json      # Backend dependency lock file
│   ├── .env                   # Environment variables
│   ├── README.md              # Backend documentation
│   └── node_modules/          # Backend dependencies (generated)
├── src/                       # Frontend source code (Next.js)
│   └── app/                   # Next.js app directory
│       ├── page.tsx          # Main page component
│       ├── layout.tsx        # Root layout
│       └── globals.css       # Global styles
├── index.html                 # Static HTML frontend (alternative)
├── server.js                  # Simple Node.js server for static files
├── package.json               # Frontend dependencies
├── package-lock.json          # Frontend dependency lock file
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── README.md                  # Main project documentation
├── RUNNING.md                 # Instructions for running the application
├── PROJECT_STRUCTURE.md       # This file
└── node_modules/              # Frontend dependencies (generated)
```

## Key Files

### Frontend Files

- `index.html` - Static HTML version of the frontend with all functionality
- `src/app/page.tsx` - Next.js version of the main page (TypeScript/React)
- `src/app/layout.tsx` - Next.js root layout
- `src/app/globals.css` - Global CSS styles with Tailwind configuration

### Backend Files

- `backend/server.js` - Main backend server implementation
- `backend/.env` - Environment variables configuration

### Configuration Files

- `package.json` - Frontend package configuration and dependencies
- `backend/package.json` - Backend package configuration and dependencies
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

### Documentation Files

- `README.md` - Main project documentation
- `RUNNING.md` - Instructions for running the application
- `backend/README.md` - Backend-specific documentation
- `PROJECT_STRUCTURE.md` - This file explaining the project structure

## Technologies Used

### Frontend
- HTML5 (static version)
- Tailwind CSS (via CDN for static version)
- JavaScript (ES6+)
- Next.js 14 (TypeScript version)
- React 18

### Backend
- Node.js
- Express.js
- dotenv (for environment variables)

## Features Implemented

1. **Modern UI/UX**
   - Glassmorphism design
   - Dark/light mode toggle
   - Responsive layout for all devices
   - Smooth animations and transitions

2. **Core Functionality**
   - Video URL input with paste button
   - Platform detection
   - Video preview with thumbnail
   - Multiple format download options
   - Loading states and error handling

3. **Supported Platforms**
   - YouTube (Videos + Shorts)
   - Instagram (Reels + Posts)
   - Facebook Videos
   - TikTok
   - Twitter (X)

4. **Technical Features**
   - RESTful API design
   - Environment variable configuration
   - Modular code structure
   - Comprehensive documentation