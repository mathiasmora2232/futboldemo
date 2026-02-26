# 🗂️ ESTRUCTURA DE DATOS Y CARPETAS

## 📁 Jerarquía completa del proyecto futboldemo/

```
futboldemo/
│
├── 📚 DOCUMENTACIÓN (docs/)
│   ├── 📖 guides/
│   │   ├── Guías de uso paso a paso
│   │   └── Tutoriales de implementación
│   │
│   ├── 🏗️  architecture/
│   │   ├── Diagramas técnicos
│   │   ├── Flujos de datos
│   │   └── Arquitectura del sistema
│   │
│   ├── 📊 data-sources/
│   │   ├── Lista completa de fuentes
│   │   ├─ Mapeo de campos
│   │   └─ Diccionario de datos
│   │
│   └── 🔗 api/
│       ├─ Documentación de endpoints
│       ├─ Ejemplos de llamadas
│       └─ Respuestas esperadas
│
├── 📊 DATOS CSV ORGANIZADOS (csv-data-organized/)
│   ├─ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 europe/
│   │   ├─ england/ (Premier League, Championship, etc.)
│   │   ├─ espana/ (La Liga, Segunda, etc.)
│   │   ├─ deutschland/ (Bundesliga, 2.Liga, etc.)
│   │   ├─ france/ (Ligue 1, Ligue 2, etc.)
│   │   ├─ italy/ (Serie A, Serie B, etc.)
│   │   ├─ netherlands/ (Eredivisie, etc.)
│   │   ├─ portugal/ (Primeira Liga, etc.)
│   │   ├─ turkey/ (Süper Lig, etc.)
│   │   ├─ switzerland/ (Super League, etc.)
│   │   ├─ poland/ (Ekstraklasa, etc.)
│   │   └─ scotland/ (Scottish Premier, etc.)
│   │
│   ├─ 🌎 americas/
│   │   ├─ mexico/ (Liga MX, etc.)
│   │   ├─ brasil/ (Série A, etc.)
│   │   └─ otros/ (Argentina, Chile, etc.)
│   │
│   ├─ 🌏 asia-oceania/
│   │   ├─ china/ (Chinese Super League, etc.)
│   │   └─ otros/ (según descubramos)
│   │
│   └─ 📋 detailed-players-matches/
│       ├─ games-detailed.csv (31 MB - con alineaciones, jugadores)
│       ├─ football_matches.csv (504 KB - estadísticas)
│       ├─ final_matches.csv (698 KB - resultados)
│       └─ football_matches_2024_2025.csv (316 KB - 2024-25)
│
├── 💾 DATOS BRUTOS (sin modificar)
│   ├─ archive/ → football_matches.csv
│   ├─ archive (1)/ → final_matches.csv
│   ├─ archive (2)/ → football_matches_2024_2025.csv
│   ├─ archive (3)/ → games.csv (31 MB)
│   ├─ cache.footballdata-master/ → 29 CSVs 2023-24
│   ├─ major-league-soccer-master/ → 20 años MLS
│   ├─ world-master/ → Datos de mundiales/internacionales
│   ├─ england-master/ → Histórico 30+ años
│   ├─ deutschland-master/ → Histórico 30+ años
│   ├─ espana-master/ → Histórico 30+ años
│   └─ [+ caches internacionales]
│
├── 🎮 CÓDIGO Y DATOS PROCESADOS
│   ├─ src/
│   │   ├─ modules/ → 5 módulos JS
│   │   └─ data/ → JSONs procesados
│   ├─ index.html
│   ├─ assets/styles/main.css
│   └─ data-converter-v2.py
│
┖── 📖 DOCUMENTACIÓN GLOBAL
    ├─ README.md (principal del proyecto)
    ├─ QUICK_START.md
    ├─ PROJECT_INDEX.md
    ├─ RESUMEN_EJECUTIVO.md
    └─ [+ 8 MDs más]
```

---

## 📊 Archivos CSV Principales Disponibles

### 🔷 ARCHIVE FILES (Datos comprensivos)

