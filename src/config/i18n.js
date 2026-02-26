/**
 * i18n.js - Sistema de Traducciones Multiidioma
 * Soporta ES (Español) e EN (English)
 */

const i18n = {
  currentLanguage: localStorage.getItem('gameLanguage') || 'es',
  
  translations: {
    es: {
      // Main Menu
      'menu.newGame': 'Nueva Partida',
      'menu.loadGame': 'Cargar Partida',
      'menu.settings': 'Ajustes',
      'menu.exit': 'Salir',
      'menu.version': 'VERSIÓN DEMO',
      'menu.copyright': '© 2026 Global Football Manager',

      // League Selection
      'league.selectLeagues': 'Selecciona las Ligas',
      'league.chooseCompetencies': 'Elige qué competencias deseas jugar',
      'league.confirm': 'Confirmar Selección',
      'league.selectAtLeastOne': 'Debes seleccionar al menos una liga',
      'league.backToMenu': 'Volver al Menú',

      // Settings
      'settings.title': 'Ajustes del Juego',
      'settings.language': 'Idioma',
      'settings.difficulty': 'Dificultad',
      'settings.graphics': 'Gráficos',
      'settings.soundEffects': 'Efectos de Sonido',
      'settings.displayLogos': 'Mostrar Logos Reales',
      'settings.autoSave': 'Guardado Automático',
      'settings.resetGame': 'Reiniciar Juego',
      'settings.easy': 'Fácil',
      'settings.medium': 'Normal',
      'settings.hard': 'Difícil',
      'settings.low': 'Bajo',
      'settings.high': 'Alto',
      'settings.on': 'Activado',
      'settings.off': 'Desactivado',
      'settings.yes': 'Sí',
      'settings.no': 'No',
      'settings.confirmReset': '¿Estás seguro? Se eliminarán todos los datos guardados.',
      'settings.applySettings': 'Aplicar Cambios',

      // Main Game
      'game.standings': 'Clasificación',
      'game.myTeam': 'Mi Equipo',
      'game.simulateGameweek': 'Simular Jornada',
      'game.returnToMenu': 'Volver al Menú',
      'game.gameweek': 'Jornada',
      'game.points': 'Puntos',
      'game.matches': 'Partidos',
      'game.season': 'Temporada',

      // Team View
      'team.players': 'Jugadores',
      'team.formation': 'Formación',
      'team.tactics': 'Tácticas',
      'team.transfers': 'Traspasos',
      'team.rating': 'Puntuación',
      'team.position': 'Posición',
      'team.goals': 'Goles',
      'team.assists': 'Asistencias',

      // Standings
      'standings.position': 'Pos',
      'standings.team': 'Equipo',
      'standings.played': 'PJ',
      'standings.won': 'G',
      'standings.drawn': 'E',
      'standings.lost': 'P',
      'standings.goalsFor': 'GF',
      'standings.goalsAgainst': 'GC',
      'standings.goalDifference': 'DG',
      'standings.points': 'Pts',

      // Save/Load
      'save.slot': 'Slot',
      'save.empty': 'Vacío',
      'save.load': 'Cargar',
      'save.delete': 'Eliminar',
      'save.save': 'Guardar',
      'save.newSlot': 'Nueva Partida',

      // Errors
      'error.loadData': 'Error al cargar datos',
      'error.saveGame': 'Error al guardar la partida',
      'error.loadGame': 'Error al cargar la partida',

      // Common
      'common.back': 'Volver',
      'common.next': 'Siguiente',
      'common.confirm': 'Confirmar',
      'common.cancel': 'Cancelar',
      'common.close': 'Cerrar',
      'common.loading': 'Cargando...',
    },
    en: {
      // Main Menu
      'menu.newGame': 'New Game',
      'menu.loadGame': 'Load Game',
      'menu.settings': 'Settings',
      'menu.exit': 'Exit',
      'menu.version': 'DEMO VERSION',
      'menu.copyright': '© 2026 Global Football Manager',

      // League Selection
      'league.selectLeagues': 'Select Leagues',
      'league.chooseCompetencies': 'Choose which competitions you want to play',
      'league.confirm': 'Confirm Selection',
      'league.selectAtLeastOne': 'You must select at least one league',
      'league.backToMenu': 'Back to Menu',

      // Settings
      'settings.title': 'Game Settings',
      'settings.language': 'Language',
      'settings.difficulty': 'Difficulty',
      'settings.graphics': 'Graphics',
      'settings.soundEffects': 'Sound Effects',
      'settings.displayLogos': 'Show Real Logos',
      'settings.autoSave': 'Auto Save',
      'settings.resetGame': 'Reset Game',
      'settings.easy': 'Easy',
      'settings.medium': 'Normal',
      'settings.hard': 'Hard',
      'settings.low': 'Low',
      'settings.high': 'High',
      'settings.on': 'On',
      'settings.off': 'Off',
      'settings.yes': 'Yes',
      'settings.no': 'No',
      'settings.confirmReset': 'Are you sure? All saved data will be deleted.',
      'settings.applySettings': 'Apply Settings',

      // Main Game
      'game.standings': 'Standings',
      'game.myTeam': 'My Team',
      'game.simulateGameweek': 'Simulate Gameweek',
      'game.returnToMenu': 'Return to Menu',
      'game.gameweek': 'Gameweek',
      'game.points': 'Points',
      'game.matches': 'Matches',
      'game.season': 'Season',

      // Team View
      'team.players': 'Players',
      'team.formation': 'Formation',
      'team.tactics': 'Tactics',
      'team.transfers': 'Transfers',
      'team.rating': 'Rating',
      'team.position': 'Position',
      'team.goals': 'Goals',
      'team.assists': 'Assists',

      // Standings
      'standings.position': 'Pos',
      'standings.team': 'Team',
      'standings.played': 'MP',
      'standings.won': 'W',
      'standings.drawn': 'D',
      'standings.lost': 'L',
      'standings.goalsFor': 'GF',
      'standings.goalsAgainst': 'GA',
      'standings.goalDifference': 'GD',
      'standings.points': 'Pts',

      // Save/Load
      'save.slot': 'Slot',
      'save.empty': 'Empty',
      'save.load': 'Load',
      'save.delete': 'Delete',
      'save.save': 'Save',
      'save.newSlot': 'New Game',

      // Errors
      'error.loadData': 'Error loading data',
      'error.saveGame': 'Error saving game',
      'error.loadGame': 'Error loading game',

      // Common
      'common.back': 'Back',
      'common.next': 'Next',
      'common.confirm': 'Confirm',
      'common.cancel': 'Cancel',
      'common.close': 'Close',
      'common.loading': 'Loading...',
    }
  },

  /**
   * Obtiene una traducción por clave
   */
  t(key) {
    const lang = this.currentLanguage;
    const keys = key.split('.');
    let value = this.translations[lang];
    
    for (let k of keys) {
      value = value?.[k];
    }
    
    return value || `[${key}]`;
  },

  /**
   * Cambia el idioma
   */
  setLanguage(lang) {
    if (['es', 'en'].includes(lang)) {
      this.currentLanguage = lang;
      localStorage.setItem('gameLanguage', lang);
      document.documentElement.lang = lang;
      return true;
    }
    return false;
  },

  /**
   * Obtiene el idioma actual
   */
  getLanguage() {
    return this.currentLanguage;
  }
};

// Hacerlo disponible globalmente
window.i18n = i18n;
