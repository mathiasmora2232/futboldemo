/**
 * DataManager.js v3 - Mejorado con validación exhaustiva
 * Carga y gestiona los datos del juego (ligas, equipos, jugadores)
 */

class DataManager {
  constructor() {
    this.leaguesData = null;
    this.playersData = null;
    this.logoManager = new LogoManager();
    this.validationErrors = [];
  }

  /**
   * Carga todos los datos necesarios
   */
  async loadAllData() {
    try {
      console.log('🔄 Cargando datos del juego (v3)...');
      
      // Intentar cargar datos reales primero
      let leagues, players;
      let dataSource = 'demo';
      
      try {
        console.log('🔍 Buscando datos reales...');
        leagues = await this.loadJSON('src/data/leagues_real.json');
        
        if (this.validateLeaguesData(leagues)) {
          console.log('✅ Datos reales encontrados y validados!');
          dataSource = 'real';
        } else {
          console.warn('⚠️ Datos reales inválidos, usando datos demo');
          leagues = await this.loadJSON('src/data/leagues.json');
        }
      } catch (e) {
        console.log('ℹ️ Datos reales no disponibles, usando datos demo');
        try {
          leagues = await this.loadJSON('src/data/leagues.json');
        } catch (e2) {
          console.error('❌ Error crítico: No se pudieron cargar ligas');
          return false;
        }
      }
      
      // Cargar jugadores
      try {
        players = await this.loadJSON('src/data/players.json');
        if (!this.validatePlayersData(players)) {
          console.warn('⚠️ Datos de jugadores parcialmente inválidos');
          players = { players: {} };
        }
      } catch (e) {
        console.warn('ℹ️ Datos de jugadores no disponibles');
        players = { players: {} };
      }

      this.leaguesData = leagues;
      this.playersData = players;
      
      console.log(`✅ Datos cargados exitosamente (Origen: ${dataSource})`);
      console.log(`📊 Estadísticas: ${this.getLeagues().length} ligas, ${this.getAllTeams().length} equipos`);
      
      return true;
    } catch (error) {
      console.error('❌ Error crítico al cargar datos:', error);
      this.validationErrors.push(error.message);
      return false;
    }
  }

  /**
   * Valida estructura de datos de ligas
   */
  validateLeaguesData(data) {
    if (!data || !data.leagues || !Array.isArray(data.leagues)) {
      this.validationErrors.push('Estructura de ligas inválida');
      return false;
    }

    for (let league of data.leagues) {
      if (!league.id || !league.name || !league.country) {
        this.validationErrors.push(`Liga inválida: ${league.name || 'desconocida'}`);
        return false;
      }
      
      if (!Array.isArray(league.teams) || league.teams.length === 0) {
        this.validationErrors.push(`Liga sin equipos: ${league.name}`);
        return false;
      }

      for (let team of league.teams) {
        if (!team.id || !team.name) {
          this.validationErrors.push(`Equipo inválido en ${league.name}`);
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Valida estructura de datos de jugadores
   */
  validatePlayersData(data) {
    if (!data || !data.players || typeof data.players !== 'object') {
      return false;
    }
    return true;
  }

  /**
   * Carga un archivo JSON
   */
  async loadJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`No se puede cargar ${url}: ${error.message}`);
    }
  }

  /**
   * Obtiene todas las ligas
   */
  getLeagues() {
    return this.leaguesData?.leagues || [];
  }

  /**
   * Obtiene las ligas habilitadas
   */
  getEnabledLeagues() {
    return this.getLeagues().filter(league => league.enabled !== false);
  }

  /**
   * Obtiene una liga por ID
   */
  getLeagueById(leagueId) {
    return this.getLeagues().find(league => league.id === leagueId);
  }

  /**
   * Obtiene todos los equipos de las ligas habilitadas
   */
  getAllTeams() {
    const teams = [];
    this.getEnabledLeagues().forEach(league => {
      if (league.teams && Array.isArray(league.teams)) {
        league.teams.forEach(team => {
          teams.push({
            ...team,
            leagueId: league.id,
            league: league.name,
            country: league.country,
            logo: this.logoManager.getTeamLogo(team.name)
          });
        });
      }
    });
    return teams;
  }

  /**
   * Obtiene un equipo por ID
   */
  getTeamById(teamId) {
    const allTeams = this.getAllTeams();
    return allTeams.find(team => team.id === teamId);
  }

  /**
   * Obtiene los jugadores de un equipo
   */
  getTeamPlayers(teamId) {
    return this.playersData?.players[teamId] || [];
  }

  /**
   * Calcula la media del equipo (overall promedio)
   */
  calculateTeamAverage(teamId) {
    const players = this.getTeamPlayers(teamId);
    if (players.length === 0) return 0;
    
    const sum = players.reduce((acc, player) => acc + (player.overall || 70), 0);
    return Math.round(sum / players.length);
  }

  /**
   * Habilita/deshabilita una liga
   */
  toggleLeague(leagueId, enabled) {
    const league = this.getLeagueById(leagueId);
    if (league) {
      league.enabled = enabled;
      return true;
    }
    return false;
  }

  /**
   * Obtiene las competencias
   */
  getCompetitions() {
    return this.leaguesData?.competitions || [];
  }

  /**
   * Obtiene las competencias habilitadas
   */
  getEnabledCompetitions() {
    return this.getCompetitions().filter(comp => comp.enabled !== false);
  }

  /**
   * Busca un equipo por nombre
   */
  searchTeam(query) {
    const allTeams = this.getAllTeams();
    const normalized = query.toLowerCase().trim();
    return allTeams.filter(team => 
      team.name.toLowerCase().includes(normalized)
    );
  }

  /**
   * Obtiene los errores de validación
   */
  getValidationErrors() {
    return this.validationErrors;
  }

  /**
   * Limpia los errores de validación
   */
  clearValidationErrors() {
    this.validationErrors = [];
  }

  /**
   * Obtiene estadísticas de los datos cargados
   */
  getDataStats() {
    return {
      totalLeagues: this.getLeagues().length,
      totalTeams: this.getAllTeams().length,
      totalPlayers: Object.keys(this.playersData?.players || {}).length,
      enabledLeagues: this.getEnabledLeagues().length,
      dataSource: this.leaguesData?.meta?.source || 'unknown',
      lastUpdate: this.leaguesData?.meta?.lastUpdate || 'unknown'
    };
  }
}

// Hacerlo disponible globalmente
window.DataManager = DataManager;
