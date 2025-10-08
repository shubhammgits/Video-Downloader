# VideoDownloader

A modern, high-performance video downloader web application for platforms like YouTube, Instagram, Facebook, and Twitter.

## Features

- One-click download experience with zero friction
- Ultra-minimalist, premium-looking user interface
- Responsive for all devices (desktop, tablet, mobile)
- Blazing-fast backend integration with download support
- Smooth, silky UI/UX powered by modern animation libraries
- No login, no ads, no annoying modals or bloat
- Dark/light mode toggle

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS

### Backend
- Node.js with Express
- Platform-specific handlers using yt-dlp

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3 (for serving static files)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install frontend dependencies:
   ```bash
   cd video-downloader
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```
   The backend will be available at http://localhost:3001

2. In a new terminal, start the frontend development server:
   ```bash
   # Navigate back to the main directory if needed
   cd ..
   
   # Start Next.js development server
   npx next dev
   ```
   The frontend will be available at http://localhost:3000

   If you encounter compatibility issues with Next.js, try installing a specific version:
   ```bash
   npm uninstall next
   npm install next@14.2.3 react@18.2.0 react-dom@18.2.0
   npx next dev
   ```

   Alternatively, you can use the static HTML version:
   ```bash
   python -m http.server 8080
   ```
   The static version will be available at http://localhost:8080

## Project Structure

```
video-downloader/
├── backend/              # Backend server
│   ├── server.js         # Main server file
│   └── package.json      # Backend dependencies
├── src/                  # Frontend source code
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Main page component
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Frontend dependencies
```

## Deployment

The application can be deployed without any subscriptions. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on free deployment options including:

- Vercel (free tier for frontend)
- Netlify (free tier for frontend)
- GitHub Pages (completely free for frontend)
- Self-hosting on Oracle Cloud (Always Free Tier)
- Render (free tier for backend)
- Fly.io (free tier for both)

## Supported Platforms

- YouTube (Videos + Shorts)
- Instagram (Reels + Posts)
- Facebook Videos
- TikTok
- Twitter (X)

## Future Enhancements

- Batch Downloads: paste multiple links at once
- Drag & Drop Video URLs to auto-paste
- Clipboard Sync: auto-detect copied links
- Background Downloads with progress
- PWA Version: install as an app
- Browser Extension
- History panel: store recent downloads locally
- Cloud Uploads: Google Drive/Dropbox integration

## License

This project is licensed under the MIT License.- Browser Extension
- History panel: store recent downloads locally
- Cloud Uploads: Google Drive/Dropbox integration

## License

This project is licensed under the MIT License.
