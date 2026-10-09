(function(root){
  'use strict';
  const topics=root.SavingsKnowledge;
  const normalize=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const writtenNumbers={um:1,uma:1,dois:2,duas:2,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,cem:100};
  const normNumber=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/−/g,'-').replace(/\b(um|uma|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|cem)\b(?=\s*(?:€|euros?\b|por cento\b|%|anos?\b|mes(?:es)?\b|semanas?\b|por (?:mes|semana|ano|dia)\b))/g,w=>writtenNumbers[w]);
  const money=value=>new Intl.NumberFormat('pt-PT',{style:'currency',currency:'EUR'}).format(value);
  const number=value=>new Intl.NumberFormat('pt-PT',{maximumFractionDigits:4}).format(value);
  const NUM='(-?(?:[0-9]{1,3}(?:[. ][0-9]{3})+(?:,[0-9]+)?|[0-9]+(?:[.,][0-9]+)?))';
  const parse=s=>Number(s.replace(/ /g,'').replace(/\.(?=\d{3}(?:\D|$))/g,'').replace(',','.'));
  const find=(text,pattern)=>{const m=text.match(new RegExp(pattern,'i'));return m?parse(m[1]):null;};
  const field=(text,labels)=>find(text,'(?:'+labels+')\\s*(?:(?:de|e|era|eram|fosse|fossem|seria|seriam|for|seja|sao)\\s+|:\\s*|=\\s*)?\\s*'+NUM);
  const result=(text,topic='saving',model)=>({text,topic,calculation:true,...(model?{model}: {})});
  function calculate(raw){
    const text=normNumber(raw);
    if(!/\d/.test(text))return null;
    const duration=text.match(new RegExp(NUM+'\\s*(anos?|mes(?:es)?|semanas?|dias?)\\b'));
    const periods=duration?parse(duration[1]):null;
    const unit=duration?duration[2]:null;
    if(/juros? (simples|compostos)/.test(text)){
      const type=/compostos/.test(text)?'compoundinterest':'simpleinterest';
      const capital=field(text,'capital(?: inicial)?') ?? find(text,NUM+'\\s*€\\s*(?:a|com)\\s');
      const rate=find(text,NUM+'\\s*%');
      if(capital===null || rate===null || periods===null || !unit.startsWith('ano') || capital<0 || periods<0 || rate<0 || periods>100 || rate>100 || /mensal|meses|semanas|mensais|ao mes|por mes/.test(text)){
        return result('Para este cálculo, indica um capital inicial não negativo, a taxa anual em % e o tempo em anos (até 100 anos).\nExemplo: «Juros '+(type==='compoundinterest'?'compostos':'simples')+': capital 1000 €, taxa anual 3%, tempo 2 anos». O exercício supõe que não há reforços, impostos nem comissões.',type);
      }
      const total=type==='simpleinterest'?capital*(1+rate/100*periods):capital*Math.pow(1+rate/100,periods);
      if(!Number.isFinite(total) || total>1e15)return result('Os valores são demasiado grandes para este exercício. Usa valores mais pequenos.',type);
      return result((type==='simpleinterest'?'Juros simples':'Juros compostos')+':\n'+(type==='simpleinterest'?number(capital)+' × '+number(rate/100)+' × '+number(periods)+' = '+money(total-capital)+' de juros.':number(capital)+' × (1 + '+number(rate/100)+')^'+number(periods)+' = '+money(total)+'.')+'\nMontante final: '+money(total)+'.\nJuros: '+money(total-capital)+'.\n\nPressupostos: taxa anual constante; '+(type==='compoundinterest'?'capitalização anual; ':'')+'sem reforços, impostos ou comissões.',type,{kind:type,capital,rate,time:periods,timeUnit:'ano'});
    }
    const periodic=text.match(new RegExp(NUM+'\\s*(?:€|euros?)?\\s*(?:por|a cada|todos os|todas as)\\s*(mes|semana|ano|dia)\\b'));
    if(periodic && duration && /poup|guard|junt|economiz/.test(text)){
      const amount=parse(periodic[1]), originUnit=periodic[2], destination=unit;
      if(amount<0 || periods<0)return result('Usa uma quantia e um prazo não negativos.');
      if(/com juros|juros de|juros a|com comissoes|com impostos/.test(text))return result('Para juntar depósitos e juros, são necessárias as datas dos depósitos e as condições de capitalização. Podemos somar depósitos sem juros ou calcular juros sobre um capital inicial.');
      const initial=field(text,'(?:ja tenho|ja tinha|saldo inicial|comeco com)') ?? 0;
      return evaluate({kind:'periodic',amount,unit:originUnit,time:periods,timeUnit:unitId(destination),initial},'saving');
    }
    if(/juntar|objetivo|meta/.test(text) && duration && unit.startsWith('mes')){
      const target=find(text,'(?:juntar|objetivo|meta)\\s*(?:de |e |: |:)?'+NUM+'\\s*(?:€|euros?)?');
      if(target!==null){
        if(target<0 || periods<=0)return result('O objetivo deve ser não negativo e o número de meses deve ser maior do que zero.','goals');
        const initial=field(text,'(?:ja tenho|ja tinha|saldo inicial|comeco com)');
        if(initial!==null)return evaluate({kind:'goal',target,time:periods,timeUnit:'mes',initial},'goals');
        // Arredondar para cima ao cêntimo para atingir a meta.
        const amount=Math.ceil((target/periods)*100-1e-8)/100;
        return result(number(target)+' € ÷ '+number(periods)+' meses = '+money(amount)+' por mês (arredondado por excesso ao cêntimo).\n\nPressupostos: partes de zero e não há juros, impostos ou comissões. Adapta o prazo às tuas possibilidades.','goals',{kind:'goal',target,time:periods,timeUnit:'mes',initial:0});
      }
    }
    if(/taxa de poupanca/.test(text)){
      const saving=field(text,'poupanca'), income=field(text,'rendimento(?: disponivel)?');
      if(saving!==null && income!==null){if(income<=0)return result('Para calcular esta taxa, o rendimento disponível tem de ser maior do que zero.','savingsrate');return result(number(saving)+' ÷ '+number(income)+' × 100 = '+number(saving/income*100)+'% de taxa de poupança.','savingsrate',{kind:'savingsrate',saving,income});}
    }
    if(/taxa de desemprego/.test(text)){
      const unemployed=field(text,'desempregados'),active=field(text,'(?:populacao )?ativa');
      if(unemployed!==null && active!==null){if(active<=0 || unemployed<0 || unemployed>active)return result('A população ativa deve ser positiva e incluir todos os desempregados indicados.','unemployment');return result(number(unemployed)+' ÷ '+number(active)+' × 100 = '+number(unemployed/active*100)+'% de taxa de desemprego.','unemployment',{kind:'unemployment',unemployed,active});}
    }
    if(/produtividade/.test(text)){
      const output=field(text,'producao'),workers=field(text,'trabalhadores');
      if(output!==null && workers!==null){if(workers<=0 || output<0)return result('Indica produção não negativa e um número de trabalhadores maior do que zero.','productivity');return result(number(output)+' ÷ '+number(workers)+' = '+number(output/workers)+' unidades por trabalhador. A unidade de produção é a que indicaste.','productivity',{kind:'productivity',output,workers});}
    }
    if(/variacao|crescimento|inflacao/.test(text)){
      const initial=field(text,'(?:valor |preco |pib )?inicial'),final=field(text,'(?:valor |preco |pib )?final');
      if(initial!==null && final!==null){
        const topic=/crescimento/.test(text)?'growth':'inflation';
        if(initial<=0 || final<0)return result('Para este exercício, indica valor inicial positivo e valor final não negativo.',topic);
        return result('('+number(final)+' − '+number(initial)+') ÷ '+number(initial)+' × 100 = '+number((final-initial)/initial*100)+'% de variação.'+(/inflacao/.test(text)?'\n\nSó corresponde a uma medida de inflação se os valores representarem um índice ou cabaz adequado; o preço de um único bem não mede a inflação geral.':''),topic,{kind:topic,initial,final});
      }
    }
    const income=field(text,'rendimento(?: disponivel)?|receitas?'),expense=field(text,'despesas?|consumo');
    if(income!==null && expense!==null && /saldo|orcamento|poupanca|poupar|sobr/.test(text)){
      if(income<0 || expense<0)return result('Indica rendimento e despesas não negativos.','budget');
      return result(number(income)+' € − '+number(expense)+' € = '+money(income-expense)+'.\n'+(income>=expense?'Este é o saldo disponível no exemplo, se não houver outras despesas.':'O saldo é negativo: as despesas indicadas excedem o rendimento.'),'budget',{kind:'budget',income,expense});
    }
    return null;
  }
  function near(a,b){
    if(a.length<6 || b.length<6 || Math.abs(a.length-b.length)>1)return false;
    if(a===b)return true;
    let i=0,j=0,edits=0;
    while(i<a.length && j<b.length){if(a[i]===b[j]){i++;j++;continue;}if(++edits>1)return false;if(a.length===b.length && a[i]===b[j+1] && a[i+1]===b[j]){i+=2;j+=2;continue;}if(a.length>b.length)i++;else if(b.length>a.length)j++;else{i++;j++;}}
    return edits+(i<a.length || j<b.length?1:0)<=1;
  }
  const indexed=topics.map(topic=>({topic,aliases:topic.aliases.map(normalize)}));
  function queryText(raw){
    let text=normalize(raw).replace(/\bguito\b/g,'dinheiro').replace(/\bgrana\b/g,'dinheiro').replace(/\bguardar uma parte\b/g,'poupar').replace(/\bpq\b/g,'por que').replace(/\bq\b/g,'que').replace(/\bn\b/g,'nao').replace(/\btb\b/g,'tambem');
    const vocabulary=['poupanca','orcamento','objetivo','despesas','impulso','subscricoes','mesada'];
    text=text.split(' ').map(word=>vocabulary.find(term=>word!==term && near(word,term)) || word).join(' ');
    return text;
  }
  function rankings(text){
    text=queryText(text);
    let matches=indexed.map(({topic,aliases})=>{
      const exact=aliases.filter(alias=>!(topic.id==='eu' && alias==='euro' && /\b(?:\d+|um|dois|cinco) euros?\b/.test(text)) && (' '+text+' ').includes(' '+alias+' '));
      const phraseScore=exact.length?Math.max(...exact.map(a=>4+a.split(' ').length*3+a.length/30))+.1*exact.length:0;
      const matched=(topic.intents||[]).filter(group=>group.every(pattern=>pattern.test(text)));
      const intentScore=matched.length?(topic.id==='saving'?10:topic.guide?43:34)+(topic.priority||0)+Math.max(...matched.map(group=>group.length*5)):0;
      return {topic,score:Math.max(phraseScore,intentScore)+(intentScore?phraseScore/10:0)};
    }).filter(item=>item.score>0).sort((a,b)=>b.score-a.score);
    if(matches.length)return matches;
    const words=text.split(' ');
    return indexed.map(({topic,aliases})=>({topic,score:aliases.some(alias=>!alias.includes(' ') && words.some(word=>near(word,alias)))?3:0})).filter(item=>item.score>0);
  }
  const guidance='Podes reformular a pergunta ou pedir uma definição, um exemplo ou um cálculo.';
  function render(topic, mode='normal'){
    const response=renderText(topic,mode);
    if(mode==='example' || mode==='simple' || mode==='detail' || topic.id==='allowance'){
      const model=topic.exampleModel || exampleModels[topic.id];
      response.model=model?{...model}:undefined;
    }
    return response;
  }
  function renderText(topic, mode='normal'){
    if(mode==='example')return {text:'Exemplo — '+topic.label+'\n'+topic.example,topic:topic.id};
    if(mode==='simple')return {text:topic.answer+'\n\n'+topic.example,topic:topic.id};
    if(mode==='formula')return {text:topic.formula || 'Este conceito não tem uma única fórmula neste guia.\n\n'+topic.answer,topic:topic.id};
    return {text:topic.answer+(mode==='detail'?'\n\n'+topic.detail+'\n\nExemplo: '+topic.example:'\n\n'+topic.detail),topic:topic.id};
  }
  function respond(input, previous, selected){
    const text=normalize(input);
    if(selected){const topic=topics.find(t=>t.id===selected);if(topic)return render(topic);}
    // Não inventar estatísticas atuais nem confirmar valores relativos a países.
    if(/\b(atual|atuais|hoje|agora|202[0-9]|203[0-9]|mais recente|neste momento)\b/.test(text) && /\b(taxa|pib|inflacao|desemprego|juro|divida|membros|valor)\b/.test(text))return {text:'Este guia não consulta dados em tempo real. Para valores atuais, confirma no INE, Banco de Portugal, Eurostat ou BCE. Posso explicar o conceito e mostrar como se calcula.',topic:previous || null};
    if(/\b(pdf|apresentacao|slides|descarregar|baixar|download)\b/.test(text))return {text:'Na secção «Apresentação» podes abrir e descarregar o PDF com os slides sobre poupança.',topic:null,action:'apresentacao'};
    if(/^(ola|oi|bom dia|boa tarde|boa noite|hey)( tudo bem)?$/.test(text))return {text:'Olá! Em que te posso ajudar?',topic:null};
    if(/^(obrigad[oa]|muito obrigad[oa]|valeu|obg)$/.test(text))return {text:'De nada! Queres um exemplo, uma explicação mais simples ou outro tema?',topic:previous || null};
    if(/^(ajuda|o que sabes|temas|como funciona|que perguntas posso fazer)$/.test(text))return {text:'Escreve a tua dúvida sobre poupança ou Economia. Posso explicar conceitos, dar exemplos e ajudar com cálculos. Depois podes pedir «Explica melhor» ou «Dá-me um exemplo».',topic:null};
    const smart=smartTurn(input,null);if(smart)return smart;
    const plan=planningQuestion(input);if(plan)return plan;
    const calculated=calculate(input);if(calculated)return calculated;
    const previousTopic=topics.find(t=>t.id===previous);
    const followup=/^(e )?(um exemplo|da me (um )?exemplo|podes dar (um )?exemplo|por exemplo|exemplo|explica melhor|mais detalhes|nao percebi|como assim|mais simples|simplifica|resume|resumo|formula|qual (e )?(a )?formula|e como se calcula|como se calcula)$/;
    if(previousTopic && followup.test(text))return render(previousTopic,/exemplo/.test(text)?'example':/formula|calcula/.test(text)?'formula':/simples|simplifica|resume|resumo/.test(text)?'simple':'detail');
    if(/(poup|poupar)/.test(text) && /invest/.test(text) && /diferenca|disting|compar|versus|\bvs\b/.test(text))return render(topics.find(t=>t.id==='saveinvest'),'detail');
    const matches=rankings(text);
    if(matches.length){
      const best=matches[0].topic;
      if(best.guide && /passo a passo|plano simples/.test(text))return {topic:best.id,text:(steps[best.id] || steps.habits).map((step,i)=>(i+1)+'. '+step).join('\n')};
      const parts=text.split(/\s+(?:e tambem|e|alem disso)\s+|;/).map(part=>rankings(part)[0]).filter(Boolean);
      const practical=parts.filter(item=>item.topic.guide || ['habits','impulse','little'].includes(item.topic.id));
      if(practical.length>1 && practical[0].topic.id!==practical[1].topic.id && !/diferenca|compar|versus/.test(text)){
        const pair=practical.slice(0,2).map(item=>item.topic);
        return {text:pair.map(topic=>topic.label+'\n'+topic.answer).join('\n\n'),topic:pair[0].id,related:[pair[1].id]};
      }
      const facet=(best.questions||[]).find(q=>q.patterns.every(p=>p.test(text)));
      if(facet&&!/exemplo|formula/.test(text))return {topic:best.id,text:facet.text};
      const mode=/\b(exemplo|exemplos)\b/.test(text)?'example':/\b(formula|calcula)\b/.test(text)?'formula':/\b(simples|simplifica|resume)\b/.test(text) && !/juros simples/.test(text)?'simple':'normal';
      if(matches.length>1 && /diferenca|diferencas|disting|compar|versus|\bvs\b/.test(text)){
        // Se uma expressão específica já cobre a comparação, não acrescentar um tema genérico.
        const single=['gdpnominal','saveinvest','development','deflation','monopoly','publicdebt','eu'];
        if(single.includes(best.id))return render(best,'detail');
        const second=matches[1].topic;
        return {text:best.label+'\n'+best.answer+'\n\n'+second.label+'\n'+second.answer,topic:best.id,related:[second.id]};
      }
      return render(best,mode);
    }
    if(/\d/.test(text) && /calcula|quanto|junt|poup|juros/.test(text))return {text:'Não consegui identificar todos os dados para calcular sem fazer suposições.\n\nPodes escrever:\n• «Guardar 10 € por mês durante 2 anos»\n• «Quero juntar 300 € em 6 meses»\n• «Juros compostos: capital 1000 €, taxa anual 3%, tempo 2 anos»\n• «Taxa de poupança: poupança 100, rendimento 1000»',topic:null};
    return {text:'Não percebi bem a tua pergunta. Podes escrevê-la de outra forma?\n\n'+guidance,topic:null,fallback:true};
  }
  // Each example carries its own operands. Nothing is shared between visitors or sessions.
  const exampleModels={
    saving:{kind:'budget',income:20,expense:15},
    habits:{kind:'periodic',amount:2,unit:'semana',time:10,timeUnit:'semana'},
    goals:{kind:'goal',target:120,time:12,timeUnit:'mes',initial:0},
    budget:{kind:'budget',income:50,expense:40},
    little:{kind:'periodic',amount:1,unit:'semana',time:52,timeUnit:'semana'},
    allowance:{kind:'periodic',amount:5,unit:'mes',time:12,timeUnit:'mes',income:20},
    simpleinterest:{kind:'simpleinterest',capital:1000,rate:3,time:2,timeUnit:'ano'},
    compoundinterest:{kind:'compoundinterest',capital:1000,rate:3,time:2,timeUnit:'ano'},
    savingsrate:{kind:'savingsrate',saving:100,income:1000},
    unemployment:{kind:'unemployment',unemployed:100,active:1000},
    productivity:{kind:'productivity',output:80,workers:4},
    inflation:{kind:'inflation',initial:100,final:105},
    growth:{kind:'growth',initial:100,final:103},
    interest:{kind:'simpleinterest',capital:100,rate:5,time:1,timeUnit:'ano'},
    valueadded:{kind:'valueadded',output:500,intermediate:200},
    tradebalance:{kind:'tradebalance',exports:100,imports:120},
    publicbudget:{kind:'publicbudget',income:90,expense:100}
  };
  const units={dia:['dia','dias'],mes:['mês','meses'],semana:['semana','semanas'],ano:['ano','anos']};
  const unitName=(unit,n)=>units[unit]?.[n===1?0:1] || unit;
  const unitId=s=>s.startsWith('ano')?'ano':s.startsWith('mes')?'mes':s.startsWith('dia')?'dia':'semana';
  const kindTopic=kind=>({periodic:'saving',goal:'goals'})[kind] || extraKinds[kind] || kind;
  const slotNames={amount:'quantia guardada em cada período',unit:'frequência dos depósitos',time:'prazo',timeUnit:'unidade do prazo',target:'objetivo em euros',capital:'capital inicial em euros',rate:'taxa anual em %',income:'rendimento em euros',expense:'despesas em euros',saving:'poupança em euros',unemployed:'número de desempregados',active:'população ativa',output:'produção',workers:'número de trabalhadores',intermediate:'consumo intermédio',exports:'exportações',imports:'importações',initial:'valor inicial',final:'valor final'};
  const requirements={periodic:['amount','unit','time','timeUnit'],goal:['target','time','timeUnit'],simpleinterest:['capital','rate','time','timeUnit'],compoundinterest:['capital','rate','time','timeUnit'],budget:['income','expense'],savingsrate:['saving','income'],unemployment:['unemployed','active'],productivity:['output','workers'],inflation:['initial','final'],growth:['initial','final'],valueadded:['output','intermediate'],tradebalance:['exports','imports'],publicbudget:['income','expense']};
  const missing=m=>(requirements[m.kind]||[]).filter(key=>m[key]===undefined || m[key]===null);
  function depositCount(m){
    if(m.unit===m.timeUnit)return m.time;
    if(m.timeUnit==='ano' && m.unit==='mes')return m.time*12;
    if(m.timeUnit==='ano' && m.unit==='semana')return m.time*52;
    if(m.timeUnit==='ano' && m.unit==='dia')return m.time*365;
    if(m.timeUnit==='semana' && m.unit==='dia')return m.time*7;
    return null;
  }
  function checkedCalculation(raw,m,topic){
    const answer=calculate(raw);
    return {...answer,topic,model:m,...(!answer?.model?{invalid:true}:{})};
  }
  function evaluate(m,topic=kindTopic(m.kind)){
    if(m.kind==='periodic' && m.task==='reach' && m.target!==undefined && m.amount!==undefined){
      if(m.target<0 || m.amount<=0 || (m.initial||0)<0)return {topic,model:m,invalid:true,text:'Para estimar o prazo, indica uma meta e saldo inicial não negativos e uma quantia por período maior do que zero.'};
      m={...m,time:Math.ceil(Math.max(0,m.target-(m.initial||0))/m.amount),timeUnit:m.unit};
    }
    if(m.kind==='arithmetic')return {topic,model:m,calculation:true,text:m.expression+' = '+number(m.total)+'.'};
    if(extraKinds[m.kind])return extraEvaluate(m,topic===m.kind?extraKinds[m.kind]:topic);
    const need=missing(m);
    if(need.length && m.kind==='budget' && m.planning)return {topic,model:m,pending:true,text:need.includes('income')?'Quanto recebes e quanto gastas em despesas necessárias no mesmo período?': 'Recebes '+money(m.income)+'. Quanto gastas em despesas necessárias nesse mesmo período?'};
    if(need.length)return {topic,model:m,pending:true,text:'Para continuar, indica '+need.filter(k=>k!=='timeUnit' || !need.includes('time')).map(k=>slotNames[k]).join(' e ')+'.'+(/interest/.test(m.kind)?' Usa uma taxa anual e um prazo em anos.':'')};
    if(Object.values(m).some(v=>typeof v==='number' && (!Number.isFinite(v) || Math.abs(v)>1e12)))return {topic,model:m,text:'Esses valores são demasiado grandes para este exercício. Usa valores finitos mais pequenos.'};
    const invalid=message=>({topic,model:m,text:message,invalid:true});
    if(/interest/.test(m.kind) && m.rateUnit && m.rateUnit!=='ano')return invalid('Este exercício usa uma taxa anual. Indica a taxa anual equivalente ou escreve «taxa anual …%» para continuar; uma taxa mensal não pode ser usada como se fosse anual.');
    if(m.kind==='periodic'){
      if(m.amount<0 || m.time<0 || (m.initial??0)<0)return invalid('A quantia, o saldo inicial e o prazo devem ser não negativos.');
      const count=depositCount(m);
      if(count===null)return invalid('Preciso de períodos comparáveis. Usa a mesma unidade para a frequência e o prazo, ou um prazo em anos para depósitos mensais ou semanais.');
      if(!Number.isInteger(count) || count>1e6)return invalid('Indica um prazo que corresponda a um número inteiro de depósitos, até um milhão.');
      const total=(m.initial||0)+m.amount*count;
      if(total>1e15)return invalid('O total seria demasiado grande para este exercício. Usa valores mais pequenos.');
      return {topic,model:m,calculation:true,text:(m.task==='reach'?'Para atingir '+money(m.target)+', precisas de '+number(count)+' '+unitName(m.unit,count)+' guardando '+money(m.amount)+' por '+unitName(m.unit,1)+'.\n':'')+(m.initial?money(m.initial)+' de saldo inicial + ':'')+money(m.amount)+' × '+number(count)+' '+unitName(m.unit,count)+' = '+money(total)+'.\n\n'+(m.income!==undefined?'No exemplo, o rendimento é '+money(m.income)+' por '+unitName(m.unit,1)+'. '+(m.amount<=m.income?'Depois de guardar essa quantia, ficam '+money(m.income-m.amount)+' para os gastos.':'A quantia que pretendes guardar ultrapassa esse rendimento; seria preciso rever o plano ou indicar outra fonte de dinheiro.')+'\n':'')+'Sem juros, impostos ou comissões.'+(m.unit==='semana' && m.timeUnit==='ano'?' Foram usadas 52 semanas por ano, como aproximação.':m.unit==='dia' && m.timeUnit==='ano'?' Foi usado um ano de 365 dias; um ano bissexto teria mais um dia.':'')};
    }
    if(m.kind==='goal'){
      if(m.target<0 || m.time<=0 || (m.initial||0)<0 || !Number.isInteger(m.time))return invalid('Indica uma meta e saldo inicial não negativos e um número inteiro de períodos maior do que zero.');
      const remaining=Math.max(0,m.target-(m.initial||0)),amount=Math.ceil(remaining/m.time*100-1e-8)/100;
      return {topic,model:m,calculation:true,text:(m.initial?money(m.target)+' − '+money(m.initial)+' já guardados = '+money(remaining)+' por juntar.\n':'')+money(remaining)+' ÷ '+number(m.time)+' '+unitName(m.timeUnit,m.time)+' = '+money(amount)+' por '+unitName(m.timeUnit,1)+' (arredondado por excesso ao cêntimo).\n\n'+(remaining===0?'O saldo indicado já chega para a meta. ':'')+'Sem juros, impostos ou comissões.'};
    }
    if(['valueadded','tradebalance','publicbudget'].includes(m.kind)){
      const pairs={valueadded:['output','intermediate'],tradebalance:['exports','imports'],publicbudget:['income','expense']},[a,b]=pairs[m.kind];
      if(m[a]<0 || m[b]<0)return invalid('Indica valores não negativos para as duas parcelas; o saldo pode ser negativo.');
      const label={valueadded:'VAB',tradebalance:'Saldo comercial',publicbudget:'Saldo orçamental'}[m.kind];
      return {topic,model:m,calculation:true,text:label+': '+number(m[a])+' − '+number(m[b])+' = '+number(m[a]-m[b])+(m.kind==='valueadded'?' €.':', nas mesmas unidades das parcelas.')+(m.kind==='publicbudget' || m.kind==='tradebalance'?'\n'+(m[a]<m[b]?'O saldo é negativo: há défice.':m[a]>m[b]?'O saldo é positivo: há excedente.':'O saldo é zero.'): '')};
    }
    if(/interest/.test(m.kind))return checkedCalculation((m.kind==='simpleinterest'?'Juros simples':'Juros compostos')+': capital '+m.capital+' €, taxa anual '+m.rate+'%, tempo '+m.time+' '+unitName(m.timeUnit,m.time),m,topic);
    if(m.kind==='budget'){
      const answer=checkedCalculation('Orçamento: rendimento '+m.income+', despesas '+m.expense,m,topic);
      if(m.planning && !answer.invalid)answer.text+='\n\n'+(m.income>m.expense?'Esta é a margem antes de outros gastos e imprevistos. Não tens de guardar tudo: escolhe uma quantia que consigas manter e revê o plano.':m.income===m.expense?'Com estes dados, não sobra dinheiro. Não precisas de forçar uma poupança: revê o orçamento quando for possível.':'Com estes dados, o orçamento está desequilibrado. Primeiro, revê as despesas e o rendimento com apoio de alguém de confiança, se precisares.');
      return answer;
    }
    if(m.kind==='savingsrate')return checkedCalculation('Taxa de poupança: poupança '+m.saving+', rendimento '+m.income,m,topic);
    if(m.kind==='unemployment')return checkedCalculation('Taxa de desemprego: desempregados '+m.unemployed+', população ativa '+m.active,m,topic);
    if(m.kind==='productivity')return checkedCalculation('Produtividade: produção '+m.output+', trabalhadores '+m.workers,m,topic);
    if(m.kind==='inflation' || m.kind==='growth')return checkedCalculation((m.kind==='inflation'?'Inflação':'Crescimento')+': valor inicial '+m.initial+', valor final '+m.final,m,topic);
    return null;
  }
  function edits(raw,m){
    if(extraKinds[m.kind])return extraEdits(raw,m);
    const t=normNumber(naturalInput(raw)),change={};
    const set=(key,value)=>{if(value!==null)change[key]=value;};
    const period=t.match(new RegExp(NUM+'\\s*(?:€|euros?)?\\s*(?:por|a cada|todos os|todas as|ao)\\s*(mes|semana|ano|dia)\\b'));
    const duration=t.match(new RegExp(NUM+'\\s*(anos?|mes(?:es)?|semanas?|dias?)\\b'));
    if(duration){change.time=parse(duration[1]);change.timeUnit=unitId(duration[2]);}
    if(m.kind==='periodic'){
      if(period){change.amount=parse(period[1]);change.unit=period[2];}
      else set('amount',field(t,'(?:guardar|guardasse|guardarmos|guardaramos|guardo|poupar|poupasse|poupo|economizar|depositar|depositasse|quantia|deposito mensal|valor mensal)'));
      set('initial',field(t,'(?:ja tenho|ja tinha|saldo inicial|inicialmente tenho|comeco com)'));
      set('income',field(t,'(?:rendimento|recebo|recebesse|mesada)'));
      set('target',field(t,'(?:atingir|chegar a|objetivo(?: de)?|meta(?: de)?|juntar)'));
    }
    if(m.kind==='goal'){
      set('target',field(t,'(?:juntar|objetivo(?: de)?|meta(?: de)?|atingir|chegar a|custa|preciso de)'));
      set('initial',field(t,'(?:ja tenho|ja tinha|saldo inicial|comeco com)'));
    }
    if(/interest/.test(m.kind)){
      set('capital',field(t,'(?:capital(?: inicial)?|deposito(?: inicial)?|investir|aplicar)'));
      set('rate',find(t,NUM+'\\s*%'));
      if(/taxa mensal|ao mes|por mes|mensais/.test(t))change.rateUnit='mes';
      if(/taxa anual|ao ano|por ano/.test(t))change.rateUnit='ano';
      if(/\bcompostos\b/.test(t))change.kind='compoundinterest';
      if(/\bsimples\b/.test(t))change.kind='simpleinterest';
    }
    if(m.kind==='budget' || m.kind==='savingsrate' || m.kind==='publicbudget'){
      set('income',field(t,'(?:rendimento(?: disponivel)?|receitas?|recebo|recebesse|ganho|ganhasse|mesada(?: de)?)'));
      if(m.kind==='budget'){const saved=field(t,'(?:guardar|guardasse|guardo|poupar|poupasse|poupo)');if(saved!==null && (change.income??m.income)!==undefined)change.expense=(change.income??m.income)-saved;}
      set(m.kind==='savingsrate'?'saving':'expense',field(t,m.kind!=='savingsrate'?'(?:despesas?|consumo|gasto|gastasse|gastar)':'(?:poupanca|guardo|guardar|poupo|poupasse)'));
    }
    if(m.kind==='unemployment'){
      set('unemployed',field(t,'desempregados'));set('active',field(t,'(?:populacao )?ativa'));
      set('unemployed',find(t,NUM+'\\s*desempregados'));
    }
    if(m.kind==='productivity'){
      set('output',field(t,'producao'));set('workers',field(t,'trabalhadores'));
      set('workers',find(t,NUM+'\\s*trabalhadores'));set('output',find(t,NUM+'\\s*unidades'));
    }
    if(m.kind==='valueadded'){set('output',field(t,'(?:producao|produz|produzisse)'));set('intermediate',field(t,'(?:consumo intermedio|consumos intermedios|farinha|materias primas)'));}
    if(m.kind==='tradebalance'){set('exports',field(t,'exportacoes'));set('imports',field(t,'importacoes'));}
    if(m.kind==='inflation' || m.kind==='growth'){
      set('initial',field(t,'(?:valor |preco |pib )?inicial'));
      set('final',field(t,'(?:valor |preco |pib )?final'));
      set('final',find(t,'(?:passasse para|subisse para|aumentasse para|descesse para)\\s*'+NUM));
    }
    // "20 em vez de 5" identifies the old operand, never a computed result.
    const replacement=t.match(new RegExp(NUM+'\\s*(?:€|euros?|%)?\\s*(?:em vez de|no lugar de)\\s*'+NUM));
    if(replacement && !Object.keys(change).length){
      const candidates=(requirements[m.kind]||[]).filter(k=>typeof m[k]==='number' && Math.abs(m[k]-parse(replacement[2]))<1e-8);
      if(candidates.length===1)change[candidates[0]]=parse(replacement[1]);
    }
    const needs=missing(m).filter(k=>!['unit','timeUnit'].includes(k));
    const bare=t.trim().match(new RegExp('^(?:(?:e|afinal|sao|era|eram|com|seriam)\\s+)?'+NUM+'\\s*(?:€|euros?)?[?.!]*$'));
    if(bare && needs.length===1 && !Object.keys(change).length)change[needs[0]]=parse(bare[1]);
    else if(bare && /€|euros?/.test(t) && /interest/.test(m.kind) && m.capital===undefined)change.capital=parse(bare[1]);
    return change;
  }
  function freshModel(input){
    const text=normalize(normNumber(input));
    let kind;
    if(/juros? compostos/.test(text))kind='compoundinterest';
    else if(/juros? simples/.test(text))kind='simpleinterest';
    else if(/taxa de poupanca/.test(text))kind='savingsrate';
    else if(/taxa de desemprego/.test(text))kind='unemployment';
    else if(/produtividade/.test(text))kind='productivity';
    else if(/vab|valor acrescentado/.test(text))kind='valueadded';
    else if(/balanca|saldo comercial/.test(text))kind='tradebalance';
    else if(/orcamento do estado|saldo orcamental/.test(text))kind='publicbudget';
    else if(/orcamento|saldo|sobr/.test(text))kind='budget';
    else if(/inflacao|crescimento|variacao/.test(text))kind=/crescimento/.test(text)?'growth':'inflation';
    else if(/juntar|objetivo|meta|quero comprar|pretendo comprar/.test(text))kind='goal';
    else if(/guardar|poupar|poupanca|depositar/.test(text))kind='periodic';
    if(!kind && /recebo|ganho/.test(text) && /gasto|despesas/.test(text))kind='budget';
    if(!kind || !/\d/.test(text) && !/calcular|calcula|calculo|quanto/.test(text))return null;
    const model={kind};Object.assign(model,edits(input,model));
    if(model.amount!==undefined && model.unit)model.kind='periodic';
    return Object.keys(model).length>1 || /calcular|calcula|calculo/.test(text)?model:null;
  }
  function modelFacts(m){
    if(m?.kind==='arithmetic')return [{value:m.total,label:'resultado',explanation:m.expression+' = '+number(m.total)+'.',unit:'',formatted:number(m.total)}];
    if(!m || missing(m).length || evaluate(m)?.invalid)return [];
    if(extraKinds[m.kind])return extraFacts(m);
    const facts=[];
    const add=(value,label,explanation,unit='€')=>{if(Number.isFinite(value))facts.push({value,label,explanation,unit});};
    const amountText=(v,u)=>u==='€'?money(v):number(v)+(u==='%'?'%':u?' '+u:'');
    if(m.kind==='periodic'){
      const count=depositCount(m);if(count===null)return [];
      add(m.amount,'quantia guardada por '+unitName(m.unit,1),'É o valor escolhido para guardar em cada '+unitName(m.unit,1)+'.');
      add(count,'número de depósitos','O prazo é '+number(m.time)+' '+unitName(m.timeUnit,m.time)+'.'+(count!==m.time?' Isso corresponde a '+number(count)+' '+unitName(m.unit,count)+'.':''),unitName(m.unit,count));
      add((m.initial||0)+m.amount*count,'total poupado',money(m.amount)+' × '+number(count)+' = '+money(m.amount*count)+(m.initial?'; somando '+money(m.initial)+' iniciais, dá '+money(m.initial+m.amount*count):'')+'.');
      if(m.income!==undefined){add(m.income,'rendimento por '+unitName(m.unit,1),'É o dinheiro recebido em cada '+unitName(m.unit,1)+' neste exemplo.');add(m.income-m.amount,'dinheiro para gastar',money(m.income)+' recebidos − '+money(m.amount)+' guardados = '+money(m.income-m.amount)+'.');}
      if(m.initial!==undefined)add(m.initial,'saldo inicial','É o dinheiro que já estava guardado antes dos depósitos.');
      if(m.target!==undefined)add(m.target,'objetivo','É a meta escolhida para a poupança.');
    }else if(m.kind==='goal'){
      const remaining=Math.max(0,m.target-(m.initial||0));
      add(m.target,'objetivo','É a quantia que se pretende ter no final.');
      add(m.time,'prazo','É o prazo escolhido para alcançar a meta.',unitName(m.timeUnit,m.time));
      add(Math.ceil(remaining/m.time*100-1e-8)/100,'quantia por '+unitName(m.timeUnit,1),money(remaining)+' por juntar ÷ '+number(m.time)+' '+unitName(m.timeUnit,m.time)+', arredondando por excesso ao cêntimo.');
      if(m.initial!==undefined)add(m.initial,'saldo inicial','É o dinheiro que já tens guardado.');
    }else if(/interest/.test(m.kind)){
      const total=m.kind==='simpleinterest'?m.capital*(1+m.rate/100*m.time):m.capital*Math.pow(1+m.rate/100,m.time);
      add(m.capital,'capital inicial','É a quantia colocada no início do exercício.');
      add(m.rate,'taxa anual','É a percentagem anual usada no exercício; '+number(m.rate)+'% corresponde a '+number(m.rate/100)+' na fórmula.','%');
      add(m.time,'prazo','É o tempo indicado para o dinheiro gerar juros.',unitName(m.timeUnit,m.time));
      const formula=m.kind==='simpleinterest'?number(m.capital)+' × '+number(m.rate/100)+' × '+number(m.time):number(m.capital)+' × (1 + '+number(m.rate/100)+')^'+number(m.time);
      add(total-m.capital,'juros',m.kind==='simpleinterest'?formula+' = '+money(total-m.capital)+'.':formula+' = '+money(total)+'; retirando o capital inicial, ficam '+money(total-m.capital)+' de juros.');
      add(total,'montante final',m.kind==='simpleinterest'?money(m.capital)+' de capital + '+money(total-m.capital)+' de juros = '+money(total)+'.':formula+' = '+money(total)+'.');
    }else if(['valueadded','tradebalance','publicbudget'].includes(m.kind)){
      const pairs={valueadded:['output','intermediate'],tradebalance:['exports','imports'],publicbudget:['income','expense']},[a,b]=pairs[m.kind],u=m.kind==='valueadded'?'€':'';
      add(m[a],slotNames[a],'É a primeira parcela do exemplo.',u);add(m[b],slotNames[b],'É a parcela subtraída à primeira.',u);add(m[a]-m[b],m.kind==='valueadded'?'VAB':'saldo',number(m[a])+' − '+number(m[b])+' = '+number(m[a]-m[b])+'.',u);
    }else if(m.kind==='budget'){
      add(m.income,'rendimento','É o dinheiro que entra no orçamento.');add(m.expense,'despesas','É o dinheiro gasto neste exemplo.');add(m.income-m.expense,m.planning?'margem disponível':'saldo / poupança',money(m.income)+' − '+money(m.expense)+' = '+money(m.income-m.expense)+'.');
    }else if(m.kind==='savingsrate'){
      add(m.income,'rendimento disponível','É o rendimento usado como base da percentagem.');add(m.saving,'poupança','É a parte do rendimento que foi guardada.');add(m.saving/m.income*100,'taxa de poupança',number(m.saving)+' ÷ '+number(m.income)+' × 100 = '+number(m.saving/m.income*100)+'%.','%');
    }else if(m.kind==='unemployment'){
      add(m.unemployed,'desempregados','É o número de desempregados indicado.','pessoas');add(m.active,'população ativa','Inclui empregados e desempregados.','pessoas');add(m.unemployed/m.active*100,'taxa de desemprego',number(m.unemployed)+' ÷ '+number(m.active)+' × 100 = '+number(m.unemployed/m.active*100)+'%.','%');
    }else if(m.kind==='productivity'){
      add(m.output,'produção total','É a produção de todos os trabalhadores do exemplo.','unidades');add(m.workers,'trabalhadores','É o número de trabalhadores do exemplo.','trabalhadores');add(m.output/m.workers,'produtividade',number(m.output)+' ÷ '+number(m.workers)+' = '+number(m.output/m.workers)+' unidades por trabalhador.','unidades por trabalhador');
    }else if(m.kind==='inflation' || m.kind==='growth'){
      add(m.initial,'valor inicial','É o valor antes da variação.',m.kind==='growth'?'':'€');add(m.final,'valor final','É o valor depois da variação.',m.kind==='growth'?'':'€');add((m.final-m.initial)/m.initial*100,'variação percentual','('+number(m.final)+' − '+number(m.initial)+') ÷ '+number(m.initial)+' × 100 = '+number((m.final-m.initial)/m.initial*100)+'%.','%');
    }
    return facts.map(f=>({...f,formatted:amountText(f.value,f.unit)}));
  }
  function valueAnswer(input,context){
    const text=normalize(input),raw=normNumber(input),facts=modelFacts(context.model);
    const numbers=[...raw.matchAll(new RegExp(NUM,'g'))].map(m=>parse(m[1]));
    if(numbers.length){
      const requested=numbers[0];let found=facts.filter(f=>Math.abs(f.value-requested)<.005);
      const currency=/€|euros?/.test(raw),percent=/%|percentagem|por cento/.test(raw);
      if(currency)found=found.filter(f=>f.unit==='€');if(percent)found=found.filter(f=>f.unit==='%');
      if(found.length)return {topic:context.topic,model:context.model,text:found.map(f=>f.formatted+' — '+f.label+'. '+f.explanation).join('\n\n')};
      // For other educational examples, quote only sentences actually shown to the visitor.
      const sentences=(context.source||context.text).split(/(?<=[.!?])\s+|\n+/).filter(line=>[...normNumber(line).matchAll(new RegExp(NUM,'g'))].some(m=>Math.abs(parse(m[1])-requested)<.005));
      if(sentences.length)return {topic:context.topic,text:'Esse valor aparece nesta parte do exemplo:\n'+sentences.join('\n'),model:context.model};
      return {topic:context.topic,model:context.model,text:'Não encontro '+number(requested)+' no exemplo que estamos a usar. A que valor ou parte da conta te referes?',clarification:true};
    }
    let pattern;
    if(/capital/.test(text))pattern=/capital inicial/;
    else if(/juros/.test(text) && !/taxa/.test(text))pattern=/^juros$/;
    else if(/taxa|percentagem|por cento/.test(text))pattern=/taxa|percentual/;
    else if(/gastar|gastos|despesas|sobr/.test(text))pattern=/dinheiro para gastar|despesas|saldo \/ poupança|margem disponível/;
    else if(/receb|rendimento|mesada/.test(text))pattern=/rendimento/;
    else if(/prazo|tempo|meses|semanas|anos|depositos/.test(text))pattern=/prazo|número de depósitos/;
    else if(/meta|objetivo/.test(text))pattern=/objetivo/;
    else if(/resultado|esse valor|esse numero/.test(text))pattern=/total poupado|montante final|saldo|margem disponível|variação percentual|produtividade|taxa|VAB/;
    else if(/desconto/.test(text))pattern=/desconto/;
    else if(/poder de compra|valor real/.test(text))pattern=/poder de compra/;
    else if(/total|montante|fim|final|acumul|juntou|juntado/.test(text))pattern=/total poupado|montante final|saldo|margem disponível|valor final|preço final/;
    else if(/guard|poup|por mes|por semana|quantia|reforco/.test(text))pattern=/quantia|reforço|^poupança$|saldo \/ poupança|margem disponível/;
    const found=pattern?facts.filter(f=>pattern.test(f.label)):[];
    if(found.length)return {topic:context.topic,model:context.model,text:found.map(f=>f.formatted+' — '+f.label+'. '+f.explanation).join('\n\n')};
    if(context.model && /como|por que|porque|de onde|valor|valores/.test(text))return {...evaluate(context.model,context.topic),text:'Vamos usar os dados deste exemplo:\n'+evaluate(context.model,context.topic).text};
    return null;
  }
  function planningQuestion(raw,context){
    const text=queryText(raw);
    if(!/quanto.*(?:devo|posso|consigo|aconselhas).*(?:poupar|guardar)|(?:que|qual) percentagem.*(?:poupar|guardar)/.test(text))return null;
    const same=context?.model?.kind==='budget' && /neste|nesse|nessa|nesse|exemplo|isso|com esses|com estes|entao/.test(text);
    const model={kind:'budget',planning:true,...(same?context.model:{})};
    Object.assign(model,edits(raw,model));
    const topic=/mesada/.test(text)?'allowanceplan':'little';
    const answer=evaluate(model,topic);
    if(answer.pending){
      const needed=missing(model);
      answer.text=(needed.length===2?'Não há uma quantia ou percentagem certa para toda a gente. Primeiro, temos de perceber o que sobra depois das despesas necessárias.\n\n':'')+
        (needed.includes('income')?'Quanto recebes num período, por exemplo por mês? Indica também as despesas desse mesmo período.':'Recebes '+money(model.income)+'. Quanto gastas em despesas necessárias nesse mesmo período?');
    }
    return answer;
  }
  const steps={
    habits:['Escolhe um objetivo e escreve quanto custa.','Anota o dinheiro que recebes e as despesas necessárias.','Escolhe uma quantia possível para guardar regularmente.','Separa essa quantia e acompanha o progresso.','Revê o plano quando mudarem os teus gastos.'],
    allowanceplan:['Confirma quanto recebes de mesada e com que frequência.','Reserva o dinheiro das despesas necessárias.','Escolhe uma quantia que caiba no que resta para guardar.','Define um limite para os gastos opcionais.','Regista o que guardaste e revê o plano na próxima mesada.'],
    selfcontrol:['Durante alguns dias, regista os teus gastos.','Identifica o que costuma levar-te a comprar sem planear.','Define um limite para os gastos opcionais.','Espera antes de uma compra que não estava no plano.','Separa o dinheiro do objetivo e revê o que resultou.'],
    expenselog:['Regista cada compra e a quantia paga.','Agrupa os gastos por finalidade.','Soma o total do mesmo período em que recebeste dinheiro.','Compara o total com o rendimento.','Escolhe uma mudança possível e volta a acompanhar os gastos.'],
    envelopes:['Identifica despesas necessárias, gastos pessoais e objetivos.','Calcula a quantia disponível.','Divide o dinheiro segundo as tuas prioridades.','Identifica cada envelope ou parte do registo.','Acompanha os gastos e ajusta as divisões se for preciso.'],
    goaladjust:['Confirma o preço do objetivo e o saldo já guardado.','Calcula quanto falta juntar.','Divide pelo número de períodos disponíveis.','Compara essa quantia com a margem do orçamento.','Se não couber, prolonga o prazo ou revê o objetivo.'],
    impulse:['Pergunta se a compra é necessária ou estava planeada.','Confirma o custo total, incluindo outros encargos.','Compara com o dinheiro destinado a esse tipo de gasto.','Espera e volta a decidir com mais calma.'],
    schoolsaving:['Confirma o material que já tens e o que precisas realmente.','Planeia lanches e deslocações com apoio em casa, se for necessário.','Compara o custo das opções adequadas.','Evita compras apenas para acompanhar colegas.','Regista os gastos e revê o que podes alterar.'],
    householdsaving:['Planeia as compras e faz uma lista.','Confirma o que já existe em casa.','Compara o preço por unidade e o custo final.','Evita comprar quantidades que serão desperdiçadas.','Combina mudanças de serviços ou contratos com quem gere a casa.'],
    subscriptions:['Lista os serviços que pagas.','Anota o preço e a próxima renovação.','Confirma quais realmente usas.','Lê as condições antes de cancelar ou alterar.','Revê novamente a lista quando aderires a outro serviço.']
  };
  function guideFollowup(raw,context){
    if(!context)return null;
    const text=queryText(raw),topic=topics.find(t=>t.id===context.topic);
    if(!topic || topic.category!=='Poupança')return null;
    if(/(?:o |a )?(segundo|segundo ponto|outro ponto|outro tema)/.test(text) && context.related?.length)return render(topics.find(t=>t.id===context.related[0]),'detail');
    if(topic.id==='budgetrule' && /obrigator|tenho de|tenho que|e se.*nao|posso.*menos/.test(text))return {topic:topic.id,text:'Não é obrigatório seguir essa divisão. Os 20% são uma referência nesse método, não uma exigência. Se as despesas essenciais ocuparem mais do orçamento, adapta a percentagem e o prazo às tuas possibilidades.'};
    const practical=topic.guide || ['habits','little','impulse','budget'].includes(topic.id);
    if(!practical)return null;
    if(/^(e |mas )?(se |e se )?nao (conseguir|der|for possivel)|^(e |mas )?se (eu )?nao tiver dinheiro/.test(text))return render(topics.find(t=>t.id==='little'),'detail');
    if(/^(e |mas )?(eu )?gosto de comprar|^(e |mas )?(tambem )?quero.*divertir/.test(text))return render(topics.find(t=>t.id==='leisure'));
    if(/se (me )?esquecer|esqueco me|me esquecer/.test(text))return render(topics.find(t=>t.id==='autosave'));
    if(/precisar (dele|desse dinheiro|do dinheiro|dessa poupanca)/.test(text))return render(topics.find(t=>t.id==='usesavings'));
    if(/passo a passo|como faco isso|como aplicar isso|como por em pratica|um plano simples/.test(text)){
      const list=steps[topic.id] || steps.habits;
      return {topic:topic.id,text:list.map((step,i)=>(i+1)+'. '+step).join('\n'),model:context.model};
    }
    if(/^(?:e )?(?:mais (?:uma )?(?:dica|dicas|conselhos)|outra dica|outro conselho|da me outra dica|podes dar mais dicas)$/.test(text)){
      const tips=steps[topic.id] || topic.detail.split(/(?<=[.!?])\s+/);
      const index=context.tipIndex || 0;
      return {topic:topic.id,text:tips[index%tips.length],tipIndex:index+1,model:context.model};
    }
    return null;
  }

  // Phrase interpretation, named operands and explicit assumptions for saving exercises.
  // Everything runs locally; unrecognised conditions are clarified, never silently guessed.
  const cardinals={zero:0,um:1,uma:1,dois:2,duas:2,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,catorze:14,quatorze:14,quinze:15,dezasseis:16,dezesseis:16,dezassete:17,dezessete:17,dezoito:18,dezanove:19,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,duzentos:200,duzentas:200,trezentos:300,trezentas:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1000};
  function naturalInput(raw){
    let t=String(raw).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const words=Object.keys(cardinals).join('|');
    t=t.replace(new RegExp('\\b(?:'+words+')(?:\\s+(?:e\\s+)?(?:'+words+'))*\\b(?=\\s*(?:euros?\\b|€|por cento\\b|%|meses?\\b|anos?\\b|semanas?\\b|dias?\\b))','g'),phrase=>{
      let total=0,current=0;for(const w of phrase.split(/\s+/)){if(w==='e')continue;if(w==='mil'){total+=(current||1)*1000;current=0;}else current+=cardinals[w]||0;}return String(total+current);
    });
    if(/\d/.test(t))t=t.replace(/todos os meses/g,'por mes').replace(/todas as semanas/g,'por semana').replace(/todos os dias/g,'por dia').replace(/todos os anos/g,'por ano');
    return t.replace(/\bpor cento\b/g,'%').replace(/\bp\s*\/\s*mes\b/g,'por mes').replace(/\b(?:meter|meto|por|ponho|colocar|coloco) (?:dinheiro )?(?:de lado|a parte)\b/g,'guardar')
      .replace(/\b(?:vou|consigo|posso|quero) separar\b/g,'guardar').replace(/\b(?:guardo|poupo)\s+(?=\d)/g,'guardar ')
      .replace(/\bmensalmente\b/g,'por mes').replace(/\bsemanalmente\b/g,'por semana').replace(/\bdiariamente\b/g,'por dia').replace(/\banualmente\b/g,'por ano')
      .replace(/\b(?:ao|cada) (mes|semana|ano|dia)\b/g,'por $1').replace(/\b(?:uns|umas|cerca de)\s+(?=\d)/g,'');
  }
  const extraKinds={contributioninterest:'contributioninterest',realvalue:'nominalreal',realrate:'realinterest',discount:'pricecompare',unitprice:'pricecompare',reserve:'emergencyamount',payback:'efficiencysaving',percentage:'savingsrate',annualreserve:'annualexpenses',budgetitems:'budget'};
  Object.assign(requirements,{contributioninterest:['amount','rate','rateBasis','time','timeUnit','timing'],realvalue:['capital','inflationRate','time'],realrate:['rate','inflationRate'],discount:['price','discountRate'],unitprice:['priceA','quantityA','priceB','quantityB'],reserve:['expense','coverage'],payback:['capital','amount','unit'],percentage:['income','savingRate'],annualreserve:['target','time'],budgetitems:['income','items']});
  Object.assign(slotNames,{rateBasis:'tipo de taxa (efetiva anual, nominal anual ou mensal)',timing:'momento do reforço (início ou fim do mês)',inflationRate:'inflação anual em %',price:'preço original em euros',discountRate:'desconto em %',priceA:'preço da opção A',quantityA:'quantidade da opção A',priceB:'preço da opção B',quantityB:'quantidade da opção B',coverage:'meses de cobertura escolhidos',savingRate:'percentagem que queres guardar',items:'despesas desse período'});
  function extraMetrics(m){
    if(m.kind==='contributioninterest'){
      const n=m.timeUnit==='ano'?m.time*12:m.timeUnit==='mes'?m.time:NaN;
      const i=m.rateBasis==='effectiveAnnual'?Math.expm1(Math.log1p(m.rate/100)/12):m.rateBasis==='nominalAnnual'?m.rate/1200:m.rate/100;
      const growth=Math.expm1(n*Math.log1p(i)),factor=1+growth,annuity=i===0?n:growth/i;
      const deposited=(m.capital||0)+m.amount*n,total=(m.capital||0)*factor+m.amount*annuity*(m.timing==='begin'?1+i:1);
      const interest=total-deposited,net=total-interest*(m.taxRate||0)/100-(m.fees||0);
      return {n,i,deposited,total,interest,net};
    }
    if(m.kind==='realvalue')return {total:m.capital/Math.pow(1+m.inflationRate/100,m.time)};
    if(m.kind==='realrate')return {total:((1+m.rate/100)/(1+m.inflationRate/100)-1)*100};
    if(m.kind==='discount')return {saved:m.price*m.discountRate/100,total:m.price*(1-m.discountRate/100)};
    if(m.kind==='unitprice')return {a:m.priceA/m.quantityA,b:m.priceB/m.quantityB};
    if(m.kind==='reserve')return {total:m.expense*m.coverage};
    if(m.kind==='payback')return {total:m.capital/m.amount};
    if(m.kind==='percentage')return {total:m.income*m.savingRate/100};
    if(m.kind==='annualreserve')return {total:Math.ceil(Math.max(0,m.target-(m.initial||0))/m.time*100-1e-8)/100};
    if(m.kind==='budgetitems')return {expense:Object.values(m.items||{}).reduce((s,x)=>s+x,0),total:m.income-Object.values(m.items||{}).reduce((s,x)=>s+x,0)};
    return {};
  }
  function extraEvaluate(m,topic=extraKinds[m.kind]){
    const need=missing(m),invalid=text=>({topic,model:m,text,invalid:true,clarification:true});
    if(Object.values(m).some(v=>typeof v==='number' && (!Number.isFinite(v)||Math.abs(v)>1e12)))return invalid('Usa valores finitos até um bilião para este exercício.');
    if(need.length){const key=need[0];const prompts={amount:'Quanto queres guardar em cada mês?',rate:'Qual é a taxa de juro em percentagem?',rateBasis:'Essa taxa é efetiva anual, nominal anual ou mensal? O tipo da taxa altera a conversão para cada mês.',time:'Qual é o prazo? Indica, por exemplo, «12 meses» ou «2 anos».',timeUnit:'O prazo é em meses ou em anos?',timing:'Vais fazer os reforços no início ou no fim de cada mês?',capital:'Qual é o montante em euros?',inflationRate:'Qual é a inflação anual em percentagem que queres usar no exemplo?',expense:'Quais são as despesas mensais necessárias em euros?',coverage:'Quantos meses queres que a reserva cubra? Escolhe uma cobertura para simular; não existe uma obrigatória.',unit:'A redução de despesas indicada é por mês ou por ano?',income:'Qual é o rendimento do mesmo período, em euros?',savingRate:'Que percentagem do rendimento queres simular?',target:'Qual é o valor da despesa que queres preparar?',price:'Qual é o preço antes do desconto?',discountRate:'Qual é a percentagem de desconto?'};return {topic,model:m,pending:true,askKey:key,text:prompts[key]||'Indica '+slotNames[key]+'.'};}
    if(['capital','amount','income','expense','target','price','priceA','priceB','initial','fees'].some(k=>m[k]!==undefined&&m[k]<0))return invalid('Os montantes deste exercício devem ser não negativos. Corrige o valor indicado.');
    if(['savingRate','discountRate','taxRate'].some(k=>m[k]!==undefined&&(m[k]<0||m[k]>100)))return invalid('Indica uma percentagem entre 0% e 100% para este exercício.');
    if(m.kind==='contributioninterest'&&m.compounding==='unsupported')return invalid('Este exercício de reforços usa capitalização mensal. Indicaste outra frequência; confirma capitalização mensal ou separa esse exercício para não misturar condições.');
    if(m.kind==='contributioninterest' && (!['mes','ano'].includes(m.timeUnit)||m.time<0||m.time*(m.timeUnit==='ano'?12:1)>1200||!Number.isInteger(m.time*(m.timeUnit==='ano'?12:1))||m.rate<0||m.rate>100||!['effectiveAnnual','nominalAnnual','monthly'].includes(m.rateBasis)||!['begin','end'].includes(m.timing)))return invalid('Usa um prazo em meses ou anos que corresponda a meses inteiros (até 100 anos), uma taxa entre 0% e 100% e reforços no início ou no fim do mês.');
    if(m.kind==='realvalue' && (m.inflationRate<=-100||m.time<0||m.time>100))return invalid('A inflação tem de ser superior a −100% e o prazo deve estar entre 0 e 100 anos.');
    if(m.kind==='realrate' && (m.inflationRate<=-100||m.rate<=-100))return invalid('As taxas têm de ser superiores a −100% para comparar o poder de compra.');
    if(m.kind==='unitprice' && (m.quantityA<=0||m.quantityB<=0))return invalid('As duas quantidades devem ser maiores do que zero e usar a mesma unidade.');
    if(m.kind==='reserve' && (m.coverage<=0||!Number.isInteger(m.coverage)))return invalid('Escolhe um número inteiro de meses de cobertura maior do que zero.');
    if(m.kind==='payback' && m.amount<=0)return invalid('A redução de despesas por período tem de ser maior do que zero para calcular a recuperação.');
    if(m.kind==='annualreserve' && (m.time<=0||!Number.isInteger(m.time)))return invalid('Indica um número inteiro de meses maior do que zero até ao pagamento.');
    if(m.kind==='budgetitems' && Object.values(m.items).some(x=>x<0||!Number.isFinite(x)||x>1e12))return invalid('As despesas devem ser não negativas e finitas.');
    const v=extraMetrics(m);if(Object.values(v).some(x=>!Number.isFinite(x)||Math.abs(x)>1e15))return invalid('O resultado seria demasiado grande para este exercício. Usa valores mais pequenos.');
    let text='';
    if(m.kind==='contributioninterest')text='Em '+number(v.n)+' meses, com reforços de '+money(m.amount)+' no '+(m.timing==='begin'?'início':'fim')+' de cada mês:\n• Dinheiro colocado por ti: '+money(v.deposited)+'.\n• Juros gerados: '+money(v.interest)+'.\n• Montante final bruto: '+money(v.total)+'.'+((m.taxRate!==undefined||m.fees!==undefined)?'\n• Depois das deduções indicadas: '+money(v.net)+'.':'')+'\n\nTaxa mensal usada: '+number(v.i*100)+'%. '+(m.rateBasis==='effectiveAnnual'?'Converti a taxa efetiva anual pela raiz de ordem 12.':m.rateBasis==='nominalAnnual'?'Dividi a taxa nominal anual por 12.':'Usei a taxa mensal indicada.')+' Taxa constante, capitalização mensal e sem levantamentos.'+((m.taxRate!==undefined||m.fees!==undefined)?' O imposto indicado incide apenas sobre os juros no fim do exercício; os custos indicados são totais.':' Antes de impostos e comissões.');
    if(m.kind==='realvalue')text=money(m.capital)+' ÷ (1 + '+number(m.inflationRate/100)+')^'+number(m.time)+' = '+money(v.total)+' a preços do início.\n\nO saldo nominal é '+money(m.capital)+', mas este é o poder de compra equivalente no exemplo. Inflação anual constante; não é uma previsão.';
    if(m.kind==='realrate')text='(1 + '+number(m.rate/100)+') ÷ (1 + '+number(m.inflationRate/100)+') − 1 = '+number(v.total)+'% de taxa real.\n\n'+(v.total<0?'O poder de compra diminui, apesar da remuneração nominal.':'O poder de compra aumenta neste exemplo.')+' As taxas referem-se ao mesmo período; antes de custos e impostos.';
    if(m.kind==='discount')text=money(m.price)+' × '+number(m.discountRate)+'% = '+money(v.saved)+' de desconto.\nPreço final: '+money(v.total)+'.\n\nSó guardas efetivamente essa diferença se não a gastares noutra coisa. Confirma também se precisas da compra.';
    if(m.kind==='unitprice')text='Opção A: '+money(m.priceA)+' ÷ '+number(m.quantityA)+' = '+money(v.a)+' por '+(m.measure||'unidade')+'.\nOpção B: '+money(m.priceB)+' ÷ '+number(m.quantityB)+' = '+money(v.b)+' por '+(m.measure||'unidade')+'.\n\n'+(Math.abs(v.a-v.b)<1e-10?'O preço por unidade é igual.':'A opção '+(v.a<v.b?'A':'B')+' tem menor preço por unidade.')+' Compara a mesma unidade e qualidade e evita desperdício; o preço por unidade não decide sozinho a compra.';
    if(m.kind==='reserve')text=money(m.expense)+' por mês × '+number(m.coverage)+' meses = '+money(v.total)+' de meta para a reserva.\n\nEsta é a cobertura escolhida no exemplo, não um valor obrigatório. Ajusta-a às necessidades e à possibilidade de guardar.';
    if(m.kind==='payback')text=money(m.capital)+' de custo adicional ÷ '+money(m.amount)+' de redução por '+unitName(m.unit,1)+' = '+number(v.total)+' '+unitName(m.unit,v.total)+' de recuperação simples.\n\nNão inclui manutenção, alterações de preços nem o valor do dinheiro no tempo. Confirma a vida útil e se tens margem para o custo inicial.';
    if(m.kind==='percentage')text=money(m.income)+' × '+number(m.savingRate)+'% = '+money(v.total)+' para guardar no período.\nRestam '+money(m.income-v.total)+' antes das despesas.\n\nA percentagem foi escolhida por ti; só é viável se as despesas necessárias couberem no que resta.';
    if(m.kind==='annualreserve')text=money(Math.max(0,m.target-(m.initial||0)))+' por preparar ÷ '+number(m.time)+' meses = '+money(v.total)+' por mês, arredondado por excesso ao cêntimo.\n\n'+(m.initial?'Já estavam reservados '+money(m.initial)+'. ':'')+'Esta é uma despesa previsível; a reserva para imprevistos tem outra finalidade.';
    if(m.kind==='budgetitems')text='Rendimento: '+money(m.income)+'.\n'+Object.entries(m.items).map(([name,x])=>'• '+name+': '+money(x)+'.').join('\n')+'\nDespesas somadas: '+money(v.expense)+'.\nMargem: '+money(m.income)+' − '+money(v.expense)+' = '+money(v.total)+'.\n\n'+(v.total>0?'Este é o que sobra antes de despesas não indicadas e imprevistos. Escolhe uma quantia possível para guardar.':v.total===0?'Não sobra dinheiro com estes dados. Não forces uma poupança que retire dinheiro do necessário.':'As despesas ultrapassam o rendimento indicado. Primeiro, revê o orçamento e os dados.')+' Todos os valores devem referir-se ao mesmo período.';
    return {topic,model:m,calculation:true,text};
  }
  function extraEdits(raw,m,context){
    const t=normNumber(naturalInput(raw)),change={};const put=(k,x)=>{if(x!==null)change[k]=x;};
    const duration=t.match(new RegExp(NUM+'\\s*(anos?|mes(?:es)?)\\b'));
    if(duration && m.kind!=='reserve'){change.time=parse(duration[1]);change.timeUnit=unitId(duration[2]);if(m.kind==='realvalue'&&change.timeUnit==='mes'){change.time/=12;change.timeUnit='ano';}}
    if(m.kind==='contributioninterest'){
      if(/capitalizacao (?:anual|trimestral|semanal|diaria)/.test(t))change.compounding='unsupported';
      if(/capitalizacao mensal/.test(t))change.compounding='monthly';
      put('amount',field(t,'(?:guardar|guardasse|guardo|poupar|poupo|depositar|reforco(?: mensal)?|quantia mensal)'));
      const periodic=t.match(new RegExp(NUM+'\\s*(?:€|euros?)?\\s*por mes'));if(periodic)change.amount=parse(periodic[1]);
      put('capital',field(t,'(?:capital(?: inicial)?|ja tenho|saldo inicial|comeco com)'));
      if(!/imposto|tributacao/.test(t)||/taxa|juro/.test(t))put('rate',find(t,NUM+'\\s*%')); 
      if(/efetiva anual|anual efetiva/.test(t))change.rateBasis='effectiveAnnual';else if(/nominal anual|anual nominal|tanb/.test(t))change.rateBasis='nominalAnnual';else if(/taxa mensal|juro mensal|%\s*(?:por mes|mensal)/.test(t))change.rateBasis='monthly';
      if(/no inicio|inicio do mes/.test(t))change.timing='begin';if(/no fim|fim do mes|final do mes/.test(t))change.timing='end';
      put('taxRate',field(t,'(?:imposto(?: de)?|tributacao(?: de)?)'));put('fees',field(t,'(?:comissoes(?: totais)?(?: de)?|custos(?: totais)?(?: de)?)'));
      if(/sem impostos/.test(t))change.taxRate=0;if(/sem comissoes|sem custos/.test(t))change.fees=0;
    }
    if(m.kind==='realvalue'){put('capital',field(t,'(?:capital(?: inicial)?|valor nominal|montante|saldo|tenho|dinheiro)'));if(!/e se|afinal|de onde/.test(t))put('capital',find(t,NUM+'\\s*(?:€|euros?)'));put('inflationRate',field(t,'(?:inflacao(?: anual)?(?: de)?)')); }
    if(m.kind==='realrate'){put('rate',field(t,'(?:juro(?: nominal)?(?: de)?|taxa nominal(?: de)?|rendimento(?: de)?)'));put('inflationRate',field(t,'(?:inflacao(?: de)?)'));}
    if(m.kind==='discount'){put('price',field(t,'(?:preco(?: original)?|custa|custasse|artigo de|produto de|era|antes)'));put('discountRate',field(t,'(?:desconto(?: de)?)'));put('discountRate',find(t,NUM+'\\s*%\\s*(?:de )?desconto'));}
    if(m.kind==='unitprice'){
      for(const [label,key] of [['preco a','priceA'],['quantidade a','quantityA'],['preco b','priceB'],['quantidade b','quantityB']])put(key,field(t,label));
    }
    if(m.kind==='reserve'){put('expense',field(t,'(?:despesas?(?: mensais)?(?: de)?|gasto|gastos mensais(?: de)?)'));put('coverage',find(t,NUM+'\\s*meses'));put('coverage',field(t,'(?:cobertura(?: de)?)'));}
    if(m.kind==='payback'){put('capital',field(t,'(?:custo adicional(?: de)?|custa mais|pagar mais|pago mais|mais)'));put('amount',field(t,'(?:reduz(?: despesas)?(?: em)?|poupa|economiza|poupanca anual(?: de)?|reducao(?: de)?|poupar)'));const p=t.match(/por (ano|mes)/);if(p)change.unit=p[1];}
    if(m.kind==='percentage'){put('income',field(t,'(?:rendimento(?: de)?|recebo|ganho|mesada(?: de)?)'));put('savingRate',find(t,NUM+'\\s*%'));}
    if(m.kind==='annualreserve'){put('target',field(t,'(?:despesa(?: anual)?(?: de)?|seguro(?: de)?|custa|valor(?: de)?|preparar|pagar)'));put('initial',field(t,'(?:ja tenho|ja reservei|ja guardei|saldo inicial)'));if(duration&&unitId(duration[2])==='ano')change.time*=12;}
    const bare=t.trim().match(new RegExp('^(?:(?:e|afinal|sao|com)\\s+)?'+NUM+'\\s*(?:€|euros?|%)?[?.!]*$'));
    if(bare&&context?.askKey&&!Object.keys(change).length)change[context.askKey]=parse(bare[1]);
    if(context?.askKey==='rateBasis'){if(/^(?:e )?(?:efetiva|efetiva anual)$/.test(normalize(t)))change.rateBasis='effectiveAnnual';if(/^(?:e )?(?:nominal|nominal anual)$/.test(normalize(t)))change.rateBasis='nominalAnnual';if(/^mensal$/.test(normalize(t)))change.rateBasis='monthly';}
    if(context?.askKey==='timing'){if(/^inicio$/.test(normalize(t)))change.timing='begin';if(/^fim$/.test(normalize(t)))change.timing='end';}
    return change;
  }
  function extraFacts(m){
    if(missing(m).length||extraEvaluate(m)?.invalid)return [];
    const v=extraMetrics(m),facts=[];
    const add=(value,label,explanation,unit='€')=>facts.push({value,label,explanation,unit,formatted:unit==='€'?money(value):number(value)+(unit==='%'?'%':unit?' '+unit:'')});
    if(m.kind==='contributioninterest'){add(m.capital||0,'capital inicial','É a quantia disponível antes dos reforços.');add(m.amount,'reforço mensal','É o depósito escolhido para cada mês.');add(v.deposited,'dinheiro colocado por ti',money(m.capital||0)+' + '+money(m.amount)+' × '+number(v.n)+' meses.');add(v.interest,'juros','É o montante final bruto menos o dinheiro colocado por ti.');add(v.total,'montante final',extraEvaluate(m).text);if(m.taxRate!==undefined||m.fees!==undefined)add(v.net,'montante após deduções','Subtraí ao total o imposto sobre juros e os custos totais indicados.');add(m.rate,'taxa de juro','É a taxa e o tipo que indicaste para o exemplo.','%');add(v.n,'prazo','É o número de meses de reforços.','meses');}
    else if(m.kind==='budgetitems'){add(m.income,'rendimento','É o dinheiro recebido no período.');add(v.expense,'despesas','Somei as despesas identificadas no orçamento.');add(v.total,'margem disponível',money(m.income)+' − '+money(v.expense)+' = '+money(v.total)+'.');for(const [name,x] of Object.entries(m.items))add(x,name,'É a despesa indicada para esta categoria.');}
    else {const label={realvalue:'poder de compra',realrate:'taxa real',reserve:'meta da reserva',discount:'preço final',payback:'prazo de recuperação',percentage:'quantia para guardar',annualreserve:'reserva por mês'}[m.kind];if(label)add(v.total,label,extraEvaluate(m).text,m.kind==='realrate'?'%':m.kind==='payback'?unitName(m.unit,v.total):'€');if(m.kind==='discount')add(v.saved,'desconto','É a diferença entre o preço original e o preço final.');}
    return facts;
  }
  function phraseBudget(raw,context){
    const t=normNumber(naturalInput(raw));
    const income=field(t,'(?:recebo|ganho|rendimento(?: disponivel)?|salario(?: liquido)?)');
    const expenses=field(t,'(?:gasto(?: no total| ao todo)?|despesas(?: totais)?|consumo)');
    const categories='renda|alimentacao|comida|transportes|transporte|luz|eletricidade|agua|internet|lazer|subscricoes|telemovel|escola|seguro|prestacao';
    const items={};
    for(const match of t.matchAll(new RegExp(NUM+'\\s*(?:€|euros?)?\\s*(?:de |em |para |na |no |com |pela |pelo )?('+categories+')\\b','g')))items[match[2]]=parse(match[1]);
    for(const match of t.matchAll(new RegExp('\\b('+categories+')\\s*(?:de |: |custa |fica em |passa para |fosse |for |sao )?'+NUM,'g')))items[match[1]]=parse(match[2]);
    const itemFollow=context?.model?.kind==='budgetitems'&&Object.keys(items).length&&/e se|afinal|passa|fosse|corrige/.test(t);
    if(itemFollow){const model={...context.model,items:{...context.model.items,...items},...(income!==null?{income}:{})};return extraEvaluate(model,context.topic);}
    if(income!==null&&Object.keys(items).length>=2){
      if(/por ano|anual/.test(t)&&/por mes|mensal/.test(t))return {topic:'budget',clarification:true,text:'Há valores mensais e anuais nesta frase. Converte-os para o mesmo período ou indica o período de cada despesa antes de eu os somar.'};
      if(expenses!==null&&/no total|despesas totais|gasto(?: ao todo| no total)|total de despesas/.test(t)&&expenses!==Object.values(items).reduce((s,x)=>s+x,0))return {topic:'budget',clarification:true,text:'Indicou-se um total de despesas e uma lista de despesas. Essa lista faz parte do total ou é adicional? Não vou somar os dois sem confirmar.'};
      return extraEvaluate({kind:'budgetitems',income,items,...(/por mes|mensal/.test(t)?{frequency:'mes'}:{})});
    }
    if(income!==null&&expenses!==null&&/por ano|anual/.test(t)&&/por mes|mensal/.test(t))return {topic:'budget',clarification:true,text:'O rendimento e as despesas parecem usar períodos diferentes. Indica ambos para o mesmo período antes de fazer a subtração.'};
    if(income!==null&&expenses!==null&&!/e se|afinal|de onde|como cheg|porque|por que/.test(t))return evaluate({kind:'budget',income,expense:expenses,planning:/posso|devo|consigo/.test(t),...(/por mes|mensal/.test(t)?{frequency:'mes'}:{})},context?.model?.kind==='budget'&&context.pending?context.topic:'budget');
    return null;
  }

  function arithmeticTurn(raw){
    if(!/^(?:quanto e|quanto da|calcula|calcular|faz a conta)\b/.test(normalize(raw)))return null;
    let expr=raw.replace(/^(?:quanto e|quanto da|calcula|calcular|faz a conta)\s*/,'').replace(/euros?|€/g,'').replace(/vezes|multiplicado por|×/g,'*').replace(/a dividir por|dividido por|÷/g,'/').replace(/mais/g,'+').replace(/menos/g,'-').replace(/[?!]$/,'').trim();
    if(!/^[\d\s.,+*/()−-]+$/.test(expr)||!/[+*/-]/.test(expr))return null;
    expr=expr.replace(/−/g,'-');const tokens=expr.match(new RegExp(NUM.replace('(-?','(')+'|[+*/()-]','g'))||[];
    if(tokens.length>80)return {topic:null,clarification:true,text:'Essa conta tem demasiadas parcelas. Divide-a em contas mais pequenas.'};
    let at=0;
    function atom(){const token=tokens[at++];if(token==='+')return atom();if(token==='-')return -atom();if(token==='('){const v=sum();if(tokens[at++]!==')')throw Error('parênteses');return v;}if(!token||!/^[\d., ]+$/.test(token))throw Error('número');return parse(token);}
    function product(){let v=atom();while(tokens[at]==='*'||tokens[at]==='/'){const op=tokens[at++],b=atom();if(op==='/'&&b===0)throw Error('zero');v=op==='*'?v*b:v/b;}return v;}
    function sum(){let v=product();while(tokens[at]==='+'||tokens[at]==='-'){const op=tokens[at++],b=product();v=op==='+'?v+b:v-b;}return v;}
    try{const total=sum();if(at!==tokens.length||!Number.isFinite(total)||Math.abs(total)>1e15)throw Error('limites');return {topic:'saving',calculation:true,text:expr+' = '+number(total)+'.'+(/euros?|€/.test(raw)?' Resultado em euros.':''),model:{kind:'arithmetic',expression:expr,total}};}catch(error){return {topic:'saving',clarification:true,text:error.message==='zero'?'Não é possível dividir por zero. Corrige o divisor.':'Não consegui ler a conta. Usa números, +, −, ×, ÷ e parênteses.'};}
  }
  function unitPrices(t){
    if(!/compensa|comparar|mais barato|mais barata|preco por|qual.*(?:opcao|embalagem)/.test(t))return null;
    const found=[];const measures={kg:[1000,'g'],g:[1,'g'],l:[1000,'ml'],litros:[1000,'ml'],litro:[1000,'ml'],ml:[1,'ml'],unidade:[1,'unidade'],unidades:[1,'unidade']};
    const pattern=new RegExp(NUM+'\\s*(kg|g|litros?|l|ml|unidades?)\\b\\s*(?:por|a|custa|custam|de|:|=)?\\s*'+NUM+'\\s*(?:€|euros?)','g');
    for(const m of t.matchAll(pattern)){const factor=measures[m[2]];found.push({quantity:parse(m[1])*factor[0],unit:factor[1],price:parse(m[3])});}
    if(found.length!==2)return null;
    if(found[0].unit!==found[1].unit)return {topic:'pricecompare',clarification:true,text:'As quantidades usam medidas diferentes. Compara a mesma unidade; não vou tratar massa e volume como se fossem iguais.'};
    const scale=found[0].unit==='unidade'?1:1000,measure=found[0].unit==='g'?'kg':found[0].unit==='ml'?'litro':'unidade';
    return extraEvaluate({kind:'unitprice',priceA:found[0].price,quantityA:found[0].quantity/scale,priceB:found[1].price,quantityB:found[1].quantity/scale,measure});
  }

  function smartTurn(raw,context,history=[]){
    const value=naturalInput(raw),t=normNumber(value),n=normalize(t);
    if(/^(ola|oi|obrigado|obrigada|ok|sim|nao|esquece|muda de assunto|recomeca)|pdf|apresentacao|quem ganhou/.test(n))return null;
    // Unusual rates, unknown dates, products and tax rules are not guessed.
    if(/\d+(?:[.,]\d+)?e[+-]?\d+/i.test(raw))return null;
    if(/cabe.*orcamento|consigo.*(?:meta|objetivo)|esse plano.*possivel|viavel/.test(n)&&!/^a meta nao cabe/.test(n)){
      const goal=context?.model?.kind==='goal'?context.model:history.slice().reverse().find(c=>c.model?.kind==='goal')?.model;
      const budget=context?.model&&['budget','budgetitems'].includes(context.model.kind)?context.model:history.slice().reverse().find(c=>['budget','budgetitems'].includes(c.model?.kind))?.model;
      if(goal&&budget&&!missing(goal).length&&!missing(budget).length){
        const frequency=budget.frequency;
        if(!frequency||frequency!==goal.timeUnit)return {topic:'goals',model:goal,clarification:true,text:'Para comparar o plano com o orçamento, confirma que rendimento e despesas são por '+unitName(goal.timeUnit,1)+'. O prazo da meta está em '+unitName(goal.timeUnit,goal.time)+'.'};
        const margin=budget.income-(budget.kind==='budgetitems'?extraMetrics(budget).expense:budget.expense),deposit=Math.ceil(Math.max(0,goal.target-(goal.initial||0))/goal.time*100-1e-8)/100;
        return {topic:'goals',model:goal,text:'A meta precisa de '+money(deposit)+' por '+unitName(goal.timeUnit,1)+'. No orçamento indicado, sobram '+money(margin)+' nesse período.\n\n'+(deposit<=margin?'A quantia cabe nessa margem, antes de despesas não indicadas e imprevistos.':'A quantia ultrapassa essa margem em '+money(deposit-margin)+'. Podes prolongar o prazo, rever a meta ou ajustar gastos que não sejam essenciais.')};
      }
      return {topic:'goals',clarification:true,text:'Preciso do valor da meta, do saldo já guardado, do prazo e do rendimento e despesas do mesmo período para verificar se o plano cabe.'};
    }
    const rateIncome=field(t,'(?:recebo|ganho|rendimento(?: disponivel)?)'),rateSaving=field(t,'(?:guardar|guardo|poupo|poupanca)');
    if(/qual.*(?:taxa|percentagem)|que percentagem|quanto.*(?:percentagem|por cento)/.test(n)&&rateIncome!==null&&rateSaving!==null)return evaluate({kind:'savingsrate',income:rateIncome,saving:rateSaving},'savingsrate');
    if(/(?:qual|calcula).*taxa.*poupanca|(?:qual|que).*percentagem.*(?:guardei|poupei|poupanca)/.test(n)&&context?.model&&['budget','budgetitems'].includes(context.model.kind)&&!missing(context.model).length){const b=context.model;return evaluate({kind:'savingsrate',income:b.income,saving:b.income-(b.kind==='budgetitems'?extraMetrics(b).expense:b.expense)},'savingsrate');}
    const arithmetic=arithmeticTurn(t);if(arithmetic)return arithmetic;
    const prices=unitPrices(t);if(prices)return prices;
    if(/gastar menos|evitar gastar|reduzir.*gasto/.test(n)&&/\d/.test(t)){
      const amount=field(t,'(?:gastar menos|evitar gastar|reduzir gastos em)'),duration=t.match(new RegExp(NUM+'\\s*(dias?|semanas?|mes(?:es)?|anos?)\\b'));
      const frequency=t.match(/por (dia|semana|mes|ano)\b/);
      if(amount!==null&&duration&&frequency){const model={kind:'periodic',amount,unit:frequency[1],time:parse(duration[1]),timeUnit:unitId(duration[2])};const a=evaluate(model,'spendless');return {...a,text:'Se guardares a diferença em vez de a gastares noutra coisa:\n'+a.text};}
    }
    const budget=phraseBudget(value,context);if(budget)return budget.model?.kind==='budget'?(planningQuestion(value,context)||budget):budget;
    let kind;
    if(/(?:guardar|poupar|deposit|reforco)/.test(n)&&/juros|taxa/.test(n)&&/por mes|mensal|reforco/.test(n))kind='contributioninterest';
    else if(/taxa real|juro real/.test(n)||/inflacao/.test(n)&&/taxa nominal|juro nominal/.test(n))kind='realrate';
    else if(/poder de compra|valor real|a precos/.test(n)&&/\d/.test(t)&&/inflacao/.test(n))kind='realvalue';
    else if(/desconto/.test(n)&&/\d/.test(t))kind='discount';
    else if(/reserva|fundo de emergencia/.test(n)&&/calcular|calcula|quanto|cobrir|cobertura/.test(n)&&(/\d/.test(t)||/calcular|calcula/.test(n)))kind='reserve';
    else if(/recuperacao|custa mais|custo adicional/.test(n)&&/\d/.test(t))kind='payback';
    else if(/guardar|poupar/.test(n)&&/\d\s*%/.test(t)&&/recebo|ganho|rendimento|mesada/.test(n)&&!/taxa de poupanca/.test(n))kind='percentage';
    else if(/seguro|despesa anual|preparar.*despesa/.test(n)&&/\d/.test(t)&&/reservar|guardar|preparar|quanto/.test(n))kind='annualreserve';
    const old=context?.model;
    if(kind){
      const model={kind,...(kind==='contributioninterest'?{capital:0}:{}),...(['realvalue'].includes(kind)?{time:1,timeUnit:'ano'}:{})};
      const changes=extraEdits(value,model,context);Object.assign(model,changes);
      // Reuse only an explicitly continued exercise of the same kind.
      if(old?.kind===kind&&/^(e|afinal)\b|nesse|neste|em vez de|volta|retoma/.test(n))return extraEvaluate({...old,...changes},context.topic);
      if(kind==='discount'&&model.price===undefined)model.price=find(t,NUM+'\\s*(?:€|euros?)')??undefined;
      if(kind==='annualreserve'&&model.time===undefined)model.time=12;
      return extraEvaluate(model);
    }
    if(old&&extraKinds[old.kind]&&old.kind!=='budgetitems'){
      if(old.kind==='contributioninterest'&&/^e\b/.test(n)&&/por semana|por dia|por ano/.test(n)&&!/taxa|juros|%/.test(t))return {topic:context.topic,model:old,clarification:true,text:'Este exercício trabalha com reforços mensais. Para mudar para depósitos semanais ou diários, seria necessário definir o calendário e a capitalização; não vou tratar as frequências como iguais.'};
      const changed=extraEdits(value,old,context);
      const top=rankings(n)[0]?.topic;
      const follow=/^(e|afinal)\b|neste|nesse|isso|resultado|de onde|como cheg|quanto|qual|formula|exemplo|nao percebi|explica melhor/.test(n);
      const switchTopic=top&&top.id!==context.topic&&/o que|explica |como poupar|diferenca|preciso de dicas/.test(n)&&!follow;
      if(!switchTopic&&(context.pending||follow)&&Object.keys(changed).length&&!/de onde|porque|por que|significa|como cheg|como obt|representa/.test(n))return extraEvaluate({...old,...changed},context.topic);
      if(!switchTopic&&/formula|como calcul|como cheg|resultado|de onde|quanto|qual.*(?:valor|taxa|total|juros|reforco|quantia|capital)|e (os|o|as|a) /.test(n))return valueAnswer(value,context)||extraEvaluate(old,context.topic);
      if(!switchTopic&&/exemplo|nao percebi|explica melhor|mais simples/.test(n))return {...extraEvaluate(old,context.topic),text:'Com os dados deste exemplo:\n'+extraEvaluate(old,context.topic).text};
    }
    if(context&&!/\d/.test(t)&&!/de onde|como cheg/.test(n)){
      const topic=topics.find(x=>x.id===context.topic),top=rankings(n)[0]?.topic;
      if(topic?.questions&&(!top||top.id===topic.id||/^(e|mas)\b|nisso|isso/.test(n))){const facet=topic.questions.find(q=>q.patterns.every(p=>p.test(n)));if(facet)return {topic:topic.id,text:facet.text,model:context.model};}
    }
    // Numeric natural phrases are considered before generic word matches.
    if(/\d/.test(t)&&!/tenho \d+ anos|idade|de onde|porque|por que|significa|como cheg|e os|e o /.test(n)){
      const goal=field(t,'(?:quero juntar|juntar|quero ter|preciso de|meta(?: de)?|objetivo(?: de)?|custa|atingir|chegar aos?|alcancar)');
      const initial=field(t,'(?:ja tenho|ja guardei|ja reservei|saldo inicial|comeco com)')??(goal!==null?field(t,'tenho'):null);
      const period=t.match(new RegExp(NUM+'\\s*(?:€|euros?)?\\s*por (mes|semana|ano|dia)\\b'));
      const duration=t.match(new RegExp(NUM+'\\s*(anos?|mes(?:es)?|semanas?|dias?)\\b'));
      if(goal!==null&&/quanto tempo|quantos meses|quando.*(?:juntar|atingir|chegar)/.test(n)&&period){return evaluate({kind:'periodic',target:goal,amount:parse(period[1]),unit:period[2],time:0,timeUnit:period[2],initial:initial||0,task:'reach'},'goals');}
      if(goal!==null&&duration&&!period&&!/taxa|juros|desconto/.test(n))return evaluate({kind:'goal',target:goal,time:parse(duration[1]),timeUnit:unitId(duration[2]),initial:initial||0},'goals');
      if(period&&duration&&/guardar|poupar|juntar|depositar/.test(n)&&!/juros|impostos|comissoes/.test(n)&&!/^e\b/.test(n))return evaluate({kind:'periodic',amount:parse(period[1]),unit:period[2],time:parse(duration[1]),timeUnit:unitId(duration[2]),initial:initial||0},'saving');
    }
    return null;
  }

  function createSession(){
    let active=null,history=[];
    function prepare(input,anchor){
      const value=naturalInput(String(input).trim().slice(0,1000)),text=normalize(value);
      let context=anchor && typeof anchor==='object'?anchor:active;
      if(typeof anchor==='string')context=history.slice().reverse().find(c=>c.topic===anchor) || {topic:anchor,text:''};
      let answer,retain=false;
      const topical=rankings(text),best=topical[0]?.topic;
      const follow=/\b(e se|e com|e durante|em vez de|afinal|corrige|nesse|neste|desse|deste|isso|esses|estes|esse|essa|ele|ela|anterior|antes|mesmo exemplo)\b/.test(text) || /^e\b/.test(text);
      const mode=/\b(exemplo|exemplos)\b/.test(text)?'example':/formula|como (se )?calcula/.test(text)?'formula':/mais simples|simplifica|resume|resumo|outras palavras|outra forma|outra maneira|para uma crianca/.test(text)?'simple':/explica melhor|explicar melhor|nao (percebi|entendi)|mais detalhes|como assim|por que|porque|porque e que|por que motivo|para que serve|como (posso )?aplicar/.test(text)?'detail':null;
      const valuesIntent=/\b(quanto|qual|quais|valor|valores|porque|por que|de onde|como cheg\w*|como obt\w*|como calcul\w*|significa|representa|corresponde|como deu|como da|vem|vinha|receb\w*|guardou|guardava|poupava|sobrava|gastava)\b/.test(text) || /^e (os|as|o|a)\b/.test(text);
      const reference=/\b(exemplo|conta|calculo|ines|mesada|antes|anterior|esses|estes|esse|essa|ela|ele|isso)\b/.test(text);
      // An explicit reference can retrieve an earlier topic without carrying unrelated data over.
      if(/\b(volta|voltar|retoma|anterior|antes|primeiro|da ines|da mesada)\b/.test(text) && history.length){
        const old=history.slice().reverse().find(c=>best?c.topic===best.id:c.model && (c.topic!==active?.topic || /primeiro/.test(text)));
        if(old)context=/primeiro/.test(text)?history.find(c=>best?c.topic===best.id:!!c.model):old;
      }
      const relatedTerms={periodic:['saving','goals','allowance','income'],goal:['saving','goals'],budget:['saving','income','consumption','budget'],simpleinterest:['interest','simpleinterest','compoundinterest'],compoundinterest:['interest','simpleinterest','compoundinterest'],savingsrate:['savingsrate','saving','income'],unemployment:['unemployment','demography'],productivity:['productivity','production'],valueadded:['valueadded','production','consumption'],tradebalance:['tradebalance'],publicbudget:['publicbudget','income'],inflation:['inflation'],growth:['growth']};
      const linked=valuesIntent && context?.model && (relatedTerms[context.model.kind]||[]).includes(best?.id) && !/o que|defin|diferenca|compar/.test(text);
      const explicitNew=best && topical[0].score>3 && context && best.id!==context.topic && !linked && !(
        !best.guide && context.model && Object.keys(edits(value,context.model)).length &&
        (follow || /\d/.test(text) && !/o que|explica|defin|significa/.test(text))
      );
      if(!value)answer={text:'Escreve a tua pergunta para começarmos.',topic:null,clarification:true};
      else if(/^(esquece|esquece isso|muda de assunto|novo assunto|outra pergunta|recomecar|recomeca)$/.test(text))answer={text:'Está bem. Qual é a nova pergunta?',topic:null};
      else if(/^(obrigad[oa]|muito obrigad[oa]|valeu|obg|ok|okay|certo|entendi|percebi|sim)$/.test(text)){answer={text:/obrig|valeu|obg/.test(text)?'De nada! Se quiseres, podemos continuar este exemplo ou passar a outra pergunta.':'Certo. Podes continuar o exemplo ou fazer uma nova pergunta.',topic:context?.topic || null};retain=true;}
      else if(/^(esta errado|isso esta errado|nao e isso|nao foi isso|enganei me|nao)$/.test(text)){answer={text:context?.model?'Qual é o dado que queres corrigir? Indica o nome e o novo valor, por exemplo a quantia, o prazo ou a taxa.':'Que parte queres esclarecer? Podes reformular a pergunta.',topic:context?.topic || null,clarification:true};retain=true;}
      else if(/\b\d+(?:[.,]\d+)?e[+-]?\d+\b/i.test(value))answer={text:'Escreve os números por extenso em algarismos, sem notação científica, por exemplo 1000 ou 2,50.',topic:context?.topic || null,clarification:true};
      else if(/guardar|poupar|juntar|depositos/i.test(text) && /com juros|juros de|juros a|com comissoes|com impostos/.test(text) && !/por mes|mensal|reforco/.test(text))answer={text:'Para combinar depósitos regulares com juros ou outros custos, faltam condições como as datas dos depósitos e a capitalização. Podemos fazer a soma dos depósitos sem juros, ou um exercício de juros simples ou compostos sobre um capital inicial.',topic:context?.topic || null,clarification:true};
      else if(/\b(pdf|apresentacao|slides|descarregar|baixar|download)\b/.test(text) || /^(ola|oi|bom dia|boa tarde|boa noite|hey)( tudo bem)?$/.test(text))answer=respond(value);
      else if(/\b(atual|atuais|hoje|agora|202[0-9]|203[0-9]|mais recente|neste momento)\b/.test(text) && /\b(taxa|pib|inflacao|desemprego|juro|divida|membros|valor)\b/.test(text))answer=respond(value);
      else if(/diferenca|diferencas|disting|compar|versus|\bvs\b/.test(text) && topical.length)answer=respond(value);
      else {
        const practical=!explicitNew?guideFollowup(value,context):null;
        const planned=planningQuestion(value,context);
        const full=calculate(value);
        const smart=smartTurn(value,context,history);
        if(smart)answer=smart;
        else if(practical)answer=practical;
        else if(planned)answer=planned;
        else if(full?.model)answer=full;
        else if(context?.model && !explicitNew){
          const changes=edits(value,context.model);
          const timeQuestion=/quanto tempo|quantos (meses|anos|semanas)|quando/.test(text) && /atingir|chegar|juntar|meta|objetivo/.test(text);
          const mutating=!timeQuestion && Object.keys(changes).length && !(/\b(de onde|porque|por que|significa|representa|como cheg\w*|como deu)\b/.test(text)) && (follow || context.pending || !valuesIntent || /quanto (fica|da|seria|teria)|quanto vou|quanto consigo/.test(text));
          if(mutating){
            const updated={...context.model,...changes};
            if(changes.time!==undefined)delete updated.task;
            // Preserve the actual frequency; a changed duration does not change the deposit size.
            answer=evaluate(updated,kindTopic(updated.kind)===kindTopic(context.model.kind)?context.topic:kindTopic(updated.kind));
          }else if(context.model.kind==='periodic' && timeQuestion){
            const target=changes.target ?? context.model.target;
            if(target===undefined)answer={text:'Qual é a meta em euros que queres alcançar?',topic:context.topic,model:context.model,clarification:true};
            else if(target<0 || context.model.amount<=0)answer={text:'Para estimar o prazo, a meta deve ser não negativa e a quantia guardada por período deve ser maior do que zero.',topic:context.topic,model:context.model};
            else answer=evaluate({...context.model,...changes,target,task:'reach'},context.topic);
          }else if(/quanto falta/.test(text) && context.model.target!==undefined){
            const m=context.model,total=m.kind==='goal'?(m.initial||0):(m.initial||0)+m.amount*depositCount(m);
            answer={text:'Faltam '+money(Math.max(0,m.target-total))+' para atingir a meta de '+money(m.target)+'. O valor considerado já guardado é '+money(total)+'.',topic:context.topic,model:m};
          }else if(valuesIntent && (linked || reference || /\d/.test(text) || !best || best.id===context.topic))answer=valueAnswer(value,context);
          if(!answer && /\d/.test(text) && follow)answer={text:'Queres alterar '+(requirements[context.model.kind]||[]).filter(k=>!['unit','timeUnit'].includes(k)).map(k=>slotNames[k]).join(', ')+'? Indica a que corresponde o novo valor.',topic:context.topic,model:context.model,clarification:true};
        }
        if(!answer && context && !explicitNew && valuesIntent && reference)answer=valueAnswer(value,context);
        if(!answer && !explicitNew && context && mode){
          const topic=topics.find(t=>t.id===context.topic);
          if(topic){
            if(context.model && !missing(context.model).length && mode==='example')answer={...evaluate(context.model,context.topic),text:'Continuando o exemplo:\n'+evaluate(context.model,context.topic).text};
            else if(context.model && mode==='formula')answer={...evaluate(context.model,context.topic),text:(topic.formula||'Vamos fazer a conta com os dados do exemplo:')+'\n\n'+evaluate(context.model,context.topic).text};
            else {answer=render(topic,mode);if(context.model){answer.model=context.model;answer.text=topic.answer+'\n\n'+evaluate(context.model,context.topic).text;}}
          }
        }
        if(!answer && best?.guide && (explicitNew || !context || !follow))answer=respond(value);
        if(!answer){
          const fresh=freshModel(value);
          if(fresh && (explicitNew || !context?.model || !follow))answer=evaluate(fresh);
        }
        if(!answer && !context && /quanto.*(?:eram|era|ficava|teria|guardava)/.test(text))answer={text:'A que exemplo te referes? Indica os valores para eu calcular.',topic:null,clarification:true};
        if(!answer && !context && (mode && !best || (reference || /\d/.test(text)) && valuesIntent && !best))answer={text:'A que tema ou exemplo te referes? Escreve o tema ou os valores para eu continuar.',topic:null,clarification:true};
        if(!answer && context && reference && valuesIntent && !explicitNew)answer=valueAnswer(value,context) || {text:'A que parte do exemplo te referes? Indica o valor ou a frase que queres esclarecer.',topic:context.topic,clarification:true};
        if(!answer)answer=respond(value,explicitNew?null:context?.topic);
        if(answer.fallback&&context&&follow&&!explicitNew)answer={topic:context.topic,model:context.model,pending:context.pending,askKey:context.askKey,clarification:true,text:'Queres esclarecer que parte do que estávamos a ver? Podes indicar o valor, a frase ou o dado que queres alterar.'};
      }
      if(answer.topic){
        const same=context?.topic===answer.topic;
        const model=answer.model || (retain && same?context.model:undefined);
        answer.context={topic:answer.topic,text:answer.text,source:same && (!answer.model || answer.model===context.model)?context.source || context.text:answer.text,model:model?{...model}:undefined,pending:!!answer.pending,askKey:answer.askKey,related:answer.related || (same?context.related:undefined),tipIndex:answer.tipIndex || 0};
      }else answer.context=null;
      return answer;
    }
    function commit(answer){
      active=answer.context || null;
      if(active){history.push(active);if(history.length>24)history.shift();}
      return answer;
    }
    return Object.freeze({prepare,commit,respond(input,anchor){return commit(prepare(input,anchor));},reset(){active=null;history=[];}});
  }

  root.SavingsBot=Object.freeze({respond,normalize,topics,calculate,createSession});
})(typeof window!=='undefined'?window:globalThis);
