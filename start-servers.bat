@echo off
echo Starting VideoDownloader servers...
echo.

echo Starting backend server in background...
cd backend
start "Backend Server" cmd /k "node server.js"
cd ..
echo Backend server started on http://localhost:3001
echo.

echo Starting frontend server...
echo Frontend will be available at http://localhost:3000
npx next dev@echo off
echo Starting VideoDownloader servers...
echo.

echo Starting backend server in background...
cd backend
start "Backend Server" cmd /k "node server.js"
cd ..
echo Backend server started on http://localhost:3001
echo.

echo Starting frontend server...
echo Frontend will be available at http://localhost:3000
npx next dev