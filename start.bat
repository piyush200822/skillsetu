@echo off
echo =========================================================================
echo    SkillSetu - Academia-Industry Collaboration Platform (ID: 26044)
echo    Ministry of Ayush ^& All India Institute of Ayurveda (AIIA)
echo =========================================================================
echo Starting Backend Server on http://localhost:5000...
start cmd /k "node server/index.js"
echo Starting Vite Frontend Dev Server on http://localhost:5173...
start cmd /k "npm run dev"
echo.
echo Launching Application in default browser...
timeout /t 3 >nul
start http://localhost:5173
echo Application launched successfully!
pause
