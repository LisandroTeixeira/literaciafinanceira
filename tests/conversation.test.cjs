const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const ctx=vm.createContext({Intl});
for(const name of ['knowledge.js','chatbot.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../docs/assets',name),'utf8'),ctx);
const bot=ctx.SavingsBot;
let checks=0;
function conversation(){return bot.createSession();}
function reply(session,q,topic,pattern){const a=session.respond(q);assert.equal(a.topic,topic,q+' => '+a.text);checks++;if(pattern){assert.match(a.text,pattern,q+' => '+a.text);checks++;}return a;}
function isClarification(a){assert.equal(a.clarification,true,a.text);checks++;}
// Keep operands, identify computed numbers, and explain their origin.
let s=conversation();
reply(s,'O que é a mesada?','allowance',/60/);
reply(s,'De onde vêm os 60 €?','allowance',/5,00.*× 12 = 60,00/);
reply(s,'E os 15 €?','allowance',/20,00.*− 5,00.*= 15,00/);
reply(s,'Quanto é que ela recebe?','allowance',/20,00/);
reply(s,'E se fossem 10 € por mês?','allowance',/120,00/);
reply(s,'Qual era a quantia que ela guardava?','allowance',/10,00/);
reply(s,'Quanto teria no fim?','allowance',/120,00/);
reply(s,'Obrigado','allowance');
reply(s,'E durante dois anos?','allowance',/240,00/);
reply(s,'Qual é a fórmula?','allowance',/24 meses = 240,00/);
isClarification(reply(s,'E se fossem 20?','allowance',/Indica a que corresponde/));
reply(s,'E se guardasse 20 € por mês?','allowance',/480,00/);
isClarification(reply(s,'De onde vêm os 999 €?','allowance',/Não encontro 999/));
// Explicit topic switches must not carry money or periods into a different exercise.
reply(s,'O que é inflação?','inflation');
assert.equal(s.respond('Dá-me um exemplo').context.model.initial,100);checks++;
reply(s,'De onde vêm os 5%?','inflation',/105 − 100/);
reply(s,'E se o valor final fosse 110?','inflation',/10%/);
reply(s,'Como chegaste a esse resultado?','inflation',/110 − 100/);
reply(s,'Volta ao exemplo da Inês','allowance',/480,00/);
reply(s,'Volta ao primeiro exemplo da mesada','allowance',/60,00/);
reply(s,'Quem ganhou o jogo de futebol? ',null,/Não percebi/);
isClarification(reply(s,'Dá-me um exemplo',null,/A que tema/));
// New sessions, resetting, and replies that were prepared but cancelled have no inherited state.
const independent=conversation();isClarification(reply(independent,'De onde vêm os 60 €?',null));
s.reset();isClarification(reply(s,'Quanto guardava ela?',null));
s.prepare('Explica a mesada');isClarification(reply(s,'De onde vêm os 60 €?',null));
// Collect inputs across messages, without borrowing numbers from canned examples.
s=conversation();
assert.equal(reply(s,'Quero calcular juros compostos','compoundinterest',/capital inicial.*taxa anual.*prazo/).pending,true);checks++;
reply(s,'1000 €','compoundinterest',/taxa anual.*prazo/);
reply(s,'3%','compoundinterest',/prazo/);
reply(s,'2 anos','compoundinterest',/1060,90/);
reply(s,'De onde vêm os 60,90 €?','compoundinterest',/retirando o capital inicial/);
reply(s,'E com 5%?','compoundinterest',/1102,50/);
reply(s,'E se fossem juros simples?','simpleinterest',/1100,00/);
reply(s,'Qual era o capital?','simpleinterest',/1000,00/);
reply(s,'E durante 0 anos?','simpleinterest',/0,00.*de juros/);
reply(s,'E com taxa 150%?','simpleinterest',/até 100 anos/);
reply(s,'E com 2%?','simpleinterest',/1000,00/);
// Changed goals and initial balances; use ceiling to reach goals at cent precision.
s=conversation();
reply(s,'Quero juntar 300 €','goals',/prazo/);
reply(s,'6 meses','goals',/50,00/);
reply(s,'E se já tenho 60 €?','goals',/40,00/);
reply(s,'Quanto falta?','goals',/240,00/);
reply(s,'E em 3 meses?','goals',/80,00/);
reply(s,'E se a meta fosse 100 €?','goals',/13,34/);
reply(s,'E se já tenho 150 €?','goals',/já chega/);
reply(s,'E em 0 meses?','goals',/maior do que zero/);
reply(s,'E em 2 meses?','goals',/0,00/);
// Inverse problems keep their intention: changing the deposit changes the required deadline.
s=conversation();
reply(s,'Guardar 10 € por mês durante 2 anos','saving',/240/);
reply(s,'E quanto tempo para juntar 500 €?','saving',/50 meses/);
reply(s,'E se guardar 20 €?','saving',/25 meses/);
reply(s,'E se já tenho 100 €?','saving',/20 meses/);
reply(s,'E durante 10 meses?','saving',/300,00/);
reply(s,'Quanto falta?','saving',/200,00/);
reply(s,'E se guardasse 0 € por mês?','saving',/100,00/);
reply(s,'Quanto tempo para atingir a meta?','saving',/maior do que zero/);
// Budget, percentages, productivity and unemployment support operand corrections.
s=conversation();
reply(s,'Orçamento: rendimento 1000, despesas 800','budget',/200/);
reply(s,'E se as despesas fossem 900?','budget',/100,00/);
reply(s,'E se recebesse 1200?','budget',/300,00/);
reply(s,'De onde vêm os 300 €?','budget',/1200,00.*− 900,00/);
reply(s,'Dá-me um exemplo de taxa de poupança','savingsrate',/10%/);
reply(s,'E se a poupança fosse 250?','savingsrate',/25%/);
reply(s,'E se o rendimento fosse 0?','savingsrate',/maior do que zero/);
reply(s,'E se o rendimento fosse 2000?','savingsrate',/12,5%/);
reply(s,'Dá-me um exemplo de produtividade','productivity');
reply(s,'E com 8 trabalhadores?','productivity',/10 unidades/);
reply(s,'Como chegaste a esse resultado?','productivity',/80 ÷ 8/);
reply(s,'Dá-me um exemplo de desemprego','unemployment');
reply(s,'E com 200 desempregados?','unemployment',/20%/);
reply(s,'E se a população ativa fosse 2000?','unemployment',/10%/);
reply(s,'Dá-me um exemplo de VAB','valueadded');
reply(s,'De onde vêm os 300 €?','valueadded',/500 − 200/);
reply(s,'E se o consumo intermédio fosse 100 €?','valueadded',/400/);
reply(s,'Dá-me um exemplo de saldo comercial','tradebalance');
reply(s,'De onde vêm os −20?','tradebalance',/100 − 120/);
reply(s,'E se as exportações fossem 150?','tradebalance',/30/);
reply(s,'Dá-me um exemplo de Orçamento do Estado','publicbudget');
reply(s,'De onde vêm os −10?','publicbudget',/90 − 100/);
reply(s,'E se as receitas fossem 120?','publicbudget',/20/);
// Numeric values outside supported arithmetic are only quoted from the shown example.
s=conversation();reply(s,'Dá-me um exemplo da lei de Engel','engel');
reply(s,'Onde aparecem os 40% nesse exemplo?','engel',/200.*500.*40%/);
isClarification(reply(s,'E os 999 € desse exemplo?','engel',/Não encontro 999/));
// A button on an older message must use that message's own snapshot, not the latest topic/data.
s=conversation();const old=s.respond('Guardar 5 € por mês durante 12 meses');
reply(s,'E se guardar 10 € por mês?','saving',/120/);
reply(s,'O que é inflação?','inflation');
const anchored=s.respond('Dá-me um exemplo',old.context);
assert.equal(anchored.topic,'saving');assert.match(anchored.text,/60,00/);assert.doesNotMatch(anchored.text,/120,00/);checks+=3;
// Bound memory and reject unrelated/current-statistics questions without fabricated calculations.
for(let i=0;i<35;i++)s.respond('Obrigado');
reply(s,'Qual é a taxa de inflação atual em Portugal?',null,/não consulta dados/);
reply(s,'Onde descarrego a apresentação?',null,/PDF/);
console.log(checks+' verificações de conversas passaram: memória, dados em várias mensagens, referências, alterações, mudanças de assunto e isolamento.');
// Edge cases that previously produced a plausible answer with the wrong assumptions.
s=conversation();reply(s,'Quero juntar 300 € em 6 meses, já tenho 60 €','goals',/40,00/);
s=conversation();reply(s,'Quero poupar cinco por mês','saving',/prazo/);reply(s,'doze meses','saving',/60,00/);
s=conversation();reply(s,'Juros compostos: capital 1000 €, taxa 3% ao mês, tempo 2 anos','compoundinterest',/não pode ser usada/);reply(s,'Taxa anual 3%','compoundinterest',/1060,90/);
s=conversation();assert.equal(reply(s,'Guardar 10 € por mês durante 2 anos com juros 3%','contributioninterest',/efetiva anual, nominal anual ou mensal/).pending,true);checks++;
s=conversation();reply(s,'Guardar 5 € por mês durante 12 meses','saving',/60/);reply(s,'E se fossem 10 € em vez de 5 €?','saving',/120,00/);
reply(s,'Isso está errado','saving',/corrigir/);reply(s,'Quantia 2,50 €','saving',/30,00/);
isClarification(reply(s,'De onde vêm os 999 €?','saving'));
isClarification(reply(s,'capital 1e309','saving',/notação científica/));
reply(s,'Qual é a diferença entre poupança e investimento?','saveinvest',/Investir/);
reply(s,'Dá-me um exemplo de produtividade','productivity');reply(s,'E com 0 trabalhadores?','productivity',/maior do que zero/);reply(s,'E com 5 trabalhadores?','productivity',/16 unidades/);
// Diverse topics retain their own followups, rather than falling back to the first example.
for(const topic of bot.topics){const visitor=conversation();const initial=visitor.respond('Explica '+topic.label);if(initial.topic!==topic.id)continue;const example=visitor.respond('Podes dar outro exemplo?');assert.equal(example.topic,topic.id);checks++;assert.ok(example.text.length>20);checks++;}
console.log('Total: '+checks+' verificações de conversas, incluindo limites, correções e seguimentos dos temas reconhecidos.');
