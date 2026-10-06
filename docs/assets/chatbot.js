(function(root){
  'use strict';
  const topics=root.SavingsKnowledge;
  const normalize=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const normNumber=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const money=value=>new Intl.NumberFormat('pt-PT',{style:'currency',currency:'EUR'}).format(value);
  const number=value=>new Intl.NumberFormat('pt-PT',{maximumFractionDigits:4}).format(value);
  const NUM='(-?(?:[0-9]{1,3}(?:[. ][0-9]{3})+(?:,[0-9]+)?|[0-9]+(?:[.,][0-9]+)?))';
  const parse=s=>Number(s.replace(/ /g,'').replace(/\.(?=\d{3}(?:\D|$))/g,'').replace(',','.'));
  const find=(text,pattern)=>{const m=text.match(new RegExp(pattern,'i'));return m?parse(m[1]):null;};
  const field=(text,labels)=>find(text,'(?:'+labels+')\\s*(?:de |e |: |:|=)?\\s*'+NUM);
  const result=(text,topic='saving')=>({text,topic,calculation:true});
  function calculate(raw){
    const text=normNumber(raw);
    if(!/\d/.test(text))return null;
    const duration=text.match(new RegExp(NUM+'\\s*(anos?|mes(?:es)?|semanas?)\\b'));
    const periods=duration?parse(duration[1]):null;
    const unit=duration?duration[2]:null;
    if(/juros? (simples|compostos)/.test(text)){
      const type=/compostos/.test(text)?'compoundinterest':'simpleinterest';
      const capital=field(text,'capital(?: inicial)?') ?? find(text,NUM+'\\s*€\\s*(?:a|com)\\s');
      const rate=find(text,NUM+'\\s*%');
      if(capital===null || rate===null || periods===null || !unit.startsWith('ano') || capital<0 || periods<0 || rate<0 || periods>100 || rate>100 || /mensal|meses|semanas|mensais/.test(text)){
        return result('Para este cálculo, indica um capital inicial não negativo, a taxa anual em % e o tempo em anos (até 100 anos).\nExemplo: «Juros '+(type==='compoundinterest'?'compostos':'simples')+': capital 1000 €, taxa anual 3%, tempo 2 anos». O exercício supõe que não há reforços, impostos nem comissões.',type);
      }
      const total=type==='simpleinterest'?capital*(1+rate/100*periods):capital*Math.pow(1+rate/100,periods);
      if(!Number.isFinite(total) || total>1e15)return result('Os valores são demasiado grandes para este exercício. Usa valores mais pequenos.',type);
      return result((type==='simpleinterest'?'Juros simples':'Juros compostos')+':\n'+(type==='simpleinterest'?number(capital)+' × '+number(rate/100)+' × '+number(periods)+' = '+money(total-capital)+' de juros.':number(capital)+' × (1 + '+number(rate/100)+')^'+number(periods)+' = '+money(total)+'.')+'\nMontante final: '+money(total)+'.\nJuros: '+money(total-capital)+'.\n\nPressupostos: taxa anual constante; '+(type==='compoundinterest'?'capitalização anual; ':'')+'sem reforços, impostos ou comissões.',type);
    }
    const periodic=text.match(new RegExp(NUM+'\\s*(?:€|euros?)?\\s*(?:por|a cada|todos os|todas as)\\s*(mes|semana|ano)\\b'));
    if(periodic && duration && /poup|guard|junt|economiz/.test(text)){
      const amount=parse(periodic[1]), originUnit=periodic[2], destination=unit;
      if(amount<0 || periods<0)return result('Usa uma quantia e um prazo não negativos.');
      let count;
      if(originUnit==='mes' && destination.startsWith('ano'))count=periods*12;
      else if(originUnit==='ano' && destination.startsWith('mes'))return result('Depósitos anuais e um prazo em meses exigem saber em que datas os depósitos são feitos. Usa o prazo em anos para esta soma simples.');
      else if(originUnit==='semana' && destination.startsWith('ano'))count=periods*52;
      else if(originUnit==='ano' && destination.startsWith('semana'))return result('Usa um prazo em anos para somar quantias guardadas uma vez por ano.');
      else if((originUnit==='mes' && destination.startsWith('mes')) || (originUnit==='ano' && destination.startsWith('ano')) || (originUnit==='semana' && destination.startsWith('semana')))count=periods;
      else return result('Para contar depósitos, usa a mesma unidade (semanas, meses ou anos). Posso converter 1 ano em 12 meses ou, aproximadamente, em 52 semanas.','goals');
      // Vários valores monetários ou juros tornam o problema diferente desta soma simples.
      if(/ja tenho|inicial|juros|aument|reforco/.test(text))return result('Esta soma simples usa só uma quantia regular e um prazo, sem saldo inicial nem juros. Para juros, indica capital, taxa anual e tempo; para depósitos, por exemplo: «Guardar 10 € por mês durante 2 anos».');
      if(!Number.isInteger(count))return result('O prazo indicado corresponde a uma fração de um período de poupança. Indica um número inteiro de depósitos ou um prazo que dê períodos completos.');
      if(count>1e6 || amount>1e12)return result('Usa valores mais pequenos para este exercício.');
      return result(number(amount)+' € × '+number(count)+' '+(originUnit==='mes'?'meses':originUnit==='semana'?'semanas':'anos')+' = '+money(amount*count)+'.\n\nÉ o total das quantias guardadas, sem juros, impostos ou comissões.'+(originUnit==='semana' && destination.startsWith('ano')?' Foi usada a aproximação de 52 semanas por ano.':''));
    }
    if(/juntar|objetivo|meta/.test(text) && duration && unit.startsWith('mes')){
      const target=find(text,'(?:juntar|objetivo|meta)\\s*(?:de |e |: |:)?'+NUM+'\\s*(?:€|euros?)?');
      if(target!==null){
        if(target<0 || periods<=0)return result('O objetivo deve ser não negativo e o número de meses deve ser maior do que zero.','goals');
        // Arredondar para cima ao cêntimo para atingir a meta.
        const amount=Math.ceil((target/periods)*100-1e-8)/100;
        return result(number(target)+' € ÷ '+number(periods)+' meses = '+money(amount)+' por mês (arredondado por excesso ao cêntimo).\n\nPressupostos: partes de zero e não há juros, impostos ou comissões. Adapta o prazo às tuas possibilidades.','goals');
      }
    }
    if(/taxa de poupanca/.test(text)){
      const saving=field(text,'poupanca'), income=field(text,'rendimento(?: disponivel)?');
      if(saving!==null && income!==null){if(income<=0)return result('Para calcular esta taxa, o rendimento disponível tem de ser maior do que zero.','savingsrate');return result(number(saving)+' ÷ '+number(income)+' × 100 = '+number(saving/income*100)+'% de taxa de poupança.','savingsrate');}
    }
    if(/taxa de desemprego/.test(text)){
      const unemployed=field(text,'desempregados'),active=field(text,'(?:populacao )?ativa');
      if(unemployed!==null && active!==null){if(active<=0 || unemployed<0 || unemployed>active)return result('A população ativa deve ser positiva e incluir todos os desempregados indicados.','unemployment');return result(number(unemployed)+' ÷ '+number(active)+' × 100 = '+number(unemployed/active*100)+'% de taxa de desemprego.','unemployment');}
    }
    if(/produtividade/.test(text)){
      const output=field(text,'producao'),workers=field(text,'trabalhadores');
      if(output!==null && workers!==null){if(workers<=0 || output<0)return result('Indica produção não negativa e um número de trabalhadores maior do que zero.','productivity');return result(number(output)+' ÷ '+number(workers)+' = '+number(output/workers)+' unidades por trabalhador. A unidade de produção é a que indicaste.','productivity');}
    }
    if(/variacao|crescimento|inflacao/.test(text)){
      const initial=field(text,'(?:valor |preco |pib )?inicial'),final=field(text,'(?:valor |preco |pib )?final');
      if(initial!==null && final!==null){
        const topic=/crescimento/.test(text)?'growth':'inflation';
        if(initial<=0 || final<0)return result('Para este exercício, indica valor inicial positivo e valor final não negativo.',topic);
        return result('('+number(final)+' − '+number(initial)+') ÷ '+number(initial)+' × 100 = '+number((final-initial)/initial*100)+'% de variação.'+(/inflacao/.test(text)?'\n\nSó corresponde a uma medida de inflação se os valores representarem um índice ou cabaz adequado; o preço de um único bem não mede a inflação geral.':''),topic);
      }
    }
    const income=field(text,'rendimento(?: disponivel)?|receitas?'),expense=field(text,'despesas?|consumo');
    if(income!==null && expense!==null && /saldo|orcamento|poupanca|poupar|sobr/.test(text)){
      if(income<0 || expense<0)return result('Indica rendimento e despesas não negativos.','budget');
      return result(number(income)+' € − '+number(expense)+' € = '+money(income-expense)+'.\n'+(income>=expense?'Este é o saldo disponível no exemplo, se não houver outras despesas.':'O saldo é negativo: as despesas indicadas excedem o rendimento.'),'budget');
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
  function rankings(text){
    let matches=indexed.map(({topic,aliases})=>{
      const exact=aliases.filter(alias=>(' '+text+' ').includes(' '+alias+' '));
      return {topic,score:exact.length?Math.max(...exact.map(a=>4+a.split(' ').length*3+a.length/30))+.1*exact.length:0};
    }).filter(item=>item.score>0).sort((a,b)=>b.score-a.score);
    if(matches.length)return matches;
    const words=text.split(' ');
    return indexed.map(({topic,aliases})=>({topic,score:aliases.some(alias=>!alias.includes(' ') && words.some(word=>near(word,alias)))?3:0})).filter(item=>item.score>0);
  }
  const guidance='Podes reformular a pergunta ou pedir uma definição, um exemplo ou um cálculo.';
  function render(topic, mode='normal'){
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
    const calculated=calculate(input);if(calculated)return calculated;
    const previousTopic=topics.find(t=>t.id===previous);
    const followup=/^(e )?(um exemplo|da me (um )?exemplo|podes dar (um )?exemplo|por exemplo|exemplo|explica melhor|mais detalhes|nao percebi|como assim|mais simples|simplifica|resume|resumo|formula|qual (e )?(a )?formula|e como se calcula|como se calcula)$/;
    if(previousTopic && followup.test(text))return render(previousTopic,/exemplo/.test(text)?'example':/formula|calcula/.test(text)?'formula':/simples|simplifica|resume|resumo/.test(text)?'simple':'detail');
    if(/(poup|poupar)/.test(text) && /invest/.test(text) && /diferenca|disting|compar|versus|\bvs\b/.test(text))return render(topics.find(t=>t.id==='saveinvest'),'detail');
    const matches=rankings(text);
    if(matches.length){
      const best=matches[0].topic;
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
  root.SavingsBot=Object.freeze({respond,normalize,topics,calculate});
})(typeof window!=='undefined'?window:globalThis);
