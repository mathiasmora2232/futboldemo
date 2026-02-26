# 🎮 Global Football Manager - DEMO

Una demo funcional de un juego de gestión de fútbol estilo Football Manager, construida con **HTML5 + CSS3 + JavaScript moderno (ES6)** sin dependencias externas.

## 📋 Características Incluidas

✅ **Autenticación y Menú Principal**
- Logo y menú principal con animaciones
- Sistema de navegación intuitivo

✅ **Selección de Ligas**
- 6 ligas disponibles (PL, Championship, La Liga, Liga MX, LigaPro, Serie B)
- 5 competiciones internacionales (Champions League, Europa League, Libertadores, etc.)
- Selección múltiple de ligas para optimizar

✅ **Selección de Equipo**
- 30+ equipos disponibles
- Muestra el "overall" promedio de cada equipo
- Entrada de nombre del manager

✅ **Sistema de Simulación de Partidos**
- Simulación realista basada en calidad de equipos
- Factor aleatorio y ventaja de local
- Generación de tabla de posiciones automática

✅ **Tabla de Posiciones**
- Ranking ordenado por: Puntos → Diferencia de Goles → Goles a Favor
- Columnas: Posición, Equipo, PJ, G, E, P, GF, GC, DG, Puntos

✅ **Vista de Plantilla**
- Muestra 15 jugadores por equipo (en demo)
- Información: Nombre, Posición, Edad, Overall, Potencial

✅ **Sistema de Guardado**
- 3 espacios de guardado independientes
- Datos guardados en LocalStorage
- Información: Manager, Club, Temporada, Jornada, Fecha
- Carga/eliminación de partidas

✅ **Simulación de Jornadas**
- Botón "Simular Jornada" genera todos los partidos
- Actualiza tabla automáticamente
- Incrementa el contador de jornada

✅ **Diseño Responsive**
- Funciona en desktop, tablet y mobile
- Animaciones suaves
- Paleta de colores moderna (oscura/deportiva)

## 📂 Estructura de Carpetas

```
futboldemo/
├── index.html                  # Punto de entrada principal
├── src/
│   ├── modules/               # Módulos del juego
│   │   ├── SaveSystem.js      # Gestión de guardados (LocalStorage)
│   │   ├── DataManager.js     # Carga y gestión de datos
│   │   ├── MatchEngine.js     # Motor de simulación de partidos
│   │   ├── LeagueManager.js   # Gestión de ligas y tablas
│   │   └── UIController.js    # Control de interfaz y navegación
│   └── data/                  # Datos del juego en JSON
│       ├── leagues.json       # Ligas y equipos
│       └── players.json       # Jugadores (15 por equipo)
└── assets/
    ├── styles/
    │   └── main.css           # Estilos CSS (responsive)
    └── images/                # (Para futuros logos/banderas)
```

## 🚀 Cómo Usar

### 1. **Descargar y Abrir**
```bash
# Simplemente abre index.html en un navegador moderno
# No requiere servidor, funciona localmente
```

### 2. **Flujo del Juego**
1. **Menú Principal** → Selecciona "Nueva Partida"
2. **Selección de Ligas** → Marca las ligas que quieres
3. **Selección de Equipo** → Elige tu club
4. **Nombre del Manager** → Ingresa tu nombre
5. **Pantalla Principal** → Simula jornadas, ve tabla y plantilla
6. **Guardado Automático** → Se guarda en LocalStorage

### 3. **Operaciones Principales**
- 📊 **Ver Tabla**: Muestra clasificación de la liga
- 👥 **Ver Plantilla**: Lista jugadores de tu equipo
- ▶ **Simular Jornada**: Genera partidos y actualiza tabla
- 📂 **Cargar Partida**: Recupera guardos anteriores

## 🏗️ Arquitectura Modular

### **SaveSystem.js**
Gestiona persistencia de datos:
```javascript
const saveSystem = new SaveSystem();
saveSystem.saveGame(1, gameState);      // Guardar en slot 1
const game = saveSystem.loadGame(1);    // Cargar
const metadata = saveSystem.getAllSaveMetadata(); // Listar
```

### **DataManager.js**
Carga y accede a datos:
```javascript
const dm = new DataManager();
await dm.loadAllData();

const teams = dm.getAllTeams();
const players = dm.getTeamPlayers('RMA');
const avg = dm.calculateTeamAverage('FCB');
```

### **MatchEngine.js**
Simula partidos con realismo:
```javascript
const engine = new MatchEngine(dataManager);
const match = engine.simulateMatch('RMA', 'FCB');
// Retorna: { homeGoals, awayGoals, result, date, ... }
```

### **LeagueManager.js**
Gestiona ligas y tablas:
```javascript
const lm = new LeagueManager(dataManager, matchEngine);
const table = lm.getLeagueTable('LL', matches);
lm.updateTableWithMatch(table, match);
```

### **UIController.js**
Controla navegación y eventos:
```javascript
uiController.showScreen('mainGame');
uiController.simulateGameweek();
uiController.startGameWithTeam('RMA', 'Real Madrid');
```

## 🔧 Extensiones Futuras (Roadmap)

### **Fase 2: Sistema de Fichajes**
```javascript
// transferMarket.js
class TransferMarket {
  listAvailablePlayers()     // Jugadores en el mercado
  buyPlayer()                 // Compra un jugador
  sellPlayer()                // Vende un jugador
  proposeTradeOffer()         // Intercambios
  calculatePlayerPrice()      // Valúa jugadores
}
```

