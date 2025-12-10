const voiceSelect = document.getElementById('voiceSelect');
const rate = document.getElementById('rate');
const rateVal = document.getElementById('rateVal');
let voices = [];

function loadVoices(){
  voices = speechSynthesis.getVoices();
  if(!voices.length){
    setTimeout(loadVoices,100);
    return;
  }
  voiceSelect.innerHTML = voices.map((v,i)=>`<option value="${i}">${v.name} (${v.lang})${v.default? ' — default':''}</option>`).join('');
}
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

rate.addEventListener('input', ()=> rateVal.textContent = rate.value);

async function execInTab(fn, args=[]){
  const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
  if(!tab) return;
  try{
    await chrome.scripting.executeScript({target:{tabId:tab.id},func:fn,args:args});
  }catch(e){
    console.error('Injection error', e);
  }
}

function start(){
  const vi = parseInt(voiceSelect.value||0);
  const r = parseFloat(rate.value||1);
  execInTab(injectedStart, [vi,r]);
}
function pause(){ execInTab(()=>{ if(window.__readify_instance && window.__readify_instance.synth) window.__readify_instance.synth.pause(); }); }
function resume(){ execInTab(()=>{ if(window.__readify_instance && window.__readify_instance.synth) window.__readify_instance.synth.resume(); }); }
function stop(){ execInTab(()=>{ if(window.__readify_instance && window.__readify_instance.synth){ window.__readify_instance.synth.cancel(); window.__readify_instance.cleanup(); } }); }

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('resume').addEventListener('click', resume);
document.getElementById('stop').addEventListener('click', stop);

// injected function that runs inside the page
function injectedStart(voiceIndex, rateValue){
  try{
    if(window.__readify_instance && window.__readify_instance.active) return;
    window.__readify_instance = { active:true, synth: speechSynthesis, voiceIndex: voiceIndex, rate: rateValue,
      cleanup: function(){ 
        const bar = document.getElementById('readify-floating-bar'); if(bar) bar.remove();
        const overlay = document.getElementById('readify-overlay'); if(overlay) overlay.remove();
        this.active = false;
      }
    };

    let text = window.getSelection().toString().trim();
    if(!text){
      const article = document.querySelector('article') || document.querySelector('main') || document.querySelector('body');
      text = article ? article.innerText : document.body.innerText;
    }
    if(!text || text.trim().length < 20){
      alert('Readify: no readable text found on this page.');
      window.__readify_instance.active = false;
      return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'readify-overlay';
    Object.assign(overlay.style,{position:'fixed',left:'0',top:'0',right:'0',bottom:'0',pointerEvents:'none'});
    document.documentElement.appendChild(overlay);

    const bar = document.createElement('div');
    bar.id = 'readify-floating-bar';
    bar.style.position='fixed';
    bar.style.right='18px';
    bar.style.bottom='18px';
    bar.style.zIndex='2147483647';
    bar.style.background='rgba(10,10,10,0.78)';
    bar.style.color='white';
    bar.style.padding='8px';
    bar.style.borderRadius='10px';
    bar.style.display='flex';
    bar.style.gap='8px';
    bar.style.alignItems='center';
    bar.style.pointerEvents='auto';

    const playBtn = document.createElement('button'); playBtn.textContent='⏯'; playBtn.title='Play/Pause';
    const pauseBtn = document.createElement('button'); pauseBtn.textContent='⏸'; pauseBtn.title='Pause';
    const stopBtn = document.createElement('button'); stopBtn.textContent='⏹'; stopBtn.title='Stop';

    const voiceSel = document.createElement('select');
    const vs = speechSynthesis.getVoices();
    vs.forEach((v,i)=>{ const o=document.createElement('option'); o.value=i; o.textContent=`${v.name} (${v.lang})`; voiceSel.appendChild(o); });
    voiceSel.value = voiceIndex || 0;
    voiceSel.style.marginLeft='8px';

    bar.appendChild(playBtn); bar.appendChild(pauseBtn); bar.appendChild(stopBtn); bar.appendChild(voiceSel);

    document.documentElement.appendChild(bar);

    const utter = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    if(voices[voiceIndex]) utter.voice = voices[voiceIndex];
    utter.rate = rateValue||1;
    utter.onend = ()=>{ window.__readify_instance.cleanup(); };
    utter.onerror = (e)=>{ console.error('Readify TTS error', e); window.__readify_instance.cleanup(); };

    window.__readify_instance.utter = utter;

    playBtn.onclick = ()=>{
      if(speechSynthesis.paused) speechSynthesis.resume();
      else if(!speechSynthesis.speaking) speechSynthesis.speak(utter);
      else{ speechSynthesis.cancel(); speechSynthesis.speak(utter); }
    };
    pauseBtn.onclick = ()=>{ if(speechSynthesis.speaking) speechSynthesis.pause(); };
    stopBtn.onclick = ()=>{ speechSynthesis.cancel(); window.__readify_instance.cleanup(); };
    voiceSel.onchange = ()=>{ const idx=parseInt(voiceSel.value); if(speechSynthesis.speaking) { speechSynthesis.cancel(); utter.voice = speechSynthesis.getVoices()[idx]; speechSynthesis.speak(utter);} else { utter.voice = speechSynthesis.getVoices()[idx]; } };

    speechSynthesis.speak(utter);

  }catch(e){ console.error('Readify injected error', e); alert('Readify: could not start on this page.'); }
}
