# Ollama RAG Assistant

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-orange?logo=googlechrome)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![AI](https://img.shields.io/badge/AI-Ollama-blueviolet)
![RAG](https://img.shields.io/badge/RAG-Vector%20Search-purple)
![Local](https://img.shields.io/badge/Execution-Local-brightgreen)
![Status](https://img.shields.io/badge/Estado-Functional-brightgreen)

> Extensión de Chrome que convierte tu navegador en un **asistente de inteligencia artificial local con RAG** utilizando **Ollama**. Permite chatear con modelos LLM instalados en tu máquina y consultar documentos mediante **búsqueda semántica y recuperación de contexto**.

---

# Vista general

**Ollama RAG Assistant** transforma Chrome en una interfaz directa para **modelos de lenguaje ejecutándose localmente** junto con un sistema de **Retrieval-Augmented Generation (RAG)**.

Esto permite realizar preguntas sobre documentos cargados por el usuario y obtener respuestas generadas por el modelo usando **contexto relevante extraído automáticamente**.

Todo el procesamiento ocurre **en tu propio ordenador**.

No se utilizan APIs externas ni servicios cloud.

---

# Qué hace esta extensión

Esta extensión combina **LLM locales con recuperación de conocimiento desde documentos**.

Funciones principales:

- 🧠 Chat con modelos locales de Ollama  
- 📄 Indexación de documentos  
- 🔎 Búsqueda semántica mediante embeddings  
- ⚡ Recuperación de contexto automática  
- 🔒 Procesamiento completamente local  

---

# Modelos compatibles

Puedes usar cualquier modelo disponible en **Ollama**, por ejemplo:

```
llama3
mistral
gemma
deepseek
phi
qwen
```

La extensión envía consultas al endpoint:

```
/api/generate
```

o

```
/api/chat
```

según el modo de ejecución.

---

# RAG con documentos

La extensión permite cargar documentos para realizar consultas sobre su contenido.

Formatos soportados:

```
.txt
.md
```

Cuando se indexa un documento, la extensión ejecuta el siguiente flujo.

---

# Pipeline de RAG

```
documento
   ↓
lectura del archivo
   ↓
chunking del texto
   ↓
embeddings (nomic-embed-text)
   ↓
vector store (memoria local)
   ↓
cosine similarity
   ↓
contexto relevante
   ↓
prompt → LLM
```

El modelo recibe la pregunta del usuario junto con el **contexto recuperado del documento**.

---

# Cómo funciona internamente

### 1. Lectura del documento

El archivo se carga en el navegador y se procesa localmente.

### 2. División en fragmentos

El texto se divide en pequeños bloques o **chunks** para mejorar la búsqueda semántica.

### 3. Generación de embeddings

Cada fragmento se convierte en un vector utilizando:

```
nomic-embed-text
```

Esto permite comparar semánticamente los textos.

### 4. Almacenamiento vectorial

Los vectores se guardan en memoria local dentro de la extensión.

### 5. Búsqueda semántica

Cuando el usuario realiza una pregunta:

1. Se genera un embedding de la consulta  
2. Se calcula **cosine similarity** con los vectores almacenados  
3. Se recuperan los fragmentos más relevantes  

### 6. Generación de respuesta

El contexto recuperado se añade al prompt enviado al modelo LLM.

---

# Ejemplo de uso

## Documento cargado

```
La capital de Francia es París.
La capital de Italia es Roma.
```

---

## Pregunta

```
¿cuál es la capital de Francia?
```

---

## Flujo interno

```
pregunta
   ↓
embedding de la consulta
   ↓
búsqueda de similitud
   ↓
recuperación del fragmento relevante
   ↓
prompt con contexto
   ↓
respuesta del LLM
```

---

# Requisitos

Debes tener **Ollama instalado y ejecutándose**.

### Instalar modelo de embeddings

```
ollama pull nomic-embed-text
```

### Instalar modelo principal

Ejemplo:

```
ollama pull llama3
```

También puedes usar:

```
ollama pull mistral
ollama pull gemma
ollama pull deepseek
```

---

# Permitir conexiones desde Chrome

Si usas una extensión de Chrome, debes iniciar Ollama permitiendo peticiones desde el navegador.

Ejemplo:

```bash
OLLAMA_ORIGINS=* ollama serve
```

Esto habilita llamadas desde:

```
http://localhost
```

---

# Instalación de la extensión

### Modo desarrollador

1. Descarga el proyecto
2. Abre Chrome
3. Ve a

```
chrome://extensions
```

4. Activa **Modo desarrollador**
5. Pulsa **Cargar descomprimida**
6. Selecciona la carpeta del proyecto

---

# Uso

1️⃣ Abre el panel de la extensión  
2️⃣ Carga un documento `.txt` o `.md`  
3️⃣ Pulsa **Indexar documento**  
4️⃣ Escribe una pregunta  

La extensión utilizará **RAG para recuperar contexto y generar la respuesta**.

---

# Arquitectura completa

```
Chrome Extension
      ↓
Documento cargado
      ↓
Chunking
      ↓
Embeddings (Ollama)
      ↓
Vector store local
      ↓
Cosine similarity
      ↓
Contexto recuperado
      ↓
LLM local
      ↓
Respuesta
```

---

# Tecnologías utilizadas

- Chrome Extensions (Manifest V3)
- Ollama
- LLM locales
- Vector embeddings
- Cosine similarity
- Retrieval-Augmented Generation (RAG)
- JavaScript

---

# Privacidad

Todo funciona **100 % localmente**.

No se envían datos a servidores externos.

Flujo de datos:

```
Chrome
   ↓
Ollama (localhost)
   ↓
Modelo LLM local
```

Esto proporciona:

- privacidad total  
- latencia mínima  
- independencia de servicios cloud  
- sin claves API  

---

# Estructura del proyecto

```
ollama-rag-assistant/
│
├── manifest.json
├── background.js
├── sidepanel.html
├── sidepanel.js
├── rag.js
└── style.css
```

---

# Casos de uso

Esta extensión es especialmente útil para:

- aprendizaje de **RAG**
- desarrollo de **extensiones Chrome con IA**
- prototipos de **IA local**
- pruebas de **LLM offline**
- experimentación con **búsqueda semántica**

---

# Autor

**Desarrollado por:** Jesusninoc  

**Web:**  
https://www.jesusninoc.com
