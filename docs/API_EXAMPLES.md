# 📚 Guía API y Ejemplos de Uso

Esta guía te muestra cómo interactuar con los módulos del juego y extender funcionalidad.

## 📖 API Reference

### SaveSystem

**Constructor:**
```javascript
const saveSystem = new SaveSystem();
```

**Métodos:**

#### `saveGame(slotNumber, gameState)`
Guarda una partida en un slot específico.
```javascript
// Ejemplo
const gameState = {
  metadata: { managerName: 'Juan', selectedTeamId: 'RMA', season: 2025 },
  playerTeamId: 'RMA',
  matches: {},
  tables: {}
};

saveSystem.saveGame(1, gameState);
// Retorna: true si éxito, false si error
```

#### `loadGame(slotNumber)`
Carga una partida desde un slot.
```javascript
const game = saveSystem.loadGame(1);
if (game) {
  console.log('Manager:', game.metadata.managerName);
  console.log('Equipo:', game.playerTeamId);
} else {
  console.log('No hay partida guardada en este slot');
}
```

#### `getAllSaveMetadata()`
Obtiene información de todos los slots.
```javascript
const metadata = saveSystem.getAllSaveMetadata();
// Retorna array de: [
//   { slotNumber: 1, managerName, selectedTeamId, season, ... },
//   { slotNumber: 2, isEmpty: true },
//   ...
// ]
```

#### `deleteSave(slotNumber)`
Elimina un guardado.
```javascript
saveSystem.deleteSave(1);
```

#### `hasSave(slotNumber)`
Verifica si hay guardado en un slot.
```javascript
if (saveSystem.hasSave(1)) {
  console.log('Hay partida guardada');
}
```

---

### DataManager

**Constructor:**
```javascript
const dataManager = new DataManager();
await dataManager.loadAllData(); // IMPORTANTE: siempre llamar primero
```

**Métodos:**

#### `getLeagues()`
Obtiene todas las ligas.
```javascript
const leagues = dataManager.getLeagues();
console.log(leagues[0].name); // "Premier League"
```

#### `getEnabledLeagues()`
Obtiene solo las ligas habilitadas.
```javascript
const enabledLeagues = dataManager.getEnabledLeagues();
// Filtra ligas con enabled: true
```

#### `getLeagueById(leagueId)`
Obtiene una liga específica.
```javascript
const laLiga = dataManager.getLeagueById('LL');
console.log(laLiga.teams.length); // Número de equipos
```

#### `getAllTeams()`
Obtiene todos los equipos de ligas habilitadas.
```javascript
const teams = dataManager.getAllTeams();
teams.forEach(team => {
  console.log(`${team.name} - ${team.league}`);
});
```

#### `getTeamById(teamId)`
Obtiene información de un equipo.
```javascript
const realMadrid = dataManager.getTeamById('RMA');
console.log(realMadrid.name); // "Real Madrid"
console.log(realMadrid.league); // "La Liga"
```

#### `getTeamPlayers(teamId)`
Obtiene todos los jugadores de un equipo.
```javascript
const players = dataManager.getTeamPlayers('RMA');
players.forEach(player => {
  console.log(`${player.name} - ${player.position} (${player.overall})`);
});
```

#### `calculateTeamAverage(teamId)`
Calcula el promedio de overall de un equipo.
```javascript
const avg = dataManager.calculateTeamAverage('RMA');
console.log(`Overall promedio: ${avg}`); // Ej: 86
```

#### `toggleLeague(leagueId, enabled)`
Habilita o deshabilita una liga.
```javascript
dataManager.toggleLeague('LL', true);  // Habilitar La Liga
dataManager.toggleLeague('PL', false); // Deshabilitar Premier League
```

---

### MatchEngine

**Constructor:**
```javascript
const matchEngine = new MatchEngine(dataManager);
```

**Métodos:**

#### `simulateMatch(homeTeamId, awayTeamId)`
Simula un partido entre dos equipos.
```javascript
const match = matchEngine.simulateMatch('RMA', 'FCB');
/*
Retorna:
{
  homeTeam: 'Real Madrid',
  homeTeamId: 'RMA',
  awayTeam: 'FC Barcelona',
  awayTeamId: 'FCB',
  homeGoals: 2,
  awayGoals: 1,
  result: 'HOME_WIN',
  date: '2025-02-26T10:30:00.000Z',
  homeTeamAverage: 86,
  awayTeamAverage: 85
}
*/
```

#### `generateGoals(quality)`
Genera goles basados en la calidad del equipo.
```javascript
const goals = matchEngine.generateGoals(85); // Retorna ej: 2.3
```

