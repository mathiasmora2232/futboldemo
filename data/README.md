# 📊 DATA STRUCTURE - Football Manager v3.0

## Overview

Toda la data se organiza en esta carpeta centralizada siguiendo un patrón de fuentes claras y estruturadas.

```
data/
├── csv/                    ← Datos en formato CSV
│   ├── americas/          ← Ligas Américas
│   ├── asia/              ← Ligas Asia
│   ├── asia-oceania/      ← Ligas Asia-Oceanía
│   ├── europe/            ← Ligas Europa
│   └── detailed-matches/  ← Datos de partidos detallados
├── json/                  ← Datos procesados en JSON
│   ├── teams.json         ← Catálogo de equipos
│   ├── leagues.json       ← Catálogo de ligas
│   └── cache/             ← Cache de datos
├── sources/               ← Metadatos de fuentes
│   ├── README.md          ← Documentación de fuentes
│   └── attribution.md     ← Créditos y referencias
└── README.md              ← Este archivo
```

---

## 📁 CSV DATA

### **americas/** (Ligas de América)
```
📂 americas/
├── mlsusa-standings.csv       - MLS USA standings
├── mlsusa-teams.csv           - Equipo MLS
├── bbr-standings.csv          - Brasileirão standings
├── bbr-teams.csv              - Equipos Brasil
└── ...
```

**Uso:** Competiciones de CONMEBOL, MLS, Liga MX

### **europe/** (Ligas de Europa)
```
📂 europe/
├── la-liga-standings.csv      - LaLiga España
├── la-liga-teams.csv          - Equipos LaLiga
├── serie-a-standings.csv      - Serie A Italia
├── bundesliga-standings.csv   - Bundesliga Alemania
├── premier-league-standings.csv - Premier League
└── ...
```

**Uso:** Principales ligas europeas

### **asia/** (Ligas de Asia)
```
📂 asia/
├── j-league-standings.csv     - J-League Japón
├── k-league-standings.csv     - K-League Corea
└── ...
```

**Uso:** Competiciones asiáticas principales

### **detailed-matches/** (Datos Particularizados)
```
📂 detailed-matches/
├── match-history.csv          - Historial de partidos
├── player-stats.csv           - Estadísticas de jugadores
├── team-performance.csv       - Rendimiento de equipos
└── season-summaries.csv       - Resúmenes de temporadas
```

**Uso:** Análisis detallado, estadísticas, historiales

---

## 📄 JSON DATA

Datos procesados y en cache desde CSV, optimizados para carga web.

```
📂 json/
├── teams.json         - Todos los equipos compilados
├── leagues.json       - Definición de ligas
└── cache/
    ├── standings.json - Posiciones en caché
    ├── matches.json   - Partidos en caché
    └── players.json   - Jugadores en caché
```

---

## 🔄 PIPELINE DE DATOS

```
CSV (raw data)
    ↓
Parser (data-converter.py)
    ↓
Validation (DataManager.js)
    ↓
JSON (processed)
    ↓
LocalStorage Cache
    ↓
UI Display
```

---

## 🔗 FUENTES DE DATOS

### Repositorios Externos
- `cache.footballdata-master/` - Football Data
- `cache.soccerdata-master/` - Soccer Data
- `cache.internationals-master/` - Datos Internacionales
- `cache.wfb-master/` - World Football Base
- `world-master/` - Mundo (todas las ligas)

### Procesadores
- `data-converter.py` - Convertidor principal
- `data-batch-converter.py` - Converter en batch
- `data-converter-v2.py` - Versión mejorada

---

## 📋 CSV STRUCTURE ESTÁNDAR

### Archivos de Standings
```
League,Position,Team,Played,Win,Draw,Loss,GF,GA,GD,Points
La Liga,1,Real Madrid,20,15,3,2,42,15,27,48
La Liga,2,Barcelona,20,14,2,4,40,18,22,44
...
```

### Archivos de Teams
```
League,TeamName,Stadium,City,Coach,Founded
La Liga,Real Madrid,Santiago Bernabéu,Madrid,Carlo Ancelotti,1902
La Liga,Barcelona,Camp Nou,Barcelona,Xavi Hernández,1899
...
```

### Archivos de Matches
```
Date,HomeTeam,AwayTeam,Score,League,Season
2025-02-01,Real Madrid,Barcelona,3-2,La Liga,2024-25
2025-02-02,Atlético,Valencia,1-0,La Liga,2024-25
...
```

---

## 🔧 CÓMO USAR

### Cargar datos desde CSV
```javascript
import DataManager from './src/modules/DataManager.js';

// DataManager automáticamente:
// 1. Busca en data/csv/
// 2. Valida estructura
// 3. Genera cache JSON
// 4. Guarda en LocalStorage
const data = await DataManager.loadFromCSV('europe/la-liga');
```

### Acceder datos desde JSON
```javascript
// Datos procesados
fetch('data/json/leagues.json')
  .then(r => r.json())
  .then(data => console.log(data));
```

### Actualizar datos
```bash
# 1. Poner nuevos CSV en data/csv/
# 2. Ejecutar converter
python data-converter.py

# 3. JSON se actualiza automáticamente
```

---

## 📊 ESTADÍSTICAS ACTUALES

| Categoría | Carpeta | Archivos | Registros |
|-----------|---------|----------|-----------|
| Europa | `europe/` | 12+ | 1000+ |
| Americas | `americas/` | 8+ | 500+ |
| Asia | `asia/` | 6+ | 300+ |
| Detalles | `detailed-matches/` | 4+ | 2000+ |
| **TOTAL** | **csv/** | **30+** | **3800+** |

---

## ✅ VERIFICACIÓN

```bash
# Verificar estructura
ls -R data/

# Contar archivos
find data/csv -name "*.csv" | wc -l

# Validar schemas
python data-converter.py --validate

# Ver tamaño total
du -sh data/
```

---

## 🚀 PRÓXIMOS PASOS

- [ ] Agregar datos de Africa (v0.35)
- [ ] Implementar API de datos (v0.40)
- [ ] Sincronización en tiempo real (v0.50)
- [ ] Base de datos relacional (v1.0)

---

**Última actualización:** 26 Feb 2026
**Versión:** 0.30+
**Mantenedor:** Football Manager Team
