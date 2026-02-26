/**
 * config-handlers.js - Manejadores de eventos para opciones de configuración
 * Se carga después de UIController
 */

document.addEventListener('DOMContentLoaded', () => {
  // Esperar a que UIController esté inicializado
  setTimeout(() => {
    if (typeof uiController === 'undefined') return;

    // ========================================
    // IDIOMA
    // ========================================
    const btnLangEs = document.getElementById('btn-lang-es');
    const btnLangEn = document.getElementById('btn-lang-en');

    if (btnLangEs) {
      btnLangEs.classList.add('active');
      btnLangEs.addEventListener('click', () => {
        i18n.setLanguage('es');
        updateLanguageButtons();
        updateAllUITexts();
        uiController.showNotification('✓ Idioma: Español', 2000);
      });
    }

    if (btnLangEn) {
      btnLangEn.addEventListener('click', () => {
        i18n.setLanguage('en');
        updateLanguageButtons();
        updateAllUITexts();
        uiController.showNotification('✓ Language: English', 2000);
      });
    }

    // ========================================
    // LOGOS
    // ========================================
    const toggleLogos = document.getElementById('toggle-logos');
    if (toggleLogos) {
      toggleLogos.addEventListener('change', (e) => {
        if (uiController.logoManager) {
          uiController.logoManager.toggleLogos(e.target.checked);
          uiController.showNotification(
            e.target.checked ? 'Logos: Activados ✓' : 'Logos: Desactivados ✗',
            2000
          );
        }
      });
    }

    // ========================================
    // DIFICULTAD
    // ========================================
    const difficultySelect = document.getElementById('difficulty-select');
    if (difficultySelect) {
      difficultySelect.addEventListener('change', (e) => {
        localStorage.setItem('gameDifficulty', e.target.value);
        uiController.showNotification(
          `Dificultad: ${e.target.options[e.target.selectedIndex].text}`,
          2000
        );
      });
    }

    // Restaurar dificultad guardada
    const savedDifficulty = localStorage.getItem('gameDifficulty');
    if (savedDifficulty && difficultySelect) {
      difficultySelect.value = savedDifficulty;
    }

  }, 500);
});

/**
 * Actualiza los botones de idioma
 */
function updateLanguageButtons() {
  const btnEs = document.getElementById('btn-lang-es');
  const btnEn = document.getElementById('btn-lang-en');
  const currentLang = i18n.getLanguage();

  if (btnEs) {
    btnEs.classList.toggle('active', currentLang === 'es');
  }
  if (btnEn) {
    btnEn.classList.toggle('active', currentLang === 'en');
  }
}

/**
 * Actualiza todos los textos de UI
 */
function updateAllUITexts() {
  // Botones del menú
  const btnNewGame = document.getElementById('btn-new-game');
  if (btnNewGame) btnNewGame.innerHTML = `<span>${i18n.t('menu.newGame')}</span>`;

  const btnLoadGame = document.getElementById('btn-load-game');
  if (btnLoadGame) btnLoadGame.innerHTML = `<span>${i18n.t('menu.loadGame')}</span>`;

  const btnSettings = document.getElementById('btn-settings');
  if (btnSettings) btnSettings.innerHTML = `<span>${i18n.t('menu.settings')}</span>`;

  const btnExit = document.getElementById('btn-exit');
  if (btnExit) btnExit.innerHTML = `<span>${i18n.t('menu.exit')}</span>`;

  // Selección de ligas
  const leagueTitle = document.getElementById('league-title');
  if (leagueTitle) leagueTitle.textContent = i18n.t('league.selectLeagues');

  const leagueSubtitle = document.getElementById('league-subtitle');
  if (leagueSubtitle) leagueSubtitle.textContent = i18n.t('league.chooseCompetencies');

  const btnConfirmLeagues = document.getElementById('btn-confirm-leagues');
  if (btnConfirmLeagues) btnConfirmLeagues.innerHTML = `<span>${i18n.t('league.confirm')}</span>`;

  // Tabla de posiciones (encabezados)
  updateTableHeaders();

  console.log(`✅ UI actualizado a ${i18n.getLanguage().toUpperCase()}`);
}

/**
 * Actualiza encabezados de tablas
 */
function updateTableHeaders() {
  const tables = document.querySelectorAll('.standings-table');
  tables.forEach(table => {
    const ths = table.querySelectorAll('thead th');
    if (ths.length >= 10) {
      ths[0].textContent = i18n.t('standings.position');
      ths[1].textContent = i18n.t('standings.team');
      ths[2].textContent = i18n.t('standings.played');
      ths[3].textContent = i18n.t('standings.won');
      ths[4].textContent = i18n.t('standings.drawn');
      ths[5].textContent = i18n.t('standings.lost');
      ths[6].textContent = i18n.t('standings.goalsFor');
      ths[7].textContent = i18n.t('standings.goalsAgainst');
      ths[8].textContent = i18n.t('standings.goalDifference');
      ths[9].textContent = i18n.t('standings.points');
    }
  });
}

// Inicializar con el idioma actual
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    updateLanguageButtons();
  }, 100);
});
