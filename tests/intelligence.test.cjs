const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ctx=vm.createContext({Intl});for(const n of ['knowledge.js','chatbot.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../docs/assets',n),'utf8'),ctx);
const bot=ctx.SavingsBot;let checks=0;
function say(s,q,topic,pattern){const a=s.respond(q);assert.equal(a.topic,topic,q+' => '+JSON.stringify(a));checks++;if(pattern){assert.match(a.text,pattern,q);checks++;}return a;}
function expect(s,q,pattern){const a=s.respond(q);assert.match(a.text,pattern,q+' => '+a.text);checks++;return a;}
// Paraphrases combine ideas instead of requiring one memorised question.
for(const [q,id] of [
 ['Se tenho 1000 na conta significa que poupei 1000 este mês?','flowstock'],
 ['O salário bruto ou líquido é que conta para a poupança?','disposableincome'],
 ['Que fatores influenciam a capacidade de poupar?','savingfactors'],
 ['Poupar e pagar dívidas, qual devo fazer primeiro?','debtandsaving'],
 ['Se aumentar o salário vou poupar mais?','incomerise'],
 ['Posso levantar um depósito antes do prazo?','earlywithdrawal'],
 ['O que é entesouramento?','hoarding'],
 ['Não sobra nada no fim do mês','zerosaving'],
 ['O que é poupança negativa?','negativesaving'],
 ['A rentabilidade passada garante o mesmo retorno?','savingreturns'],
 ['Como poupar em família?','familyplan'],
 ['Os amigos fazem pressão para comprar, como evito gastar?','socialpressure'],
 ['Deixar de comer para poupar é boa ideia?','savingbalance'],
 ['O que é o horizonte temporal da poupança?','savinghorizon'],
 ['Se transferir entre contas tenho nova poupança?','savingtransfer']
])say(bot.createSession(),q,id);
let s=bot.createSession();say(s,'Tenho cem euros, quero juntar quinhentos euros em oito meses','goals',/50,00/);
s=bot.createSession();say(s,'Ponho de lado vinte euros mensalmente durante dois anos','saving',/480,00/);say(s,'E se forem trinta euros por mês?','saving',/720,00/);
s=bot.createSession();say(s,'Já tenho 100 €, quanto tempo para juntar 500 € guardando 20 € por mês?','goals',/20 meses/);
s=bot.createSession();say(s,'Quero ter 120 € em 12 semanas, já tenho 24 €','goals',/8,00/);
// A listed expense is not mistaken for the total. Corrections update a named category only.
s=bot.createSession();say(s,'Recebo 1000 € e gasto 300 € em renda, 150 € em comida e 50 € em transportes por mês','budget',/500,00/);
say(s,'E se a renda for 350 €?','budget',/450,00/);say(s,'De onde vêm os 450 €?','budget',/1000,00.*− 550,00.*450,00/);
say(s,'Qual é a minha taxa de poupança?','savingsrate',/45%/);
s=bot.createSession();assert.equal(s.respond('Recebo 1000 € por mês e tenho despesas de 6000 € por ano').clarification,true);checks++;
s=bot.createSession();assert.equal(s.respond('Recebo 1000, gasto no total 600 e pago 300 em renda e 200 em comida').clarification,true);checks++;
// Relate a goal to the earlier budget only on an explicit request, and retain both on topic switches.
s=bot.createSession();say(s,'Recebo 100 € por mês e gasto 80 €','budget',/20,00/);say(s,'Quero juntar 120 € em 3 meses','goals',/40,00/);say(s,'Isso cabe no meu orçamento?','goals',/ultrapassa.*20,00/);say(s,'E em 6 meses?','goals',/20,00/);say(s,'Isso cabe no meu orçamento?','goals',/cabe nessa margem/);
say(s,'O que é entesouramento?','hoarding');say(s,'Volta ao exemplo da meta','goals',/20,00/);
// New slots are gathered over multiple turns and ambiguous rates require clarification.
s=bot.createSession();assert.equal(say(s,'Quero calcular reforços com juros','contributioninterest').pending,true);checks++;
say(s,'100 €','contributioninterest',/taxa de juro/);say(s,'3%','contributioninterest',/efetiva anual/);say(s,'Efetiva anual','contributioninterest',/prazo/);say(s,'12 meses','contributioninterest',/início ou no fim/);say(s,'No fim do mês','contributioninterest',/1216,41/);say(s,'Quanto são os juros?','contributioninterest',/16,41/);
say(s,'E se for no início do mês?','contributioninterest',/1219,41/);say(s,'E se guardar 200 €?','contributioninterest',/2438,82/);
say(s,'O que é inflação?','inflation');say(s,'Volta ao exemplo dos reforços com juros','contributioninterest',/2438,82/);say(s,'E durante 2 anos?','contributioninterest',/24 meses/);
// Independent oracle: loop through month-by-month balances instead of using the annuity formula.
for(const basis of ['efetiva anual','nominal anual','mensal'])for(const rate of [0,3])for(const timing of ['início','fim'])for(const years of [1,2]){
 const visitor=bot.createSession();const a=say(visitor,`Guardar 100 € por mês durante ${years} anos com capital inicial 500 € e taxa ${basis} de ${rate}%, no ${timing} do mês`,'contributioninterest');
 let expected=500;const r=basis==='efetiva anual'?Math.pow(1+rate/100,1/12)-1:basis==='nominal anual'?rate/1200:rate/100;
 for(let month=0;month<years*12;month++){if(timing==='início')expected+=100;expected*=1+r;if(timing==='fim')expected+=100;}
 const rounded=new Intl.NumberFormat('pt-PT',{style:'currency',currency:'EUR'}).format(expected);assert(a.text.includes('Montante final bruto: '+rounded),a.text+' != '+rounded);checks++;
}
s=bot.createSession();say(s,'Guardar 100 € por mês durante 12 meses com taxa efetiva anual de 3%, no fim do mês','contributioninterest');
const net=say(s,'E com imposto de 28% e custos totais de 5 €?','contributioninterest',/1206,82/);assert.equal(net.model.rate,3);assert.equal(net.model.taxRate,28);checks+=2;
s=bot.createSession();say(s,'Guardar 100 € por mês durante 12 meses com taxa efetiva anual de 3%, no fim do mês','contributioninterest');const pending=s.prepare('E se guardar 500 €?');assert.equal(pending.model.amount,500);assert.equal(s.respond('Qual era o reforço mensal?').model.amount,100);checks+=2;s.reset();assert.equal(s.respond('Quanto eram os juros?').clarification,true);checks++;
// Other practical calculations and precision when comparing different package sizes.
s=bot.createSession();say(s,'Quero calcular uma reserva de emergência','emergencyamount',/despesas mensais/);say(s,'600 €','emergencyamount',/Quantos meses/);say(s,'3 meses','emergencyamount',/1800,00/);say(s,'E 6 meses?','emergencyamount',/3600,00/);
s=bot.createSession();say(s,'Que valor real têm 1000 € com inflação de 5%?','nominalreal',/952,38/);say(s,'E durante 2 anos?','nominalreal',/907,03/);
s=bot.createSession();say(s,'Qual é a taxa real com juro nominal de 3% e inflação de 5%?','realinterest',/-1,9048%/);
s=bot.createSession();say(s,'O preço é 50 € com desconto de 20%','pricecompare',/40,00/);say(s,'E se o desconto for 30%?','pricecompare',/35,00/);say(s,'De onde vêm os 15 €?','pricecompare',/desconto/);
s=bot.createSession();say(s,'Qual compensa, 500 g por 3 € ou 1 kg por 5 €?','pricecompare',/6,00.*por kg[\s\S]*5,00.*por kg[\s\S]*opção B/);
s=bot.createSession();say(s,'Quero guardar 10% do rendimento, recebo 1000 €','savingsrate',/100,00/);say(s,'E se guardar 20%?','savingsrate',/200,00/);
s=bot.createSession();say(s,'Tenho um seguro de 600 €, quanto guardar por mês para preparar essa despesa anual?','annualexpenses',/50,00/);
s=bot.createSession();say(s,'Custo adicional 600 €, reduz despesas em 120 € por ano. Qual o prazo de recuperação?','efficiencysaving',/5 anos/);
// Short concept followups answer the asked facet, while unrelated queries do not inherit it.
s=bot.createSession();say(s,'O que é uma reserva para imprevistos?','emergency');say(s,'E onde guardar isso?','emergency',/facilidade de acesso/);
s=bot.createSession();say(s,'Explica compras por impulso','impulse');say(s,'Quanto tempo devo esperar?','impulse',/tempo obrigatório/);
s=bot.createSession();say(s,'Explica depósito a prazo','deposittypes');say(s,'Qual é melhor?','deposittypes',/Depende/);
// Arithmetic obeys precedence and parentheses and rejects division by zero.
for(const [q,r] of [['Quanto é 20 vezes 12?',/240/],['Quanto é (100 - 40) / 3?',/20/],['Quanto dá 2,50 + 3,25?',/5,75/],['Calcula 2 + 3 * 4',/14/]])expect(bot.createSession(),q,r);
assert.equal(bot.createSession().respond('Calcula 5 / 0').clarification,true);checks++;
assert.equal(bot.createSession().respond('Quem ganhou o jogo ontem?').fallback,true);checks++;
assert.equal(bot.createSession().respond('Taxa de inflação atual em Portugal?').calculation,undefined);checks++;

