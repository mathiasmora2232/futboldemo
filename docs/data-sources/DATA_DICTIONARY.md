# 📋 DICCIONARIO DE DATOS - Por Cada Archivo CSV

## 📑 Índice de Campos por Archivo

### 1️⃣ **archive/football_matches.csv** (504 KB)
```
Propósito: Estadísticas detalladas de partidos
Temporal: 2010-2015 (aproximadamente)
Registros: ~600 partidos
Granularidad: Por partido

CAMPOS:
├─ X ................................. ID único del partido
├─ season ............................. Temporada (ej: "10/11")
├─ date .............................. Fecha del partido
├─ home_team ........................ Equipo local
├─ away_team ........................ Equipo visitante
│
├─ ESTADÍSTICAS EQUIPO LOCAL:
│  ├─ home_clearances .............. Despejes
│  ├─ home_corners ................. Corners
│  ├─ home_fouls_conceded .......... Faltas
│  ├─ home_offsides ............... Offside
│  ├─ home_passes ................. Pases completados
│  ├─ home_possession ............. Posesión (%)
│  ├─ home_red_cards .............. Tarjetas rojas
│  ├─ home_shots .................. Tiros
│  ├─ home_shots_on_target ........ Tiros a portería
│  ├─ home_tackles ................ Entradas
│  ├─ home_touches ................ Toques de balón
│  └─ home_yellow_cards ........... Tarjetas amarillas
│
├─ ESTADÍSTICAS EQUIPO VISITANTE: (same as home)
│
└─ RESULTADO:
   ├─ goal_home_ft ................ Goles equipo local
   ├─ goal_away_ft ................ Goles equipo visitante
   ├─ sg_match_ft ................. Score (ej: "2-1")
   └─ result ....................... Resultado (W/D/L)

USO RECOMENDADO:
├─ Análisis de estadísticas avanzadas
├─ Comparación entre equipos
├─ Tendencias históricas
└─ Validación de resultados
```

### 2️⃣ **archive (1)/final_matches.csv** (698 KB)
```
Propósito: Resultados con contexto detallado
Temporal: Principalmente 2021 (Premier League)
Registros: ~600 partidos
Granularidad: Por partido / Por equipo

CAMPOS:
├─ date ........................... Fecha (YYYY-MM-DD)
├─ time .......................... Hora del partido
├─ comp .......................... Competición (ej: "Premier League")
├─ round ......................... Ronda
├─ day ........................... Día semana (Sat, Sun, etc.)
├─ venue ......................... Ubicación (Home/Away)
├─ result ........................ Resultado (W/L/D)
├─ gf ............................. Goles a favor
├─ ga ............................. Goles en contra
├─ opponent ....................... Equipo oponente
│
├─ ESTADÍSTICAS DETALLADAS:
│  ├─ xg .......................... Expected Goals (goles esperados)
│  ├─ xga ......................... Expected Goals Against
│  ├─ poss ........................ Posesión (%)
│  ├─ attendance ................. Asistencia
│  ├─ sh .......................... Shots (tiros)
│  ├─ sot ......................... Shots on target (a portería)
│  └─ dist ........................ Distance (distancia promedio)
│
├─ LINEUPS:
│  ├─ captain ..................... Capitán
│  ├─ formation ................... Formación (ej: 3-4-3)
│  ├─ opp_formation ............... Formación rival
│
├─ ARBITRAJE:
│  ├─ referee ..................... Árbitro
│  ├─ fk .......................... Faltas
│  ├─ pk .......................... Penales
│  ├─ pkatt ....................... Penales atajados
│
├─ OTRO:
│  ├─ team ........................ Nombre del equipo
│  ├─ season ...................... Temporada
│  ├─ match report ................ Link a reporte
│  └─ notes ....................... Notas adicionales

USO RECOMENDADO:
├─ Análisis por equipo específico
├─ Estadísticas avanzadas (xG)
├─ Seguimiento de formaciones
└─ Datos de asistencia
```

