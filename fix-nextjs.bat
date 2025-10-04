@echo off
echo Fixing Next.js compatibility issues...
echo.

echo 1. Removing .next cache directory...
if exist .next (
    rmdir /s /q .next
    echo    Done.
) else (
    echo    .next directory not found.
)
echo.

echo 2. Uninstalling Next.js...
npm uninstall next
echo    Done.
echo.

echo 3. Installing compatible Next.js version...
npm install next@14.2.3 react@18.2.0 react-dom@18.2.0
echo    Done.
echo.

echo 4. Starting Next.js development server...
npx next dev@echo off
echo Fixing Next.js compatibility issues...
echo.

echo 1. Removing .next cache directory...
if exist .next (
    rmdir /s /q .next
    echo    Done.
) else (
    echo    .next directory not found.
)
echo.

echo 2. Uninstalling Next.js...
npm uninstall next
echo    Done.
echo.

echo 3. Installing compatible Next.js version...
npm install next@14.2.3 react@18.2.0 react-dom@18.2.0
echo    Done.
echo.

echo 4. Starting Next.js development server...
npx next dev