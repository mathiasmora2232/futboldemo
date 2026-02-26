/**
 * LogoManager.js - Gestor de Logos de Equipos
 * SVG URLs de equipos reales principales
 */

class LogoManager {
  constructor() {
    this.logos = this.getTeamLogos();
    this.useLogos = localStorage.getItem('displayLogos') !== 'false';
  }

  /**
   * Obtiene el logo de un equipo por nombre
   */
  getTeamLogo(teamName) {
    if (!this.useLogos) return null;
    
    const normalized = this.normalizeTeamName(teamName);
    return this.logos[normalized] || null;
  }

  /**
   * Normaliza nombre de equipo para búsqueda
   */
  normalizeTeamName(name) {
    return name.toLowerCase().trim();
  }

  /**
   * Genera SVG logo como fallback
   */
  getDefaultLogo(teamName, color = '#e94560') {
    const initials = teamName
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 3);

    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-${teamName}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#grad-${teamName})" />
        <text x="50" y="60" font-size="35" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">
          ${initials}
        </text>
      </svg>
    `;
  }

  /**
   * Base de datos de logos (SVG URLs públicos)
   */
  getTeamLogos() {
    return {
      // ESPAÑA - La Liga
      'real madrid': 'https://www.svgrepo.com/show/349512/real-madrid.svg',
      'barcelona': 'https://www.svgrepo.com/show/349489/barcelona.svg',
      'atlético madrid': 'https://www.svgrepo.com/show/349487/atletico-madrid.svg',
      'real betis': 'https://www.svgrepo.com/show/349543/real-betis.svg',
      'sevilla': 'https://www.svgrepo.com/show/349547/sevilla.svg',
      'valencia': 'https://www.svgrepo.com/show/349555/valencia.svg',
      'real sociedad': 'https://www.svgrepo.com/show/349541/real-sociedad.svg',
      'villarreal': 'https://www.svgrepo.com/show/349560/villarreal.svg',

      // ESPAÑA - Segunda División
      'athletic bilbao': 'https://www.svgrepo.com/show/349488/athletic-bilbao.svg',
      'real zaragoza': 'https://www.svgrepo.com/show/349542/real-zaragoza.svg',
      'deportivo': 'https://www.svgrepo.com/show/349502/deportivo-la-coruña.svg',

      // INGLATERRA - Premier League
      'manchester united': 'https://www.svgrepo.com/show/349530/manchester-united.svg',
      'manchester city': 'https://www.svgrepo.com/show/349529/manchester-city.svg',
      'liverpool': 'https://www.svgrepo.com/show/349526/liverpool.svg',
      'arsenal': 'https://www.svgrepo.com/show/349490/arsenal.svg',
      'chelsea': 'https://www.svgrepo.com/show/349494/chelsea.svg',
      'tottenham': 'https://www.svgrepo.com/show/349552/tottenham.svg',
      'everton': 'https://www.svgrepo.com/show/349504/everton.svg',
      'leicester city': 'https://www.svgrepo.com/show/349525/leicester-city.svg',
      'new castle': 'https://www.svgrepo.com/show/349534/newcastle-united.svg',
      'brighton': 'https://www.svgrepo.com/show/349492/brighton-and-hove-albion.svg',

      // ALEMANIA - Bundesliga
      'bayern munich': 'https://www.svgrepo.com/show/349491/fc-bayern-munchen.svg',
      'borussia mönchengladbach': 'https://www.svgrepo.com/show/349495/borussia-mönchengladbach.svg',
      'borussia dortmund': 'https://www.svgrepo.com/show/349496/borussia-dortmund.svg',
      'bayer leverkusen': 'https://www.svgrepo.com/show/349540/bayer-04-leverkusen.svg',
      'rb leipzig': 'https://www.svgrepo.com/show/349539/rb-leipzig.svg',
      'fc schalke 04': 'https://www.svgrepo.com/show/349506/fc-schalke-04.svg',

      // ITALIA - Serie A
      'juventus': 'https://www.svgrepo.com/show/349522/juventus.svg',
      'inter': 'https://www.svgrepo.com/show/349519/internazionale.svg',
      'ac milan': 'https://www.svgrepo.com/show/349485/ac-milan.svg',
      'roma': 'https://www.svgrepo.com/show/349546/as-roma.svg',
      'napoli': 'https://www.svgrepo.com/show/349533/calcio-napoli.svg',
      'lazio': 'https://www.svgrepo.com/show/349524/la-s-s-lazio.svg',

      // FRANCIA - Ligue 1
      'paris saint-germain': 'https://www.svgrepo.com/show/349535/psg.svg',
      'psg': 'https://www.svgrepo.com/show/349535/psg.svg',
      'marseille': 'https://www.svgrepo.com/show/349528/marseille.svg',
      'lyon': 'https://www.svgrepo.com/show/349527/olympique-lyonnais.svg',
      'monaco': 'https://www.svgrepo.com/show/349531/as-monaco.svg',

      // MÉXICO - Liga MX
      'américa': 'https://www.svgrepo.com/show/349486/club-américa.svg',
      'guadalajara': 'https://www.svgrepo.com/show/349508/guadalajara.svg',
      'fc juárez': 'https://www.svgrepo.com/show/349505/juárez.svg',
      'tiger': 'https://www.svgrepo.com/show/349553/tigres.svg',
      'pumas': 'https://www.svgrepo.com/show/349538/unam-pumas.svg',
      'monterrey': 'https://www.svgrepo.com/show/349532/monterrey.svg',
      'santos': 'https://www.svgrepo.com/show/349545/santos-laguna.svg',
      'cruz azul': 'https://www.svgrepo.com/show/349500/cruz-azul.svg',

      // BRASIL
      'flamengo': 'https://www.svgrepo.com/show/349507/flamengo.svg',
      'corinthians': 'https://www.svgrepo.com/show/349499/corinthians.svg',
      'são paulo': 'https://www.svgrepo.com/show/349548/são-paulo.svg',
      'palmeiras': 'https://www.svgrepo.com/show/349536/palmeiras.svg',
      'santos fc': 'https://www.svgrepo.com/show/349544/santos-fc.svg',

      // ARGENTINA
      'boca': 'https://www.svgrepo.com/show/349493/boca-juniors.svg',
      'river plate': 'https://www.svgrepo.com/show/349537/river-plate.svg',

      // PORTUGAL
      'benfica': 'https://www.svgrepo.com/show/349514/benfica.svg',
      'porto': 'https://www.svgrepo.com/show/349509/fc-porto.svg',

      // HOLANDA
      'ajax': 'https://www.svgrepo.com/show/349484/ajax.svg',
      'psv': 'https://www.svgrepo.com/show/349549/psv-eindhoven.svg',
      'feyenoord': 'https://www.svgrepo.com/show/349503/feyenoord-rotterdam.svg',

      // USA - MLS
      'los angeles fc': 'https://www.svgrepo.com/show/349503/lafc.svg',
      'los angeles galaxy': 'https://www.svgrepo.com/show/349527/la-galaxy.svg',
    };
  }

  /**
   * Activa/desactiva logos
   */
  toggleLogos(enabled) {
    this.useLogos = enabled;
    localStorage.setItem('displayLogos', enabled);
  }

  /**
   * Crea un elemento HTML con el logo
   */
  createLogoElement(teamName, size = '40px') {
    const img = document.createElement('img');
    const logo = this.getTeamLogo(teamName);
    
    if (logo) {
      img.src = logo;
      img.alt = teamName;
      img.title = teamName;
      img.style.cssText = `
        width: ${size};
        height: ${size};
        object-fit: contain;
        border-radius: 4px;
      `;
      img.onerror = () => {
        img.outerHTML = this.getDefaultLogo(teamName);
      };
    } else {
      img.outerHTML = this.getDefaultLogo(teamName);
    }
    
    return img;
  }
}

// Hacerlo disponible globalmente
window.LogoManager = LogoManager;
