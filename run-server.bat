@echo off
REM Script para ejecutar Global Football Manager Demo en Windows
REM Requiere Python 3.x instalado

echo.
echo ========================================
echo Global Football Manager - DEMO
echo ========================================
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python no está instalado o no está en PATH
    echo Por favor, instala Python 3.x desde https://www.python.org/
    echo.
    pause
    exit /b 1
)

echo Iniciando servidor local en http://localhost:8000
echo Presiona Ctrl+C para detener el servidor
echo.

REM Cambiar a directorio actual
cd /d "%~dp0"

REM Iniciar servidor HTTP
python -m http.server 8000

pause
