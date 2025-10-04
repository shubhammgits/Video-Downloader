# How to Run VideoDownloader Locally

This document provides step-by-step instructions to run the VideoDownloader application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- Python 3 (for serving static files)
- Git (optional, for cloning the repository)

## Step-by-Step Instructions

### 1. Start the Backend Server

Open a new terminal/command prompt and navigate to the backend directory:
```bash
cd "C:\Users\shubh\OneDrive\Desktop\video downloader\backend"
```

Install backend dependencies (if not already installed):
```bash
npm install
```

Start the backend server:
```bash
node server.js
```

The backend server will start on port 3001. You should see output similar to:
```
Server is running on port 3001
Health check: http://localhost:3001/api/health
```

### 2. Start the Frontend (Choose One Option)

#### Option A: Next.js Development Server (Recommended)

Open a new terminal/command prompt and navigate to the main project directory:
```bash
cd "C:\Users\shubh\OneDrive\Desktop\video downloader"
```

Install frontend dependencies (if not already installed):
```bash
npm install
```

Start the Next.js development server:
```bash
npx next dev
```

The frontend will be available at http://localhost:3000 (or http://localhost:3001 if port 3000 is in use)

If you encounter compatibility issues with Next.js, try installing a specific version:
```bash
npm uninstall next
npm install next@14.2.3 react@18.2.0 react-dom@18.2.0
npx next dev
```

If you encounter Tailwind CSS issues, try reinstalling the correct versions:
```bash
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@3.4.1 postcss@8.4.31 autoprefixer@10.4.16
npx tailwindcss init -p
npx next dev
```

#### Option B: Static HTML Version

Open a new terminal/command prompt and navigate to the main project directory:
```bash
cd "C:\Users\shubh\OneDrive\Desktop\video downloader"
```

Start the Python server:
```bash
python -m http.server 8080
```

The frontend will be available at http://localhost:8080

#### Option B: Static HTML Version

Open a new terminal/command prompt and navigate to the main project directory:
```bash
cd "C:\Users\shubh\OneDrive\Desktop\video downloader"
```

Start the Python server:
```bash
python -m http.server 8080
```

The frontend will be available at http://localhost:8080

### 3. Access the Application

Once both servers are running:

1. Open your web browser
2. Navigate to:
   - http://localhost:3000 (Next.js version)
   - http://localhost:8080 (Static HTML version)
3. You should see the VideoDownloader interface

### 4. Test the Connection

To verify that the frontend can communicate with the backend:

1. Open the browser's developer tools (F12)
2. Go to the Console tab
3. Try pasting a video URL and clicking Download
4. Check for any errors in the console

You can also test the backend API directly by visiting:
- http://localhost:3001/api/health (should return a JSON response)

## Troubleshooting

### Common Issues and Solutions

1. **Port already in use**
   - Change the PORT value in `backend/.env`
   - Use a different port for the Python server (e.g., `python -m http.server 8081`)

2. **Module not found errors**
   - Run `npm install` in both the main directory and backend directory

3. **Permission errors**
   - Try running the terminal as administrator
   - Use a different port number

4. **"next is not recognized" error**
   - Run `npx next dev` instead of `npm run dev`
   - Or install Next.js globally: `npm install -g next`

5. **Python server won't start**
   - Make sure Python 3 is installed
   - Try using a different port: `python -m http.server 3002`

6. **Next.js SWC Compilation Errors**
   - This is a common issue on Windows systems
   - Uninstall and reinstall Next.js with a specific version:
     ```bash
     npm uninstall next
     npm install next@14.2.3 react@18.2.0 react-dom@18.2.0
     ```
   - Clear Next.js cache:
     ```bash
     # Delete the .next directory
     Remove-Item -Recurse -Force .next
     ```
   - Try running the development server again:
     ```bash
     npx next dev
     ```

7. **Tailwind CSS Issues**
   - If you encounter Tailwind CSS errors, reinstall the correct versions:
     ```bash
     npm uninstall tailwindcss postcss autoprefixer
     npm install -D tailwindcss@3.4.1 postcss@8.4.31 autoprefixer@10.4.16
     npx tailwindcss init -p
     npx next dev
     ```
   - Make sure the PostCSS configuration is correct:
     ```js
     module.exports = {
       plugins: {
         'tailwindcss': {},
         'autoprefixer': {},
       },
     }
     ```

8. **Port Conflicts**
   - Next.js will automatically try different ports if the default is in use
   - The server will show which port it's running on in the console output
   - You can specify a port manually: `npx next dev -p 3002`

9. **Compatibility Issues**
   - If you continue to have issues, use the static HTML version which has no build requirements
   - Navigate to the project directory and run:
     ```bash
     python -m http.server 8080
     ```
     Then access http://localhost:8080 in your browser

### Verifying Installation

To verify all components are correctly installed:

```bash
# Check Node.js version
node --version

# Check if Next.js is installed
npx next --version

# Check if Python is installed
python --version

# Check backend dependencies
cd backend
npm list express cors dotenv
```

## Stopping the Servers

To stop any of the servers, go to the terminal where they're running and press `Ctrl + C`.

## Next Steps

Once you've confirmed the application is working locally:

1. See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on deploying to production
2. See [IMPLEMENTATION.md](IMPLEMENTATION.md) for information on implementing actual video downloading functionality
3. See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for a detailed overview of the codebase

## Useful URLs

- **Frontend (Next.js)**: http://localhost:3000
- **Frontend (Static HTML)**: http://localhost:8080
- **Backend API**: http://localhost:3001
- **Backend Health Check**: http://localhost:3001/api/healthpython --version

# Check backend dependencies
cd backend
npm list express cors dotenv
```

## Stopping the Servers

To stop any of the servers, go to the terminal where they're running and press `Ctrl + C`.

## Next Steps

Once you've confirmed the application is working locally:

1. See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on deploying to production
2. See [IMPLEMENTATION.md](IMPLEMENTATION.md) for information on implementing actual video downloading functionality
3. See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for a detailed overview of the codebase

## Useful URLs

- **Frontend (Next.js)**: http://localhost:3000
- **Frontend (Static HTML)**: http://localhost:8080
- **Backend API**: http://localhost:3001
- **Backend Health Check**: http://localhost:3001/api/health