#### `/archive/football_matches.csv` (504 KB)
```
Contenido:
├─ Season, Date, Home Team, Away Team
├─ Posesión del balón (%)
├─ Tiros, Tiros a portería
├─ Tackles, Faltas, Corners
├─ Tarjetas amarillas/rojas
├─ Goles (FT final time)
│
Uso: Análisis de estadísticas de partidos
Registros: ~600+ partidos
Temporal: 2010-2015
```

#### `/archive (1)/final_matches.csv` (698 KB)
```
Contenido:
├─ Fecha, Hora
├─ Liga, Ronda, Día de la semana
├─ Equipo local vs visitante
├─ Resultado (W/L/D)
├─ Goles a favor/en contra
├─ Estadio, Asistencia
├─ Capitán del equipo
├─ Formación (3-4-3, 4-2-3-1, etc.)
├─ Árbitro
│
Uso: Datos detallados por equipo
Nota: Enfocado en Premier League 2021
Registros: ~600+ partidos
```

#### `/archive (2)/football_matches_2024_2025.csv` (316 KB)
```
Contenido:
├─ Competición (PL, La Liga, etc.)
├─ Temporada: 2024/2025
├─ Match ID, Jornada
├─ Equipo Local vs Visitante  
├─ Resultado (FT)
├─ Árbitro ID y nombre
├─ Puntos asignados
│
Uso: Datos actuales 2024-2025
Registros: ~300+ partidos
Temporal: Agosto 2024 - Now
```

#### `/archive (3)/games.csv` (31 MB) ⭐ MÁS VALIOSO
```
Contenido (POR JUGADOR):
├─ ID, Competition, Country, Season
├─ Round, Matchday, Date, Time
├─ Equipo Local vs Visitante
├─ Resultado (Goals)
├─ Estadio, Ciudad, Árbitro
│
├─ PARA CADA JUGADOR (Home & Away):
│  ├─ Nombre del jugador (11 titulares + banquillo)
│  ├─ Edad del jugador
│  ├─ Posición (GK, DF, MF, FW)
│  ├─ Minutos jugados
│  ├─ Goles anotados
│  ├─ Técnico del equipo
│  ├─ Capitán del equipo
│  └─ Formación utilizada
│
├─ ESTADÍSTICAS DEL PARTIDO:
│  ├─ Posesión (%), Tiros, Tiros a portería
│  ├─ Tarjetas (amarilla, roja)
│  ├─ Faltas, Offside
│  └─ Edad promedio del equipo
│
Uso: Integrar datos REALES de jugadores
Nota: SUPER COMPLETO - Incluye nombres alineaciones
Registros: ~50,000+ partidos
Temporal: 2014+ (desde Bundesliga GER 2015)
```

### 🔷 CACHE FOOTBALLDATA (Ya procesados)

```
Ubicación: /cache.footballdata-master/2023-24/
├─ 29 archivos CSV
├─ 8,123 partidos
├─ Temporada: 2023-24
└─ Status: ✅ Procesados → leagues_real.json
```

### 🔷 MAJOR LEAGUE SOCCER MASTER

```
Ubicación: /major-league-soccer-master/major-league-soccer-master/
├─ 1996-2016 (Carpetas por año)
├─ CLUBS.md (Lista de clubes)
├─ CLUBS_GEO.md (Ubicaciones geográficas)
├─ Status: Por explorar y procesar
└─ Potencial: 20 años de MLS data
```

### 🔷 WORLD MASTER

```
Ubicación: /world-master/world-master/
├─ 2010s/ (datos 2010s)
├─ 2020s/ (datos 2020s)
│   ├─ 1-mls.csv
│   ├─ 2018-19, 2019, 2019-20, 2020, 2020-21 (carpetas)
└─ Status: Parcialmente explorado
```

---

## 🗺️ Cobertura Geográfica Disponible