#### `getPoints(result)`
Obtiene puntos según resultado.
```javascript
matchEngine.getPoints('HOME_WIN');  // { home: 3, away: 0 }
matchEngine.getPoints('DRAW');      // { home: 1, away: 1 }
matchEngine.getPoints('AWAY_WIN');  // { home: 0, away: 3 }
```

#### `simulateGameweek(matchups)`
Simula múltiples partidos.
```javascript
const matchups = [
  { homeTeamId: 'RMA', awayTeamId: 'FCB' },
  { homeTeamId: 'LIV', awayTeamId: 'MCY' }
];
const results = matchEngine.simulateGameweek(matchups);
// Retorna array de partidos simulados
```

---

### LeagueManager

**Constructor:**
```javascript
const leagueManager = new LeagueManager(dataManager, matchEngine);
```

**Métodos:**

#### `createLeagueTable(leagueId)`
Crea una tabla vacía para una liga.
```javascript
const table = leagueManager.createLeagueTable('LL');
/*
Retorna array:
[
  {
    teamId: 'RMA',
    teamName: 'Real Madrid',
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0
  },
  ...
]
*/
```

#### `getLeagueTable(leagueId, matches)`
Obtiene tabla con resultados de partidos.
```javascript
const matches = [
  { homeTeamId: 'RMA', awayTeamId: 'FCB', homeGoals: 2, awayGoals: 1, result: 'HOME_WIN' }
];
const table = leagueManager.getLeagueTable('LL', matches);
// Tabla ordenada por puntos, DG y GF
```

#### `sortTable(table)`
Ordena una tabla según criterios reales.
```javascript
const sortedTable = leagueManager.sortTable(unsortedTable);
// Criterios: Puntos > DG > GF
```

#### `generateSimpleSchedule(leagueId)`
Genera calendario "todo vs todo".
```javascript
const schedule = leagueManager.generateSimpleSchedule('LL');
/*
Retorna array:
[
  { homeTeamId: 'RMA', awayTeamId: 'FCB' },
  { homeTeamId: 'FCB', awayTeamId: 'RMA' },
  ...
]
*/
```

#### `simulateLeagueGameweek(leagueId, gameweek)`
Simula una jornada de una liga.
```javascript
const matches = leagueManager.simulateLeagueGameweek('LL', 1);
// Retorna partidos simulados de la jornada 1
```

---

### UIController

**Constructor:**
```javascript
const uiController = new UIController();
await uiController.init();
```

**Métodos Principales:**

#### `showScreen(screenName)`
Muestra una pantalla específica.
```javascript
uiController.showScreen('mainMenu');
uiController.showScreen('mainGame');
uiController.showScreen('standings');
uiController.showScreen('teamView');
```

#### `startGameWithTeam(teamId, teamName)`
Inicia una nueva partida.
```javascript
uiController.startGameWithTeam('RMA', 'Real Madrid');
// Pide nombre del manager en un prompt
```

#### `simulateGameweek()`
Simula una jornada.
```javascript
uiController.simulateGameweek();
// Simula todos los partidos de todas las ligas
// Incrementa contador de jornada
// Auto-guarda
```

---

## 🎯 Ejemplos Prácticos

### Ejemplo 1: Crear una Partida Programáticamente

```javascript
async function crearPartidaProgramada() {
  const dm = new DataManager();
  await dm.loadAllData();
  
  // Habilitar ligas
  dm.toggleLeague('LL', true);
  dm.toggleLeague('PL', true);
  
  // Crear estado del juego
  const gameState = {
    metadata: {
      managerName: 'Bot Manager',
      selectedTeamId: 'RMA',
      enabledLeagues: ['LL', 'PL'],
      season: 2025,
      createdDate: new Date().toISOString(),
      lastPlayedDate: new Date().toISOString(),
      gameweek: 1
    },
    playerTeamId: 'RMA',
    matches: {},
    tables: {}
  };
  
  // Guardar
  const saveSystem = new SaveSystem();
  saveSystem.saveGame(1, gameState);
  
  console.log('Partida creada en slot 1');
}
```

### Ejemplo 2: Simular múltiples jornadas

```javascript
async function simularTemporada(numJornadas = 10) {
  const dm = new DataManager();
  await dm.loadAllData();
  
  const lm = new LeagueManager(dm, new MatchEngine(dm));
  const saveSystem = new SaveSystem();
  
  // Cargar partida
  const gameState = saveSystem.loadGame(1);
  
  for (let i = 0; i < numJornadas; i++) {
    const ligas = dm.getEnabledLeagues();
    
    ligas.forEach(liga => {
      if (!gameState.matches[liga.id]) {
        gameState.matches[liga.id] = [];
      }
      
      const matches = lm.simulateLeagueGameweek(liga.id, gameState.metadata.gameweek);
      gameState.matches[liga.id].push(...matches);
    });
    
    gameState.metadata.gameweek++;
    console.log(`Jornada ${gameState.metadata.gameweek - 1} simulada`);
  }
  
  saveSystem.saveGame(1, gameState);
  console.log(`Temporada completada en ${numJornadas} jornadas`);
}
```

