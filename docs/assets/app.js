(() => {
  'use strict';
  const chatLog=document.getElementById('chat-log');
  const input=document.getElementById('chat-input');
  const send=document.querySelector('.send-button');
  const status=document.getElementById('chat-status');
  const chatDialog=document.getElementById('chat-dialog');
  let lastTopic=null, busy=false, replyTimer=null;
  function syncScrollLock(){document.body.classList.toggle('dialog-open',!!document.querySelector('dialog[open]'));}
  function openDialog(id){
    const dialog=document.getElementById(id);if(!dialog)return;
    document.querySelectorAll('dialog[open]').forEach(open=>{if(open!==dialog)open.close();});
    if(!dialog.open)dialog.showModal();syncScrollLock();
    if(id==='chat-dialog'){input.focus();chatLog.scrollTop=chatLog.scrollHeight;}
    else if(id==='pdf-dialog'){
      const frame=document.getElementById('pdf-frame');
      if(!frame.hasAttribute('src') && matchMedia('(min-width:701px)').matches)frame.src=frame.dataset.src;
    }
  }
  document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();openDialog(button.dataset.open);}));
  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close).close()));
  document.querySelectorAll('dialog').forEach(dialog=>{
    dialog.addEventListener('close',syncScrollLock);
    dialog.addEventListener('click',event=>{
      if(event.target!==dialog)return;
      const rect=dialog.getBoundingClientRect();
      if(event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom)dialog.close();
    });
  });
  function button(label,callback){const el=document.createElement('button');el.type='button';el.textContent=label;el.addEventListener('click',callback);return el;}
  function message(text,user=false,result={}){
    const wrapper=document.createElement('div');wrapper.className='message'+(user?' user':'');
    const author=document.createElement('span');author.className='message-author';author.textContent=user?'Tu':'Assistente';
    const body=document.createElement('div');body.className='message-body';body.textContent=text;wrapper.append(author,body);
    if(!user && (result.topic || result.action==='apresentacao')){
      const actions=document.createElement('div');actions.className='message-actions';
      if(result.topic){
        actions.append(button('Um exemplo',()=>ask('Dá-me um exemplo',result.topic)));
        if(SavingsBot.topics.find(t=>t.id===result.topic)?.formula)actions.append(button('Ver fórmula',()=>ask('Qual é a fórmula?',result.topic)));
      }
      if(result.action==='apresentacao')actions.append(button('Ver apresentação',()=>openDialog('pdf-dialog')));
      wrapper.append(actions);
    }
    chatLog.append(wrapper);while(chatLog.children.length>60)chatLog.firstElementChild.remove();chatLog.scrollTop=chatLog.scrollHeight;
  }
  function resizeInput(){input.style.height='auto';input.style.height=Math.min(input.scrollHeight,130)+'px';}
  function pending(active){
    busy=active;send.disabled=active;document.querySelectorAll('.message-actions button').forEach(button=>{button.disabled=active;});chatLog.setAttribute('aria-busy',String(active));status.replaceChildren();
    if(active){
      const label=document.createElement('span');label.className='typing';label.textContent='A preparar a resposta';
      const dots=document.createElement('span');dots.className='typing-dots';dots.setAttribute('aria-hidden','true');
      for(let i=0;i<3;i++)dots.append(document.createElement('i'));
      label.append(dots);status.append(label);
    }
  }
  function ask(question,context){
    const value=question.trim().slice(0,1000);if(!value || busy)return;
    const result=SavingsBot.respond(value,context || lastTopic);
    message(value,true);input.value='';resizeInput();pending(true);
    // Pausa visual pedida pelo autor: em algumas respostas, entre 5 e 10 segundos.
    const delay=Math.random()<.4 ? 5000+Math.floor(Math.random()*5001) : 500+Math.floor(Math.random()*500);
    replyTimer=setTimeout(()=>{
      replyTimer=null;pending(false);message(result.text,false,result);lastTopic=result.topic;
      // Não roubar o foco se a pessoa fechou o chat ou está a escrever noutro sítio.
      if(chatDialog.open && document.activeElement===send)input.focus();
    },delay);
  }
  function reset(){
    if(replyTimer!==null)clearTimeout(replyTimer);replyTimer=null;pending(false);lastTopic=null;chatLog.replaceChildren();
    input.value='';resizeInput();message('Olá! Em que te posso ajudar?');
    if(chatDialog.open)input.focus();
  }
  document.getElementById('chat-form').addEventListener('submit',event=>{event.preventDefault();ask(input.value);});
  input.addEventListener('input',resizeInput);
  input.addEventListener('keydown',event=>{if(event.key==='Enter' && !event.shiftKey && !event.isComposing){event.preventDefault();ask(input.value);}});
  document.getElementById('clear-chat').addEventListener('click',reset);reset();
  const initialHash=location.hash;
  if(initialHash==='#assistente')openDialog('chat-dialog');
  if(initialHash==='#apresentacao')openDialog('pdf-dialog');
})();
