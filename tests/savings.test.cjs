const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ctx=vm.createContext({Intl});for(const name of ['knowledge.js','chatbot.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../docs/assets',name),'utf8'),ctx);
const bot=ctx.SavingsBot;let checks=0;
const questions=[
 ['Como começar a poupar com a mesada?','allowanceplan'],['Como posso gerir a minha mesada?','allowanceplan'],['Sou menor, como posso poupar?','allowanceplan'],
 ['Por onde começo a poupar?','habits'],['Ajuda-me a poupar dinheiro','habits'],['Quero criar uma rotina de poupança','habits'],
 ['O que significa poupança?','saving'],['Explica a poupanca','saving'],['Pq é importante poupar?','importance'],
 ['Não consigo poupar porque gasto tudo','selfcontrol'],['Como evitar gastar todo o dinheiro?','selfcontrol'],['Gasto sempre tudo sem pensar','selfcontrol'],
 ['Como controlar as minhas compras por impulso?','impulse'],['Como evitar compras impulsivas?','impulse'],
 ['Não sei para onde vai o dinheiro','expenselog'],['Como saber onde gasto o meu dinheiro?','expenselog'],['Não sei quanto gasto','expenselog'],['Como anotar despesas?','expenselog'],
 ['Como separar o dinheiro?','envelopes'],['O que é o método dos envelopes?','envelopes'],
 ['Esqueço-me de poupar','autosave'],['Como automatizar a poupança?','autosave'],['Devo guardar dinheiro logo que recebo?','autosave'],
 ['Gastei a minha poupança e quero recomeçar','setbacks'],['Não guardei dinheiro este mês','setbacks'],['Desisti de poupar','setbacks'],
 ['Poupar demora muito e fico desanimado','motivation'],['Como manter a motivação para juntar dinheiro?','motivation'],
 ['O prazo do meu objetivo é demasiado curto','goaladjust'],['A meta não cabe no orçamento','goaladjust'],
 ['Como poupar se não recebo todos os meses?','irregularincome'],['O meu rendimento varia de mês para mês','irregularincome'],
 ['Como poupar para duas metas ao mesmo tempo?','multiplegoals'],['Qual objetivo devo priorizar primeiro?','multiplegoals'],
 ['Recebi dinheiro de aniversário, como guardar?','giftmoney'],['Como poupar dinheiro do Natal?','giftmoney'],
 ['Como poupar sem deixar de me divertir?','leisure'],['Tenho de deixar de comprar tudo para poupar?','leisure'],
 ['Explica a regra 50/30/20','budgetrule'],['O que é 50 30 20?','budgetrule'],
 ['Os pequenos gastos fazem diferença?','smallcosts'],['Como reduzir despesas com cafés?','smallcosts'],
 ['Como poupar na escola?','schoolsaving'],['Como gastar menos nos lanches?','schoolsaving'],
 ['Como economizar em casa?','householdsaving'],['Como poupar no supermercado?','householdsaving'],
 ['Gasto muito dinheiro em skins','gaming'],['Como controlar compras nos jogos?','gaming'],
 ['Como poupar nas subscrições?','subscriptions'],['Uma experiência gratuita acaba por ser paga?','subscriptions'],
 ['Como comparar preços?','pricecompare'],['Esta promoção compensa?','pricecompare'],['O desconto vale a pena?','pricecompare'],
 ['Reparar ou comprar novo para poupar?','repairreuse'],['Comprar em segunda mão compensa?','repairreuse'],
 ['Como preparar despesas anuais?','annualexpenses'],['Como poupar para férias?','annualexpenses'],
 ['Qual é a diferença entre reserva e objetivo?','emergencygoal'],['A reserva de emergência tem prioridade sobre uma compra?','emergencygoal'],
 ['Quando devo usar a poupança?','usesavings'],['Posso mexer no dinheiro guardado?','usesavings'],
 ['A inflação faz a poupança perder valor?','inflationsaving'],['Dinheiro guardado perde poder de compra?','inflationsaving'],
 ['Só os ricos podem poupar?','savingsmyth'],['Poupar é ser avarento?','savingsmyth'],
 ['Quais são os erros ao poupar?','savingmistakes'],['O que evitar ao guardar dinheiro?','savingmistakes'],
 ['Prometem duplicar o meu dinheiro, é seguro?','savingsecurity'],['Como proteger a poupança de uma fraude?','savingsecurity'],
 ['Tenho de poupar todos os dias?','savingfrequency'],['Quantas vezes devo guardar dinheiro?','savingfrequency'],
 ['Poupar e economizar é a mesma coisa?','spendless'],['Qual a diferença entre gastar menos e poupar?','spendless'],
 ['Tenho pouco dinheiro mas quero poupar','little'],['Vale a pena guardar só 1 euro?','little'],['Como poupar se ganho pouco?','little'],
 ['Q posso fazer para poupar com a mesada?','allowanceplan'],['Como organizar a mesadaa?','allowanceplan'],
 ['Como melhorar a poupanca?','habits'],['Como controlar compras impulsivass?','impulse']
];
for(const [q,id] of questions){const a=bot.createSession().respond(q);assert.equal(a.topic,id,q+' => '+JSON.stringify(a));assert.ok(a.text.length>25);checks+=2;}
function say(s,q,id,pattern){const a=s.respond(q);assert.equal(a.topic,id,q+' => '+a.text);checks++;if(pattern){assert.match(a.text,pattern);checks++;}return a;}
// Budget guidance collects real inputs, rather than selecting an arbitrary saving percentage.
let s=bot.createSession();
say(s,'Quanto devo guardar da mesada?','allowanceplan',/Quanto recebes/);
say(s,'Recebo 50 € por mês','allowanceplan',/Quanto gastas/);
say(s,'Gasto 30 €','allowanceplan',/20,00/);
say(s,'E se gastar 40 €?','allowanceplan',/10,00/);
say(s,'Quanto sobrava?','allowanceplan',/10,00/);
s=bot.createSession();say(s,'Quanto posso poupar se recebo 50 € e gasto 50 €?','little',/não sobra dinheiro/);
s=bot.createSession();say(s,'Quanto posso poupar se recebo 50 € e gasto 60 €?','little',/desequilibrado/);
// Practical followups stay with the appropriate content, and tips vary across turns.
s=bot.createSession();say(s,'Gasto sempre tudo','selfcontrol');say(s,'Como faço isso passo a passo?','selfcontrol',/1\..*regista/);
const first=say(s,'Mais uma dica','selfcontrol').text,second=say(s,'Outra dica','selfcontrol').text;assert.notEqual(first,second);checks++;
say(s,'Mas eu gosto de comprar coisas','leisure',/equilibrar/);
say(s,'E se me esquecer?','autosave',/lembrete/);
say(s,'E se não conseguir?','little',/possível/);
say(s,'Como poupar na escola passo a passo?','schoolsaving');
s=bot.createSession();say(s,'Como poupar com a mesada e evitar compras por impulso?','allowanceplan',/Compras por impulso/);say(s,'Explica o segundo ponto','impulse');
s=bot.createSession();say(s,'Regra 50/30/20','budgetrule');say(s,'É obrigatório guardar 20%?','budgetrule',/Não é obrigatório/);
// New numerical examples retain the same memory and correction support.
s=bot.createSession();say(s,'Dá-me um exemplo de pequenos gastos','smallcosts',/130/);say(s,'De onde vêm os 130 €?','smallcosts',/2,50.*× 52/);say(s,'E se fossem 5 € por semana?','smallcosts',/260,00/);
s=bot.createSession();say(s,'Guardar 1 € por dia durante 30 dias','saving',/30,00/);say(s,'E se forem 2 € por dia?','saving',/60,00/);say(s,'E durante 1 ano?','saving',/730,00/);assert.match(s.respond('E durante 1 mês?').text,/períodos comparáveis/);checks++;
s=bot.createSession();say(s,'Quero comprar uma bicicleta que custa 120 € em 6 meses','goals',/20,00/);say(s,'E se já tenho 30 €?','goals',/15,00/);
// Topic descriptions, numeric questions, and nonfinancial questions must not become generic advice.
for(const [q,id] of [['O que é a política monetária?','monetary'],['O que é o PIB?','gdp'],['Qual a diferença entre poupar e investir?','saveinvest'],['Como calcular a taxa de desemprego?','unemployment']])say(bot.createSession(),q,id);
assert.equal(bot.createSession().respond('Quem ganhou o jogo ontem?').fallback,true);checks++;
console.log(checks+' verificações de poupança passaram: perguntas comuns, formas informais, respostas práticas, planeamento e cálculos.');
// Common false matches: age is not a deadline, and an amount in euros is not a topic about the EU.
s=bot.createSession();say(s,'Guardar 10 € por mês durante 2 anos','saving');say(s,'Tenho 15 anos e quero poupar','allowanceplan',/mesada/);
say(bot.createSession(),'Onde guardo a minha poupança?','deposits',/mealheiro/);
say(bot.createSession(),'Como poupar se não trabalho?','little',/possível/);
s=bot.createSession();say(s,'Como poupar na escola passo a passo?','schoolsaving',/material/);
console.log('Casos de ambiguidade também verificados: idade, local de poupança, ausência de rendimento e passos específicos.');
