/**
 * LeagueManager.js
 * Gestiona ligas, tablas de posiciones y calendarios
 */

class LeagueManager {
  constructor(dataManager, matchEngine) {
    this.dataManager = dataManager;
    this.matchEngine = matchEngine;
  }

  /**
   * Crea la tabla de posiciones para una liga
   */
  createLeagueTable(leagueId) {
    const league = this.dataManager.getLeagueById(leagueId);
    
    if (!league) {
      console.error(`Liga no encontrada: ${leagueId}`);
      return [];
    }

    // Crear entrada para cada equipo
    return league.teams.map(team => ({
      teamId: team.id,
      teamName: team.name,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    }));
  }

  /**
   * Actualiza la tabla con el resultado de un partido
   */
  updateTableWithMatch(table, match) {
    const homeTeam = table.find(t => t.teamId === match.homeTeamId);
    const awayTeam = table.find(t => t.teamId === match.awayTeamId);

    if (!homeTeam || !awayTeam) return;

    // Actualizar partidos jugados
    homeTeam.played++;
    awayTeam.played++;

    // Actualizar goles
    homeTeam.goalsFor += match.homeGoals;
    homeTeam.goalsAgainst += match.awayGoals;
    awayTeam.goalsFor += match.awayGoals;
    awayTeam.goalsAgainst += match.homeGoals;

    // Obtener puntos
    const points = this.matchEngine.getPoints(match.result);

    // Actualizar resultados
    if (match.result === 'HOME_WIN') {
      homeTeam.won++;
      awayTeam.lost++;
    } else if (match.result === 'AWAY_WIN') {
      homeTeam.lost++;
      awayTeam.won++;
    } else {
      homeTeam.drawn++;
      awayTeam.drawn++;
    }

    // Actualizar puntos
    homeTeam.points += points.home;
    awayTeam.points += points.away;

    // Calcular diferencia de goles
    homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
    awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;
  }

  /**
   * Ordena la tabla según criterios de liga
   */
  sortTable(table) {
    return [...table].sort((a, b) => {
      // Primero por puntos
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      // Luego por diferencia de goles
      if (b.goalDifference !== a.goalDifference) {
        return b.goalDifference - a.goalDifference;
      }
      // Finalmente por goles a favor
      return b.goalsFor - a.goalsFor;
    });
  }

  /**
   * Obtiene la tabla ordenada
   */
  getLeagueTable(leagueId, matches = []) {
    const table = this.createLeagueTable(leagueId);

    // Aplicar todos los partidos
    matches.forEach(match => {
      this.updateTableWithMatch(table, match);
    });

    return this.sortTable(table);
  }

  /**
   * Genera un calendario simple (todo vs todo una sola vez)
   */
  generateSimpleSchedule(leagueId) {
    const league = this.dataManager.getLeagueById(leagueId);
    if (!league) return [];

    const teams = league.teams;
    const schedule = [];

    // Todo vs todo (una sola vez)
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        // Partido ida
        schedule.push({
          homeTeamId: teams[i].id,
          awayTeamId: teams[j].id
        });
        // Partido vuelta
        schedule.push({
          homeTeamId: teams[j].id,
          awayTeamId: teams[i].id
        });
      }
    }

    return schedule;
  }

  /**
   * Simula una jornada de una liga específica
   */
  simulateLeagueGameweek(leagueId, currentGameweek) {
    const schedule = this.generateSimpleSchedule(leagueId);
    
    if (schedule.length === 0) return [];

    // Dividir en jornadas (aproximadamente)
    const teamCount = this.dataManager.getLeagueById(leagueId).teams.length;
    const matchesPerGameweek = Math.max(1, Math.floor(teamCount / 2));
    
    const startIdx = (currentGameweek - 1) * matchesPerGameweek;
    const endIdx = Math.min(startIdx + matchesPerGameweek, schedule.length);

    const gameweekMatches = schedule.slice(startIdx, endIdx);
    return this.matchEngine.simulateGameweek(gameweekMatches);
  }
}

// Exportar para uso global
window.LeagueManager = LeagueManager;
