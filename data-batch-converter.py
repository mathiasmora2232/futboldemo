#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Data Batch Converter - Procesa múltiples temporadas
Útil para actualizar datos históricos
"""

from pathlib import Path
from data_converter_v2 import DataConverter


def convert_multiple_seasons(base_path, seasons=None):
    """Convierte múltiples temporadas"""
    
    if seasons is None:
        seasons = ['2023-24', '2022-23', '2021-22']
    
    print("\n" + "="*70)
    print("🔄 DATA BATCH CONVERTER - Procesando múltiples temporadas")
    print("="*70 + "\n")
    
    converter = DataConverter(Path(base_path))
    
    all_results = {}
    
    for season in seasons:
        print(f"\n{'='*70}")
        print(f"📅 PROCESANDO TEMPORADA: {season}")
        print(f"{'='*70}\n")
        
        processed = converter.process_season(season)
        
        if processed and processed['leagues_count'] > 0:
            all_results[season] = processed
            print(f"\n✅ {season}: {processed['leagues_count']} ligas, "
                  f"{sum(l['teamsCount'] for l in processed['teams'].values())} equipos")
        else:
            print(f"\n⚠️  {season}: No se pudieron procesar datos")
    
    # Resumen general
    print(f"\n{'='*70}")
    print("📊 RESUMEN TOTAL")
    print(f"{'='*70}\n")
    
    total_seasons = len(all_results)
    total_leagues = sum(p['leagues_count'] for p in all_results.values())
    total_teams = sum(
        sum(l['teamsCount'] for l in p['teams'].values()) 
        for p in all_results.values()
    )
    total_matches = sum(
        sum(m['matches_count'] for m in p['matches']) 
        for p in all_results.values()
    )
    
    print(f"✅ Temporadas procesadas: {total_seasons}")
    print(f"✅ Ligas únicas: {total_leagues}")
    print(f"✅ Equipos únicos: {total_teams}")
    print(f"✅ Partidos totales: {total_matches}")
    
    print(f"\n{'='*70}\n")


if __name__ == '__main__':
    base_path = r"c:\Users\USER\Desktop\programs\personal\futboldemo"
    
    # Procesar múltiples temporadas
    convert_multiple_seasons(base_path, ['2023-24'])
    
    print("\n💡 Para procesar más temporadas, edita el script:")
    print('   convert_multiple_seasons(base_path, ["2023-24", "2022-23", "2021-22", ...])')
