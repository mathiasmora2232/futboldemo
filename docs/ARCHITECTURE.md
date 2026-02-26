# 🏗️ Guía de Arquitectura y Extensión

## Principios de Diseño

Esta aplicación sigue principios **SOLID** y está diseñada para ser **fácilmente expandible**:

1. **Single Responsibility**: Cada módulo tiene una responsabilidad clara
2. **Open/Closed**: Abierto para extensión, cerrado para modificación
3. **Dependency Injection**: Los módulos reciben sus dependencias
4. **Separación de Concerns**: Lógica de datos separada de la UI

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────┐
│                   USUARIO (UI)                          │
│              UIController.showScreen()                  │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                  UI LAYER                               │
│          Pantallas HTML + Event Listeners               │
│   (mainMenu, leagueSelection, mainGame, etc.)           │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│              BUSINESS LOGIC LAYER                       │
│  ├─ DataManager: Acceso a datos                        │
│  ├─ LeagueManager: Lógica de ligas                     │
│  ├─ MatchEngine: Simulación de partidos               │
│  └─ SaveSystem: Persistencia                           │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│              DATA LAYER                                 │
│  ├─ JSON Files (leagues.json, players.json)           │
│  └─ LocalStorage (Guardados del jugador)               │
└─────────────────────────────────────────────────────────┘
```

## Ciclo de Vida de una Partida

```
1. DOMContentLoaded
   └─> UIController.init()
       └─> DataManager.loadAllData()
           ├─> loadJSON(leagues.json)
           └─> loadJSON(players.json)

2. Usuario selecciona ligas
   └─> confirmLeagueSelection()
       └─> DataManager.toggleLeague()

3. Usuario selecciona equipo
   └─> startGameWithTeam()
       └─> SaveSystem.saveGame() + gameState creado

4. Usuario simula jornada
   └─> simulateGameweek()
       ├─> LeagueManager.simulateLeagueGameweek()
       │   └─> MatchEngine.simulateMatch() (por cada partido)
       └─> SaveSystem.saveGame() (auto-guardado)

5. Usuario cierra navegador
   └─> Datos en LocalStorage preservados
```

## Cómo Agregar una Característica Nueva

### Ejemplo: Agregar Sistema de Préstamos

#### Paso 1: Crear el módulo
```javascript
// src/modules/LoanSystem.js

class LoanSystem {
  constructor(dataManager, saveSystem) {
    this.dataManager = dataManager;
    this.saveSystem = saveSystem;
  }

  /**
   * Propone un préstamo de un jugador
   */
  proposeLoan(playerInfo, destinationTeamId, duration) {
    return {
      playerId: playerInfo.id,
      originalTeamId: playerInfo.teamId,
      loanTeamId: destinationTeamId,
      duration: duration,
      status: 'PROPOSED',
      createdDate: new Date().toISOString()
    };
  }

  /**
   * Aprueba un préstamo
   */
  approveLoan(loanOffer) {
    loanOffer.status = 'APPROVED';
    return true;
  }

  /**
   * Finaliza un préstamo
   */
  endLoan(loanOffer) {
    loanOffer.status = 'COMPLETED';
    return true;
  }
}

window.LoanSystem = LoanSystem;
```

#### Paso 2: Integrarlo en UIController
```javascript
// Añadir en UIController.init()
this.loanSystem = new LoanSystem(this.dataManager, this.saveSystem);

// Añadir evento en attachEventListeners()
document.getElementById('btn-loans')?.addEventListener('click', () => {
  this.showLoansScreen();
});

// Crear método auxiliar
showLoansScreen() {
  // Lógica para mostrar pantalla de préstamos
}
```

#### Paso 3: Guardar datos de préstamos
```javascript
// En gameState
this.gameState.loans = [];

// Cuando se crea un préstamo
this.gameState.loans.push(loanOffer);
this.saveSystem.saveGame(1, this.gameState);
```

#### Paso 4: Crear HTML para la nueva pantalla
```html
<div id="loanScreen" class="screen hidden">
  <div class="container">
    <!-- Contenido de préstamos -->
  </div>
</div>
```

## Patrones Utilizados

### 1. **Singleton Pattern** (SaveSystem, UIController)
```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
  }
}
```

### 2. **Factory Pattern** (Creación de objetos de juego)
```javascript
class GameStateFactory {
  static createGameState(managerName, teamId, leagues) {
    return {
      metadata: { managerName, teamId, leagues, createdDate: new Date() },
      matches: {},
      tables: {}
    };
  }
}
```

### 3. **Observer Pattern** (Para eventos futuros)
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(data));
    }
  }
}
```

