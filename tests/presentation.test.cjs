const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ctx=vm.createContext({Intl});for(const name of ['knowledge.js','chatbot.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../docs/assets',name),'utf8'),ctx);
const bot=ctx.SavingsBot,data=ctx.SavingsPresentation;let checks=0;
function say(s,q,topic,pattern){const a=s.respond(q);assert.equal(a.topic,topic,q+' => '+JSON.stringify(a));checks++;if(pattern){assert.match(a.text,pattern,q+' => '+a.text);checks++;}return a;}
function test(q,pattern){const a=bot.createSession().respond(q);assert.match(a.text,pattern,q+' => '+a.text);assert.equal(a.fallback,undefined);checks+=2;return a;}
// Every prepared question is sent through the actual public conversation API.
for(const entry of data.topicos)for(const q of entry.perguntas){
 const s=bot.createSession();if(q==='Qual é a diferença?')s.respond('O que são despesas necessárias e supérfluas?');
 const a=s.respond(q);assert.equal(a.fallback,undefined,q);assert.equal(a.pending,undefined,q);assert(a.text.length>35,q);assert(a.presentationSlides?.some(p=>entry.slides.includes(p)),q+' => '+JSON.stringify(a));checks+=4;
}
// Exercise examples, paraphrased and in lists, must be classified with reasons.
for(const [q,pattern] of [
 ['A renda da casa é uma despesa necessária?',/necessária.*habitação/],
 ['Alimentação é supérflua?',/Alimentação — necessária/],
 ['Água, luz e gás são indispensáveis?',/necessária.*serviços básicos/],
 ['Ir de autocarro para a escola é dispensável?',/necessária.*escola/],
 ['Medicamentos necessários são supérfluos?',/necessária.*medicamentos/],
 ['Roupa básica é necessária?',/Roupa e calçado — necessária/],
 ['Produtos de higiene são necessários?',/Higiene — necessária/],
 ['Roupa de marca por preferência é necessária?',/supérflua/],
 ['Trocar um telemóvel que funciona por preferência é necessário?',/supérflua/],
 ['Comer fora frequentemente por opção é essencial?',/supérflua/],
 ['Comprar joias é necessário?',/supérflua/],
 ['Acessórios de luxo são necessários?',/supérflua/],
 ['Um carro de luxo é necessário?',/supérflua na parte de luxo/]
])test(q,pattern);
let s=bot.createSession();say(s,'O que escrever na coluna A?','necessaryexpenses',/renda.*alimentação.*higiene/i);
say(s,'E na coluna B?','superfluousexpenses',/marca.*telemóvel.*joias/);
say(s,'Classifica renda e joias','expenseclassification',/Habitação — necessária[\s\S]*Joias.*supérflua/);
s=bot.createSession();say(s,'Um telemóvel é necessário?','expenseclassification',/depende do contexto/);say(s,'E se o meu avariou?','expenseclassification',/pode ser necessária/);say(s,'E se funciona e quero um novo só por preferência?','expenseclassification',/supérflua/);
say(s,'O que é a inflação?','inflation');assert.equal(s.respond('E se avariou?').presentationState,undefined);checks++;
s=bot.createSession();say(s,'Roupa é sempre necessária?','expenseclassification',/depende do contexto/);say(s,'E se é um uniforme para a escola?','expenseclassification',/necessária/);
s=bot.createSession();say(s,'Comer fora é sempre supérfluo?','expenseclassification',/depende do contexto/);say(s,'E se não tenho alternativa?','expenseclassification',/pode ser necessária/);
// Slide references answer the content; direct file requests still open the presentation.
for(const [n,pattern] of [[1,/Rui Faria.*Lisandro Teixeira/],[2,/rendimento/],[3,/rendimento.*despesa/],[4,/segurança/],[5,/objetivo.*regularmente.*gastos/],[6,/educação.*viagens/],[7,/equipamentos/],[8,/lista.*objetivo.*mealheiro/],[9,/imprevisto.*dívida/],[10,/mealheiro.*conta/],[11,/coluna/],[12,/despesa necessária/],[13,/QR Code/],[14,/Pequenas quantias/]])test('Explica o slide '+n,pattern);
s=bot.createSession();assert.equal(s.respond('Explica o slide 15').clarification,true);checks++;assert.equal(s.respond('Onde descarrego o PDF?').action,'apresentacao');checks++;
assert.equal(bot.createSession().respond('Qual é a diferença?').topic,null);checks++;
// The visitor can refer to a particular step without triggering a different topic.
s=bot.createSession();say(s,'Resume as seis dicas','savingtips',/seis dicas/);say(s,'Explica a segunda dica','savingtips',/lista.*compras/);say(s,'Porque a sexta dica?','savingtips',/mealheiro.*riscos/);const a=s.respond('Explica o sétimo ponto');assert(a.clarification||a.fallback);checks++;
s=bot.createSession();say(s,'Quais são os três passos?','habits',/três hábitos/);say(s,'Explica o terceiro passo','habits',/Controlar gastos/);
s=bot.createSession();say(s,'Explica a frase de Warren Buffett','savingquote',/quantia.*necessário/);say(s,'É obrigatório poupar antes de tudo?','savingquote',/Não.*necessidades essenciais/);
s=bot.createSession();say(s,'Quais são os destinos da poupança?','destinations',/casa.*educação.*viagens/i);say(s,'Qual vem primeiro?','destinations',/prioridade.*essenciais/);
// Formula examples retain arithmetic, changed operands, and explicit references to results.
s=bot.createSession();say(s,'Qual é a fórmula da poupança?','saving',/100.*80.*20/);say(s,'De onde vêm os 20 €?','saving',/100,00.*− 80,00.*20,00/);say(s,'E se as despesas forem 90 €?','saving',/10,00/);
s=bot.createSession();say(s,'O que é a poupança?','saving');say(s,'Dá-me um exemplo','saving',/50.*40.*10/);say(s,'E se recebo 60 €?','saving',/20,00/);say(s,'De onde vêm os 20 €?','saving',/60,00.*− 40,00/);
s=bot.createSession();say(s,'Porque evitar pequenas compras desnecessárias?','smallcosts');say(s,'Dá-me um exemplo','smallcosts',/2.*30.*60/);say(s,'E se guardar 3 € por dia?','smallcosts',/90,00/);
// A prepared or cancelled reply cannot alter state. Old message buttons use their own subject.
s=bot.createSession();const phone=s.respond('Um telemóvel é necessário?');s.prepare('Comer fora é sempre supérfluo?');say(s,'E se avariou?','expenseclassification',/equipamento/);s.respond('Roupa é sempre necessária?');assert.match(s.respond('E se avariou?',phone.context).text,/equipamento/);checks++;
s.reset();assert.equal(s.respond('E se avariou?').topic,null);checks++;
test('Explica a página três',/rendimento.*despesa/);test('Explica o terceiro slide',/100.*80.*20/);test('Quem são os autores do trabalho?',/Rui Faria.*Lisandro Teixeira/);test('Que problemas posso ter se nunca guardar dinheiro?',/imprevisto.*dívida/);test('Um mealheiro é seguro?',/roubado.*danificado.*perdido/);test('Qual é a diferença entre despesas essenciais e opcionais?',/despesa necessária.*supérflua/);
console.log(checks+' verificações da apresentação passaram: 97 perguntas, 14 slides, classificação contextual, seguimentos e cálculos.');
