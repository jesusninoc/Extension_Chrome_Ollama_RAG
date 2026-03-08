
chrome.runtime.onInstalled.addListener(async () => {
  try {
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  } catch(e) {}
});

chrome.action.onClicked.addListener(async (tab) => {
  if(tab && tab.windowId){
    await chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  if(msg.type === "OLLAMA_CHAT"){
    fetch("http://localhost:11434/api/generate",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify({
        model: msg.model,
        prompt: msg.prompt,
        stream:false
      })
    })
    .then(r=>r.text())
    .then(t=>{

      let result="";
      const lines=t.split("\n");

      lines.forEach(l=>{
        if(!l.trim()) return;
        try{
          const j=JSON.parse(l);
          if(j.response) result+=j.response;
        }catch(e){}
      });

      sendResponse({ok:true,response:result});
    })
    .catch(e=>sendResponse({ok:false,error:e.toString()}));

    return true;
  }

});
