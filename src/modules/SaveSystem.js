/**
 * SaveSystem.js
 * Gestiona el sistema de guardado y carga de partidas usando LocalStorage
 */

class SaveSystem {
  constructor() {
    this.SAVE_SLOTS = 3;
    this.STORAGE_KEY = 'gfm_save_';
    this.METADATA_KEY = 'gfm_metadata_';
  }

  /**
   * Crea una metainformación de partida
   */
  createSaveMetadata(managerName, selectedTeamId, enabledLeagues) {
    return {
      managerName,
      selectedTeamId,
      enabledLeagues,
      season: 2025,
      createdDate: new Date().toISOString(),
      lastPlayedDate: new Date().toISOString(),
      gameweek: 1
    };
  }

  /**
   * Guarda una partida en un slot específico
   */
  saveGame(slotNumber, gameState) {
    if (slotNumber < 1 || slotNumber > this.SAVE_SLOTS) {
      console.error(`Slot de guardado inválido: ${slotNumber}`);
      return false;
    }

    try {
      const key = this.STORAGE_KEY + slotNumber;
      const metadataKey = this.METADATA_KEY + slotNumber;
      
      localStorage.setItem(key, JSON.stringify(gameState));
      localStorage.setItem(metadataKey, JSON.stringify(gameState.metadata));
      
      console.log(`Partida guardada en slot ${slotNumber}`);
      return true;
    } catch (error) {
      console.error('Error al guardar partida:', error);
      return false;
    }
  }

  /**
   * Carga una partida desde un slot específico
   */
  loadGame(slotNumber) {
    if (slotNumber < 1 || slotNumber > this.SAVE_SLOTS) {
      console.error(`Slot de guardado inválido: ${slotNumber}`);
      return null;
    }

    try {
      const key = this.STORAGE_KEY + slotNumber;
      const gameStateJson = localStorage.getItem(key);
      
      if (!gameStateJson) {
        return null;
      }

      return JSON.parse(gameStateJson);
    } catch (error) {
      console.error('Error al cargar partida:', error);
      return null;
    }
  }

  /**
   * Obtiene metadatos de todos los slots
   */
  getAllSaveMetadata() {
    const metadata = [];

    for (let i = 1; i <= this.SAVE_SLOTS; i++) {
      const metadataKey = this.METADATA_KEY + i;
      const metadataJson = localStorage.getItem(metadataKey);
      
      if (metadataJson) {
        metadata.push({
          slotNumber: i,
          ...JSON.parse(metadataJson)
        });
      } else {
        metadata.push({
          slotNumber: i,
          isEmpty: true
        });
      }
    }

    return metadata;
  }

  /**
   * Elimina una partida guardada
   */
  deleteSave(slotNumber) {
    if (slotNumber < 1 || slotNumber > this.SAVE_SLOTS) {
      return false;
    }

    try {
      const key = this.STORAGE_KEY + slotNumber;
      const metadataKey = this.METADATA_KEY + slotNumber;
      
      localStorage.removeItem(key);
      localStorage.removeItem(metadataKey);
      
      return true;
    } catch (error) {
      console.error('Error al eliminar partida:', error);
      return false;
    }
  }

  /**
   * Verifica si un slot tiene guardado
   */
  hasSave(slotNumber) {
    const key = this.STORAGE_KEY + slotNumber;
    return localStorage.getItem(key) !== null;
  }

  /**
   * Limpia todos los guardados (para debugging)
   */
  clearAllSaves() {
    for (let i = 1; i <= this.SAVE_SLOTS; i++) {
      this.deleteSave(i);
    }
    console.log('Todos los guardados fueron eliminados');
  }
}

// Exportar para uso global
window.SaveSystem = SaveSystem;