### 3️⃣ **archive (2)/football_matches_2024_2025.csv** (316 KB)
```
Propósito: Resultados actuales 2024-2025
Temporal: Agosto 2024 - Presente
Registros: ~300 partidos
Granularidad: Por partido

CAMPOS:
├─ competition_code ............. Código liga (PL, LA, BL, etc.)
├─ competition_name ............. Nombre completo liga
├─ season ....................... Temporada (2024/2025)
├─ match_id ..................... ID único del partido
├─ matchday ..................... Número jornada
├─ stage ........................ Etapa (REGULAR_SEASON)
├─ status ....................... Estado (FINISHED)
├─ date_utc ..................... Fecha UTC (ISO 8601)
│
├─ EQUIPOS:
│  ├─ home_team_id .............. ID equipo local
│  ├─ home_team ................ Nombre equipo local
│  ├─ away_team_id .............. ID equipo visitante
│  └─ away_team ................ Nombre equipo visitante
│
├─ RESULTADO:
│  ├─ fulltime_home ............. Goles FT local
│  ├─ fulltime_away ............. Goles FT visitante
│  ├─ halftime_home ............. Goles HT local
│  ├─ halftime_away ............. Goles HT visitante
│  ├─ goal_difference ........... Diferencia
│  ├─ total_goals ............... Total goles
│  ├─ match_outcome ............. Resultado tipo (Home Win/Away Win/Draw)
│  ├─ home_points ............... Puntos local (3/1/0)
│  └─ away_points ............... Puntos visitante (3/1/0)
│
├─ ARBITRAJE:
│  ├─ referee ................... Nombre árbitro
│  └─ referee_id ................ ID del árbitro

USO RECOMENDADO:
├─ Actualizar tabla actual 2024-25
├─ Agregar nuevas jornadas
├─ Corregir resultados procesados anteriormente
└─ Proyecciones para resto de temporada
```

### 4️⃣ **archive (3)/games.csv** (31 MB) ⭐ MÁS COMPLETO
```
Propósito: Datos ultra-completos CON JUGADORES
Temporal: 2014+ (Bundesliga onwards)
Registros: 50,000+ partidos
Granularidad: Por partido / Por jugador

CAMPOS BÁSICOS DE PARTIDO:
├─ ID .......................... Secuencial
├─ Competition_Name ........... (ej: Fußball-Bundesliga)
├─ Country ..................... Código país (GER, ENG, etc.)
├─ Season_End_Year ............ Año termina (ej: 2015 = 2014-15)
├─ Round ....................... Ronda (Regular season, etc.)
├─ Wk .......................... Week (jornada)
├─ Day ......................... Day of week
├─ Date ........................ Fecha
├─ Time ........................ Hora
├─ Home ........................ Equipo local
├─ Away ........................ Equipo visitante
├─ HomeGoals ................... Goles local
├─ AwayGoals ................... Goles visitante
├─ Venue ....................... Estadio
├─ venue_city .................. Ciudad del estadio
├─ venue_is_neutral ........... Es neutral?
├─ Referee ..................... Árbitro
│
├─ STAFF INFORMATION:
│  ├─ manager_home ............. Técnico local
│  ├─ captain_home ............. Capitán local
│  ├─ manager_away ............. Técnico visitante
│  └─ captain_away ............. Capitán visitante
│
├─ FORMACIÓN:
│  ├─ formation_home ........... Formación local (3-4-3, 4-2-3-1, etc.)
│  ├─ formation_away ........... Formación visitante
│  ├─ possessiontime_home ...... Posesión local (decimal: 0.60 = 60%)
│  └─ possessiontime_away ...... Posesión visitante
│
├─ ESTADÍSTICAS GENERALES:
│  ├─ shots_total_home ......... Tiros totales local
│  ├─ shots_ongoal_home ........ Tiros a portería local
│  ├─ shots_offgoal_home ....... Tiros fuera local
│  ├─ shots_total_away ......... Tiros totales visitante
│  ├─ shots_ongoal_away ........ Tiros a portería visitante
│  ├─ shots_offgoal_away ....... Tiros fuera visitante
│  ├─ saves_home ............... Atajadas local
│  ├─ saves_away ............... Atajadas visitante
│  ├─ yellow_cards_home ........ Amarillas local
│  ├─ red_cards_home ........... Rojas local
│  ├─ yellowred_cards_home .... Roja por segunda local
│  ├─ [same for away team]
│  ├─ fouls_home ............... Faltas local
│  ├─ fouls_away ............... Faltas visitante
│  ├─ offsides_home ............ Offside local
│  └─ offsides_away ............ Offside visitante
│
├─ PROMEDIO DE EDAD:
│  ├─ starting_age_avg_home .... Edad promedio titulares local
│  └─ start_age_avg_away ...... Edad promedio titulares visitante
│
├─ JUGADORES (HASTA 11 TITULARES + SUPLENTES)
│  Para cada jugador:
│  ├─ starting_name_home1 ...... Nombre jugador 1 local
│  ├─ starting_age_home1 ....... Edad jugador 1 local
│  ├─ starting_position_home1 .. Posición (GK, DF, MF, FW)
│  ├─ starting_minutes_home1 ... Minutos jugados
│  ├─ starting_goals_home1 .... Goles anotados
│  │
│  ├─ starting_name_home2...starting_goals_home11 (jugadores 2-11)
│  │
│  └─ bench_name_home1...bench_goals_home8 (suplentes hasta 8)
│
│  NOTA: Same structure for away team
│  └─ starting_name_away1...bench_goals_away8
│
└─ OTROS:
   ├─ MatchURL ................. Link al partido
   └─ Personal Notes ........... Notas personales

COLUMNAS TOTALES: 300+

USO RECOMENDADO:
├─ ⭐ MÁXIMA PRIORIDAD: Extraer jugadores con nombres/edades
├─ Crear alineaciones históricas
├─ Comparar rendimiento de jugadores
├─ Analizar tácticas de formación
└─ Crear base de datos de jugadores global
```

