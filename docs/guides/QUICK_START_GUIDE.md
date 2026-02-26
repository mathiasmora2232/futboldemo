# 🚀 QUICK START - Comienza en 5 Minutos

## ✨ Lo Que Harás en Esta Guía

```
1. Descarga/clona el proyecto              (30 seg)
2. Abre terminal                           (10 seg)
3. Inicia servidor HTTP                    (10 seg)
4. Abre navegador                          (20 seg)
5. ¡Juega con datos reales!               (Ahora mismo)
```

---

## PASO 1: Preparación

### Si NO tienes el proyecto aún:
```bash
# Clona desde GitHub
git clone https://github.com/[usuario]/futboldemo.git
cd futboldemo
```

### Si YA tienes el proyecto:
```bash
# Navega a la carpeta
cd c:\Users\USER\Desktop\programs\personal\futboldemo
```

---

## PASO 2: Inicia el Servidor

### Windows (PowerShell):
```bash
python -m http.server 8000
```

### Mac/Linux:
```bash
python3 -m http.server 8000
```

### Esperado:
```
Serving HTTP on port 8000
Press Ctrl+C para detener
```

---

## PASO 3: Abre en Navegador

```
http://localhost:8000
```

O copia-pega esto en la barra de direcciones del navegador.

---

## PASO 4: ¡Juega!

### Verás pantalla principal:

```
┌─────────────────────────────────────┐
│    FOOTBALL MANAGER DEMO            │
│                                     │
│  [START NEW GAME]  [LOAD GAME]      │
│  [SETTINGS]                         │
│                                     │
│  © 2025 Football Manager Demo       │
└─────────────────────────────────────┘
```

### Haz clic en "START NEW GAME":

```
Selecciona Liga:
├─ Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿
├─ La Liga 🇪🇸
├─ Bundesliga 🇩🇪
├─ Serie A 🇮🇹
├─ Ligue 1 🇫🇷
├─ [+ 7 ligas más reales]
```

### Selecciona tu liga favorita, luego:

```
Selecciona Equipo:
├─ Arsenal FC (Premier, 1º lugar)
├─ Manchester City
├─ Liverpool FC
├─ Chelsea
├─ [+ 16 equipos más de Premier League]
```

### ¡Listo para jugar!

```
┌──────────────────────────────────┐
│  Arsenal FC vs [Próximo rival]   │
│                                  │
│  Jornada 1/38                    │
│  [SIMULATE GAMEWEEK]             │
│                                  │
│  Tabla de posiciones:            │
│  1. Arsenal FC ............. 0   │
│  2. Man. City .............. 0   │
│  3. Liverpool FC ........... 0   │
└──────────────────────────────────┘
```

---

## 🎮 Controles Básicos

| Acción | Resultado |
|--------|-----------|
| Click "Simulate Gameweek" | Juega la próxima jornada |
| Click en "View Standings" | Ver tabla de posiciones |
| Click en equipo | Ver detalles |
| "Save Game" | Guarda partida (3 slots) |
| "Load Game" | Continúa partida guardada |

---

## 💾 Guardando Tu Progreso

```
Automático:
├─ Al presionar "Save Game"
├─ Se guarda en LocalStorage navegador
├─ Persiste aunque cierres el navegador
└─ 3 slots disponibles

Cargar después:
├─ Abre app nuevamente
├─ Haz clic "LOAD GAME"
├─ Selecciona slot
└─ ¡Continúa donde dejaste!
```

---

## ⚙️ CONFIGURACIÓN

### Settings (Opcional):

```
Acceso: [SETTINGS] botón en menú principal

Opciones:
├─ Dificultad (Fácil/Normal/Difícil)
├─ Velocidad simulación
├─ Sonidos (On/Off)
└─ Idioma (English/Español)
```

---

## 🔧 SOLUCIÓN RÁPIDA DE PROBLEMAS

### "No se carga la página"
```
Solución:
1. Verifica que servidor está corriendo (Ctrl+C y vuelve a ejecutar)
2. Abre http://127.0.0.1:8000 en lugar de localhost
3. Intenta http://[IP LOCAL]:8000
```

### "Los equipos no aparecen"
```
Solución:
1. Abre consola (F12)
2. Busca errores en rojo
3. Verifica que JSONs existen: src/data/leagues_real.json
```