s=bot.createSession();say(s,'Guardar 1 € por mês durante 120 meses com taxa efetiva anual de 0%, no fim do mês','contributioninterest',/120,00/);
// More free-form wording and unsupported conditions must not produce invented arithmetic.
for(const [q,id,pattern] of [
 ['Queria aprender a gerir o meu dinheiro, o que faço?','habits',/objetivo/],
 ['O dinheiro desaparece e nem sei em quê','expenselog',/anota/],
 ['Tenho 200 guardados e quero chegar aos 500 daqui a 10 meses','goals',/30,00/],
 ['É melhor guardar logo no início ou só o que sobrar?','autosave',/recebes/],
 ['Para quê guardar se a inflação come o dinheiro?','inflationsaving',/poder de compra/],
 ['Se não sobrar nada estou a fazer mal?','little',/falha/],
 ['Qual é o melhor banco para a minha poupança?','deposits',/comparar/],
 ['Se gastar menos 2 euros em café todos os dias, quanto consigo em 30 dias?','spendless',/60,00/],
 ['Guardar duzentos e cinquenta euros todos os meses durante dois anos','saving',/6000,00/],
 ['Guardar mil e duzentos euros por mês durante um ano','saving',/14.?400,00/]
])say(bot.createSession(),q,id,pattern);
s=bot.createSession();say(s,'Guardar 100 € por mês durante 12 meses com taxa efetiva anual de 3%, no fim do mês','contributioninterest');assert.equal(s.respond('E se forem 10 € por semana?').clarification,true);checks++;
s=bot.createSession();const unsupported=s.respond('Guardar 100 € por mês durante 12 meses com taxa efetiva anual 3%, capitalização trimestral, no fim do mês');assert.equal(unsupported.invalid,true);assert.equal(unsupported.calculation,undefined);checks+=2;
s=bot.createSession();assert.equal(s.respond('Preço 50 €, desconto 120%').invalid,true);checks++;
s=bot.createSession();assert.equal(s.respond('Qual o valor real de 1000 € com inflação de -100%?').invalid,true);checks++;
s=bot.createSession();say(s,'Guardar 10 € por mês durante 12 meses','saving');const vague=s.respond('E isso aí, como?');assert.equal(vague.clarification,true);checks++;say(s,'E durante 2 anos?','saving',/240,00/);
// An explicitly anchored response still has the original numbers after other calculations.
s=bot.createSession();const anchored=s.respond('Guardar 100 € por mês durante 12 meses com taxa efetiva anual de 3%, no fim do mês');s.respond('E se guardar 500 €?');const original=s.respond('Quanto são os juros?',anchored.context);assert.match(original.text,/16,41/);checks++;
console.log(checks+' verificações novas passaram: frases, orçamento, metas, reforços, inflação, descontos, memória e aritmética.');
