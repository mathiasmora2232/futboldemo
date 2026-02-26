/**
 * MatchEngine.js
 * Simula partidos basados en la calidad de los equipos y factor aleatorio
 */

class MatchEngine {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }

  /**
   * Simula un partido entre dos equipos
   */
  simulateMatch(homeTeamId, awayTeamId) {
    const homeTeam = this.dataManager.getTeamById(homeTeamId);
    const awayTeam = this.dataManager.getTeamById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      console.error('Equipos no encontrados');
      return null;
    }

    // Calcular calidad de los equipos
    const homeQuality = this.dataManager.calculateTeamAverage(homeTeamId);
    const awayQuality = this.dataManager.calculateTeamAverage(awayTeamId);

    // Factor local (ventaja de jugar en casa)
    const homeAdvantage = 1.1;

    // Generar goles basados en calidad
    const homeGoals = this.generateGoals(homeQuality * homeAdvantage);
    const awayGoals = this.generateGoals(awayQuality);

    return {
      homeTeam: homeTeam.name,
      homeTeamId: homeTeamId,
      awayTeam: awayTeam.name,
      awayTeamId: awayTeamId,
      homeGoals,
      awayGoals,
      date: new Date().toISOString(),
      result: this.determineResult(homeGoals, awayGoals),
      homeTeamAverage: homeQuality,
      awayTeamAverage: awayQuality
    };
  }

  /**
   * Genera el número de goles para un equipo
   */
  generateGoals(quality) {
    // Normalizar quality a escala 0-100
    const normalizedQuality = Math.min(Math.max(quality, 50), 90) / 100;
    
    // Base de goles según calidad
    const baseGoals = normalizedQuality * 3.5;
    
    // Factor aleatorio (±30%)
    const randomFactor = (Math.random() - 0.5) * 0.6;
    const goals = Math.max(0, baseGoals + randomFactor);

    // Retorna goles con distribución más realista
    return Math.round(goals * 10) / 10;
  }

  /**
   * Determina el resultado del partido
   */
  determineResult(homeGoals, awayGoals) {
    if (homeGoals > awayGoals) return 'HOME_WIN';
    if (awayGoals > homeGoals) return 'AWAY_WIN';
    return 'DRAW';
  }

  /**
   * Calcula puntos según resultado
   */
  getPoints(result) {
    switch (result) {
      case 'HOME_WIN':
        return { home: 3, away: 0 };
      case 'AWAY_WIN':
        return { home: 0, away: 3 };
      case 'DRAW':
        return { home: 1, away: 1 };
      default:
        return { home: 0, away: 0 };
    }
  }

  /**
   * Simula múltiples partidos (jornada)
   */
  simulateGameweek(matchups) {
    return matchups.map(matchup => 
      this.simulateMatch(matchup.homeTeamId, matchup.awayTeamId)
    );
  }
}

// Exportar para uso global
window.MatchEngine = MatchEngine;
