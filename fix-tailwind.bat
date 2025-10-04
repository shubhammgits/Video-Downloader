@echo off
echo Fixing Tailwind CSS issues...
echo.

echo 1. Removing Tailwind CSS dependencies...
npm uninstall tailwindcss postcss autoprefixer
echo    Done.
echo.

echo 2. Installing compatible Tailwind CSS versions...
npm install -D tailwindcss@3.4.1 postcss@8.4.31 autoprefixer@10.4.16
echo    Done.
echo.

echo 3. Initializing Tailwind CSS...
npx tailwindcss init -p
echo    Done.
echo.

echo 4. Starting Next.js development server...
npx next dev