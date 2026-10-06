const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const ctx=vm.createContext({Intl});
for(const name of ['knowledge.js','chatbot.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../docs/assets',name),'utf8'),ctx);
const bot=ctx.SavingsBot;
let checks=0;
function test(question,expected,context){const answer=bot.respond(question,context);assert.equal(answer.topic,expected,question+' => '+JSON.stringify(answer));checks++;return answer;}
for(const [q,t] of [
 ['O que é a poupança?','saving'],['como posso poupar?','habits'],['Como criar hábitos de poupança?','habits'],['Porque é importante poupar?','importance'],
 ['O que é economia?','economics'],['Custo de oportunidade','opportunity'],['Lei de Engel','engel'],['O que é inflação?','inflation'],
 ['Explica o PIB','gdp'],['O que é o VAB?','valueadded'],['O que é IDH?','hdi'],['O que é a globalização?','globalization'],
 ['O que é política monetária?','monetary'],['Orçamento do Estado','publicbudget'],['O que são externalidades?','externalities'],
 ['Desenvolvimento sustentável','sustainability'],['O que é economia circular?','circular'],['poupanca','saving'],['O que é inflacao','inflation'],
 ['O que é inflacaoo?','inflation']])test(q,t);
test('Dá-me um exemplo','inflation','inflation');
assert.match(test('Qual é a fórmula?','gdp','gdp').text,/PIB =/);checks++;
assert.match(test('Qual é a diferença entre poupança e investimento?','saveinvest').text,/reservar dinheiro/);checks++;
assert.match(bot.respond('Qual é a diferença entre inflação e deflação?').text,/Deflação|Deflacao|deflação/);checks++;
assert.match(test('Guardar 10 € por mês durante 2 anos','saving').text,/240/);checks++;
assert.match(test('Guardar 2,50 € por mês durante 12 meses','saving').text,/30/);checks++;
assert.match(test('Guardar 1 € por semana durante 1 ano','saving').text,/52/);checks++;
assert.match(test('Quero juntar 100 € em 3 meses','goals').text,/33,34/);checks++;
assert.match(test('Juros simples: capital 1000 €, taxa anual 3%, tempo 2 anos','simpleinterest').text,/1.?060/);checks++;
assert.match(test('Juros compostos: capital 1000 €, taxa anual 3%, tempo 2 anos','compoundinterest').text,/1.?060,90/);checks++;
assert.match(test('Taxa de poupança: poupança 100, rendimento 1000','savingsrate').text,/10%/);checks++;
assert.match(test('Taxa de desemprego: desempregados 200, população ativa 1000','unemployment').text,/20%/);checks++;
assert.match(test('Produtividade: produção 80, trabalhadores 4','productivity').text,/20 unidades/);checks++;
assert.match(test('Inflação: valor inicial 100, valor final 105','inflation').text,/5%/);checks++;
assert.match(test('Orçamento: rendimento 1000, despesas 800','budget').text,/200/);checks++;
assert.match(test('Quero juntar 100 € em 0 meses','goals').text,/maior do que zero/);checks++;
assert.match(test('Taxa de desemprego: desempregados 200, população ativa 0','unemployment').text,/positiva/);checks++;
assert.match(bot.respond('Qual é a taxa de inflação atual em Portugal?').text,/não consulta dados em tempo real/);checks++;
assert.equal(bot.respond('Quem ganhou o jogo de futebol?').fallback,true);checks++;
assert.equal(bot.respond('Onde descarrego o PDF?').action,'apresentacao');checks++;
for(const topic of bot.topics){assert.equal(bot.respond('Explica '+topic.label,null,topic.id).topic,topic.id);assert.ok(topic.answer && topic.detail && topic.example);checks+=2;}
console.log(checks+' verificações passaram; '+bot.topics.length+' temas.');
