import pandas as pd
import re
import os
import subprocess
import sys

# Instalar dependencias necesarias
required_packages = ['spacy', 'nltk']
for package in required_packages:
    try:
        __import__(package.split('==')[0])
    except ImportError:
        print(f"Instalando {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

import nltk
for resource in ['wordnet', 'words', 'brown']:
    try:
        nltk.data.find(f'corpora/{resource}')
    except LookupError:
        nltk.download(resource)

try:
    import spacy
    if not spacy.util.is_package("en_core_web_sm"):
        subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
except:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "spacy"])
    subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])

# Importaciones
from nltk.corpus import wordnet, brown
from nltk.tag import pos_tag
import spacy

# Configuración
base_dir = r"C:\Users\valdi\Downloads\vocabulary"
words_path = os.path.join(base_dir, "words.csv")
word_pos_path = os.path.join(base_dir, "word_pos.csv")
output_path = os.path.join(base_dir, "vocabulary_final_complete.csv")

# Cargar modelos
nlp = spacy.load('en_core_web_sm')

# Función para determinar POS usando múltiples métodos
def get_pos_description(word):
    """Determina la categoría gramatical usando múltiples fuentes"""
    pos_descriptions = {
        'NOUN': 'Sustantivo',
        'VERB': 'Verbo',
        'ADJ': 'Adjetivo',
        'ADV': 'Adverbio',
        'ADP': 'Preposición',
        'CCONJ': 'Conjunción',
        'DET': 'Determinante',
        'PRON': 'Pronombre',
        'NUM': 'Número',
        'INTJ': 'Interjección',
        'PROPN': 'Nombre propio'
    }
    
    # Convertir códigos WordNet a descripciones
    wn_pos_map = {
        'n': 'Sustantivo',
        'v': 'Verbo',
        'a': 'Adjetivo',
        'r': 'Adverbio',
        's': 'Adjetivo'  # satelite adj
    }
    
    # 1. Intentar con spaCy
    doc = nlp(word)
    if len(doc) > 0:
        pos = doc[0].pos_
        if pos in pos_descriptions:
            return pos_descriptions[pos]
    
    # 2. Intentar con WordNet
    synsets = wordnet.synsets(word)
    if synsets:
        wn_pos = synsets[0].pos()
        if wn_pos in wn_pos_map:
            return wn_pos_map[wn_pos]
    
    # 3. Intentar con NLTK POS tagger
    try:
        nltk_pos = pos_tag([word])[0][1]
        # Convertir tags Penn Treebank a descripciones
        if nltk_pos.startswith('NN'):
            return 'Sustantivo'
        elif nltk_pos.startswith('VB'):
            return 'Verbo'
        elif nltk_pos.startswith('JJ'):
            return 'Adjetivo'
        elif nltk_pos.startswith('RB'):
            return 'Adverbio'
        elif nltk_pos.startswith('IN'):
            return 'Preposición'
    except:
        pass
    
    # 4. Análisis basado en sufijos (para casos difíciles)
    lower_word = word.lower()
    if lower_word.endswith('ly'):
        return 'Adverbio'
    elif lower_word.endswith(('ment', 'tion', 'sion', 'ness', 'ity', 'hood', 'ship', 'dom')):
        return 'Sustantivo'
    elif lower_word.endswith(('ize', 'ise', 'ate', 'fy', 'en')):
        return 'Verbo'
    elif lower_word.endswith(('al', 'ive', 'ous', 'ful', 'less', 'able', 'ible')):
        return 'Adjetivo'
    
    # 5. Si todo falla, asignar Sustantivo como valor por defecto
    # La mayoría de palabras desconocidas suelen ser sustantivos
    return 'Sustantivo'

# Función para obtener una definición completa
def get_definition(word):
    """Obtiene una definición para la palabra desde múltiples fuentes"""
    # 1. Intentar con WordNet
    synsets = wordnet.synsets(word)
    if synsets:
        # Tomar la primera definición
        definition = synsets[0].definition()
        # Limpiar y formatear
        definition = re.sub(r'\s+', ' ', definition).strip()
        if definition:
            return definition[:150] + ('...' if len(definition) > 150 else '')
    
    # 2. Si no hay definición, crear una basada en categoría gramatical
    pos = get_pos_description(word)
    return f"{word}: {pos} en inglés sin definición disponible"

