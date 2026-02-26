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
      } else if (screenName === 'standings') {
        setTimeout(() => this.renderStandings(), 100);
      } else if (screenName === 'teamView') {
        setTimeout(() => this.renderTeamView(), 100);
      }
    }
  }

  /**
   * Actualiza todos los textos de UI según idioma
   */
  updateUITexts() {
    // Main Menu - Actualizar directamente sin buscar span
    const btnNewGame = document.getElementById('btn-new-game');
    if (btnNewGame && btnNewGame.querySelector('span')) {
      btnNewGame.querySelector('span').textContent = '▶ Nueva Partida';
    }

    const btnLoadGame = document.getElementById('btn-load-game');
    if (btnLoadGame && btnLoadGame.querySelector('span')) {
      btnLoadGame.querySelector('span').textContent = '📂 Cargar Partida';
    }

    const btnSettings = document.getElementById('btn-settings');
    if (btnSettings && btnSettings.querySelector('span')) {
      btnSettings.querySelector('span').textContent = '⚙ Ajustes';
    }

    const btnChangelog = document.getElementById('btn-changelog');
    if (btnChangelog && btnChangelog.querySelector('span')) {
      btnChangelog.querySelector('span').textContent = '📝 Changelog';
    }

    const btnExit = document.getElementById('btn-exit');
    if (btnExit && btnExit.querySelector('span')) {
      btnExit.querySelector('span').textContent = '🔴 Salir';
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
   * Inicia la selección de ligas con interfaz mejorada - Dinámico desde JSON
   */
  initLeagueSelection() {
    const container = document.getElementById('leagues-container');
    if (!container) return;

    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    container.style.gap = '20px';
    container.style.marginBottom = '30px';

    const allLeagues = this.dataManager.getLeagues();

    allLeagues.forEach(league => {
      const countrySection = document.createElement('div');
      countrySection.className = 'glass-card';
      countrySection.style.padding = '25px';
      countrySection.style.cursor = 'pointer';
      countrySection.style.transition = 'all 0.3s ease';
      countrySection.style.borderRadius = '16px';

      const flagEmoji = this.getCountryEmoji(league.country || league.id);
      
      let leaguesHTML = `<h3 style="margin: 0 0 20px 0; font-size: 1.3rem;">${flagEmoji} ${(league.country || league.name).toUpperCase()}</h3>`;
      
      if (league.teams && league.teams.length > 0) {
        leaguesHTML += `<label style="display: flex; align-items: center; gap: 12px; margin: 12px 0; cursor: pointer; font-size: 1rem;">
          <input type="checkbox" class="league-checkbox-new" value="${league.id}" style="width: 18px; height: 18px; cursor: pointer;">
          <span><strong>${league.name}</strong> (${league.teams.length} equipos)</span>
        </label>`;
      }

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
   * Obtiene emoji por país
   */
  getCountryEmoji(countryName) {
    const emojiMap = {
      'Germany': '🇩🇪', 'Alemania': '🇩🇪', 'DE': '🇩🇪',
      'England': '🇬🇧', 'England': '🇬🇧', 'PL': '🇬🇧',  // Poland - Ekstraklasa
      'Poland': '🇵🇱', 'Polonia': '🇵🇱',
      'Netherlands': '🇳🇱', 'Países Bajos': '🇳🇱', 'NL': '🇳🇱',
      'Spain': '🇪🇸', 'España': '🇪🇸', 'LL': '🇪🇸',
      'Italy': '🇮🇹', 'Italia': '🇮🇹', 'SA': '🇮🇹',
      'France': '🇫🇷', 'Francia': '🇫🇷', 'L1': '🇫🇷',
      'Portugal': '🇵🇹', 'Portugal': '🇵🇹',
      'Turkey': '🇹🇷', 'Turquía': '🇹🇷',
      'Belgium': '🇧🇪', 'Bélgica': '🇧🇪',
      'Mexico': '🇲🇽', 'México': '🇲🇽', 'LMX': '🇲🇽',
      'Ecuador': '🇪🇨', 'Ecuador': '🇪🇨', 'LP': '🇪🇨', 'SB': '🇪🇨',
    };
    return emojiMap[countryName] || '⚽';
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
   * Renderiza la selección de equipos con interfaz moderna e imágenes
   */
  renderTeamSelection() {
    const container = document.getElementById('teams-container');
    if (!container) return;

    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))';
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
      teamCard.style.padding = '0';
      teamCard.style.overflow = 'hidden';
      teamCard.style.cursor = 'pointer';
      teamCard.style.transition = 'all 0.3s ease';
      teamCard.style.borderRadius = '16px';
      teamCard.style.display = 'flex';
      teamCard.style.flexDirection = 'column';

      // Obtener datos de jugadores (esto generará datos si no existen)
      const avgOverall = this.dataManager.calculateTeamAverage(team.id);
      
      // Generar emoji/logo visual basado en el equipo
      const teamEmoji = this.getTeamEmoji(team.name);
      const teamColor = this.generateTeamColor(team.name);

      teamCard.innerHTML = `
        <div style="
          background: linear-gradient(135deg, ${teamColor} 0%, ${this.lightenColor(teamColor)} 100%);
          padding: 30px 20px;
          text-align: center;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">
          <div style="font-size: 3.5rem; margin-bottom: 12px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">
            ${teamEmoji}
          </div>
          <h4 style="margin: 0; font-size: 1.1rem; font-weight: bold;">${team.name}</h4>
          <p style="margin: 5px 0 0 0; font-size: 0.85rem; opacity: 0.9;">${team.league}</p>
        </div>
        
        <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="margin: 12px 0; text-align: center;">
              <span style="
                background: ${teamColor};
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 1.1rem;
                display: inline-block;
              ">⭐ ${avgOverall}/100</span>
            </div>
            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 12px; line-height: 1.6;">
              <p style="margin: 0;">📊 Liga: ${team.leagueId}</p>
              <p style="margin: 5px 0 0 0;">👥 Squad: 11 jugadores</p>
            </div>
          </div>
          
          <button class="btn btn-success" style="
            width: 100%;
            margin-top: 15px;
            background: ${teamColor};
            border: none;
            color: white;
            font-weight: bold;
          ">
            Seleccionar ✓
          </button>
        </div>
      `;

      // Hover effect
      teamCard.addEventListener('mouseover', () => {
        teamCard.style.transform = 'translateY(-10px)';
        teamCard.style.boxShadow = `0 20px 50px ${teamColor}40`;
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
   * Obtiene emoji para posición de jugador
   */
  getPositionEmoji(position) {
    return TeamGenerator.getPositionEmoji(position) || '👤';
  }

  /**
   * Obtiene emoji para equipo según su nombre
   */
  getTeamEmoji(teamName) {
    const emojiMap = {
      // Españoles
      'Real Madrid': '👑', 'Barcelona': '🦁', 'Atletico': '📍', 'Sevilla': '⚔️',
      'Valencia': '🌶️', 'Athletic': '⚽', 'Villarreal': '💛', 'Real Sociedad': '🔵',
      
      // Ingleses
      'Manchester City': '💙', 'Liverpool': '🔴', 'Chelsea': '🔵', 'Arsenal': '❤️',
      'Tottenham': '⚪', 'Manchester United': '😈', 'Newcastle': '⬛', 'Brighton': '⚪',
      
      // Italianos
      'Inter': '🔵', 'Milan': '🔴', 'Juventus': '⬛', 'Roma': '🟡', 'Lazio': '💙',
      
      // Franceses
      'PSG': '🔴', 'Monaco': '❤️', 'Lyon': '⚪', 'Marseille': '💙',
      
      // Alemanes
      'Bayern Munich': '❌', 'Dortmund': '💛', 'RB Leipzig': '⚪', 'Schalke': '⚰️',
      
      // Polaco (lo que está viendo el usuario)
      'Legia': '⚪', 'Lech Poznan': '⬜', 'Gornik Zabrze': '⬛', 'Pogon Szczecin': '🔴',
      'Cracovia': '❌', 'Ruch Chorzow': '⚫', 'Slask Wroclaw': '🟠', 'Warta Poznan': '🟢',
      'Jagiellonia': '🔵', 'Radomiak Radom': '🟤', 'Korona Kielce': '👑', 'Zaglebie': '🟠',
      'Piast Gliwice': '⚪', 'Rakow': '🔴', 'Puszcza': '🟢', 'LKS Lodz': '🔴', 'Widzew Lodz': '🔵',
      'Stal Mielec': '🟠',
      
      // Latam
      'Liga MX': '🇲🇽', 'LigaPro': '🇪🇨', 'Serie B': '🇪🇨',
    };
    return emojiMap[teamName] || '⚽';
  }

  /**
   * Genera color para equipo
   */
  generateTeamColor(teamName) {
    const colors = {
      // Españoles
      'Real Madrid': '#FFFFFF', 'Barcelona': '#004A9F', 'Atletico': '#E63946',
      'Sevilla': '#FF0000', 'Valencia': '#F4AA1F', 'Athletic': '#FF0000',
      'Villarreal': '#FFD700', 'Real Sociedad': '#0099FF',
      
      // Ingleses
      'Manchester City': '#6BB6FF', 'Liverpool': '#E31936', 'Chelsea': '#034694',
      'Arsenal': '#EF0107', 'Tottenham': '#FFFFFF', 'Manchester United': '#DA291C',
      'Newcastle': '#241F20', 'Brighton': '#0057B8',
      
      // Italianos
      'Inter': '#0055CC', 'Milan': '#E41E3F', 'Juventus': '#000000',
      'Roma': '#FCDC00', 'Lazio': '#7DD5F7',
      
      // Por defecto aleatorio basado en nombre
      'default': this.hashToColor(teamName)
    };
    return colors[teamName] || colors['default'];
  }

  /**
   * Convierte nombre en color hexadecimal
   */
  hashToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 45%)`;
  }

  /**
   * Aclara un color hexadecimal
   */
  lightenColor(color) {
    // Si es hsl, convertir; si es hexadecimal, aclarar
    if (color.startsWith('hsl')) {
      return color.replace('45%', '60%');
    }
    // Para hexadecimal simple
    return color;
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

  /**
   * Renderiza la tabla de posiciones de la liga
   */
  renderStandings() {
    const container = document.getElementById('standings-content');
    if (!container) return;

    if (!this.gameState) {
      container.innerHTML = '<p>No hay partida activa</p>';
      return;
    }

    const leagueId = this.gameState.metadata.selectedLeague;
    const league = this.dataManager.getLeagues().find(l => l.id === leagueId);
    const standings = this.leagueManager.generateStandings(leagueId);

    let html = `<div style="padding: 20px;">
      <h2>⚽ ${league?.name || leagueId} - Jornada ${this.gameState.metadata.gameweek}</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background: rgba(255,255,255,0.1); border-bottom: 2px solid #3338ff;">
            <th style="padding: 12px; text-align: left;">POS</th>
            <th style="padding: 12px; text-align: left;">EQUIPO</th>
            <th style="padding: 12px; text-align: center;">JJ</th>
            <th style="padding: 12px; text-align: center;">G</th>
            <th style="padding: 12px; text-align: center;">E</th>
            <th style="padding: 12px; text-align: center;">P</th>
            <th style="padding: 12px; text-align: center;">GF</th>
            <th style="padding: 12px; text-align: center;">GC</th>
            <th style="padding: 12px; text-align: center;">DG</th>
            <th style="padding: 12px; text-align: center;">PTS</th>
          </tr>
        </thead>
        <tbody>`;

    standings.forEach((team, index) => {
      const rowColor = index < 4 ? 'rgba(46, 204, 113, 0.15)' : 
                      index < 6 ? 'rgba(155, 89, 182, 0.15)' : 
                      index >= standings.length - 3 ? 'rgba(231, 76, 60, 0.15)' : 'transparent';
      
      html += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.1); background: ${rowColor};">
        <td style="padding: 12px; text-align: center; font-weight: bold;">${index + 1}</td>
        <td style="padding: 12px;">${this.getTeamEmoji(team.name)} ${team.name}</td>
        <td style="padding: 12px; text-align: center;">${team.played}</td>
        <td style="padding: 12px; text-align: center; color: #2ecc71;">${team.won}</td>
        <td style="padding: 12px; text-align: center;">${team.drawn}</td>
        <td style="padding: 12px; text-align: center; color: #e74c3c;">${team.lost}</td>
        <td style="padding: 12px; text-align: center;">${team.goalsFor}</td>
        <td style="padding: 12px; text-align: center;">${team.goalsAgainst}</td>
        <td style="padding: 12px; text-align: center; font-weight: bold;">${team.goalDifference > 0 ? '+' : ''}${team.goalDifference}</td>
        <td style="padding: 12px; text-align: center; font-weight: bold; font-size: 1.1rem;">${team.points}</td>
      </tr>`;
    });

    html += `</tbody></table>
      <div style="margin-top: 30px; text-align: center;">
        <button class="modern-btn" onclick="uiController.showScreen('mainGame')" style="padding: 12px 30px; font-size: 1rem;">
          ◀ Volver
        </button>
      </div>
    </div>`;

    container.innerHTML = html;
  }

  /**
   * Renderiza la plantilla del equipo
   */
  renderTeamView() {
    const container = document.getElementById('team-players-content');
    if (!container) return;

    if (!this.gameState) {
      container.innerHTML = '<p>No hay partida activa</p>';
      return;
    }

    const teamId = this.gameState.metadata.selectedTeam;
    const team = this.dataManager.getAllTeams().find(t => t.id === teamId);
    const players = this.dataManager.getTeamPlayers(teamId);
    const teamOverall = this.dataManager.calculateTeamAverage(teamId);

    let html = `<div style="padding: 20px;">
      <h2>${this.getTeamEmoji(team?.name)} ${team?.name || teamId}</h2>
      <p style="color: #aaa;">Rating: <strong>${teamOverall.toFixed(1)}/100</strong></p>
      
      <h3 style="margin-top: 20px; border-bottom: 2px solid #3338ff; padding-bottom: 10px;">FORMACIÓN</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 15px;">`;

    const positionOrder = ['GK', 'CB', 'RB', 'LB', 'CM', 'RW', 'LW', 'ST'];
    
    positionOrder.forEach(pos => {
      const player = players.find(p => p.position === pos);
      if (player) {
        const statusColor = player.overall >= 80 ? '#2ecc71' : player.overall >= 70 ? '#f39c12' : '#e74c3c';
        html += `<div style="padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px; border-left: 4px solid ${statusColor};">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">${this.getPositionEmoji(pos)} ${pos}</div>
          <div style="font-weight: bold;">${player.name}</div>
          <div style="font-size: 0.9rem; color: #aaa;">OVR: <span style="color: ${statusColor};">${player.overall}</span></div>
          <div style="font-size: 0.8rem; color: #999;">Edad: ${player.age}</div>
        </div>`;
      }
    });

    html += `</div>
      <div style="margin-top: 30px; text-align: center;">
        <button class="modern-btn" onclick="uiController.showScreen('mainGame')" style="padding: 12px 30px; font-size: 1rem;">
          ◀ Volver
        </button>
      </div>
    </div>`;

    container.innerHTML = html;
  }
}

// Instancia global
let uiController;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
  uiController = new UIController();
  await uiController.init();
});
