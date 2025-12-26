@echo off
echo ================================================
echo    VINTAGE THREADS - E-COMMERCE PLATFORM
echo ================================================
echo.
echo This script will help you get started quickly
echo.
echo Choose an option:
echo.
echo 1. Install dependencies (npm install)
echo 2. Start development server (npm run dev)
echo 3. Build for production (npm run build)
echo 4. Preview production build (npm run preview)
echo 5. Run linter (npm run lint)
echo 6. Exit
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" (
    echo.
    echo Installing dependencies...
    npm install
    echo.
    echo Done! Dependencies installed.
    pause
    goto :menu
)

if "%choice%"=="2" (
    echo.
    echo Starting development server...
    echo Open your browser at http://localhost:5173
    echo.
    echo Demo Accounts:
    echo Customer: demo@example.com / demo123
    echo Admin: admin@vintageThreads.com / admin123
    echo.
    npm run dev
)

if "%choice%"=="3" (
    echo.
    echo Building for production...
    npm run build
    echo.
    echo Done! Build completed.
    pause
    goto :menu
)

if "%choice%"=="4" (
    echo.
    echo Starting preview server...
    npm run preview
)

if "%choice%"=="5" (
    echo.
    echo Running linter...
    npm run lint
    echo.
    pause
    goto :menu
)

if "%choice%"=="6" (
    exit
)

echo Invalid choice. Please try again.
pause
goto :menu

:menu
cls
goto :start