def verify_and_enrich():
    # Detectar separador y cargar archivos
    def detect_separator(file_path):
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            first_line = f.readline().strip()
        return ';' if ';' in first_line else (',' if ',' in first_line else '\t')
    
    words_sep = detect_separator(words_path)
    pos_sep = detect_separator(word_pos_path)
    
    # Cargar archivos
    print("Cargando archivos CSV...")
    words_df = pd.read_csv(words_path, sep=words_sep, encoding='utf-8', engine='python')
    word_pos_df = pd.read_csv(word_pos_path, sep=pos_sep, encoding='utf-8', engine='python')
    
    # Convertir IDs a numéricos para join
    words_df['word_id'] = pd.to_numeric(words_df['word_id'], errors='coerce').fillna(0).astype(int)
    word_pos_df['word_id'] = pd.to_numeric(word_pos_df['word_id'], errors='coerce').fillna(0).astype(int)
    
    # Hacer join inner entre las tablas
    print("Realizando join entre tablas...")
    merged_df = pd.merge(word_pos_df, words_df, on='word_id', how='inner')
    
    # Verificar y limpiar palabras inglesas
    print("Verificando palabras inglesas...")
    valid_english_words = []
    
    valid_words_count = 0
    for idx, row in merged_df.iterrows():
        word = str(row.get('word', '')).strip().lower()
        # Verificar si la palabra está en WordNet o tiene synsets
        is_valid = len(wordnet.synsets(word)) > 0
        
        if is_valid:
            valid_english_words.append(idx)
            valid_words_count += 1
    
    # Mantener solo palabras válidas
    print(f"Manteniendo {valid_words_count} de {len(merged_df)} palabras válidas...")
    merged_df = merged_df.loc[valid_english_words].copy()
    
    # Asignar categorías gramaticales y definiciones
    print("Asignando categorías gramaticales y definiciones...")
    
    # Inicializar columnas
    merged_df['descripcion'] = ''
    merged_df['category_titles'] = ''
    
    for idx, row in merged_df.iterrows():
        word = str(row['word']).strip()
        
        # Asignar categoría gramatical
        pos_description = get_pos_description(word)
        merged_df.at[idx, 'descripcion'] = pos_description
        
        # Asignar definición
        definition = get_definition(word)
        merged_df.at[idx, 'category_titles'] = definition
    
    # Cambiar niveles CEFR a Principiante/Intermedio/Avanzado
    if 'level' in merged_df.columns:
        merged_df['level'] = pd.to_numeric(merged_df['level'], errors='coerce')
        
        def simplified_level(level):
            if pd.isna(level):
                return "Principiante"  # valor por defecto
            
            level = float(level)
            if level <= 2.0:
                return "Principiante"
            elif level <= 4.0:
                return "Intermedio"
            else:
                return "Avanzado"
        
        merged_df['nivel'] = merged_df['level'].apply(simplified_level)
    else:
        # Si no hay columna level, asignar principiante por defecto
        merged_df['nivel'] = "Principiante"
    
    # Eliminar filas con datos incompletos
    before_clean = len(merged_df)
    merged_df = merged_df.dropna(subset=['descripcion', 'category_titles'])
    after_clean = len(merged_df)
    
    print(f"Eliminadas {before_clean - after_clean} filas con datos incompletos")
    
    # Eliminar columnas innecesarias
    columns_to_drop = ['word_pos_id', 'pos_tag_id', 'stem_word_id', 'lemma_word_id', 'tag']
    merged_df.drop(columns=columns_to_drop, errors='ignore', inplace=True)
    
    # Ordenar por nivel y alfabéticamente
    level_order = {"Principiante": 1, "Intermedio": 2, "Avanzado": 3}
    merged_df['sort_key'] = merged_df['nivel'].map(level_order)
    merged_df = merged_df.sort_values(['sort_key', 'word']).drop(columns=['sort_key'])
    
    # Eliminar duplicados
    merged_df.drop_duplicates(subset=['word', 'descripcion'], keep='first', inplace=True)
    
    print(f"Guardando dataset final con {len(merged_df)} palabras...")
    merged_df.to_csv(output_path, index=False, encoding='utf-8-sig')
    print(f"Proceso completado. Archivo guardado en: {output_path}")
    
    return merged_df

try:
    df = verify_and_enrich()
    print(f"Dataset final: {len(df)} palabras con categorías y definiciones.")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()