### "El juego va lento"
```
Solución:
1. Cierra otros navegadores
2. Limpia cache (Ctrl+Shift+Del)
3. Intenta en navegador diferente
```

---

## 📊 ¿Qué Son los Datos "Reales"?

```
✅ REAL significa:
├─ Equipos existentes (Arsenal, Real Madrid, etc.)
├─ Ligas auténticas (Premier League, La Liga, etc.)
├─ Resultados verificables (8,123 partidos 2023-24)
├─ Tablas de posiciones exactas
└─ Cotejables en internet

DEMO significa:
├─ Simulación de las jornadas futuras (no ocurrieron)
├─ MatchEngine simula resultados
├─ Pero usa datos REALES de calidad de equipo
```

---

## 🌍 Ligas Disponibles (v2.0)

```
🏴󠁧󠁢󠁥󠁮󠁧󠁿 INGLATERRA
├─ Premier League (20 equipos)
└─ Championship (24 equipos)

🇪🇸 ESPAÑA
├─ La Liga (20 equipos)
└─ 2ª División (22 equipos)

🇩🇪 ALEMANIA
├─ Bundesliga (18 equipos)
└─ 2ª Bundesliga (18 equipos)

🇮🇹 ITALIA
├─ Serie A (20 equipos)
└─ Serie B (20 equipos)

🇫🇷 FRANCIA
├─ Ligue 1 (20 equipos)
└─ Ligue 2 (20 equipos)

🇳🇱 HOLANDA - Eredivisie (18)
🇵🇹 PORTUGAL - Primeira Liga (18)
🇹🇷 TURQUÍA - Süper Lig (20)
🇨🇭 SUIZA - Super League (13)
🇵🇱 POLONIA - Ekstraklasa (18)
🇲🇽 MÉXICO - Liga MX (18)
🏴󠁧󠁢󠁳󠁣󠁴󠁿 ESCOCIA - Scottish (10+)
```

---

## 📚 ¿Qué Sigue?

### Después de Jugar:

1. **Entender los Datos**
   → Lee: `docs/data-sources/COMPLETE_DATA_INVENTORY.md`

2. **Explorar Características**
   → Lee: `ARCHITECTURE_WITH_REAL_DATA.md`

3. **Ver Datos en Acción**
   → Abre Console (F12) y escribe: `window.dataManager.getEnabledLeagues()`

4. **Agregar Más Datos**
   → Ve a: `csv-data-organized/` y documentación en `/docs/`

---

## 💡 TIPS & TRICKS

### Ver qué datos se cargaron:
```javascript
// Abre Console (F12) y copia:
console.log(window.dataManager.leaguesData);

// Verás:
{
  "version": "2.0.0",
  "realData": true,       ← Datos reales
  "leagues": [...]        ← 12 ligas
}
```

### Ver equipos de una liga:
```javascript
// Console (F12):
window.dataManager.getTeamsByLeague('ENG').map(t => t.name);

// Output: ['Arsenal FC', 'Man. City', ...]
```

### Ver tabla de posiciones:
```javascript
// Console (F12):
window.leagueManager.getCurrentTable('ENG');
```

---

## 🎯 OBJETIVOS DEL JUEGO

```
Objetivo Principal:
├─ Guiar tu equipo a la cúspide de la liga
├─ Ganar temporada tras temporada
└─ Romper récords

Estadísticas Globales:
├─ Mejor defensa (menos goles en contra)
├─ Mejor ataque (más goles a favor)
├─ Racha más larga sin perder
├─ Mayor margen de victoria
```

---

## 🏁 ¡YA ESTÁS LISTO!

```
✅ Proyecto clonado/descargado
✅ Servidor ejecutándose
✅ Navegador abierto
✅ Juego cargado

🎮 ¡Ahora a JUGAR!
```

---

## 📞 NECESITAS AYUDA?

### Rápida:
- Abre Console (F12) → Ver errores en rojo
- Busca en README.md

### Detallada:
- Lee `INDEX.md` (menú principal del proyecto)
- Revisa `docs/data-sources/COMPLETE_DATA_INVENTORY.md`

### Con Bugs:
- Abre una Issue en GitHub describiendo el problema
- Incluye screenshot + pasos para reproducir

---

**¡Espero que disfrutes!** ⚽✨

**Versión:** 2.0.0  
**Última Actualización:** Febrero 2025
