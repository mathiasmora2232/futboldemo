#!/bin/bash

# Script para ejecutar Global Football Manager Demo en macOS/Linux

echo ""
echo "========================================"
echo "Global Football Manager - DEMO"
echo "========================================"
echo ""

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 no está instalado"
    echo "Por favor, instala Python 3.x"
    exit 1
fi

# Ir al directorio del script
cd "$(dirname "$0")"

echo "Iniciando servidor local en http://localhost:8000"
echo "Presiona Ctrl+C para detener el servidor"
echo ""

# Iniciar servidor HTTP
python3 -m http.server 8000
