@echo off
echo =========================================================================
echo    SkillSetu - Public Live Stream via Cloudflare Tunnel
echo =========================================================================
echo Starting Backend & Frontend Host on http://localhost:5000...
start cmd /k "node server/index.js"
timeout /t 2 >nul
echo Generating Public Secure HTTPS Link...
node tunnel.js
pause
