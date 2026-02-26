# 🚀 Guía de Inicio Rápido

## ⚡ Empezar en 30 Segundos

### Opción 1: Ejecución Directa (Windows)
```bash
# 1. Abre PowerShell en la carpeta del proyecto
# 2. Ejecuta:
python -m http.server 8000

# 3. Abre en el navegador:
# http://localhost:8000
```

### Opción 2: Doble Clic (Windows)
```bash
# 1. Haz doble clic en: run-server.bat
# 2. Se abrirá el servidor automáticamente
# 3. Abre navegador en: http://localhost:8000
```

### Opción 3: Comando Simple (macOS/Linux)
```bash
# 1. Abre Terminal en la carpeta del proyecto
# 2. Ejecuta:
chmod +x run-server.sh
./run-server.sh

# 3. Abre navegador en: http://localhost:8000
```

### Opción 4: Sin Servidor (Menos recomendado)
```bash
# Simplemente abre: index.html en tu navegador
# ⚠ Nota: Algunos navegadores pueden no cargar JSON correctamente
```

## 📋 Requisitos

- ✅ Navegador moderno (Chrome, Firefox, Safari, Edge)
- ✅ Python 3.x (para servidor local, opcional)
- ✅ ~5 MB de almacenamiento en navegador (LocalStorage)

## 🎮 Primer Juego

1. **Abre la aplicación**: `http://localhost:8000`
2. **Menú Principal**: Ves el logo de Global Football Manager
3. **Nueva Partida**: Haz clic en "Nueva Partida"
4. **Seleccionar Ligas**: Marca "La Liga" y "Premier League"
5. **Seleccionar Equipo**: Elige "Real Madrid"
6. **Nombre del Manager**: Ingresa tu nombre (ej: "Miguel Rodríguez")
7. **Juego Principal**: 
   - 📊 Ver Tabla → Muestra clasificación
   - 👥 Ver Plantilla → Muestra tus jugadores
   - ▶ Simular Jornada → Simula todos los partidos
8. **Guardado Automático**: Los datos se guardan automáticamente

## 📁 Estructura de Archivos Importante

```
futboldemo/
├── index.html              ← ABRE ESTO en http://localhost:8000
├── src/
│   ├── modules/           Módulos JavaScript
│   │   ├── SaveSystem.js
│   │   ├── DataManager.js
│   │   ├── MatchEngine.js
│   │   ├── LeagueManager.js
│   │   └── UIController.js
│   └── data/              Datos JSON
│       ├── leagues.json
│       └── players.json
├── assets/
│   └── styles/
│       └── main.css
└── README.md              Documentación completa
```

## 🔧 Troubleshooting Rápido

### "No se carga la página"
```
✓ Verifica que el servidor HTTP está corriendo
✓ Abre: http://localhost:8000 (no file://)
✓ Limpia caché del navegador (Ctrl+Shift+Delete)
```

### "Los datos no cargan"
```
✓ Asegúrate que src/data/ está en el mismo nivel que index.html
✓ Abre la consola (F12) para ver errores
✓ Verifica que Python está ejecutándose
```

### "No puedo guardar"
```
✓ Algunos navegadores en "incógnito" no permiten LocalStorage
✓ Intenta en modo normal
✓ Limpia datos del navegador
```

## 💡 Tips Útiles

### Ver Consola (para debugging)
```
Chrome/Firefox: Presiona F12
Safari: Cmd + Option + I
Edge: F12
```

### Reiniciar desde cero
```javascript
// En consola del navegador (F12):
new SaveSystem().clearAllSaves();
location.reload();
```

### Exportar datos
```javascript
// En consola del navegador:
JSON.stringify(localStorage);
```

## 🎯 Próximos Pasos

1. **Lee README.md** para documentación completa
2. **Explora ARCHITECTURE.md** para entender la estructura
3. **Modifica jugadores** en `src/data/players.json`
4. **Agrega nuevas ligas** en `src/data/leagues.json`
5. **Personaliza colores** en `assets/styles/main.css`

## 📞 Soporte

Si tienes problemas:

1. Revisa la **Consola** (F12) para errores
2. Lee **README.md** - Troubleshooting section
3. Verifica que todos los archivos están presentes
4. Intenta limpiar caché y recargar

## 🚀 Lanzar a Producción

Cuando esté listo para compartir:

```bash
# Opción 1: Subir a un servidor web
# Solo necesitas copiar la carpeta completa

# Opción 2: Hostear en GitHub Pages
# 1. Crea repo: global-football-manager
# 2. Sube archivos a rama main
# 3. Activa GitHub Pages en Settings
# 4. Accede en: https://tuusername.github.io/global-football-manager

# Opción 3: Hostear en Netlify
# 1. Conecta tu repositorio
# 2. Despliega automáticamente
# 3. Obtén URL pública

# Opción 4: Usar contenedor Docker
# Incluye un Dockerfile simple para "dockerizar" la app
```

---

**¡Ahora estás listo para jugar! ⚽**