```
EUROPA (Completamente cubierta) ✅
├─ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra: Premier League + Championship + más (30+ años)
├─ 🇪🇸 España: La Liga + Segunda (30+ años)
├─ 🇩🇪 Alemania: Bundesliga + 2ª (30+ años) + games.csv
├─ 🇮🇹 Italia: Serie A + Serie B (en cache)
├─ 🇫🇷 Francia: Ligue 1 + Ligue 2 (en cache)
├─ 🇳🇱 Holanda: Eredivisie (en cache)
├─ 🇵🇹 Portugal: Primeira Liga (en cache)
├─ 🇹🇷 Turquía: Süper Lig (en cache)
├─ 🇨🇭 Suiza: Super League (en cache)
├─ 🇵🇱 Polonia: Ekstraklasa (en cache)
└─ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia: Scottish Premier (en cache)

AMÉRICA (Parcialmente cubierta) 🟡
├─ 🇲🇽 México: Liga MX (en cache)
├─ 🇧🇷 Brasil: br.1.csv (1 archivo)
├─ 🇺🇸 USA: MLS 1996-2016 (20 años) + datos 2020s
└─ Otros: Argentina, Chile, etc. (por explorar)

ASIA-OCEANÍA (Bajo cubierta) 🔴
├─ 🇨🇳 China: cn.1.csv (1 archivo)
└─ Otros: Por descubrir

INTERNACIONALES (Referencia)
└─ Selecciones nacionales (en cache.internationals-master)
```

---

## 📌 Recomendación de Integración

### 🎯 Prioridad 1: Games.csv (31 MB) ⭐ MÁXIMO VALOR
```
Por qué:
- Incluye NOMBRES DE JUGADORES
- Incluye EDADES y POSICIONES
- Incluye ALINEACIONES
- Incluye ESTADÍSTICAS por jugador
- Cubre 2014+ con +50,000 partidos
- Datos de todos los países

Acción:
1. Procesar games.csv
2. Extraer jugadores únicos
3. Crear "players_real.json" con nombres/edades/posiciones
4. Actualizar UI para mostrar alineaciones
```

### 🎯 Prioridad 2: Archive Files (Datos Adicionales)
```
Por qué:
- Complementan datos existentes
- Incluyen 2024-2025 (temporada actual)
- Tienen estadísticas detalladas

Acción:
1. Procesar football_matches_2024_2025.csv
2. Actualizar leagues_real.json para 2024-25
3. Procesar final_matches.csv para estadísticas avanzadas
```

### 🎯 Prioridad 3: Historical Data
```
Por qué:
- Permite ver tendencias 30+ años
- Completa análisis histórico

Acción:
1. Procesar england-master, deutschland-master, etc.
2. Crear timeline histórico
3. Permitir seleccionar año en UI
```

---

## 🚀 Plan de Acción

```
FASE 1 (Esta semana):
├─ Documentar estructura (✅ En progreso)
├─ Organizar CSVs por región en carpetas
├─ Crear diccionarios de campos
└─ Preparar scripts de procesamiento

FASE 2 (Próxima semana):
├─ Procesar games.csv (extrae jugadores)
├─ Crear players_real.json
├─ Integrar en UI (mostrar alineaciones)
└─ Agregar datos 2024-2025

FASE 3 (Próximas 2 semanas):
├─ Procesar datos históricos
├─ Selector de temporada en UI
├─ Estadísticas por año
└─ Análisis comparativo

FASE 4 (Después):
├─ MLS data completa
├─ Datos de selecciones
└─ Integración con BD real
```

---

## 📋 Checklist de Archivos por Procesar

```
[ ] games.csv (31 MB) - PRIORIDAD MÁXIMA
    └─ Objetivo: Extraer 50,000+ jugadores

[ ] football_matches_2024_2025.csv (316 KB) - PRIORIDAD ALTA
    └─ Objetivo: Actualizar a temporada 2024-2025

[ ] final_matches.csv (698 KB) - PRIORIDAD MEDIA
    └─ Objetivo: Statsavanzadas por equipo

[ ] football_matches.csv (504 KB) - PRIORIDAD MEDIA
    └─ Objetivo: Estadísticas históricas

[ ] major-league-soccer (1996-2016) - PRIORIDAD BAJA
    └─ Objetivo: Opcional - MLS histórico

[ ] england-master (30+ años) - PRIORIDAD BAJA
    └─ Objetivo: Opcional - Histórico inglés
```

---

**Próximo Paso:** Procesar games.csv para extraer jugadores reales ⚽