### **Fase 3: Sistema de Tácticas**
```javascript
// TacticsEngine.js
class TacticsEngine {
  setFormation(formation)     // 4-3-3, 4-2-4, etc.
  setInstructions()           // Agresivo, defensivo...
  affectMatchSimulation()     // Impacta resultados
  setBenchPlayers()           // Suplentes
}
```

### **Fase 4: Economía del Equipo**
```javascript
// FinanceManager.js
class FinanceManager {
  getBudget()                 // Presupuesto disponible
  payPlayerWages()            // Salarios
  calculateRevenue()          // Ingresos por victorias
  updateBalance()             // Saldo actual
  takeLoan()                  // Préstamos
}
```

### **Fase 5: Entrenamientos y Desarrollo**
```javascript
// TrainingSystem.js
class TrainingSystem {
  trainPlayers()              // Mejora stats
  recoveryTraining()          // Reduce fatiga
  getTacticalTraining()       // Entrena movimientos
  trackPlayerProgress()       // Historial de mejoras
}
```

### **Fase 6: Modo Multijugador**
```javascript
// MultiplayerManager.js
class MultiplayerManager {
  connectToServer()           // WebSocket
  joinLeague()                // Liga compartida
  playAgainstPlayers()        // Partidos PvP
  synchronizeState()          // Sincronizar datos
}
```

## 💾 Cómo Agregar Datos

### **Aumentar Jugadores por Equipo**
Edita `src/data/players.json`:
```json
{
  "players": {
    "RMA": [
      {"id": 1, "name": "Jugador", "position": "ST", "age": 28, "overall": 85, "potential": 87},
      // Añade más...
    ]
  }
}
```

### **Agregar Nuevas Ligas**
Edita `src/data/leagues.json`:
```json
{
  "leagues": [
    {
      "id": "SERIE_A",
      "name": "Serie A",
      "country": "Italy",
      "region": "ITALY",
      "enabled": false,
      "teams": [
        {"id": "JUV", "name": "Juventus", "shortName": "JUV"},
        // Más equipos...
      ]
    }
  ]
}
```

## 🎨 Personalización de Colores

En `assets/styles/main.css`, modifica las variables CSS:
```css
:root {
  --primary-color: #1a1a2e;        /* Fondo principal */
  --highlight-color: #e94560;      /* Color destacado */
  --text-primary: #ecf0f1;         /* Texto principal */
  /* ... más variables */
}
```

## 📱 Compatibilidad

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera
- ✅ Navegadores móviles modernos

## 🔒 Almacenamiento Local

Los datos se guardan en **LocalStorage del navegador**:
- Límite típico: 5-10 MB
- Ningún dato se envía a servidores
- Se pierde si se limpian cookies/datos del navegador

Para hacer respaldo:
```javascript
// En consola del navegador
const backup = localStorage;
console.log(JSON.stringify(backup));
```

## 💡 Tips de Desarrollo

### **Debug - Ver estado del juego**
```javascript
// En consola del navegador
console.log(window.uiController.gameState);
console.log(window.uiController.dataManager.getLeagues());
```

### **Limpiar todo (reset)**
```javascript
// En consola
new SaveSystem().clearAllSaves();
location.reload();
```

### **Agregar más eventos**
Edita `UIController.js` - método `attachEventListeners()`:
```javascript
document.getElementById('new-button')?.addEventListener('click', () => {
  // Tu función aquí
});
```

## 📊 Ejemplo de Extensión: Stats Avanzadas

```javascript
// advancedStats.js
class AdvancedStatsEngine {
  calculateExpectedGoals(match) {
    // Basado en calidad de pases
    return (match.homeTeam.passing * 0.003 + Math.random());
  }
  
  generateMatchReport(match) {
    return {
      possession: Math.random() * 60 + 30,
      shots: Math.floor(Math.random() * 15 + 5),
      tackles: Math.floor(Math.random() * 20 + 10),
      fouls: Math.floor(Math.random() * 10),
      yellowCards: Math.floor(Math.random() * 5)
    };
  }
}
```

## 🐛 Troubleshooting

### **"No se cargan los datos"**
- Asegúrate que `src/data/` está en la misma carpeta que `index.html`
- Abre con un servidor local (No abras directamente con file://)

### **"Los jugadores no aparecen"**
- Verifica que el `teamId` en `leagues.json` coincida con la clave en `players.json`
- Ej: Si el equipo es "RMA" en teams, debe existir "RMA" en players

### **"No se guardan las partidas"**
- Algunos navegadores en "incógnito" no permiten LocalStorage
- Intenta en modo normal

## 📄 Licencia

Esta es una demo educativa. Libre de usar y modificar para propósitos personales.

---

## 🎯 Próximos Pasos

1. **Fase 1 Completada**: Demo funcional ✅
2. **Fase 2**: Integrar mercado de fichajes
3. **Fase 3**: Sistema de tácticas tácnico
4. **Fase 4**: Economía realista
5. **Fase 5**: Base de datos real (MongoDB/Firebase)
6. **Fase 6**: Multiplayer en tiempo real

---

**Hecho con ❤️ para los managers de fútbol fantástico | 2025**
