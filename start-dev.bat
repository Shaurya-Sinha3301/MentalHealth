@echo off
echo Starting MentalMind Development Environment...

echo.
echo Starting Backend Server...
start "Backend" cmd /k "cd backend && ..\.venv\Scripts\Activate.ps1 && python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
start "Frontend" cmd /k "cd mentalmind-frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause >nul