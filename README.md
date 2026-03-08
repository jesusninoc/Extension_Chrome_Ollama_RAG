# 🧠 Ollama RAG Chrome Extension

Mini **ChatGPT local con RAG dentro de Chrome** utilizando **Ollama** como backend.

Esta extensión permite conversar con modelos LLM locales y consultar documentos mediante **Retrieval-Augmented Generation (RAG)** sin enviar datos a servicios externos.

---

# ✨ Qué hace esta extensión

Ahora tienes un **asistente tipo ChatGPT ejecutándose localmente en tu navegador**.

Funciones principales:

- 🧠 **Chat con modelos locales de Ollama**
- 📄 **RAG con documentos**
- 🔍 **Búsqueda semántica de contexto**
- ⚡ **Todo ejecutado localmente**

---

# 🤖 Modelos compatibles

Puedes usar cualquier modelo disponible en **Ollama**, por ejemplo:

- `llama3`
- `mistral`
- `gemma`
- `deepseek`

---

# 📄 RAG con documentos

La extensión permite cargar archivos para realizar consultas basadas en su contenido.

Formatos soportados:

- `.txt`
- `.md`

Proceso que realiza la extensión:

1. Lee el archivo
2. Divide el contenido en **chunks**
3. Genera **embeddings**
4. Guarda los vectores en memoria local
5. Busca los fragmentos más relevantes
6. Los añade al prompt del LLM

---

# 🏗 Arquitectura

```
documento
   ↓
chunking
   ↓
embeddings (nomic-embed-text)
   ↓
vector store (memoria local)
   ↓
cosine similarity
   ↓
contexto → LLM
```

---

# ⚙️ Requisitos

Debes tener **Ollama instalado** y los siguientes modelos descargados.

### Modelo de embeddings

```bash
ollama pull nomic-embed-text
```

### Modelo LLM principal

Ejemplo:

```bash
ollama pull llama3
```

También puedes usar:

```bash
ollama pull mistral
ollama pull gemma
ollama pull deepseek
```

---

# 🚀 Cómo usar

1️⃣ Abre la extensión en Chrome  
2️⃣ Carga un archivo `.txt` o `.md`  
3️⃣ Pulsa **Indexar**  
4️⃣ Haz preguntas sobre el documento  

La extensión utilizará **RAG** para responder con el contexto del archivo.

---

# 💡 Ejemplo

### Documento

```
La capital de Francia es París.
La capital de Italia es Roma.
```

### Pregunta

```
¿cuál es la capital de Francia?
```

### Respuesta

El sistema recuperará el fragmento relevante del documento y lo utilizará como contexto para generar la respuesta.

---

# 🔒 Privacidad

Todo funciona **localmente**:

- No se envían datos a servidores externos
- Los documentos se procesan en el navegador
- Los modelos se ejecutan en tu máquina mediante Ollama

---

# 🧪 Tecnologías utilizadas

- Chrome Extension (Manifest V3)
- Ollama API
- Vector embeddings
- Cosine similarity
- Retrieval-Augmented Generation (RAG)
