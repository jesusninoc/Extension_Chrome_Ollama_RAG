
const chat=document.getElementById("chat")
const sendBtn=document.getElementById("send")
const promptEl=document.getElementById("prompt")
const modelSelect=document.getElementById("model")
const fileInput=document.getElementById("file")
const indexBtn=document.getElementById("index")
const statusEl=document.getElementById("status")

let docs=[]

function addMessage(text,type){
 const div=document.createElement("div")
 div.className="msg "+type
 div.textContent=text
 chat.appendChild(div)
 chat.scrollTop=chat.scrollHeight
}

function cosine(a,b){
 let dot=0,ma=0,mb=0
 for(let i=0;i<a.length;i++){
  dot+=a[i]*b[i]
  ma+=a[i]*a[i]
  mb+=b[i]*b[i]
 }
 return dot/(Math.sqrt(ma)*Math.sqrt(mb))
}

async function embed(text){

 const res=await fetch("http://localhost:11434/api/embeddings",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
   model:"nomic-embed-text",
   prompt:text
  })
 })

 const j=await res.json()
 return j.embedding
}

indexBtn.onclick=async()=>{

 const f=fileInput.files[0]
 if(!f) return

 statusEl.textContent="Leyendo..."

 const txt=await f.text()

 const chunks=txt.match(/.{1,500}/g) || []

 docs=[]

 for(const c of chunks){

  const e=await embed(c)

  docs.push({text:c,vec:e})

 }

 statusEl.textContent="Indexado: "+docs.length+" chunks"

}

async function retrieve(query){

 const qv=await embed(query)

 let scored=[]

 docs.forEach(d=>{
  scored.push({
   text:d.text,
   score:cosine(qv,d.vec)
  })
 })

 scored.sort((a,b)=>b.score-a.score)

 return scored.slice(0,3).map(s=>s.text).join("\n")
}

sendBtn.onclick=async()=>{

 const q=promptEl.value.trim()
 if(!q) return

 addMessage(q,"user")
 promptEl.value=""

 let context=""

 if(docs.length){
  context=await retrieve(q)
 }

 const finalPrompt=`Contexto:\n${context}\n\nPregunta:${q}`

 addMessage("Pensando...","ai")

 chrome.runtime.sendMessage({
  type:"OLLAMA_CHAT",
  model:modelSelect.value,
  prompt:finalPrompt
 },res=>{

  chat.lastChild.remove()

  if(!res||!res.ok){
   addMessage("Error","ai")
   return
  }

  addMessage(res.response,"ai")

 })

}