### Ejemplo 3: Obtener reporte de desempeño del equipo

```javascript
function generarReporte(teamId) {
  const dm = new DataManager();
  const team = dm.getTeamById(teamId);
  const players = dm.getTeamPlayers(teamId);
  
  const avg = dm.calculateTeamAverage(teamId);
  const mejorJugador = players.reduce((a, b) => a.overall > b.overall ? a : b);
  const peorJugador = players.reduce((a, b) => a.overall < b.overall ? a : b);
  
  return {
    equipo: team.name,
    liga: team.league,
    jugadores: players.length,
    overallPromedio: avg,
    mejorJugador: mejorJugador.name,
    mejorOverall: mejorJugador.overall,
    peorJugador: peorJugador.name,
    peorOverall: peorJugador.overall
  };
}

// Usar:
const reporte = generarReporte('RMA');
console.table(reporte);
```

### Ejemplo 4: Comparar dos equipos

```javascript
function compararEquipos(teamId1, teamId2) {
  const dm = new DataManager();
  
  const team1 = dm.getTeamById(teamId1);
  const team2 = dm.getTeamById(teamId2);
  
  const avg1 = dm.calculateTeamAverage(teamId1);
  const avg2 = dm.calculateTeamAverage(teamId2);
  
  return {
    equipo1: team1.name,
    equipo2: team2.name,
    overall1: avg1,
    overall2: avg2,
    diferencia: Math.abs(avg1 - avg2),
    ventaja: avg1 > avg2 ? 'Equipo 1' : avg2 > avg1 ? 'Equipo 2' : 'Empate'
  };
}

// Usar:
const comparacion = compararEquipos('RMA', 'FCB');
console.table(comparacion);
```

### Ejemplo 5: Acceder desde Consola del Navegador

```javascript
// En la consola (F12) del navegador:

// Ver todas las ligas
window.uiController.dataManager.getLeagues()

// Ver equipos de una liga
window.uiController.dataManager.getLeagues()[0].teams

// Ver estado actual del juego
window.uiController.gameState

// Simular manualmente un partido
window.uiController.matchEngine.simulateMatch('RMA', 'FCB')

// Ver tabla actual
window.uiController.gameState.matches

// Guardar partida
window.uiController.saveSystem.saveGame(1, window.uiController.gameState)
```

---

## 🔄 Ciclo de Vida Completo

```javascript
// 1. Inicializar
const dm = new DataManager();
await dm.loadAllData();

// 2. Preparar componentes
const me = new MatchEngine(dm);
const lm = new LeagueManager(dm, me);
const ss = new SaveSystem();

// 3. Configurar juego
dm.toggleLeague('LL', true);
dm.toggleLeague('PL', true);

// 4. Crear partida
const gameState = {
  metadata: ss.createSaveMetadata('Juan', 'RMA', ['LL', 'PL']),
  playerTeamId: 'RMA',
  matches: { LL: [], PL: [] },
  tables: {}
};

// 5. Guardar
ss.saveGame(1, gameState);

// 6. Simular jornada
const enabledLeagues = dm.getEnabledLeagues();
enabledLeagues.forEach(league => {
  const matches = lm.simulateLeagueGameweek(league.id, gameState.metadata.gameweek);
  gameState.matches[league.id].push(...matches);
});

// 7. Generar tablas
enabledLeagues.forEach(league => {
  gameState.tables[league.id] = lm.getLeagueTable(league.id, gameState.matches[league.id]);
});

// 8. Actualizar estado
gameState.metadata.gameweek++;
gameState.metadata.lastPlayedDate = new Date().toISOString();

// 9. Guardar cambios
ss.saveGame(1, gameState);
```

---

## 📝 Notas Importantes

- **Siempre` llamar `await` en `loadAllData()`**: Los datos son asincronos
- **GameState debe ser serializabe**: Solo datos JSON, sin funciones
- **LocalStorage tiene límite**: ~5-10 MB típicamente
- **Los IDs son case-sensitive**: 'RMA' ≠ 'rma'
- **Las ligas deben estar habilitadas**: Antes de usar equipos

---

**Última actualización**: Febrero 2026
