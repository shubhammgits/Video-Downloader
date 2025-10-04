# Running the VideoDownloader Application

This document provides instructions on how to run the complete VideoDownloader application.

## Prerequisites

- Node.js (v16 or higher)
- Python 3 (for serving the frontend)

## Running the Backend Server

1. Open a terminal/command prompt
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   The backend will be available at http://localhost:3001

## Running the Frontend

### Option 1: Next.js Development Server (Recommended)

1. Open a new terminal/command prompt
2. Navigate to the main project directory:
   ```bash
   cd "C:\Users\shubh\OneDrive\Desktop\video downloader"
   ```
3. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npx next dev
   ```
   The frontend will be available at http://localhost:3000

If you encounter compatibility issues with Next.js, try installing a specific version:
```bash
npm uninstall next
npm install next@14.2.3 react@18.2.0 react-dom@18.2.0
npx next dev
```

### Option 2: Using Python's Built-in Server (Static HTML)

1. Open a new terminal/command prompt
2. Navigate to the main project directory:
   ```bash
   cd "C:\Users\shubh\OneDrive\Desktop\video downloader"
   ```
3. Start the frontend server:
   ```bash
   python -m http.server 8080
   ```
   The frontend will be available at http://localhost:8080

### Option 3: Using Node.js Server

1. Open a new terminal/command prompt
2. Navigate to the main project directory:
   ```bash
   cd "C:\Users\shubh\OneDrive\Desktop\video downloader"
   ```
3. Install dependencies (if not already installed):
   ```bash
   npm install express
   ```
4. Start the frontend server:
   ```bash
   node server.js
   ```
   The frontend will be available at http://localhost:3000

## Using the Application

1. Make sure both the frontend and backend servers are running
2. Open your browser and navigate to:
   - http://localhost:3000 (Next.js version)
   - http://localhost:8080 (Static HTML version)
3. Paste a video URL in the input field (YouTube, Instagram, Facebook, TikTok, or Twitter)
4. Click "Download" to process the video
5. Select your preferred format from the download options
6. Click on a format to download the video

## API Endpoints

The backend provides the following API endpoints:

- `POST http://localhost:3001/api/download` - Initiate video download
- `GET http://localhost:3001/api/download/mock-video.mp4` - Download mock video file
- `GET http://localhost:3001/api/health` - Health check endpoint

## Troubleshooting

### Port Conflicts

If you encounter port conflicts:
- Change the PORT value in `backend/.env` for the backend
- Change the port number in the python command for the frontend

### Missing Dependencies

If you encounter module not found errors:
```bash
cd backend
npm install
cd ..
npm install express
```

### Permission Issues

If you encounter permission errors when starting the servers:
- Try running the terminal as administrator
- Use a different port number