---

## 🗺️ Mapeo de Ligas en Códigos

```
CÓDIGOS DE LIGA EN FICHEROS:
├─ PL, ENG ................ Premier League (England)
├─ ES1 .................... La Liga (España)
├─ DE1, BL ................ Bundesliga (Alemania)
├─ IT1, SA ................ Serie A (Italia)
├─ FR1 .................... Ligue 1 (Francia)
├─ NLD .................... Eredivisie (Holanda)
├─ POR .................... Primeira Liga (Portugal)
├─ TUR .................... Süper Lig (Turquía)
├─ CHE .................... Super League (Suiza)
├─ POL .................... Ekstraklasa (Polonia)
├─ MEX .................... Liga MX (México)
├─ SCO .................... Scottish Premier (Escocia)
├─ BR ..................... Brasileirão (Brasil)
├─ CN ..................... Chinese Super League (China)
├─ MLS .................... Major League Soccer (USA)
└─ GER (en games.csv) ..... Bundesliga (Alemania)
```

---

## 🔄 Relaciones Entre Archivos

```
┌─────────────────────────────────────────┐
│  games.csv (31 MB)                      │
│  ├─ 50,000+ partidos                    │
│  ├─ Datos de jugadores ⭐              │
│  └─ Desde 2014                          │
└────────────┬────────────────────────────┘
             │
             ├─→ Extraer jugadores únicos
             │   └─ Crear players.json
             │
             └─→ Filtrar por liga/país
                 └─ Usar en conjunto con
                    cache.footballdata-master
```

```
┌──────────────────────────────────────────┐
│  football_matches_2024_2025.csv (316KB) │
│  └─ Actualizar standings 2024-25        │
└────────────┬───────────────────────────┘
             │
             ├─→ Agregar nuevas jornadas
             │
             └─→ Corregir puntos en tabla
```

---

## 🎯 Prioridad de Procesamiento

### 🔴 MÁXIMA (Hacer AHORA)
1. **games.csv**
   - Extraer all 50,000+ jugadores únicos
   - Crear `players_real.json`
   - Incluir: nombre, edad, posición
   - Status: CRÍTICO para jugabilidad

### 🟠 ALTA (Esta semana)
2. **football_matches_2024_2025.csv**
   - Actualizar `leagues_real.json` 
   - Agregar temporada 2024-25
   - Corregir standings

### 🟡 MEDIA (Este mes)
3. **football_matches.csv + final_matches.csv**
   - Crear estadísticas avanzadas
   - Mostrar xG en UI (si aplica)

---

## 📊 Transformaciones Esperadas

```
INPUT (CSV)                    →    OUTPUT (JSON)
──────────────────────────────────────────────

games.csv (51 MB)              →    players_real.json (~5 MB)
├─ 50,000+ partidos                 └─ 5,000+ jugadores únicos
├─ 11 jugadores por equipo          ├─ Nombre
├─ Nombre, edad, posición           ├─ Edad
└─ Alineaciones                      ├─ Posición
                                     ├─ País
                                     └─ Índice de stats

cache.footballdata (2023-24)   →    (ya procesado)
├─ 29 archivos                       → leagues_real.json
├─ 8,123 partidos                    → standings_real.json
└─ Procesado ✅

football_matches_2024_2025.csv →    update standings ✅
├─ 300+ partidos                    → Agregado a standings
└─ Temporada actual
```

---

**Siguientes pasos:** Procesar games.csv para extraer jugadores reales 🎮

