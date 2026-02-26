/**
 * UIController.js v3 - Con traducciones y logos
 * Gestiona la interfaz de usuario y navegación entre pantallas
 */

class UIController {
  constructor() {
    this.currentScreen = 'mainMenu';
    this.gameState = null;
    this.dataManager = null;
    this.leagueManager = null;
    this.matchEngine = null;
    this.logoManager = null;
    this.saveSystem = new SaveSystem();
  }

  /**
   * Inicializa el controlador
   */
  async init() {
    console.log('🎮 Inicializando Football Manager v3...');
    
    this.logoManager = new LogoManager();
    this.dataManager = new DataManager();
    
    // Cargar datos
    const loaded = await this.dataManager.loadAllData();
    
    if (!loaded) {
      console.warn('⚠️ No se pudieron cargar datos reales');
      this.showNotification('Cargando datos demo...');
    } else {
      console.log('✅ Datos cargados correctamente');
    }

    this.matchEngine = new MatchEngine(this.dataManager);
    this.leagueManager = new LeagueManager(this.dataManager, this.matchEngine);

    // Inicializar idioma
    document.documentElement.lang = i18n.getLanguage();
    
    this.updateUITexts();
    this.attachEventListeners();
    this.showScreen('mainMenu');
  }

  /**
   * Muestra una pantalla específica
   */
  showScreen(screenName) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.add('hidden');
    });

    // Mostrar la pantalla solicitada
    const screen = document.getElementById(screenName);
    if (screen) {
      screen.classList.remove('hidden');
      this.currentScreen = screenName;
      console.log(`📺 Pantalla: ${screenName}`);
      this.updateUITexts();

      // Inicializar elementos específicos de pantallas
      if (screenName === 'leagueSelection') {
        setTimeout(() => this.initLeagueSelection(), 100);
      }
    }
  }

  /**
   * Actualiza todos los textos de UI según idioma
   */
  updateUITexts() {
    // Main Menu
    const btnNewGame = document.getElementById('btn-new-game');
    if (btnNewGame) {
      const span = btnNewGame.querySelector('span');
      if (span) span.textContent = '▶ ' + i18n.t('menu.newGame');
    }

    const btnLoadGame = document.getElementById('btn-load-game');
    if (btnLoadGame) {
      const span = btnLoadGame.querySelector('span');
      if (span) span.textContent = '📂 ' + i18n.t('menu.loadGame');
    }

    const btnSettings = document.getElementById('btn-settings');
    if (btnSettings) {
      const span = btnSettings.querySelector('span');
      if (span) span.textContent = '⚙ ' + i18n.t('menu.settings');
    }

    const btnChangelog = document.getElementById('btn-changelog');
    if (btnChangelog) {
      const span = btnChangelog.querySelector('span');
      if (span) span.textContent = '📝 ' + 'Changelog';
    }

    const btnExit = document.getElementById('btn-exit');
    if (btnExit) {
      const span = btnExit.querySelector('span');
      if (span) span.textContent = '🔴 ' + i18n.t('menu.exit');
    }
  }

  /**
   * Muestra una notificación flotante
   */
  showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(46, 204, 113, 0.9);
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }

  /**
   * Adjunta event listeners a los botones
   */
  attachEventListeners() {
    // Main Menu
    document.getElementById('btn-new-game')?.addEventListener('click', () => this.showScreen('leagueSelection'));
    document.getElementById('btn-load-game')?.addEventListener('click', () => this.showScreen('loadGame'));
    document.getElementById('btn-settings')?.addEventListener('click', () => this.showScreen('settings'));
    document.getElementById('btn-changelog')?.addEventListener('click', () => this.showScreen('changelog'));
    document.getElementById('btn-exit')?.addEventListener('click', () => console.log('Saliendo...'));

    // Idiomas
    document.getElementById('btn-lang-es')?.addEventListener('click', () => this.changeLanguage('es'));
    document.getElementById('btn-lang-en')?.addEventListener('click', () => this.changeLanguage('en'));

    // League Selection
    document.getElementById('btn-confirm-leagues')?.addEventListener('click', () => this.confirmLeagueSelection());
    document.getElementById('btn-back-to-menu')?.addEventListener('click', () => this.showScreen('mainMenu'));

    // Team Selection
    document.getElementById('btn-back-team-selection')?.addEventListener('click', () => this.showScreen('leagueSelection'));

    // Load Game
    this.updateLoadGameUI();

    // Main Game Screen
    document.getElementById('btn-view-standings')?.addEventListener('click', () => this.showScreen('standings'));
    document.getElementById('btn-view-team')?.addEventListener('click', () => this.showScreen('teamView'));
    document.getElementById('btn-simulate-gameweek')?.addEventListener('click', () => this.simulateGameweek());
    document.getElementById('btn-return-to-menu')?.addEventListener('click', () => this.showScreen('mainMenu'));

    // Standings
    document.getElementById('btn-back-from-standings')?.addEventListener('click', () => this.showScreen('mainGame'));

    // Team View
    document.getElementById('btn-back-from-team')?.addEventListener('click', () => this.showScreen('mainGame'));
  }

  /**
   * Cambia el idioma de la interfaz
   */
  changeLanguage(lang) {
    if (i18n.setLanguage(lang)) {
      document.documentElement.lang = lang;
      this.updateUITexts();
      this.showNotification(
        lang === 'es' ? '✓ Idioma cambiado a Español' : '✓ Language changed to English',
        2000
      );
    }
  }

  /**
   * Actualiza la interfaz de carga de juego
   */
  updateLoadGameUI() {
    const container = document.getElementById('save-slots-container');
    if (!container) return;

    container.innerHTML = '';
    const metadata = this.saveSystem.getAllSaveMetadata();

    metadata.forEach(save => {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'save-slot';

      if (save.isEmpty) {
        slotDiv.innerHTML = `
          <div class="save-slot-content">
            <p class="save-empty">Slot ${save.slotNumber} - Vacío</p>
          </div>
        `;
      } else {
        const date = new Date(save.lastPlayedDate).toLocaleDateString();
        slotDiv.innerHTML = `
          <div class="save-slot-content">
            <h3>${save.managerName}</h3>
            <p><strong>Club:</strong> ${save.selectedTeamId}</p>
            <p><strong>Temporada:</strong> ${save.season}</p>
            <p><strong>Jornada:</strong> ${save.gameweek}</p>
            <p class="save-date">${date}</p>
          </div>
          <button class="btn btn-small" onclick="uiController.loadGameFromSlot(${save.slotNumber})">Cargar</button>
          <button class="btn btn-danger btn-small" onclick="uiController.deleteSave(${save.slotNumber})">Eliminar</button>
        `;
      }

      container.appendChild(slotDiv);
    });
  }

  /**
   * Inicia la selección de ligas con interfaz mejorada
   */
  initLeagueSelection() {
    const leaguesData = [
      { flag: '🇬🇧', country: 'INGLATERRA', leagues: [
        { id: 'PL', name: 'Premier League' },
        { id: 'CH', name: 'Championship' }
      ]},
      { flag: '🇪🇸', country: 'ESPAÑA', leagues: [
        { id: 'LL', name: 'La Liga' }
      ]},
      { flag: '🇲🇽', country: 'MÉXICO', leagues: [
        { id: 'LMX', name: 'Liga MX' }
      ]},
      { flag: '🇪🇨', country: 'ECUADOR', leagues: [
        { id: 'LP', name: 'LigaPro' },
        { id: 'SB', name: 'Serie B' }
      ]}
    ];

    const container = document.getElementById('leagues-container');
    if (!container) return;

    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    container.style.gap = '20px';
    container.style.marginBottom = '30px';

    leaguesData.forEach(country => {
      const countrySection = document.createElement('div');
      countrySection.className = 'glass-card';
      countrySection.style.padding = '25px';
      countrySection.style.cursor = 'pointer';
      countrySection.style.transition = 'all 0.3s ease';
      countrySection.style.borderRadius = '16px';

      let leaguesHTML = `<h3 style="margin: 0 0 20px 0; font-size: 1.3rem;">${country.flag} ${country.country}</h3>`;
      
      country.leagues.forEach(league => {
        leaguesHTML += `
          <label style="display: flex; align-items: center; gap: 12px; margin: 12px 0; cursor: pointer; font-size: 1rem;">
            <input type="checkbox" class="league-checkbox-new" value="${league.id}" style="width: 18px; height: 18px; cursor: pointer;">
            <span>${league.name}</span>
          </label>
        `;
      });

      countrySection.innerHTML = leaguesHTML;
      
      // Hover effect
      countrySection.addEventListener('mouseover', () => {
        countrySection.style.transform = 'translateY(-5px)';
        countrySection.style.boxShadow = '0 10px 30px rgba(51, 56, 255, 0.3)';
      });
      
      countrySection.addEventListener('mouseout', () => {
        countrySection.style.transform = 'translateY(0)';
        countrySection.style.boxShadow = '';
      });

      container.appendChild(countrySection);
    });

    // Recargar event listeners
    this.attachEventListeners();
  }

  /**
   * Confirma la selección de ligas
   */
  confirmLeagueSelection() {
    const checkboxes = document.querySelectorAll('.league-checkbox-new:checked');
    const selectedLeagues = Array.from(checkboxes).map(cb => cb.value);

    if (selectedLeagues.length === 0) {
      this.showNotification('⚠️ Selecciona al menos una liga', 2000);
      return;
    }

    // Habilitar ligas seleccionadas
    selectedLeagues.forEach(leagueId => {
      this.dataManager.toggleLeague(leagueId, true);
    });

    this.showScreen('teamSelection');
    this.renderTeamSelection();
  }

  /**
   * Renderiza la selección de equipos con interfaz moderna
   */
  renderTeamSelection() {
    const container = document.getElementById('teams-container');
    if (!container) return;

    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
    container.style.gap = '20px';
    container.style.marginBottom = '30px';

    const teams = this.dataManager.getAllTeams();

    if (teams.length === 0) {
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 40px;">No hay equipos disponibles. Selecciona ligas primero.</p>';
      return;
    }

    teams.forEach(team => {
      const teamCard = document.createElement('div');
      teamCard.className = 'glass-card';
      teamCard.style.padding = '20px';
      teamCard.style.textAlign = 'center';
      teamCard.style.cursor = 'pointer';
      teamCard.style.transition = 'all 0.3s ease';
      teamCard.style.display = 'flex';
      teamCard.style.flexDirection = 'column';
      teamCard.style.justifyContent = 'space-between';
      teamCard.style.borderRadius = '16px';

      const avgOverall = this.dataManager.calculateTeamAverage(team.id);
      
      teamCard.innerHTML = `
        <div>
          <h4 style="margin: 0 0 10px 0; font-size: 1.1rem; color: var(--accent-primary);">${team.name}</h4>
          <p style="margin: 5px 0; font-size: 0.85rem; color: var(--text-secondary);">${team.league}</p>
          <div style="margin: 15px 0; font-size: 0.9rem;">
            <span style="background: rgba(51, 56, 255, 0.2); padding: 5px 12px; border-radius: 8px; color: var(--accent-primary);">
              ⭐ ${avgOverall}/100
            </span>
          </div>
        </div>
        <button class="btn btn-success" style="width: 100%; margin-top: 15px;">
          Seleccionar ✓
        </button>
      `;

      // Hover effect
      teamCard.addEventListener('mouseover', () => {
        teamCard.style.transform = 'translateY(-8px)';
        teamCard.style.boxShadow = '0 15px 40px rgba(51, 56, 255, 0.4)';
      });
      
      teamCard.addEventListener('mouseout', () => {
        teamCard.style.transform = 'translateY(0)';
        teamCard.style.boxShadow = '';
      });

      // Click event
      teamCard.addEventListener('click', () => this.startGameWithTeam(team.id, team.name));

      container.appendChild(teamCard);
    });
  }

  /**
   * Inicia una partida con equipo seleccionado
   */
  startGameWithTeam(teamId, teamName) {
    const managerName = prompt('¿Cuál es tu nombre como manager?');
    if (!managerName) return;

    // Crear estado del juego
    this.gameState = {
      metadata: this.saveSystem.createSaveMetadata(managerName, teamId, 
        this.dataManager.getEnabledLeagues().map(l => l.id)
      ),
      playerTeamId: teamId,
      matches: {},
      tables: {}
    };

    // Guardar automáticamente
    this.saveSystem.saveGame(1, this.gameState);

    this.showScreen('mainGame');
    this.updateMainGameUI();
  }

  /**
   * Actualiza la interfaz del juego principal
   */
  updateMainGameUI() {
    if (!this.gameState) return;

    const managerName = document.getElementById('manager-name');
    const teamName = document.getElementById('team-name');
    const gameweek = document.getElementById('gameweek-info');

    if (managerName) managerName.textContent = `${this.gameState.metadata.managerName}`;
    if (teamName) {
      const team = this.dataManager.getTeamById(this.gameState.playerTeamId);
      teamName.textContent = team?.name || 'N/A';
    }
    if (gameweek) gameweek.textContent = `Jornada: ${this.gameState.metadata.gameweek}`;
  }

  /**
   * Muestra la tabla de posiciones
   */
  showStandings() {
    const leagueId = this.dataManager.getEnabledLeagues()[0]?.id;
    if (!leagueId) return;

    const matches = this.gameState.matches[leagueId] || [];
    const table = this.leagueManager.getLeagueTable(leagueId, matches);

    const container = document.getElementById('standings-content');
    if (!container) return;

    container.innerHTML = '<table class="standings-table"><thead><tr><th>Pos</th><th>Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>Pts</th></tr></thead><tbody>';

    table.forEach((team, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${team.teamName}</td>
          <td>${team.played}</td>
          <td>${team.won}</td>
          <td>${team.drawn}</td>
          <td>${team.lost}</td>
          <td>${team.goalsFor}</td>
          <td>${team.goalsAgainst}</td>
          <td>${team.goalDifference}</td>
          <td><strong>${team.points}</strong></td>
        </tr>
      `;
      container.innerHTML += row;
    });

    container.innerHTML += '</tbody></table>';
    this.showScreen('standings');
  }

  /**
   * Muestra el vista del equipo
   */
  showTeamView() {
    if (!this.gameState) return;

    const players = this.dataManager.getTeamPlayers(this.gameState.playerTeamId);
    const container = document.getElementById('team-players-content');

    if (!container) return;

    container.innerHTML = '<table class="players-table"><thead><tr><th>Nombre</th><th>Posición</th><th>Edad</th><th>Overall</th><th>Potencial</th></tr></thead><tbody>';

    players.forEach(player => {
      const row = `
        <tr>
          <td>${player.name}</td>
          <td>${player.position}</td>
          <td>${player.age}</td>
          <td>${player.overall}</td>
          <td>${player.potential}</td>
        </tr>
      `;
      container.innerHTML += row;
    });

    container.innerHTML += '</tbody></table>';
    this.showScreen('teamView');
  }

  /**
   * Simula una jornada
   */
  simulateGameweek() {
    if (!this.gameState) return;

    const enabledLeagues = this.dataManager.getEnabledLeagues();
    
    enabledLeagues.forEach(league => {
      if (!this.gameState.matches[league.id]) {
        this.gameState.matches[league.id] = [];
      }

      const matches = this.leagueManager.simulateLeagueGameweek(league.id, this.gameState.metadata.gameweek);
      this.gameState.matches[league.id].push(...matches);
    });

    this.gameState.metadata.gameweek++;
    this.gameState.metadata.lastPlayedDate = new Date().toISOString();
    
    this.saveSystem.saveGame(1, this.gameState);
    this.updateMainGameUI();
    
    alert(`Jornada ${this.gameState.metadata.gameweek - 1} simulada`);
  }

  /**
   * Carga una partida desde un slot
   */
  loadGameFromSlot(slotNumber) {
    this.gameState = this.saveSystem.loadGame(slotNumber);
    if (this.gameState) {
      // Rehabilitar las ligas guardadas
      this.gameState.metadata.enabledLeagues.forEach(leagueId => {
        this.dataManager.toggleLeague(leagueId, true);
      });

      this.showScreen('mainGame');
      this.updateMainGameUI();
    } else {
      alert('Error al cargar la partida');
    }
  }

  /**
   * Elimina una partida guardada
   */
  deleteSave(slotNumber) {
    if (confirm('¿Estás seguro de que deseas eliminar este guardado?')) {
      this.saveSystem.deleteSave(slotNumber);
      this.updateLoadGameUI();
    }
  }
}

// Instancia global
let uiController;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
  uiController = new UIController();
  await uiController.init();
});
