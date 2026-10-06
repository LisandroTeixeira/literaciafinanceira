const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
class El{
 constructor(tag='div'){this.tag=tag;this.children=[];this.listeners={};this.style={};this.attributes={};this.open=false;this.value='';this.scrollHeight=26;this.scrollTop=0;this.classList={toggle(){}};this.dataset={};}
 append(...els){this.children.push(...els);for(const el of els)el.parent=this;}
 replaceChildren(...els){this.children=[];this.append(...els);}
 remove(){this.parent.children.splice(this.parent.children.indexOf(this),1);}
 get firstElementChild(){return this.children[0];}
 setAttribute(k,v){this.attributes[k]=v;}
 hasAttribute(k){return k in this.attributes;}
 addEventListener(type,cb){(this.listeners[type]??=[]).push(cb);}
 emit(type,event={}){for(const cb of this.listeners[type]||[])cb(event);}
 focus(){document.activeElement=this;}
 showModal(){this.open=true;}
 close(){this.open=false;this.emit('close');}
}
const ids=['chat-log','chat-input','chat-status','chat-dialog','pdf-dialog','pdf-frame','chat-form','clear-chat'];const els=Object.fromEntries(ids.map(x=>[x,new El()]));
const send=new El('button');let scheduled=[],cancelled=[];
const document={body:new El('body'),activeElement:null,getElementById:id=>els[id],createElement:tag=>new El(tag),querySelector:q=>q==='.send-button'?send:q==='dialog[open]'?Object.values(els).find(e=>e.open):null,querySelectorAll:q=>q==='dialog'?[els['chat-dialog'],els['pdf-dialog']]:q==='dialog[open]'?Object.values(els).filter(e=>e.open):q==='.message-actions button'?els['chat-log'].children.flatMap(m=>m.children.filter(e=>e.className==='message-actions').flatMap(e=>e.children)):[]};
const randoms=[.1,.5,.9,.4,.1,.1];let idx=0;
const customMath=Object.create(Math);customMath.random=()=>randoms[idx++%randoms.length];
const ctx=vm.createContext({Intl,document,location:{hash:''},matchMedia:()=>({matches:true}),Math:customMath,setTimeout:(cb,delay)=>{scheduled.push({cb,delay});return scheduled.length;},clearTimeout:id=>cancelled.push(id)});
for(const name of ['knowledge.js','chatbot.js','app.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../docs/assets',name),'utf8'),ctx);
assert.equal(els['chat-log'].children.length,1);
assert.equal(els['chat-log'].children[0].children[1].textContent,'Olá! Em que te posso ajudar?');
els['chat-input'].value='O que é a poupança?';els['chat-form'].emit('submit',{preventDefault(){}});
assert.equal(scheduled[0].delay,7500);assert.equal(send.disabled,true);assert.equal(els['chat-log'].children.length,2);assert.equal(els['chat-input'].value,'');
els['chat-input'].value='outra pergunta';els['chat-form'].emit('submit',{preventDefault(){}});assert.equal(scheduled.length,1);assert.equal(els['chat-input'].value,'outra pergunta');
scheduled[0].cb();assert.equal(send.disabled,false);assert.equal(els['chat-log'].children.length,3);assert.match(els['chat-log'].children[2].children[1].textContent,/Poupar/);
let prevented=false;els['chat-input'].emit('keydown',{key:'Enter',shiftKey:true,preventDefault(){prevented=true;}});assert.equal(prevented,false);
prevented=false;els['chat-input'].emit('keydown',{key:'Enter',shiftKey:false,isComposing:true,preventDefault(){prevented=true;}});assert.equal(prevented,false);
els['chat-input'].value='Dá-me um exemplo';els['chat-input'].emit('keydown',{key:'Enter',shiftKey:false,isComposing:false,preventDefault(){prevented=true;}});assert.equal(prevented,true);assert.ok(scheduled[1].delay>=500 && scheduled[1].delay<1000);
els['clear-chat'].emit('click');assert.deepEqual(cancelled,[2]);assert.equal(els['chat-log'].children.length,1);assert.equal(send.disabled,false);assert.equal(els['chat-status'].children.length,0);
console.log('Interface: envio, pausa de 7,5 s, indicador, bloqueio de envios duplicados, contexto, Enter/Shift+Enter, composição e cancelamento ao recomeçar verificados.');