### 4. **Strategy Pattern** (Diferentes estrategias de simulación)
```javascript
class SimulationStrategy {
  simulate(team1, team2) {
    throw new Error('Implementar en subclase');
  }
}

class RealisticStrategy extends SimulationStrategy {
  simulate(team1, team2) {
    // Simulación realista
  }
}

class QuickStrategy extends SimulationStrategy {
  simulate(team1, team2) {
    // Simulación rápida
  }
}
```

## Mejoras de Performance

### Caching de Datos
```javascript
class CachedDataManager extends DataManager {
  constructor() {
    super();
    this.cache = new Map();
  }

  getTeamById(teamId) {
    if (this.cache.has(teamId)) {
      return this.cache.get(teamId);
    }

    const team = super.getTeamById(teamId);
    this.cache.set(teamId, team);
    return team;
  }

  clearCache() {
    this.cache.clear();
  }
}
```

### Lazy Loading
```javascript
class LazyDataManager extends DataManager {
  constructor() {
    super();
    this.loadedLeagues = new Set();
  }

  async loadLeagueOnDemand(leagueId) {
    if (!this.loadedLeagues.has(leagueId)) {
      const leagueData = await this.loadJSON(`src/data/leagues/${leagueId}.json`);
      // Procesar datos
      this.loadedLeagues.add(leagueId);
    }
  }
}
```

## Testing

### Ejemplo de Test Unitario (Jest)
```javascript
// __tests__/MatchEngine.test.js

describe('MatchEngine', () => {
  let matchEngine;
  let dataManager;

  beforeEach(() => {
    dataManager = new DataManager();
    matchEngine = new MatchEngine(dataManager);
  });

  test('debería generar goles realistas', () => {
    const goals = matchEngine.generateGoals(85);
    expect(goals).toBeGreaterThanOrEqual(0);
    expect(goals).toBeLessThanOrEqual(5);
  });

  test('debería simular un partido correctamente', () => {
    const match = matchEngine.simulateMatch('RMA', 'FCB');
    expect(match).toHaveProperty('homeGoals');
    expect(match).toHaveProperty('awayGoals');
    expect(match).toHaveProperty('result');
  });
});
```

## Seguridad

### Sanitización de Entrada
```javascript
class InputValidator {
  static sanitizePlayerName(name) {
    return name
      .trim()
      .replace(/[<>]/g, '')
      .substring(0, 50);
  }

  static validateTeamId(teamId) {
    return /^[A-Z0-9]{2,4}$/.test(teamId);
  }
}
```

## Escalabilidad Futura

### Migración a Backend
```javascript
// Versión original (LocalStorage)
async loadAllData() {
  this.leaguesData = await this.loadJSON('src/data/leagues.json');
  this.playersData = await this.loadJSON('src/data/players.json');
}

// Versión con Backend
async loadAllData() {
  // API REST
  this.leaguesData = await fetch('/api/leagues').then(r => r.json());
  this.playersData = await fetch('/api/players').then(r => r.json());
}

// Versión con GraphQL
async loadAllData() {
  const query = `
    query {
      leagues { id name teams { id name } }
      players { id name position age overall }
    }
  `;
  const response = await fetch('/graphql', { 
    method: 'POST',
    body: JSON.stringify({ query })
  });
  return response.json();
}
```

### Migración a Framework (React)
```jsx
// Componente React equivalente
function GameScreen() {
  const [gameState, setGameState] = useState(null);
  const [uiController] = useState(() => new UIController());

  useEffect(() => {
    uiController.init().then(() => {
      setGameState(uiController.gameState);
    });
  }, []);

  return (
    <div className="main-game">
      <Header manager={gameState?.metadata.managerName} />
      <StandingsTable />
      <TeamPlayers />
    </div>
  );
}
```

## Checklist de Calidad de Código

- ✅ Código comentado y autodocumentado
- ✅ Nombres de variables claros
- ✅ Funciones pequeñas y enfocadas
- ✅ Sin variables globales (excepto instancias de clase)
- ✅ DRY (Don't Repeat Yourself)
- ✅ Manejo de errores adecuado
- ✅ Responsive y accesible
- ✅ Performance optimizado

## Herramientas de Desarrollo Recomendadas

```bash
# Formatter
npm install -g prettier

# Linter
npm install -g eslint

# Testing
npm install --save-dev jest

# Build tools
npm install --save-dev webpack webpack-cli

# Documentation
npm install -g jsdoc
```

## Recursos Útiles

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/)
- [ES6 Standards](https://www.ecma-international.org/ecma-262/)
- [Web APIs - LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [JSON Schema](https://json-schema.org/)

---

**Última actualización**: Febrero 2026
