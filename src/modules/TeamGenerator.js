/**
 * TeamGenerator.js - Generador de datos realistas de equipos y jugadores
 * Crea squads completos con overalls realistas basados en la liga
 */

class TeamGenerator {
  /**
   * Genera un squad completo para un equipo
   */
  static generateTeamSquad(teamId, teamName, league, tier = 'medium') {
    const positions = ['GK', 'CB', 'CB', 'RB', 'LB', 'CM', 'CM', 'CM', 'RW', 'LW', 'ST'];
    const squad = [];
    
    // Definir overall mínimo y máximo según liga
    const leagueStats = this.getLeagueStats(league);
    const avgOverall = leagueStats.avgOverall;
    const variance = leagueStats.variance;

    let playerId = this.generatePlayerId(teamId);

    positions.forEach((position, index) => {
      const isStarPlayer = Math.random() < 0.3; // 30% chance de jugador estrella
      const overall = isStarPlayer 
        ? avgOverall + 8 + Math.random() * 8
        : avgOverall - 5 + Math.random() * 10;

      squad.push({
        id: playerId++,
        name: this.generatePlayerName(position),
        position: position,
        age: Math.floor(20 + Math.random() * 18),
        overall: Math.min(99, Math.max(60, Math.round(overall))),
        potential: Math.min(99, Math.round(overall + 5 + Math.random() * 10))
      });
    });

    return squad;
  }

  /**
   * Obtiene estadísticas por liga
   */
  static getLeagueStats(league) {
    const stats = {
      'PL': { avgOverall: 80, variance: 5 },      // Premier League
      'LL': { avgOverall: 79, variance: 5 },      // La Liga
      'SA': { avgOverall: 78, variance: 5 },      // Serie A
      'L1': { avgOverall: 77, variance: 5 },      // Ligue 1
      'DE': { avgOverall: 77, variance: 5 },      // Bundesliga
      'LMX': { avgOverall: 74, variance: 6 },     // Liga MX
      'LP': { avgOverall: 72, variance: 6 },      // LigaPro Ecuador
      'SB': { avgOverall: 70, variance: 7 },      // Serie B Ecuador
      'CH': { avgOverall: 76, variance: 5 },      // Championship
      'default': { avgOverall: 75, variance: 5 }
    };
    return stats[league] || stats['default'];
  }

  /**
   * Genera un ID único para jugador
   */
  static generatePlayerId(teamId) {
    const hash = teamId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return Math.floor(Math.random() * 9000 + 1000 + hash);
  }

  /**
   * Genera nombres de jugadores realistas (simplificado)
   */
  static generatePlayerName(position) {
    const firstNames = [
      'Carlos', 'Miguel', 'Antonio', 'Juan', 'David', 'Marco', 'Francisco',
      'Luis', 'Ramón', 'José', 'Pedro', 'Fernando', 'Gabriel', 'Roberto',
      'Diego', 'Andrés', 'Pablo', 'Joaquín', 'Laurent', 'Paul', 'Etienne',
      'Marcus', 'James', 'Oliver', 'Benjamin', 'Daniel', 'Lucas', 'Jackson'
    ];

    const lastNames = {
      'GK': ['Martínez', 'González', 'López', 'Rodríguez', 'Hernández', 'Díaz'],
      'CB': ['Silva', 'Santos', 'Perez', 'Ruiz', 'Molina', 'Vargas', 'Fuentes'],
      'RB': ['Navarro', 'Aguirre', 'Rios', 'Vega', 'Moreno', 'Torres'],
      'LB': ['Cruz', 'Medina', 'Gutierrez', 'Ramirez', 'Villanueva', 'Soto'],
      'CM': ['Jimenez', 'Castillo', 'Flores', 'Cortés', 'Mejía', 'Campos'],
      'RW': ['Ortega', 'Cabrera', 'Ramos', 'Valenzuela', 'Montoya', 'Espinoza'],
      'LW': ['Romero', 'Carmona', 'Benitez', 'Reyes', 'Miranda', 'Contreras'],
      'ST': ['Castro', 'Guerra', 'Mancera', 'Guzmán', 'Vera', 'Bravo']
    };

    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = (lastNames[position] || lastNames['CM'])[Math.floor(Math.random() * 6)];
    
    return `${first} ${last}`;
  }

  /**
   * Obtiene color del equipo por liga/nombre (para logos visuales)
   */
  static getTeamColor(teamName, league) {
    const colors = {
      // Españoles
      'Real Madrid': '#FFFFFF',
      'Barcelona': '#0066FF',
      'Atletico': '#FF0000',
      'Sevilla': '#FF0000',
      'Valencia': '#FFFFFF',
      'Athletic': '#FF0000',
      'Villarreal': '#FFEB00',
      'Real Sociedad': '#0066FF',
      
      // Ingleses
      'Manchester City': '#6BB6FF',
      'Liverpool': '#FF0000',
      'Chelsea': '#0066FF',
      'Arsenal': '#FF0000',
      'Tottenham': '#FFFFFF',
      'Manchester United': '#FF0000',
      'Newcastle': '#000000',
      'Brighton': '#0066FF',
      
      // Italianos
      'Inter': '#0066FF',
      'Milan': '#FF0000',
      'Juventus': '#111111',
      'Roma': '#FFB100',
      'Lazio': '#0066FF',
      'Fiorentina': '#9933FF',
      
      // Default
      'default': `hsl(${Math.random() * 360}, 70%, 50%)`
    };

    return colors[teamName] || colors['default'];
  }

  /**
   * Obtiene emoji por posición
   */
  static getPositionEmoji(position) {
    const emojis = {
      'GK': '🧤', 'CB': '🛡️', 'RB': '➡️', 'LB': '⬅️',
      'CM': '🎮', 'RW': '⚽', 'LW': '⚽', 'ST': '⭐'
    };
    return emojis[position] || '👤';
  }
}

// Hacer disponible globalmente
window.TeamGenerator = TeamGenerator;
