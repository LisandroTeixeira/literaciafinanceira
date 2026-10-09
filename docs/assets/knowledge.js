/* Conteúdo educativo original. A organização dos temas usa as referências
 * curriculares da DGE indicadas no site; os exemplos são hipotéticos. */
(function(root){
  'use strict';
  const topics=[];
  function add(id,label,category,aliases,answer,detail,example,formula=''){
    topics.push({id,label,category,aliases:aliases.split('|'),answer,detail,example,formula});
  }
  const P='Poupança', A='10.º ano', B='11.º ano', C='12.º ano';
  add('saving','O que é poupar?',P,'poupanca|poupar|economizar|guardar dinheiro','Poupar é reservar uma parte do dinheiro que recebemos para a usar no futuro.','A poupança pode servir para uma compra planeada ou para enfrentar uma despesa inesperada. Deve adaptar-se às possibilidades de cada pessoa.','Se recebes 20 € e guardas 5 €, esses 5 € são a tua poupança.','Poupança = rendimento disponível − consumo.');
  add('habits','Hábitos de poupança',P,'habitos de poupanca|habitos|como comecar|comecar a poupar|como poupar|como posso poupar|como posso economizar|dicas|rotina|disciplina','Define um objetivo, guarda uma quantia regularmente e controla os gastos.','Começa com um valor realista. Regista as despesas, distingue necessidades de desejos e pensa antes de comprar por impulso.','Guardar 2 € por semana permite juntar 20 € em 10 semanas, sem juros.');
  add('importance','Importância da poupança',P,'importancia da poupanca|importante poupar|importante a poupanca|importancia de poupar|porque poupar|por que poupar|vantagens de poupar|beneficios da poupanca','Poupar ajuda a alcançar objetivos e a enfrentar imprevistos com maior segurança.','Uma reserva pode reduzir a necessidade de pedir dinheiro emprestado. O valor possível varia de pessoa para pessoa.','Uma pequena reserva pode ajudar a pagar a reparação de uma bicicleta.');
  add('goals','Objetivos de poupança',P,'objetivos de poupanca|objetivo|metas|meta|para que poupar|para que serve a poupanca|curto prazo|medio prazo|longo prazo','Um objetivo de poupança deve indicar o que queres alcançar, quanto custa e quando precisas do dinheiro.','Um livro pode ser um objetivo próximo; uma bicicleta pode exigir mais meses; os estudos podem ser um objetivo para mais tarde.','Para juntar 120 € em 12 meses, seria necessário guardar 10 € por mês, sem juros.','Valor mensal = objetivo ÷ número de meses.');
  add('budget','Orçamento pessoal',P,'orcamento|orcamento pessoal|orcamento familiar|organizar dinheiro|gerir dinheiro|gestao do dinheiro|controlar gastos|despesas pessoais','Um orçamento pessoal regista o dinheiro que entra e as despesas previstas.','Considera as despesas essenciais antes de escolher quanto guardar. Revê o plano quando mudarem os rendimentos ou as despesas.','Recebes 50 € e gastas 40 €: sobram 10 €, se não houver outras despesas.','Saldo = receitas − despesas.');
  add('wants','Necessidades e desejos',P,'necessidades e desejos|necessidade e desejo|desejos|desejo','Uma necessidade corresponde a algo importante para o bem-estar; um desejo é algo que gostarias de ter e que pode esperar.','A prioridade depende do contexto. A alimentação e o transporte para a escola são exemplos de necessidades essenciais.','Um jogo novo pode ser um desejo; o transporte necessário para a escola tem prioridade.');
  add('impulse','Compras por impulso',P,'impulso|compra impulsiva|compras|promocao|promocoes|desconto','Uma compra por impulso é uma compra feita sem planeamento, muitas vezes por entusiasmo momentâneo.','Faz uma lista, compara preços e espera antes de decidir. Uma promoção não torna necessária uma compra de que não precisas.','Esperar um dia antes de comprar uma camisola pode ajudar-te a decidir com mais calma.');
  add('emergency','Reserva para imprevistos',P,'fundo de emergencia|emergencia|imprevistos|imprevisto|reserva|despesa inesperada','Uma reserva para imprevistos é dinheiro guardado para despesas inesperadas.','Deve poder ser usado quando necessário. O valor depende das despesas e das possibilidades da pessoa ou da família.','Uma avaria num equipamento necessário pode ser paga com uma reserva, se esta for suficiente.');
  add('little','Poupar com pouco dinheiro',P,'pouco dinheiro|nao consigo poupar|nao posso poupar|nao tenho dinheiro|dificil poupar|quanto devo poupar','Não existe uma quantia certa para todas as pessoas. Poupa apenas o que for possível depois das despesas essenciais.','Se o dinheiro mal chega para o necessário, pode não haver margem para poupar. Isso não é uma falha tua. Pequenas quantias ajudam quando forem possíveis.','Guardar 1 € por semana soma 52 € em 52 semanas, sem juros.');
  add('allowance','Exemplo com a mesada',P,'mesada|ines|exemplo de poupanca','A Inês recebe 20 € por mês. Guarda 5 € e fica com 15 € para gastar.','Ao fim de 12 meses, terá poupado 60 €, sem contar com juros. O hábito de guardar regularmente faz as pequenas quantias somarem-se.','5 € × 12 meses = 60 €.');
  add('deposits','Guardar dinheiro e depósitos',P,'mealheiro|deposito|depositos|conta bancaria|onde guardar|onde poupar','Um mealheiro pode ajudar a separar pequenas quantias, mas não gera juros por si só. Uma conta bancária permite guardar e acompanhar o dinheiro; a remuneração depende das condições acordadas.','Um depósito é dinheiro colocado numa instituição bancária nas condições acordadas. Informa-te sobre comissões, remuneração e possibilidade de levantamento. Se fores menor, pede apoio a um adulto.','Separar o dinheiro para gastos do dinheiro para um objetivo facilita o acompanhamento.');
  add('saveinvest','Poupar e investir',P,'poupar e investir|investir|investimento financeiro|acoes|cripto|bitcoin','Poupar é reservar dinheiro. Investir é aplicar recursos esperando um retorno, com riscos que dependem da aplicação.','Um produto pode ter risco de perda e restrições de acesso ao dinheiro. Este guia explica os conceitos; não escolhe produtos financeiros por ti.','Guardar parte da mesada é poupar. Comprar ações é uma aplicação financeira com risco.');
  add('simpleinterest','Juros simples',P,'juros simples|juro simples','Nos juros simples, os juros são calculados sempre sobre o capital inicial.','A taxa e o tempo devem usar a mesma unidade: uma taxa anual combina com tempo em anos. Os exercícios do guia não incluem impostos ou comissões.','1 000 € a 3% ao ano durante 2 anos: juros = 1 000 × 0,03 × 2 = 60 €. Montante = 1 060 €.','J = C × i × t; montante = C + J. C: capital inicial; i: taxa decimal por período; t: períodos.');
  add('compoundinterest','Juros compostos',P,'juros compostos|juro composto|capitalizacao','Nos juros compostos, os juros de cada período são acrescentados ao capital e também passam a gerar juros.','A fórmula supõe taxa constante, capitalização uma vez por período e ausência de novos depósitos, impostos e comissões.','1 000 € a 3% ao ano durante 2 anos: 1 000 × 1,03² = 1 060,90 €.','Montante = C × (1 + i)^n. Juros = montante − C.');

  add('interest','O que são juros?',P,'juros|juro|juros de um deposito|juros de um emprestimo','Os juros são uma remuneração pelo uso de dinheiro durante um período.','Num depósito, podem remunerar o dinheiro guardado. Num empréstimo, são um custo para quem pede dinheiro. Distingue juros simples e compostos.','Se um empréstimo de 100 € cobra 5 € de juros num ano, esses juros correspondem a 5% do capital nesse exemplo.','Taxa de juro simples por um período = juros ÷ capital inicial × 100.');
  add('credit','Crédito e dívida pessoal',P,'credito|emprestimo|emprestimos|divida|dividas|dinheiro emprestado|taeg','O crédito permite usar dinheiro emprestado com a obrigação de o devolver nas condições acordadas.','Pode incluir juros e outros custos. A TAEG resume o custo total anual do crédito em percentagem, incluindo encargos relevantes. A poupança pode reduzir a necessidade de crédito.','Poupar para comprar um artigo permite pagá-lo com dinheiro que já tens. Uma compra a crédito pode acrescentar custos.');
  add('liquidity','Risco, liquidez e rentabilidade',P,'liquidez|rentabilidade|risco financeiro|risco de investimento','Risco é a possibilidade de resultados diferentes dos esperados, incluindo perdas; liquidez é a facilidade de transformar um ativo em dinheiro disponível.','Rentabilidade mede o retorno de uma aplicação. Um retorno esperado mais elevado não é uma garantia. Compara sempre condições, riscos, prazo e custos.','Uma aplicação que não pode ser levantada rapidamente pode ter pouca liquidez, mesmo que apresente uma remuneração interessante.');

  add('economics','Ciência económica e escassez',A,'economia|ciencia economica|escassez|problema economico|recursos escassos','A Economia estuda escolhas sobre a utilização de recursos escassos para satisfazer necessidades.','Como os recursos têm utilizações alternativas, precisamos de decidir o que produzir, como produzir e para quem produzir.','Uma escola com orçamento limitado escolhe entre renovar computadores e comprar equipamento desportivo.');
  add('opportunity','Custo de oportunidade',A,'custo de oportunidade|custo oportunidade','O custo de oportunidade é o valor da melhor alternativa a que renuncias quando fazes uma escolha.','Não se limita ao dinheiro: pode incluir tempo ou benefícios perdidos. Considera a melhor alternativa abandonada, não a soma de todas as alternativas.','Se usas uma tarde para estudar em vez de trabalhar, o rendimento desse trabalho pode ser parte do custo de oportunidade.');
  add('agents','Agentes económicos',A,'agentes economicos|agente economico|familias|empresas|resto do mundo','Os agentes económicos incluem famílias, empresas, Estado e resto do mundo.','As famílias consomem e fornecem trabalho; as empresas produzem; o Estado regula e presta serviços; o resto do mundo representa relações com o exterior.','Uma família compra pão a uma empresa; a empresa paga salários e pode comprar equipamentos ao estrangeiro.');
  add('needs','Necessidades económicas',A,'necessidades|necessidade|necessidades primarias|necessidades coletivas','As necessidades são situações que sentimos que precisam de ser satisfeitas. O consumo de bens e serviços pode satisfazê-las.','Podem ser individuais ou coletivas. A classificação em primárias, secundárias e terciárias depende do contexto e da importância atribuída.','A alimentação satisfaz uma necessidade essencial; a iluminação pública responde a uma necessidade coletiva.');
  add('consumption','Consumo',A,'consumo|consumir|consumo final|consumo intermedio|consumo privado|consumo publico','O consumo é a utilização de bens e serviços para satisfazer necessidades ou para produzir outros bens e serviços.','O consumo final satisfaz necessidades diretamente. O consumo intermédio usa bens e serviços transformados ou consumidos no processo produtivo.','Pão comprado por uma família é consumo final; farinha usada numa padaria é consumo intermédio.');
  add('engel','Lei de Engel',A,'lei de engel|engel|coeficiente orcamental','A lei de Engel indica que, em geral, quando o rendimento aumenta, diminui a proporção do orçamento dedicada à alimentação.','A despesa em alimentação pode aumentar em euros e, ao mesmo tempo, diminuir em percentagem do total. É uma regularidade empírica, não uma regra sem exceções.','Passar de gastar 200 € em 500 € para 250 € em 1 000 € reduz a proporção de 40% para 25%.','Coeficiente orçamental = despesa numa categoria ÷ despesa total × 100.');
  add('goods','Bens e serviços',A,'bens|servicos|bem economico|bens livres|bens de consumo|bens de producao','Os bens podem ser objetos materiais; os serviços são atividades prestadas para satisfazer necessidades.','Bens económicos são escassos e têm custo de oportunidade. Bens de consumo satisfazem necessidades diretamente; bens de produção ajudam a produzir.','Um caderno é um bem; uma aula é um serviço; um forno de uma padaria é um bem de produção.');
  add('production','Produção e fatores produtivos',A,'producao|fatores de producao|fatores produtivos|capital produtivo|trabalho e capital','Produzir é combinar recursos para criar bens e serviços. Os fatores produtivos incluem recursos naturais, trabalho e capital.','Aqui, capital refere-se a meios de produção, como máquinas e instalações. A tecnologia influencia a forma como os fatores são utilizados.','Uma padaria combina trabalho, instalações, forno e matérias-primas para produzir pão.');
  add('sectors','Setores de atividade',A,'setores de atividade|setor primario|setor secundario|setor terciario','O setor primário obtém recursos da natureza; o secundário transforma recursos; o terciário presta serviços.','A classificação serve para analisar a estrutura da atividade económica. As atividades podem estar ligadas em cadeias produtivas.','Agricultura: primário. Fabrico de mobiliário: secundário. Comércio e transportes: terciário.');
  add('productivity','Produtividade',A,'produtividade|producao por trabalhador','A produtividade mede a produção obtida por unidade de fator produtivo utilizado.','A produtividade do trabalho pode medir-se por trabalhador ou por hora trabalhada. Não é o mesmo que a produção total.','Se 4 trabalhadores produzem 80 unidades, a produtividade é 20 unidades por trabalhador.','Produtividade do trabalho = produção ÷ trabalho utilizado.');
  add('unemployment','Desemprego',A,'desemprego|taxa de desemprego|desempregados','Uma pessoa desempregada está sem emprego, disponível para trabalhar e procura trabalho, segundo os critérios estatísticos aplicáveis.','A população ativa inclui empregados e desempregados. A taxa de desemprego usa a população ativa, não a população total.','Com 100 desempregados e 1 000 pessoas ativas, a taxa de desemprego é 10%.','Taxa de desemprego = desempregados ÷ população ativa × 100.');
  add('demand','Procura',A,'procura|lei da procura|curva da procura|quantidade procurada','A procura relaciona as quantidades que os consumidores querem e podem comprar com os diferentes preços.','Mantendo os restantes fatores constantes, um preço mais baixo tende a aumentar a quantidade procurada. Rendimento, preferências e preços de outros bens podem deslocar a curva.','Uma queda do preço dos cadernos pode aumentar a quantidade procurada, se nada mais mudar.');
  add('supply','Oferta',A,'oferta|lei da oferta|curva da oferta|quantidade oferecida','A oferta relaciona as quantidades que os produtores querem vender com os diferentes preços.','Mantendo os restantes fatores constantes, um preço mais alto tende a aumentar a quantidade oferecida. Custos e tecnologia podem deslocar a curva.','Uma melhoria tecnológica que reduz custos pode aumentar a oferta de um bem.');
  add('equilibrium','Equilíbrio de mercado',A,'equilibrio de mercado|preco de equilibrio|equilibrio|excesso de procura|excesso de oferta','O equilíbrio de mercado ocorre quando a quantidade procurada é igual à quantidade oferecida ao mesmo preço.','Acima do preço de equilíbrio pode existir excesso de oferta; abaixo pode existir excesso de procura, no modelo habitual.','Se a um preço de 2 € compradores e vendedores pretendem negociar 100 unidades, esse ponto é de equilíbrio.','No equilíbrio: Qd = Qs.');
  add('markets','Estruturas de mercado',A,'mercado|concorrencia perfeita|concorrencia monopolistica|estruturas de mercado','Um mercado reúne relações entre compradores e vendedores. As estruturas variam conforme o número de empresas e o seu poder de mercado.','Na concorrência perfeita, as empresas são tomadoras de preço num modelo com muitos agentes e produto homogéneo. Na concorrência monopolística, há muitos vendedores com produtos diferenciados.','Muitas marcas de produtos diferenciados ilustram a ideia de concorrência monopolística.');
  add('monopoly','Monopólio e oligopólio',A,'monopolio|oligopolio','No monopólio há um único vendedor num mercado definido; no oligopólio há poucos vendedores relevantes.','O poder de mercado depende também de barreiras à entrada, substitutos e regulação. No oligopólio, as decisões das empresas influenciam-se mutuamente.','Se apenas uma empresa fornece determinado serviço sem substitutos próximos, a situação aproxima-se de um monopólio.');
  add('money','Moeda e funções da moeda',A,'moeda|funcoes da moeda|dinheiro|troca direta|troca indireta','A moeda serve como meio de pagamento, unidade de conta e reserva de valor.','Facilita as trocas porque evita a necessidade de cada pessoa encontrar outra com necessidades exatamente complementares. A inflação pode reduzir o seu poder de compra.','O preço em euros permite comparar bens diferentes: o euro funciona como unidade de conta.');
  add('inflation','Inflação',A,'inflacao|poder de compra|subida de precos|precos sobem','A inflação é uma subida generalizada dos preços ao longo do tempo. Com o mesmo dinheiro, pode ser possível comprar menos.','A subida isolada do preço de um produto não basta para descrever inflação. Uma inflação menor significa que os preços sobem mais devagar, não que descem.','Se um cabaz passa de 100 € para 105 €, a variação do seu preço é 5%.','Variação percentual = (valor final − valor inicial) ÷ valor inicial × 100.');
  add('deflation','Deflação e desinflação',A,'deflacao|desinflacao','Deflação é a diminuição generalizada dos preços. Desinflação é a redução do ritmo de subida dos preços.','Com inflação a passar de 5% para 2%, os preços continuam, em geral, a subir. A deflação pode levar a adiar consumo e aumentar o peso real das dívidas.','Passar de inflação de 5% para 2% é desinflação; uma variação geral de −1% corresponde a deflação.');
  add('income','Distribuição dos rendimentos',A,'rendimento|rendimentos|salario|salarios|renda|lucro|distribuicao dos rendimentos','A distribuição funcional do rendimento analisa a remuneração dos fatores de produção, como salários, rendas, juros e lucros.','A distribuição pessoal analisa como o rendimento se reparte entre pessoas ou famílias. São perspetivas diferentes sobre a mesma economia.','Um salário remunera trabalho; a distribuição pessoal compara os rendimentos de diferentes famílias.');
  add('redistribution','Redistribuição dos rendimentos',A,'redistribuicao|transferencias sociais|subsidios sociais','A redistribuição altera a distribuição dos rendimentos através de impostos, contribuições e transferências.','O Estado pode usar receitas para financiar prestações e serviços públicos. A análise deve considerar os efeitos antes e depois dessa intervenção.','Cobrar impostos e financiar apoios sociais pode reduzir desigualdades de rendimento.');
  add('savingsrate','Taxa de poupança',A,'taxa de poupanca|percentagem poupada|rendimento disponivel','A taxa de poupança indica que parte do rendimento disponível não foi usada em consumo.','O rendimento disponível é o rendimento após considerar impostos, contribuições e transferências relevantes. Pode ser consumido ou poupado.','Com rendimento disponível de 1 000 € e poupança de 100 €, a taxa de poupança é 10%.','Taxa de poupança = poupança ÷ rendimento disponível × 100.');
  add('investment','Investimento económico',A,'investimento|formacao de capital|autofinanciamento|financiamento','No sentido económico, o investimento pode aumentar ou substituir capital produtivo, como máquinas e instalações.','O financiamento pode usar recursos próprios ou recursos de terceiros. Comprar um ativo financeiro não é o mesmo que criar diretamente uma máquina nova.','Uma empresa compra um novo forno para produzir mais pão: trata-se de investimento produtivo.');

  add('circuit','Circuito económico',B,'circuito economico|fluxos reais|fluxos monetarios|fluxos','O circuito económico representa relações entre agentes económicos através de fluxos.','Os fluxos reais incluem bens, serviços e fatores produtivos. Os fluxos monetários incluem pagamentos, salários e outras transferências de dinheiro.','O trabalho prestado por uma família é um fluxo real; o salário pago pela empresa é um fluxo monetário.');
  add('accounts','Contabilidade nacional',B,'contabilidade nacional|contas nacionais|setores institucionais','A contabilidade nacional organiza as operações económicas e mede a atividade de uma economia.','Usa conceitos coerentes de produção, rendimento e despesa, e distingue setores institucionais. Ajuda a comparar períodos e países, respeitando limites dos indicadores.','O PIB é um agregado calculado no sistema de contas nacionais.');
  add('gdp','Produto Interno Bruto — PIB',B,'pib|produto interno bruto','O PIB mede o valor dos bens e serviços finais produzidos no território económico durante um período.','Na ótica da despesa, pode representar-se por consumo final, investimento, exportações e importações. Evita contar novamente os bens intermédios.','Somar o valor do pão e novamente toda a farinha usada nesse pão duplicaria parte da produção.','PIB = C + G + I + X − M. C: consumo final privado; G: consumo final público; I: formação bruta de capital; X: exportações; M: importações.');
  add('gdpnominal','PIB nominal e real',B,'pib nominal|pib real|precos correntes|precos constantes|nominal e real','O PIB nominal usa os preços do período. O PIB real procura medir a evolução do volume de produção, retirando o efeito da variação dos preços.','Um aumento do PIB nominal pode resultar de mais produção, de preços mais altos ou dos dois. O crescimento real ajuda a separar esses efeitos.','Se a produção ficar igual mas os preços subirem, o PIB nominal pode aumentar sem aumento do volume produzido.');
  add('gdphead','PIB por habitante e limites',B,'pib per capita|pib por habitante|limites do pib|limitacoes do pib','O PIB por habitante é o PIB dividido pela população. É uma média, não o rendimento efetivo de cada pessoa.','O PIB não mostra sozinho a distribuição do rendimento, o trabalho não remunerado ou os impactos ambientais. Não é uma medida completa de bem-estar.','Dois países com igual PIB por habitante podem ter desigualdades e condições de vida muito diferentes.','PIB per capita = PIB ÷ população.');
  add('valueadded','Valor acrescentado bruto — VAB',B,'vab|valor acrescentado|valor agregado','O valor acrescentado bruto é o valor da produção menos o consumo intermédio.','Somar valores acrescentados evita a dupla contagem. Na ótica da produção, o PIB obtém-se somando o VAB e os impostos líquidos de subsídios sobre os produtos.','Uma padaria produz 500 € de pão e usa 200 € de consumos intermédios: o VAB é 300 €.','VAB = produção − consumo intermédio.');
  add('nationalincome','Rendimento Nacional Bruto — RNB',B,'rnb|rendimento nacional bruto|produto nacional|interno e nacional','O RNB corresponde ao PIB acrescido do saldo dos rendimentos primários recebidos e pagos ao resto do mundo.','O PIB usa o critério do território; o RNB considera rendimentos das unidades residentes. Residência económica não é o mesmo que nacionalidade.','Ao PIB juntam-se rendimentos primários recebidos do exterior e retiram-se os pagos ao exterior.','RNB = PIB + saldo dos rendimentos primários com o exterior.');
  add('trade','Comércio externo',B,'comercio externo|exportacoes|exportacao|importacoes|importacao','Exportar é vender bens ou serviços a não residentes; importar é adquiri-los a não residentes.','O comércio externo permite especialização e acesso a produtos, mas também cria relações de dependência e exposição a choques externos.','Serviços prestados por residentes a turistas não residentes podem contar como exportações de serviços.');
  add('tradebalance','Balança de bens e serviços',B,'balanca comercial|balanca de bens|saldo comercial|balanca de servicos','O saldo de uma balança compara créditos e débitos. Nos bens e serviços, corresponde à diferença entre exportações e importações.','Se as exportações superarem as importações, há excedente; se forem menores, há défice. Uma balança comercial de bens não inclui todos os serviços.','Exportações de bens de 100 e importações de 120 dão um saldo de −20, na mesma unidade.','Saldo = exportações − importações.');
  add('payments','Balança de pagamentos',B,'balanca de pagamentos|balanca corrente|balanca de capital|balanca financeira','A balança de pagamentos regista transações entre residentes e não residentes durante um período.','Inclui as balanças corrente, de capital e financeira. A corrente inclui bens, serviços, rendimentos primários e secundários. Usa um sistema de registo por partidas dobradas.','Uma exportação é registada e tem uma contrapartida financeira; a balança financeira não se resume a empréstimos.');
  add('exchange','Taxa de câmbio',B,'taxa de cambio|cambio|apreciacao|depreciacao da moeda','A taxa de câmbio indica o preço de uma moeda expresso noutra moeda.','Uma apreciação pode tornar importações mais baratas e exportações menos competitivas, mantendo os restantes fatores constantes. O efeito depende da moeda em que os preços são fixados.','Se um euro passa a comprar mais unidades de outra moeda, o euro aprecia-se face a essa moeda.');
  add('state','Estado e funções económicas',B,'estado|funcoes do estado|intervencao do estado|setor publico','O Estado pode promover eficiência, equidade e estabilidade económica.','Intervém através de regras, impostos, despesa e serviços públicos. A avaliação compara benefícios, custos e possíveis efeitos indesejados.','Financiar educação, redistribuir rendimento e atuar numa recessão são exemplos de funções económicas do Estado.');
  add('marketfailure','Falhas de mercado',B,'falhas de mercado|falha de mercado|bens publicos|assimetria de informacao','Uma falha de mercado ocorre quando o mercado, por si só, não conduz a uma afetação eficiente dos recursos.','Podem existir externalidades, bens públicos, poder de mercado ou informação assimétrica. Um bem público é não rival e não excluível; nem todo o bem fornecido pelo Estado tem essas características.','A iluminação pública é um exemplo habitual de bem público.');
  add('taxes','Impostos diretos e indiretos',B,'impostos|imposto|irs|irc|iva|impostos diretos|impostos indiretos','Os impostos financiam a atividade pública e podem influenciar comportamentos e redistribuir rendimento.','Impostos diretos incidem sobre rendimento ou património; impostos indiretos incidem sobre despesas ou transações. Este guia não apresenta taxas fiscais atuais.','O IRS é um exemplo de imposto direto; o IVA é um exemplo de imposto indireto.');
  add('publicbudget','Orçamento do Estado',B,'orcamento do estado|receitas publicas|despesas publicas|saldo orcamental|defice orcamental|excedente orcamental','O Orçamento do Estado prevê receitas e despesas públicas para um período.','De forma simplificada, receitas inferiores às despesas geram défice; superiores geram excedente. A medição estatística depende do conceito e do universo de entidades considerado.','Receitas de 90 e despesas de 100 dão um saldo de −10, na mesma unidade.','Saldo orçamental = receitas − despesas.');
  add('publicdebt','Dívida pública e défice',B,'divida publica|defice e divida','O défice é um fluxo medido durante um período; a dívida é um stock medido numa determinada data.','Um défice pode aumentar a necessidade de financiamento, mas a variação da dívida também depende de outras operações e ajustamentos.','O défice de um ano não é o mesmo que o total da dívida existente no fim desse ano.');
  add('fiscal','Política orçamental',B,'politica orcamental|politica fiscal|politica expansionista|politica restritiva','A política orçamental usa despesa pública e receitas, incluindo impostos, para influenciar a economia.','Uma política expansionista pode aumentar a despesa ou reduzir impostos; uma restritiva pode fazer o contrário. Os resultados dependem do contexto, do financiamento e das reações dos agentes.','Durante uma quebra da procura, aumentar investimento público pode ajudar a sustentar a atividade.');
  add('monetary','Política monetária e BCE',B,'politica monetaria|bce|banco central|taxa de juro|taxas de juro','A política monetária influencia condições monetárias e financeiras, incluindo taxas de juro.','Na área do euro, é conduzida pelo Eurosistema. Taxas mais altas tendem a encarecer o crédito e a conter a procura e a inflação, com efeitos que demoram e variam.','Crédito mais caro pode levar famílias e empresas a adiar algumas despesas.');
  add('eu','União Europeia e área do euro',B,'uniao europeia|ue|area do euro|zona euro|euro|mercado unico','A União Europeia envolve integração entre Estados-membros. A área do euro reúne os países da UE que adotaram o euro.','O mercado único procura permitir a circulação de bens, serviços, pessoas e capitais. Nem todos os membros da UE utilizam o euro. O guia não mantém uma lista atualizada de membros.','Partilhar moeda evita conversões cambiais entre participantes, mas implica uma política monetária comum.');
  add('integration','Integração económica regional',B,'integracao regional|integracao economica|uniao aduaneira|zona de comercio livre','A integração económica reduz barreiras e coordena relações entre economias.','Uma zona de comércio livre reduz barreiras internas; uma união aduaneira acrescenta uma pauta externa comum; um mercado comum inclui mobilidade de fatores.','Eliminar tarifas entre parceiros é um passo de integração; adotar uma moeda comum é uma etapa diferente.');

  add('growth','Crescimento económico',C,'crescimento economico|crescimento|taxa de crescimento|crescer economicamente','O crescimento económico corresponde ao aumento da produção de uma economia, habitualmente medido pela evolução do PIB real.','Pode resultar de mais fatores produtivos ou de maior produtividade. Crescer não garante, por si só, melhor distribuição de rendimento ou sustentabilidade.','Um PIB real que passa de 100 para 103 cresce 3%, na mesma unidade.','Taxa de crescimento = (valor final − valor inicial) ÷ valor inicial × 100.');
  add('development','Desenvolvimento',C,'desenvolvimento|desenvolvimento economico|crescimento e desenvolvimento','O desenvolvimento envolve melhorar condições de vida e capacidades das pessoas, para além do aumento da produção.','Saúde, educação, participação e distribuição dos benefícios são dimensões relevantes. Pode haver crescimento sem melhorias equivalentes em todas essas dimensões.','Produzir mais sem melhorar acesso à saúde ou reduzir exclusão pode aumentar o PIB sem assegurar desenvolvimento amplo.');
  add('hdi','Índice de Desenvolvimento Humano — IDH',C,'idh|indice de desenvolvimento humano','O IDH combina indicadores de saúde, educação e rendimento para resumir dimensões do desenvolvimento humano.','Usa esperança de vida, indicadores de escolaridade e RNB por habitante em paridade de poder de compra. Não mede todas as desigualdades nem todos os impactos ambientais.','Países com rendimentos semelhantes podem ter níveis diferentes de educação e esperança de vida.');
  add('inequality','Desigualdade e índice de Gini',C,'desigualdade|desigualdades|gini|lorenz|distribuicao desigual','A desigualdade descreve diferenças na distribuição de recursos, rendimentos ou oportunidades.','O índice de Gini resume desigualdade da distribuição: maior valor indica maior desigualdade. Pode ser apresentado entre 0 e 1 ou entre 0 e 100. A curva de Lorenz representa a distribuição acumulada do rendimento.','Uma média de rendimento pode aumentar e esconder situações em que os ganhos se concentram num grupo pequeno.');
  add('poverty','Pobreza e exclusão social',C,'pobreza|exclusao social|pobreza absoluta|pobreza relativa','A pobreza envolve insuficiência de recursos; a exclusão social envolve dificuldades de participação em várias dimensões da sociedade.','A pobreza relativa compara recursos com um padrão da sociedade; a absoluta refere-se à satisfação de necessidades básicas. Os indicadores não são todos equivalentes.','Ter pouco rendimento e enfrentar barreiras no acesso a habitação, educação e emprego pode agravar a exclusão.');
  add('globalization','Globalização',C,'globalizacao|economia mundial|mundializacao','A globalização aumenta as ligações entre países através de comércio, investimento, informação, tecnologia e movimentos de pessoas.','Pode ampliar mercados e difundir conhecimento, mas também criar dependências e distribuir benefícios e custos de forma desigual.','Um produto pode ser concebido num país, usar peças de vários outros e ser vendido em muitos mercados.');
  add('multinationals','Empresas transnacionais',C,'transnacionais|multinacionais|empresa multinacional|cadeias globais','As empresas transnacionais organizam atividades em mais de um país.','Podem repartir produção, investigação e vendas entre locais diferentes. Criam emprego e investimento, mas também levantam questões de poder económico, condições laborais e fiscalidade.','Uma empresa desenvolve um produto num país e fabrica componentes noutros.');
  add('technology','Inovação e mudança tecnológica',C,'inovacao|tecnologia|automacao|robotizacao|digitalizacao','A inovação introduz produtos, processos ou formas de organização novos ou melhorados.','Pode elevar produtividade e criar atividades, mas também exigir novas qualificações e alterar empregos. Os efeitos não se distribuem igualmente.','Automatizar tarefas repetitivas pode mudar as funções dos trabalhadores e exigir formação.');
  add('sustainability','Desenvolvimento sustentável',C,'sustentabilidade|desenvolvimento sustentavel|sustentavel|sustentabilidade ambiental','O desenvolvimento sustentável procura satisfazer necessidades presentes sem comprometer a capacidade das gerações futuras.','Combina dimensões económica, social e ambiental. Implica analisar recursos, poluição, equidade e consequências de longo prazo.','Melhorar transportes públicos pode combinar mobilidade, acesso a oportunidades e redução de emissões.');
  add('externalities','Externalidades',C,'externalidades|externalidade|poluicao|custos externos','Uma externalidade é um efeito de uma atividade sobre terceiros que não é plenamente refletido no preço da transação.','Pode ser negativa, como poluição, ou positiva, como alguns benefícios sociais da educação. Impostos, regras ou apoios podem procurar corrigir esses efeitos.','Uma fábrica pode poluir um rio e impor custos a pessoas que não compram o seu produto.');
  add('circular','Economia circular',C,'economia circular|reciclagem|reutilizar|reparar','A economia circular procura prolongar o uso de produtos e materiais e reduzir desperdícios.','Inclui repensar o desenho, reduzir consumo de recursos, reutilizar, reparar e reciclar. Não se limita à reciclagem e não elimina todos os impactos ambientais.','Reparar um telemóvel e prolongar a sua utilização pode evitar uma substituição imediata.');
  add('rights','Direitos humanos e economia',C,'direitos humanos|direitos sociais|trabalho digno|cidadania','As decisões económicas têm efeitos sobre direitos e condições de vida, como trabalho, saúde, educação e participação.','Analisar uma política exige observar quem beneficia, quem suporta custos e como os direitos são protegidos. Eficiência e direitos não são a mesma medida.','Avaliar uma cadeia de produção inclui considerar condições de trabalho, para além do preço final.');
  add('demography','Demografia e migrações',C,'demografia|migracoes|migracao|envelhecimento|populacao','A demografia estuda a população e a sua evolução. Migrações e envelhecimento influenciam trabalho, consumo e necessidades de serviços.','Os efeitos económicos dependem de qualificações, integração, instituições e condições locais. Não existe uma consequência única para todos os contextos.','O envelhecimento pode aumentar necessidades de cuidados e alterar a proporção entre população ativa e total.');
  add('tradepolicy','Livre comércio e protecionismo',C,'livre comercio|protecionismo|tarifas|barreiras comerciais','O livre comércio reduz barreiras às trocas. O protecionismo usa medidas como tarifas ou quotas para limitar concorrência externa.','A proteção pode favorecer alguns produtores, mas aumentar custos para consumidores e empresas que importam, além de gerar retaliação. É preciso analisar os efeitos distribuídos.','Uma tarifa sobre um bem importado pode aumentar o seu preço interno.');
  // Perguntas práticas de poupança. As situações e quantias são exemplos educativos.
  function faq(id,label,aliases,answer,detail,example,intents=[],exampleModel){
    add(id,label,P,aliases,answer,detail,example);
    Object.assign(topics[topics.length-1],{guide:true,intents,exampleModel});
  }
  faq('allowanceplan','Poupar com a mesada','poupar com a mesada|poupar a mesada|gerir a mesada|mesada para poupar',
    'Quando recebes a mesada, separa primeiro o dinheiro necessário para despesas importantes. Depois escolhe uma pequena quantia para guardar e um limite para os outros gastos.',
    'Dá um nome ao objetivo, guarda essa parte num local separado e acompanha quanto já juntaste. A quantia deve caber na tua mesada; não tem de ser igual à dos teus amigos.',
    'Se recebes 30 € e precisas de gastar 20 €, ficam 10 € antes de escolheres quanto guardar e quanto reservar para outros gastos.',
    [[/\bmesada\b/,/como|poup\w*|guardar|gerir|organizar|dividir|gastar/],[/sou (menor|crianca)|ainda estudo|tenho \d+ anos/,/poup\w*|guardar dinheiro/]],{kind:'budget',income:30,expense:20,planning:true});
  faq('expenselog','Saber para onde vai o dinheiro','registar despesas|anotar gastos|acompanhar gastos|para onde vai o dinheiro|nao sei quanto gasto',
    'Durante alguns dias, anota cada gasto, mesmo os pequenos. Regista a data, a quantia e aquilo em que gastaste.',
    'No fim, agrupa os gastos, por exemplo em transporte, alimentação e lazer. Compara o total com o dinheiro que recebeste e procura despesas que possas alterar sem prejudicar necessidades importantes.',
    'Uma nota com «segunda-feira: lanche» e a quantia paga já ajuda a identificar um hábito de consumo.',
    [[/nao sei|saber|perceber|descobrir|onde|controlar|acompanhar|regist\w*|anot\w*/,/gasto|gastos|despesas|dinheiro vai|vai o dinheiro/],[/dinheiro desaparece|dinheiro acaba/,/nao sei|sem perceber/]]);
  faq('envelopes','Separar dinheiro por finalidade','metodo dos envelopes|envelopes|separar dinheiro|tres mealheiros|dividir o dinheiro',
    'Podes separar o dinheiro em partes com uma finalidade: despesas necessárias, gastos pessoais e poupança. Usa envelopes, mealheiros identificados ou um registo.',
    'Escolhe os valores a partir do teu orçamento. Se uma parte acabar, revê o plano antes de retirar dinheiro de outro objetivo. Não existe uma divisão obrigatória para todas as pessoas.',
    'Podes identificar um envelope como «transporte» e outro como «bicicleta», para não misturares o dinheiro dos dois.',
    [[/separar|dividir|organizar/,/dinheiro|mesada|poupanca/],[/envelopes|mealheiros/]]);
  faq('autosave','Criar uma rotina de poupança','poupanca automatica|automatizar poupanca|esqueco de poupar|lembrar de poupar|guardar quando recebo',
    'Liga o hábito de poupar a um momento fixo, como o dia em que recebes dinheiro. Um lembrete e um registo simples ajudam a manter a rotina.',
    'Se usares uma conta, uma transferência regular pode ajudar, desde que haja saldo suficiente e conheças as condições. Se fores menor, combina o método com um adulto responsável.',
    'Podes marcar no calendário o dia da mesada e, nesse dia, separar a quantia que decidiste guardar.',
    [[/esquec\w*|lembr\w*|automatic\w*|automatiz\w*|lembrete/,/poup\w*|guardar|dinheiro|mesada/],[/guardar|poupar/,/logo que recebo|quando recebo|dia em que recebo/]]);
  faq('selfcontrol','Evitar gastar tudo','gasto tudo|gastar tudo|gasto sempre tudo|nao paro de gastar|nao consigo controlar os gastos',
    'Experimenta separar a poupança antes dos gastos opcionais, definir um limite para estes gastos e esperar antes de uma compra que não tinhas planeado.',
    'Descobre o que costuma levar-te a comprar: promoções, redes sociais, tédio ou vontade de acompanhar amigos. Reduz esses estímulos e revê o plano sem te culpares se falhares.',
    'Se te apetecer comprar um jogo que não estava no plano, guarda a ideia e volta a decidir depois de comparar o preço com o teu objetivo.',
    [[/gasto|gastar|gasta|gastei|gastando/,/tudo|todo o dinheiro|sem controlar|sem pensar/],[/nao consigo|nao paro|dificuldade/,/controlar.*gast|parar.*compr|resistir.*compr/]]);
  faq('setbacks','Recomeçar depois de falhar','falhei a poupanca|gastei a poupanca|recomecar a poupar|falhar um mes|desisti de poupar',
    'Uma falha não apaga o que aprendeste. Percebe o motivo, confirma o dinheiro que ainda tens e ajusta a quantia ou o prazo antes de recomeçar.',
    'Não precisas de compensar uma falha com um esforço que prejudique despesas essenciais. Um plano mais pequeno e possível costuma ser mais fácil de manter.',
    'Se não pudeste guardar num mês, podes prolongar o prazo do objetivo em vez de duplicar a quantia no mês seguinte.',
    [[/falh\w*|desisti|desistir|recomec\w*|gastei|usei/,/poup\w*|dinheiro guardado|objetivo|meta/],[/nao (poupei|guardei)/,/mes|semana/]]);
  faq('motivation','Manter a motivação','motivacao para poupar|manter a motivacao|nao desistir|poupar demora muito|poupanca demora',
    'Escolhe um objetivo que faça sentido para ti e acompanha o progresso. Dividir uma meta grande em etapas ajuda a perceber que estás a avançar.',
    'Podes usar uma barra desenhada ou uma lista de etapas. Evita comparar o teu ritmo com o de outras pessoas: rendimentos e despesas são diferentes.',
    'Se a meta for uma bicicleta, assinala cada etapa alcançada e confirma se o prazo continua realista.',
    [[/motiva\w*|desanim\w*|demora|lento|impaciente|nao desistir/,/poup\w*|juntar|guardar|objetivo|meta/]]);
  faq('goaladjust','Ajustar uma meta difícil','meta impossivel|objetivo impossivel|nao consigo atingir a meta|prazo demasiado curto|plano realista',
    'Se a quantia necessária por período não cabe no orçamento, muda uma das peças: prolonga o prazo, reduz o custo do objetivo ou revê despesas que possam ser alteradas.',
    'Não deixes de pagar despesas essenciais para cumprir uma meta. Confirma também se já tens algum dinheiro guardado; isso reduz a parte que falta juntar.',
    'Uma meta de 120 € em 6 meses exige 20 € por mês. Se o prazo passar para 12 meses, exige 10 € por mês, sem juros.',
    [[/meta|objetivo|prazo|juntar/,/impossivel|nao consigo atingir|nao consigo cumprir|nao chega|demasiado curto|nao cabe|irrealista/]]);
  faq('irregularincome','Poupar com rendimentos variáveis','rendimento irregular|rendimentos variaveis|mesada irregular|nao recebo todos os meses',
    'Se o dinheiro que recebes varia, faz um plano prudente a partir dos valores que são mais certos. Evita assumir que todos os meses serão iguais ao melhor mês.',
    'Quando receberes mais, podes reservar parte para meses com menos rendimento e para os teus objetivos. Revê o plano quando souberes quanto recebeste realmente.',
    'Se recebes dinheiro apenas em algumas ocasiões, podes decidir o que fazer com cada quantia quando ela chega, sem prometer uma poupança mensal que talvez não consigas manter.',
    [[/rendimento|rendimentos|recebo|mesada|salario|dinheiro/,/irregular|variavel|varia|diferente.*mes|nao.*todos os meses|so as vezes/]]);
  faq('multiplegoals','Poupar para vários objetivos','varios objetivos|duas metas|dois objetivos|priorizar objetivos|qual objetivo primeiro',
    'Ordena os objetivos por importância, urgência e custo. Distingue uma reserva para imprevistos das compras que podes planear.',
    'Podes distribuir a quantia disponível por mais de uma meta, mas isso torna cada uma mais lenta. Se o dinheiro for pouco, concentrar-te numa prioridade pode facilitar o acompanhamento.',
    'Comprar material escolar necessário pode ter prioridade sobre um jogo novo. São objetivos com urgências diferentes.',
    [[/objetivos?|metas?|compras/,/varios|varias|duas|dois|ao mesmo tempo|prioriz\w*|primeiro/]]);
  faq('giftmoney','Dinheiro recebido em presentes','dinheiro de aniversario|dinheiro do natal|dinheiro em presentes|recebi dinheiro de presente',
    'Quando recebes dinheiro num presente, podes decidir uma parte para guardar e outra para usar agora. Faz essa escolha antes de começares a gastar.',
    'Pensa no objetivo que já tens e nas despesas próximas. Um presente pode ajudar a avançar uma meta, mas não deve ser tratado como rendimento garantido todos os meses.',
    'Se recebes um presente em dinheiro, podes reforçar o mealheiro da bicicleta e reservar outra parte para algo de que gostes.',
    [[/dinheiro|recebi|recebo|poupar|guardar/,/aniversario|natal|presente|prenda/]]);
  faq('leisure','Poupar e aproveitar o presente','poupar sem deixar de viver|poupar e divertir|poupar e lazer|tenho de deixar de comprar tudo',
    'Poupar não significa eliminar tudo o que te dá prazer. O objetivo é equilibrar o que precisas, o que gostas de fazer e o que queres guardar para o futuro.',
    'Depois das despesas necessárias, podes definir um limite para lazer que caiba no orçamento. Escolher de forma consciente é diferente de comprar sem limite.',
    'Podes combinar um passeio económico com amigos e manter parte do dinheiro para um objetivo maior.',
    [[/poup\w*|guardar dinheiro/,/divert\w*|lazer|deixar de viver|deixar de comprar tudo|nao comprar nada|aproveitar a vida/]]);
  faq('budgetrule','A regra 50/30/20','regra 50 30 20|50 30 20|regra do orçamento',
    'A regra 50/30/20 é um exemplo de divisão do rendimento: 50% para necessidades, 30% para desejos e 20% para poupança ou objetivos financeiros.',
    'É uma referência para organizar um orçamento, não uma obrigação nem uma percentagem adequada a todas as pessoas. Se as despesas essenciais forem maiores, adapta a divisão às tuas possibilidades.',
    'Num rendimento de 100 €, essa divisão ilustrativa corresponderia a 50 €, 30 € e 20 €. Isso não significa que tenhas de conseguir guardar 20 €.',
    [[/50.*30.*20/]]);
  faq('smallcosts','O efeito dos pequenos gastos','pequenos gastos|pequenas despesas|gastos repetidos|gastar em cafes|comprar todos os dias',
    'Um gasto pequeno pode tornar-se significativo quando se repete. Multiplica o valor pela frequência para perceber o total e decidir se queres alterar esse hábito.',
    'Distingue os gastos necessários dos que podes reduzir. A ideia é escolher com informação, sem cortar alimentação ou outras necessidades importantes.',
    'Se conseguires guardar 2,50 € por semana em vez de gastar essa quantia, juntas 130 € em 52 semanas, sem juros.',
    [[/pequen\w*|cafes|cafe|todos os dias|repetidos|repetidas/,/gastos?|despesas?|compr\w*/]],{kind:'periodic',amount:2.5,unit:'semana',time:52,timeUnit:'semana'});
  faq('schoolsaving','Poupar na escola','poupar na escola|poupar nos lanches|poupar como estudante|e na escola',
    'Na escola, podes planear lanches quando for possível, comparar material de que precisas e evitar compras só para acompanhar colegas.',
    'Reutiliza material em bom estado e combina deslocações quando isso for adequado e seguro. Não saltes refeições nem deixes de comprar material necessário para poupar.',
    'Antes de comprar cadernos novos, confirma se ainda tens cadernos utilizáveis do ano anterior.',
    [[/escola|estudante|lanches|cantina|material escolar/,/poup\w*|economiz\w*|reduzir|gastar menos/]]);
  faq('householdsaving','Poupar em casa','poupar em casa|economizar em casa|poupar no supermercado|e em casa',
    'Em casa, ajuda a planear compras, faz uma lista e evita desperdícios. Compara o preço por unidade e compra apenas o que será realmente usado.',
    'Rever serviços e subscrições pouco usados também pode ajudar. As decisões sobre contratos ou equipamentos devem ser combinadas com quem gere o orçamento da casa.',
    'Uma embalagem maior não compensa se parte do produto acabar por ser desperdiçada.',
    [[/casa|supermercado|compras de comida|agua|luz|eletricidade/,/poup\w*|economiz\w*|reduzir|gastar menos/]]);
  faq('gaming','Poupar em jogos e compras digitais','compras nos jogos|skins|microtransacoes|poupar em jogos|gastar em jogos',
    'Antes de comprar um jogo, uma skin ou outro extra digital, confirma o custo em euros e se a compra cabe no teu limite de lazer.',
    'Muitas compras pequenas também se somam. Evita deixar pagamentos sem controlo e, se fores menor, combina as compras com um adulto responsável.',
    'Moedas virtuais podem dificultar perceber quanto estás a gastar. Traduz o preço para dinheiro real antes de decidir.',
    [[/jogos?|skins?|microtransac\w*|moedas virtuais/,/gastar|comprar|poup\w*|controlar|dinheiro/]]);
  faq('subscriptions','Subscrições e pagamentos repetidos','subscricoes|assinaturas|pagamentos recorrentes|renovacao automatica|subscricao gratis',
    'Revê os serviços que pagas regularmente e confirma quais usas realmente. Verifica o preço, a renovação automática e as condições de cancelamento.',
    'Uma experiência gratuita pode passar a ser paga. Anota a data em que termina e lê as condições antes de aderir.',
    'Antes de aderir a outro serviço, confirma se já pagas por um serviço semelhante que pouco usas.',
    [[/subscric\w*|assinatur\w*|renovacao automatica|experiencia gratuita/]]);
  faq('pricecompare','Comparar preços e promoções','comparar precos|preco por unidade|promocao compensa|desconto compensa|mais barato compensa',
    'Compara o preço final, a quantidade, a qualidade e eventuais portes ou outros custos. O preço por unidade ajuda a comparar embalagens de tamanhos diferentes.',
    'Um desconto só ajuda o teu orçamento se o produto for necessário ou estiver no teu plano. Gastar menos do que o preço anunciado não transforma uma compra desnecessária em poupança.',
    'Um artigo com preço mais baixo pode sair mais caro se os portes fizerem o custo final ultrapassar o de outra opção.',
    [[/compar\w*|compensa|vale a pena|mais barato|bom negocio/,/precos?|promoc\w*|descont\w*|comprar|embalagem/],[/preco por unidade/]]);
  faq('repairreuse','Reparar e reutilizar','reparar ou comprar|reutilizar para poupar|comprar em segunda mao|comprar usado',
    'Antes de substituir um objeto, vê se podes continuar a usá-lo, repará-lo ou encontrar uma opção em segunda mão que seja adequada.',
    'Compara o custo total, o estado, a segurança e a duração esperada. Uma opção usada ou uma reparação não são sempre a melhor escolha; depende das condições.',
    'Uma mochila em bom estado pode continuar a servir, mesmo que uma nova esteja em promoção.',
    [[/repar\w*|reutiliz\w*|segunda mao|comprar usado/,/poup\w*|comprar|compensa|barato|dinheiro/]]);
  faq('annualexpenses','Preparar despesas que já sabes que virão','despesas anuais|despesas previstas|gastos previstos|poupar para ferias|poupar para material escolar',
    'Uma despesa que já sabes que vai acontecer pode ser preparada com antecedência. Calcula quanto falta juntar e divide pelo tempo disponível.',
    'Guarda essa quantia à parte e inclui-a no orçamento. Férias, material escolar e pagamentos anuais planeados são diferentes de um imprevisto.',
    'Para preparar uma despesa de 120 € daqui a 12 meses, podes planear 10 € por mês, sem juros.',
    [[/despesas?|pagamentos?|gastos?/,/anuais|anual|previst\w*|planead\w*/],[/poup\w*|guardar|preparar/,/ferias|material escolar|inicio das aulas/]],{kind:'goal',target:120,time:12,timeUnit:'mes',initial:0});
  faq('emergencygoal','Reserva de emergência ou objetivo de compra','reserva ou objetivo|emergencia ou compra|reserva e objetivo|diferenca entre reserva e objetivo',
    'Uma reserva para imprevistos serve para necessidades inesperadas. A poupança para uma compra serve para algo que consegues planear.',
    'Separar as duas finalidades ajuda a não gastar a reserva numa compra opcional. A forma de distribuir o dinheiro depende das despesas importantes e do que é possível guardar.',
    'A reparação inesperada de um equipamento necessário é diferente de juntar dinheiro para um jogo novo.',
    [[/reserva|emergencia|imprevistos/,/objetivo|compra|ferias|diferenca|prioridade/]]);
  faq('usesavings','Quando usar o dinheiro guardado','usar a poupanca|levantar a poupanca|mexer na poupanca|preciso do dinheiro guardado',
    'O dinheiro guardado tem uma finalidade: pode ser usado quando essa finalidade chegar ou quando houver uma necessidade importante que obrigue a rever o plano.',
    'Se usares uma reserva num imprevisto, revê depois como a podes recompor. Se for uma compra opcional, pensa no que muda no teu objetivo antes de retirar o dinheiro.',
    'Usar a reserva para uma reparação necessária não é falhar o objetivo da reserva; é uma das razões para a ter.',
    [[/usar|levantar|mexer|retirar|preciso/,/poupanca|dinheiro guardado|reserva/]]);
  faq('inflationsaving','Poupança e poder de compra','poupanca perde valor|inflacao e poupanca|dinheiro guardado perde valor',
    'O dinheiro guardado pode manter a mesma quantia em euros e, ainda assim, comprar menos se os preços aumentarem. Esse é o efeito da inflação no poder de compra.',
    'Receber juros não garante, por si só, que o poder de compra aumente: contam também a inflação e os custos. Dinheiro para necessidades próximas e aplicações com risco têm finalidades diferentes.',
    'Se um cabaz custa 100 € e passa a custar 105 €, ter os mesmos 100 € já não chega para o comprar.',
    [[/poupanca|dinheiro guardado|poupar/,/inflacao|perde valor|perder valor|poder de compra/]]);
  faq('savingsmyth','Poupar é só para quem tem muito dinheiro?','so os ricos poupam|so ricos podem poupar|poupar e ser avarento|poupar e nao gastar',
    'Poupar não exige ser rico nem significa recusar todas as compras. Significa reservar dinheiro quando existe margem, dando prioridade às necessidades importantes.',
    'Quem tem rendimentos muito baixos pode não conseguir guardar dinheiro. O valor da poupança não mede a responsabilidade ou o valor de uma pessoa.',
    'Guardar uma pequena quantia possível é um hábito de poupança; não conseguir guardar num mês difícil não é uma falha pessoal.',
    [[/poup\w*|guardar/,/so.*ricos|ser rico|preciso.*muito dinheiro|avarento|sovina|nao gastar nada/]]);
  faq('savingmistakes','Erros comuns ao tentar poupar','erros ao poupar|erros de poupanca|o que evitar ao poupar',
    'Alguns erros comuns são escolher uma meta que não cabe no orçamento, esquecer gastos pequenos, misturar a poupança com o dinheiro do dia a dia e desistir depois de uma falha.',
    'Evita contar com dinheiro que ainda não é certo ou achar que uma promoção compensa sempre. Revê o plano e faz mudanças pequenas que consigas manter.',
    'Um plano que depende de gastar menos do que precisas para alimentação ou transporte deve ser ajustado.',
    [[/erros?|evitar|nao fazer|fazer mal/,/poup\w*|guardar dinheiro/]]);
  faq('savingsecurity','Proteger o dinheiro e evitar propostas suspeitas','dinheiro facil|duplicar dinheiro|lucro garantido|esquemas|proteger a poupanca',
    'Desconfia de propostas que prometem muito dinheiro rapidamente, pressionam para decidir já ou pedem códigos e dados de acesso. Para poupar, não precisas de aceitar uma promessa de enriquecimento rápido.',
    'Confirma a identidade e as condições por canais oficiais antes de pagar ou partilhar dados. Se fores menor ou tiveres dúvidas, pede apoio a um adulto responsável.',
    'Uma mensagem que pede um pagamento para «duplicar a tua poupança» deve levar-te a parar e verificar, em vez de enviar dinheiro.',
    [[/duplicar|dobrar|garantid\w*|esquemas?|burla|fraude|dinheiro facil/,/dinheiro|poupanca|lucro|ganhar|retorno|proteger/]]);

  faq('savingfrequency','Com que frequência poupar?','poupar todos os dias|poupar todas as semanas|poupar todos os meses|frequencia de poupanca',
    'Não tens de guardar dinheiro todos os dias. Escolhe uma frequência que combine com a forma como recebes dinheiro e com as tuas despesas.',
    'Pode ser mais simples guardar uma quantia quando recebes a mesada ou rever a poupança semanalmente. A regularidade deve ser possível de manter, não uma obrigação de poupar a qualquer custo.',
    'Se recebes a mesada uma vez por mês, podes separar a poupança nesse dia, em vez de tentar guardar todos os dias.',
    [[/poupar|guardar/,/frequencia|quantas vezes|todos os dias|todas as semanas|todos os meses|diariamente|semanalmente|mensalmente/]]);
  faq('spendless','Gastar menos e poupar','poupar e economizar|gastar menos e poupar|economizar e poupar|reduzir gastos e poupar',
    'Na linguagem do dia a dia, poupar e economizar podem ter o mesmo sentido. Mas reduzir uma despesa só aumenta o dinheiro guardado se não gastares essa diferença noutra coisa.',
    'Distingue a redução de um custo da poupança acumulada. Se quiseres usar a diferença para um objetivo, separa-a ou regista-a como dinheiro guardado.',
    'Se evitas uma compra e depois gastas essa quantia noutro artigo, não aumentaste a poupança guardada.',
    [[/poupar|poupanca/,/economizar|gastar menos|reduzir gastos/,/diferenca|mesma coisa|igual|e /]]);

  // Combinações de ideias reconhecem perguntas naturais sem depender de uma frase exata.
  function extend(id,intents){topics.find(t=>t.id===id).intents=intents;}
  extend('saving',[[/o que|significa|definicao|explica/,/poupanca|poupar|economizar/]]);
  extend('habits',[[/melhorar/,/poup\w*/],[/comec\w*|inicio|primeiro passo|por onde/,/poup\w*|guardar dinheiro/],[/criar|melhorar|ganhar/,/habit\w*|rotina.*poup/],[/ajuda me|ajuda|dicas|conselhos/,/poup\w*|guardar dinheiro/]]);
  extend('little',[[/quanto/,/devo|posso|consigo|preciso/,/poupar|guardar/],[/poup\w*|guardar\b/,/ganho pouco|recebo pouco|pouco dinheiro|nao tenho rendimento|nao trabalho|sou pobre|nao consigo|nao posso|dinheiro nao chega|so tenho|guardar so|poupar so|apenas|vale a pena/]]);
  extend('importance',[[/^(?:e )?(?:porque|por que)\b|vantag\w*|benefic\w*|importan\w*/,/poupar|poupanca/]]);
  extend('deposits',[[/onde|local|mealheiro/,/poupanca|guardar|guardo|dinheiro/]]);
  extend('impulse',[[/compr\w*|gast\w*/,/impulso|impulsiv\w*|sem pensar|vontade de comprar/]]);

  // Conteúdos redigidos a partir do texto de estudo enviado pelos autores (45 páginas).
  // sourcePages remete para as páginas desse documento; não são dados de mercado atuais.
  const expanded=[
  {
    "id": "flowstock",
    "label": "Poupança, saldo e património",
    "category": "Poupança",
    "aliases": [
      "poupanca e saldo",
      "poupanca e patrimonio",
      "fluxo e stock",
      "saldo bancario",
      "dinheiro acumulado"
    ],
    "answer": "A poupança é o que não consumiste do rendimento durante um período. O saldo é o dinheiro numa conta num determinado momento: pode incluir poupança antiga, empréstimos ou dinheiro de uma venda.",
    "detail": "Para saber quanto poupaste este mês, compara o rendimento disponível e o consumo desse mês. Ter 1000 € na conta não significa ter poupado 1000 € este mês.",
    "example": "Recebes 1800 € e consomes 1500 € no mês: poupas 300 €. Um saldo de 5000 € pode incluir dinheiro guardado em anos anteriores.",
    "formula": "Poupança do período = rendimento disponível − consumo.",
    "patterns": [
      [
        "poupanca|poupei|poupado",
        "saldo|patrimonio|stock|acumulado|(?:na|da|numa|minha|uma) conta",
        "diferenca|igual|mesma|significa|conta|o que"
      ]
    ],
    "sourcePages": [
      1,
      2
    ],
    "priority": 12,
    "guide": false,
    "exampleModel": {
      "kind": "budget",
      "income": 1800,
      "expense": 1500
    }
  },
  {
    "id": "netwealth",
    "label": "Património líquido",
    "category": "Poupança",
    "aliases": [
      "patrimonio liquido",
      "riqueza liquida",
      "ativos e dividas"
    ],
    "answer": "O património líquido é o valor do que possuis menos o que deves. A poupança pode ajudá-lo a crescer, mas os preços dos bens e as dívidas também o alteram.",
    "detail": "Uma casa pode valorizar sem teres poupado esse valor. E podes poupar num mês e ver o património diminuir se um ativo perder valor.",
    "example": "Ativos de 5000 € e dívidas de 2000 € correspondem a um património líquido de 3000 €.",
    "formula": "Património líquido = ativos − dívidas.",
    "patterns": [
      [
        "patrimonio|riqueza",
        "liquido|dividas|calcular|valorizar|aumenta"
      ]
    ],
    "sourcePages": [
      2
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "disposableincome",
    "label": "Que rendimento usar para poupar?",
    "category": "Poupança",
    "aliases": [
      "salario bruto ou liquido",
      "rendimento depois dos descontos",
      "rendimento disponivel"
    ],
    "answer": "Usa o rendimento disponível: o dinheiro que fica depois dos descontos obrigatórios, acrescentando os outros rendimentos e transferências que recebeste no período.",
    "detail": "O salário bruto pode incluir dinheiro que não chega a ficar disponível. No orçamento, separa rendimentos certos de valores incertos e não contes uma transferência entre contas tuas como um novo rendimento.",
    "example": "Se o salário bruto é 1200 € e os descontos são 200 €, ficam 1000 € antes de considerar outros rendimentos.",
    "formula": "",
    "patterns": [
      [
        "bruto|liquido|descontos",
        "salario|rendimento|recebo|poup"
      ],
      [
        "o que|significa|calcular",
        "rendimento disponivel"
      ]
    ],
    "sourcePages": [
      3
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "negativesaving",
    "label": "Poupança negativa e despoupança",
    "category": "Poupança",
    "aliases": [
      "despoupanca",
      "poupanca negativa",
      "gastar mais do que recebo"
    ],
    "answer": "A poupança é negativa quando o consumo do período supera o rendimento disponível. A diferença pode ser paga com reservas anteriores ou dinheiro emprestado.",
    "detail": "Isto pode acontecer numa emergência, durante desemprego ou ao usar reservas para a reforma. Primeiro, identifica o motivo e o período; não significa automaticamente falta de organização.",
    "example": "Rendimento de 1400 € e consumo de 1600 €: poupança de −200 €.",
    "formula": "S = rendimento disponível − consumo.",
    "patterns": [
      [
        "despoupanca|poupanca negativa"
      ],
      [
        "gasto|gastar|despesas|consumo",
        "mais.*recebo|superior.*rendimento|ultrapassa.*rendimento"
      ]
    ],
    "sourcePages": [
      5
    ],
    "priority": 12,
    "guide": false,
    "exampleModel": {
      "kind": "budget",
      "income": 1400,
      "expense": 1600
    }
  },
  {
    "id": "zerosaving",
    "label": "Quando não sobra dinheiro",
    "category": "Poupança",
    "aliases": [
      "poupanca nula",
      "saldo zero",
      "nao sobra nada"
    ],
    "answer": "A poupança é nula quando o rendimento disponível e o consumo são iguais. Se as necessidades essenciais absorvem o rendimento, não tens de cortar o necessário para conseguir uma percentagem de poupança.",
    "detail": "Regista os valores, verifica se existem gastos ajustáveis e revê o plano quando a situação mudar. Um orçamento organizado não cria rendimento que não existe.",
    "example": "Receber 1000 € e consumir 1000 € deixa uma poupança de 0 €.",
    "formula": "",
    "patterns": [
      [
        "poupanca nula|saldo zero|nao sobra nada|nao me sobra dinheiro"
      ]
    ],
    "sourcePages": [
      5,
      10
    ],
    "priority": 12,
    "guide": true
  },
  {
    "id": "savingfactors",
    "label": "O que influencia a capacidade de poupar?",
    "category": "Poupança",
    "aliases": [
      "determinantes da poupanca",
      "fatores da poupanca",
      "porque umas pessoas poupam mais"
    ],
    "answer": "A capacidade de poupar depende do rendimento, das despesas essenciais, da estabilidade do emprego, dos dependentes e dos objetivos. Os hábitos contam, mas as condições de partida também.",
    "detail": "Duas pessoas com o mesmo salário podem ter despesas de habitação e responsabilidades diferentes. Uma taxa de poupança maior não prova que alguém é mais responsável.",
    "example": "Quem paga renda e sustenta dependentes pode ter menos margem do que quem recebe o mesmo e partilha esses custos.",
    "formula": "",
    "patterns": [
      [
        "fatores|determinantes|influencia|depende de",
        "poupanca|poupar"
      ],
      [
        "porque|por que",
        "pessoas|familias",
        "mais|menos",
        "poup"
      ]
    ],
    "sourcePages": [
      6,
      11,
      39
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "incomerise",
    "label": "Ganhar mais não garante poupar mais",
    "category": "Poupança",
    "aliases": [
      "aumento de salario",
      "rendimento sobe",
      "ganhar mais e poupar menos"
    ],
    "answer": "Ganhar mais só aumenta a poupança se o consumo não aumentar ainda mais. A diferença entre rendimento e consumo continua a ser o que interessa.",
    "detail": "A taxa de poupança também pode diminuir mesmo quando guardas mais euros, se o rendimento aumentar proporcionalmente mais.",
    "example": "Antes: 1800 € recebidos e 1500 € consumidos, poupança de 300 €. Depois: 1900 € recebidos e 1650 € consumidos, poupança de 250 €.",
    "formula": "",
    "patterns": [
      [
        "salario|rendimento|ganhar|receber",
        "aument|mais|sub",
        "poup"
      ]
    ],
    "sourcePages": [
      4,
      43
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "mentalaccounting",
    "label": "Separar dinheiro sem perder a visão do orçamento",
    "category": "Poupança",
    "aliases": [
      "contabilidade mental",
      "dinheiro de premios",
      "etiquetas no dinheiro"
    ],
    "answer": "Separar dinheiro por objetivos ajuda a organizar. Mas todas as parcelas pertencem ao mesmo orçamento: o dinheiro de um prémio também é dinheiro teu e tem um custo de oportunidade.",
    "detail": "Evita tratar dinheiro recebido de surpresa como se não contasse. Olha para os gastos, reservas e dívidas em conjunto, mesmo que uses envelopes ou contas diferentes.",
    "example": "Ter um envelope para férias e uma dívida com custos elevados exige olhar para ambos, em vez de analisar só o envelope.",
    "formula": "",
    "patterns": [
      [
        "contabilidade mental|etiquetas no dinheiro"
      ],
      [
        "premio|bonus",
        "gastar|conta|dinheiro"
      ]
    ],
    "sourcePages": [
      10
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "presentbias",
    "label": "Porque custa adiar uma compra?",
    "category": "Poupança",
    "aliases": [
      "preferencia temporal",
      "enviesamento para o presente",
      "procrastinacao"
    ],
    "answer": "Uma compra traz uma satisfação imediata, enquanto a vantagem de poupar pode parecer distante. Essa diferença ajuda a explicar a vontade de gastar mesmo quando tens uma meta.",
    "detail": "Torna o objetivo visível, define limites antes de comprar e cria uma pausa entre a vontade e a decisão. Não precisas de eliminar todo o lazer.",
    "example": "Quando queres comprar algo fora do plano, esperar e rever o objetivo pode tornar a escolha mais consciente.",
    "formula": "",
    "patterns": [
      [
        "preferencia temporal|enviesamento|procrastinacao"
      ],
      [
        "custa|dificil|adiar|esperar",
        "comprar|compra|consumo"
      ]
    ],
    "sourcePages": [
      7,
      10
    ],
    "priority": 12,
    "guide": true
  },
  {
    "id": "retirementsaving",
    "label": "Poupar para fases futuras da vida",
    "category": "Poupança",
    "aliases": [
      "poupar para a reforma",
      "poupanca na reforma",
      "poupanca ao longo da vida"
    ],
    "answer": "Poupar pode preparar fases em que o rendimento diminui, como a reforma. Também pode haver fases em que usas reservas, por exemplo durante formação ou desemprego.",
    "detail": "O objetivo e o prazo devem considerar os rendimentos esperados, as necessidades e a incerteza. Usar uma reserva para a finalidade prevista não significa que a poupança falhou.",
    "example": "Uma pessoa pode poupar durante a vida ativa e usar parte desse dinheiro depois de deixar de trabalhar.",
    "formula": "",
    "patterns": [
      [
        "reforma|vida ativa|ciclo de vida",
        "poup|reserv|dinheiro"
      ]
    ],
    "sourcePages": [
      7,
      8,
      32
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "savingautonomy",
    "label": "Poupança e autonomia",
    "category": "Poupança",
    "aliases": [
      "autonomia financeira",
      "independencia financeira",
      "liberdade financeira"
    ],
    "answer": "Uma reserva pode dar mais margem para enfrentar mudanças, apoiar alguém ou escolher com menos pressão. Não garante independência total nem resolve todas as dificuldades.",
    "detail": "O valor da poupança está nas possibilidades que cria. Define o que autonomia significa para ti e começa por um objetivo concreto que caiba no orçamento.",
    "example": "Dinheiro reservado pode ajudar a suportar uma mudança profissional ou uma reparação urgente.",
    "formula": "",
    "patterns": [
      [
        "autonomia|independencia|liberdade",
        "financeira|poup|dinheiro"
      ]
    ],
    "sourcePages": [
      8,
      44
    ],
    "priority": 12,
    "guide": true
  },
  {
    "id": "hoarding",
    "label": "Entesouramento e dinheiro parado",
    "category": "Poupança",
    "aliases": [
      "entesouramento",
      "dinheiro debaixo do colchao",
      "notas em casa",
      "dinheiro parado"
    ],
    "answer": "Entesourar é guardar moeda sem a aplicar numa forma remunerada, por exemplo conservar notas. Continua a ser dinheiro disponível, mas não gera juros por si só.",
    "detail": "Considera a segurança física e a inflação: o número de euros pode ficar igual e o poder de compra diminuir. Guardar dinheiro e conservar o seu valor real são coisas diferentes.",
    "example": "100 € num mealheiro continuam a ser 100 €, mas podem comprar menos se os preços subirem.",
    "formula": "",
    "patterns": [
      [
        "entesouramento|colchao|dinheiro parado|notas em casa"
      ]
    ],
    "sourcePages": [
      11,
      13
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "deposittypes",
    "label": "Depósito à ordem e a prazo",
    "category": "Poupança",
    "aliases": [
      "deposito a ordem",
      "deposito a prazo",
      "ordem e prazo"
    ],
    "answer": "Um depósito à ordem serve normalmente para pagamentos e levantamentos. Um depósito a prazo tem condições de duração e remuneração acordadas.",
    "detail": "Para comparar, vê o prazo, os custos, quando os juros são pagos e se podes levantar antes do fim. O nome do produto e a taxa anunciada não chegam para conhecer todas as condições.",
    "example": "O dinheiro de uma despesa próxima precisa de condições de acesso diferentes do de um objetivo distante.",
    "formula": "",
    "patterns": [
      [
        "deposito|depositos|conta",
        "a ordem|a prazo"
      ],
      [
        "ordem e prazo"
      ]
    ],
    "sourcePages": [
      11,
      12
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "earlywithdrawal",
    "label": "Levantar uma poupança antes do prazo",
    "category": "Poupança",
    "aliases": [
      "mobilizacao antecipada",
      "levantar antes do prazo",
      "retirar deposito"
    ],
    "answer": "A possibilidade de retirar dinheiro antes do vencimento depende das condições do produto. Pode existir perda de juros, custos ou restrições.",
    "detail": "Confirma o contrato e as condições de mobilização. Se o dinheiro pode fazer falta para um imprevisto, a facilidade de acesso é uma parte importante da análise.",
    "example": "Um produto pode permitir levantar o capital mas retirar parte dos juros previstos; outro pode ter condições diferentes.",
    "formula": "",
    "patterns": [
      [
        "levantar|retirar|mobilizar|mexer",
        "antes|antecipad|prazo|deposito"
      ]
    ],
    "sourcePages": [
      12
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "nominalreal",
    "label": "Valor nominal e poder de compra",
    "category": "Poupança",
    "aliases": [
      "valor nominal e real",
      "valor real",
      "poder de compra da poupanca"
    ],
    "answer": "O valor nominal é o número de euros. O valor real mostra o que esses euros conseguem comprar. Com inflação, manter o mesmo saldo pode significar perder poder de compra.",
    "detail": "Para um período, divide o montante nominal por 1 mais a inflação em forma decimal. É uma comparação a preços do início do período, não uma previsão de preços.",
    "example": "1000 € com inflação de 5% equivalem a cerca de 952,38 € a preços anteriores.",
    "formula": "Valor real = valor nominal ÷ (1 + inflação)^n.",
    "patterns": [
      [
        "valor nominal|valor real"
      ],
      [
        "poder de compra",
        "calcular|quanto|1000|equivale"
      ]
    ],
    "sourcePages": [
      13,
      14
    ],
    "priority": 12,
    "guide": false,
    "exampleModel": {
      "kind": "realvalue",
      "capital": 1000,
      "inflationRate": 5,
      "time": 1,
      "timeUnit": "ano"
    }
  },
  {
    "id": "realinterest",
    "label": "Taxa de juro real",
    "category": "Poupança",
    "aliases": [
      "juro real",
      "taxa real",
      "juros e inflacao"
    ],
    "answer": "A taxa de juro real compara a remuneração com a inflação. Ganhar juros não garante aumentar o poder de compra.",
    "detail": "Para o mesmo período: taxa real = (1 + taxa nominal) ÷ (1 + inflação) − 1. Subtrair inflação aos juros é apenas uma aproximação.",
    "example": "Juro nominal de 3% e inflação de 5% dão uma taxa real de cerca de −1,90%, antes de impostos e custos.",
    "formula": "r = (1 + i) ÷ (1 + π) − 1.",
    "patterns": [
      [
        "juro|juros|taxa|remuneracao",
        "real|inflacao",
        "diferenca|taxa|calcular|perco|ganho|compensa"
      ]
    ],
    "sourcePages": [
      14
    ],
    "priority": 12,
    "guide": false,
    "exampleModel": {
      "kind": "realrate",
      "rate": 3,
      "inflationRate": 5
    }
  },
  {
    "id": "netreturn",
    "label": "Rendimento bruto, líquido e custos",
    "category": "Poupança",
    "aliases": [
      "juros liquidos",
      "rendimento liquido de uma aplicacao",
      "comissoes e juros",
      "rentabilidade liquida"
    ],
    "answer": "O rendimento bruto é o ganho antes de deduções. O rendimento líquido considera os impostos e custos aplicáveis: uma taxa anunciada não é necessariamente o que vais receber.",
    "detail": "Usa as condições do produto e do titular, sem assumir uma taxa de imposto universal. Compara resultados no mesmo prazo e com os mesmos custos incluídos.",
    "example": "30 € de ganho bruto menos 6 € de custos deixam 24 €, antes de outras deduções.",
    "formula": "Ganho após deduções indicadas = ganho bruto − impostos indicados − custos.",
    "patterns": [
      [
        "liquido|liquidos|liquida|custos|comissoes|impostos",
        "juros|rentabilidade|remuneracao|aplicacao|ganho"
      ]
    ],
    "sourcePages": [
      14
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "contributioninterest",
    "label": "Depósitos regulares com juros",
    "category": "Poupança",
    "aliases": [
      "reforcos com juros",
      "depositos mensais com juros",
      "poupar com juros"
    ],
    "answer": "Quando fazes reforços, cada depósito rende durante um tempo diferente. É preciso saber a taxa, a frequência de capitalização e se o reforço entra no início ou no fim do período.",
    "detail": "Um reforço no início do mês rende mais tempo do que o mesmo reforço no fim. O cálculo deve separar o dinheiro que depositaste dos juros gerados.",
    "example": "Guardar 100 € no fim de cada mês durante 12 meses, com taxa efetiva anual hipotética de 3% e capitalização mensal equivalente, dá cerca de 1216,41 €, sem custos.",
    "formula": "Saldo seguinte = saldo anterior × (1 + taxa por período) + reforço no fim do período.",
    "patterns": [
      [
        "juros|remuneracao",
        "reforcos|depositos mensais|por mes|mensal",
        "poup|guard|deposit|reforc"
      ]
    ],
    "sourcePages": [
      13
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "diversification",
    "label": "Diversificar uma aplicação da poupança",
    "category": "Poupança",
    "aliases": [
      "diversificacao",
      "diversificar",
      "nao por os ovos no mesmo cesto"
    ],
    "answer": "Diversificar é distribuir aplicações para diminuir a exposição a um único problema. Ter vários produtos semelhantes não significa necessariamente diversificar.",
    "detail": "Pode reduzir certos riscos, mas não elimina perdas nem garante rentabilidade. Interessa perceber em que ativos, setores e entidades o dinheiro está aplicado.",
    "example": "Vários produtos dependentes da mesma empresa podem continuar expostos ao mesmo acontecimento.",
    "formula": "",
    "patterns": [
      [
        "diversific|ovos no mesmo cesto"
      ]
    ],
    "sourcePages": [
      15,
      16
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "savinghorizon",
    "label": "Prazo do objetivo e acesso ao dinheiro",
    "category": "Poupança",
    "aliases": [
      "horizonte temporal",
      "curto prazo",
      "longo prazo",
      "prazo da poupanca"
    ],
    "answer": "O horizonte temporal é o tempo até precisares do dinheiro. Uma compra próxima e um objetivo distante pedem análises diferentes de acesso, custos e risco.",
    "detail": "Sentires-te confortável com risco não significa conseguires suportar perder dinheiro essencial. Relaciona o prazo e a função da reserva com as condições da aplicação.",
    "example": "Dinheiro para uma despesa no próximo mês precisa de estar disponível a tempo.",
    "formula": "",
    "patterns": [
      [
        "horizonte temporal|prazo da poupanca"
      ],
      [
        "curto prazo|longo prazo",
        "poup|dinheiro|objetivo"
      ]
    ],
    "sourcePages": [
      12
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "debtandsaving",
    "label": "Poupar quando existem dívidas",
    "category": "Poupança",
    "aliases": [
      "poupar ou pagar dividas",
      "poupar com dividas",
      "amortizar e poupar"
    ],
    "answer": "Uma dívida cria pagamentos futuros e pode reduzir a margem para poupar. Para comparar guardar dinheiro e amortizar, vê os custos da dívida, as condições de amortização e as necessidades de uma reserva.",
    "detail": "Pagar capital reduz o que deves; pagar juros é um custo. Uma transferência entre contas tuas não é consumo nem nova poupança. Evita decidir apenas pela taxa anunciada de uma aplicação.",
    "example": "Se uma poupança mensal de 360 € financia 250 € de amortização de capital, só 110 € ficam em dinheiro, mas a dívida também diminui.",
    "formula": "",
    "patterns": [
      [
        "poup|guardar|reserva",
        "divida|dividas|amortizar|credito",
        "como|devo|ou|com|antes|vale|diferenca"
      ]
    ],
    "sourcePages": [
      9,
      42,
      43
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "timeunits",
    "label": "Usar o mesmo período nas contas",
    "category": "Poupança",
    "aliases": [
      "mensal e anual",
      "unidades de tempo",
      "periodos comparaveis"
    ],
    "answer": "Compara rendimento e despesas do mesmo período. Não subtraias diretamente uma despesa anual a um salário mensal.",
    "detail": "Uma despesa anual previsível pode ser dividida por 12 para planear uma reserva mensal. Isso não altera a data em que a conta precisa de ser paga.",
    "example": "Uma despesa de 600 € por ano pode ser preparada com 50 € por mês, se houver 12 meses até ao pagamento.",
    "formula": "Reserva mensal = despesa anual ÷ 12.",
    "patterns": [
      [
        "mensal e anual|unidades de tempo|periodos comparaveis"
      ],
      [
        "rendimento|despesas",
        "mensal|por mes",
        "anual|por ano"
      ]
    ],
    "sourcePages": [
      5,
      9
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "emergencyamount",
    "label": "Dimensionar uma reserva para imprevistos",
    "category": "Poupança",
    "aliases": [
      "quanto ter de reserva",
      "quantos meses de reserva",
      "tamanho do fundo de emergencia"
    ],
    "answer": "Não há um valor de reserva certo para todas as pessoas. Parte das despesas necessárias, da estabilidade do rendimento e dos imprevistos que precisas de conseguir suportar.",
    "detail": "Podes simular uma reserva que cubra um número de meses escolhido por ti: despesas mensais × meses de cobertura. Depois compara essa meta com a tua margem para guardar.",
    "example": "600 € de despesas necessárias por mês e uma cobertura escolhida de 3 meses correspondem a 1800 €.",
    "formula": "Meta da reserva = despesas mensais essenciais × meses de cobertura.",
    "patterns": [
      [
        "reserva|fundo de emergencia",
        "quanto|quantos|tamanho|valor|meses|cobrir"
      ]
    ],
    "sourcePages": [
      7,
      10
    ],
    "priority": 12,
    "guide": false,
    "exampleModel": {
      "kind": "reserve",
      "expense": 600,
      "coverage": 3
    }
  },
  {
    "id": "goalprice",
    "label": "Se o preço do objetivo mudar",
    "category": "Poupança",
    "aliases": [
      "objetivo fica mais caro",
      "preco da meta",
      "inflacao no objetivo"
    ],
    "answer": "O preço de um objetivo pode mudar enquanto poupas. Revê o custo estimado e o dinheiro já guardado, em vez de manter uma meta desatualizada.",
    "detail": "Se a quantia necessária por mês ficar demasiado alta, podes ajustar o prazo ou escolher outra alternativa. A inflação geral não prevê exatamente o preço do artigo que queres comprar.",
    "example": "Uma bicicleta prevista a 200 € passa a custar 220 €: com 100 € guardados, faltam 120 €.",
    "formula": "",
    "patterns": [
      [
        "objetivo|meta|bicicleta|telemovel",
        "mais caro|preco.*mud|preco.*sub|inflacao|aumentou"
      ]
    ],
    "sourcePages": [
      7,
      9
    ],
    "priority": 12,
    "guide": true
  },
  {
    "id": "familyplan",
    "label": "Criar um plano de poupança em família",
    "category": "Poupança",
    "aliases": [
      "poupar em familia",
      "orcamento em familia",
      "combinar poupanca em casa"
    ],
    "answer": "Um plano em família começa por combinar objetivos e conhecer rendimentos e gastos comuns. Dividir responsabilidades ajuda a acompanhar o plano.",
    "detail": "Anotem o que é necessário, definam uma quantia possível e revejam em conjunto. As contribuições não precisam de ser iguais quando os rendimentos e responsabilidades são diferentes.",
    "example": "Uma família pode escolher uma meta para material escolar e acompanhar todos os meses o valor reservado.",
    "formula": "",
    "patterns": [
      [
        "familia|familiares|todos em casa",
        "poupar|poupanca|plano|orcamento"
      ]
    ],
    "sourcePages": [
      9,
      11
    ],
    "priority": 12,
    "guide": true
  },
  {
    "id": "socialpressure",
    "label": "Poupar perante pressão de colegas e publicidade",
    "category": "Poupança",
    "aliases": [
      "pressao dos colegas",
      "comprar para acompanhar",
      "publicidade e poupanca"
    ],
    "answer": "A publicidade e a comparação com outras pessoas podem criar vontade de comprar. O orçamento dos outros não mostra o que é possível no teu.",
    "detail": "Define um limite para lazer, espera antes de comprar e propõe alternativas que caibam nesse limite. Não precisas de explicar todos os detalhes do teu dinheiro para recusar uma compra.",
    "example": "Podes combinar uma atividade gratuita quando uma saída paga ultrapassa o teu orçamento.",
    "formula": "",
    "patterns": [
      [
        "colegas|amigos|publicidade|redes sociais",
        "pressao|comprar|gastar|acompanhar|influencia"
      ]
    ],
    "sourcePages": [
      10
    ],
    "priority": 12,
    "guide": true
  },
  {
    "id": "cashdigital",
    "label": "Dinheiro físico e pagamentos digitais",
    "category": "Poupança",
    "aliases": [
      "dinheiro vivo",
      "cartao ou dinheiro",
      "pagamentos digitais",
      "mbway"
    ],
    "answer": "O dinheiro físico e os pagamentos digitais são formas de pagar. Nenhuma garante que vais poupar: o que importa é acompanhar os gastos e respeitar um limite possível.",
    "detail": "Com dinheiro físico, podes separar pequenas quantias. Nos pagamentos digitais, confirma os movimentos e as renovações. Não partilhes códigos de acesso nem dados sensíveis no chat.",
    "example": "Uma compra de 5 € reduz o orçamento em 5 €, quer seja paga com notas quer com cartão.",
    "formula": "",
    "patterns": [
      [
        "dinheiro vivo|cartao ou dinheiro|pagamentos digitais|mbway"
      ],
      [
        "cartao|notas|numerario",
        "poupar|controlar|gastar"
      ]
    ],
    "sourcePages": [
      9,
      10,
      40
    ],
    "priority": 12,
    "guide": true
  },
  {
    "id": "savingbalance",
    "label": "Poupar sem prejudicar necessidades importantes",
    "category": "Poupança",
    "aliases": [
      "poupar a qualquer custo",
      "deixar de comer para poupar",
      "poupar demais"
    ],
    "answer": "Poupar deve ajudar o teu bem-estar e os teus objetivos. Cortar alimentação necessária, saúde ou transporte essencial para guardar dinheiro pode criar problemas maiores.",
    "detail": "Uma despesa de manutenção ou formação pode ter benefícios futuros. Compara as consequências da escolha, em vez de tratar toda a saída de dinheiro como um erro.",
    "example": "Adiar uma reparação necessária só para manter o saldo pode provocar uma avaria mais cara.",
    "formula": "",
    "patterns": [
      [
        "poupar demais|poupar a qualquer custo|deixar de comer|cortar.*saude"
      ],
      [
        "poupar|poupanca",
        "sempre melhor|mais importante.*tudo|sacrificar"
      ]
    ],
    "sourcePages": [
      6,
      42
    ],
    "priority": 12,
    "guide": true
  },
  {
    "id": "savingchallenge",
    "label": "Desafios de poupança",
    "category": "Poupança",
    "aliases": [
      "desafio de poupanca",
      "desafio 52 semanas",
      "desafio dos envelopes"
    ],
    "answer": "Um desafio de poupança é uma forma de acompanhar depósitos regulares. Só é útil se as quantias couberem no orçamento e o dinheiro não for retirado de necessidades essenciais.",
    "detail": "Não tens de aumentar a quantia todas as semanas. Podes manter um valor pequeno, pausar ou adaptar o desafio aos meses em que recebes menos.",
    "example": "Guardar um valor fixo possível todas as semanas pode ser mais fácil de manter do que um desafio com depósitos cada vez maiores.",
    "formula": "",
    "patterns": [
      [
        "desafio",
        "poup|52|envelopes"
      ]
    ],
    "sourcePages": [
      10
    ],
    "priority": 12,
    "guide": true
  },
  {
    "id": "efficiencysaving",
    "label": "Gastar agora para reduzir custos futuros",
    "category": "Poupança",
    "aliases": [
      "eficiencia energetica",
      "prazo de recuperacao",
      "equipamento economico"
    ],
    "answer": "Uma compra pode exigir dinheiro agora e reduzir despesas depois. Compara o custo adicional com a redução de gastos prevista e a vida útil.",
    "detail": "O prazo de recuperação simples é o custo adicional dividido pela poupança por período. Não inclui manutenção, alterações de preços ou o valor do dinheiro no tempo.",
    "example": "Pagar mais 600 € por um equipamento que reduz gastos em 120 € por ano dá uma recuperação simples de 5 anos.",
    "formula": "Prazo simples = custo adicional ÷ redução de despesas por período.",
    "patterns": [
      [
        "eficiencia energetica|prazo de recuperacao|equipamento economico"
      ],
      [
        "equipamento|eletrodomestico",
        "consome menos|gasta menos|compensa"
      ]
    ],
    "sourcePages": [
      40,
      41
    ],
    "priority": 12,
    "guide": false,
    "exampleModel": {
      "kind": "payback",
      "capital": 600,
      "amount": 120,
      "unit": "ano"
    }
  },
  {
    "id": "savingtransfer",
    "label": "Transferências não são uma nova poupança",
    "category": "Poupança",
    "aliases": [
      "transferir para a poupanca",
      "transferencias entre contas",
      "mover dinheiro"
    ],
    "answer": "Mover dinheiro entre contas tuas pode ajudar a separar objetivos, mas não cria dinheiro novo. A poupança do período depende do rendimento que não consumiste.",
    "detail": "Evita contar duas vezes o mesmo valor: uma vez ao receber e outra ao transferir. O registo das contas deve mostrar a origem e o destino.",
    "example": "Transferir 50 € da tua conta à ordem para outra conta tua muda onde está o dinheiro; não soma 50 € ao que já possuías.",
    "formula": "",
    "patterns": [
      [
        "transferir|transferencia|transferencias|mover",
        "contas|poupanca",
        "poup|rendimento|conta|nova"
      ]
    ],
    "sourcePages": [
      9,
      43
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "savingreturns",
    "label": "Mais rendimento esperado significa mais segurança?",
    "category": "Poupança",
    "aliases": [
      "rentabilidade passada",
      "retorno garantido",
      "rendimento esperado"
    ],
    "answer": "Rendimento esperado e rendimento garantido são diferentes. Um bom resultado no passado não prova que uma aplicação vai voltar a ter o mesmo resultado.",
    "detail": "Olha para as condições, os riscos de perda e o acesso ao capital. A designação de um produto, incluindo «sustentável», não garante segurança financeira.",
    "example": "Uma aplicação que valorizou num ano pode perder valor no seguinte.",
    "formula": "",
    "patterns": [
      [
        "rentabilidade passada|rendimento esperado|retorno garantido"
      ],
      [
        "passado|historico|sustentavel",
        "garante|seguro|rentabilidade|retorno"
      ]
    ],
    "sourcePages": [
      16,
      41
    ],
    "priority": 12,
    "guide": false
  },
  {
    "id": "savingcomparison",
    "label": "Comparar poupanças em euros e em percentagem",
    "category": "Poupança",
    "aliases": [
      "poupar mais euros ou percentagem",
      "comparar taxas de poupanca",
      "mais euros menos percentagem"
    ],
    "answer": "O montante mostra quantos euros guardaste; a taxa mostra a parte do rendimento que isso representa. Uma pessoa pode guardar mais euros e uma percentagem menor.",
    "detail": "Para comparar, usa o mesmo período e rendimento disponível. Um aumento de 10% para 12% é de 2 pontos percentuais, e não de 2% em termos relativos.",
    "example": "400 € de 4000 € são 10%; 150 € de 1000 € são 15%. O primeiro montante é maior, mas a segunda taxa é maior.",
    "formula": "",
    "patterns": [
      [
        "poup|guardar",
        "mais euros|menos percentagem|montante e taxa|comparar taxas|pontos percentuais"
      ]
    ],
    "sourcePages": [
      4,
      5
    ],
    "priority": 12,
    "guide": false
  }
];
  expanded.forEach(item=>{item.intents=item.patterns.map(group=>group.map(p=>new RegExp(p)));delete item.patterns;topics.push(item);});
  const facets={
  "emergency": [
    {
      "patterns": [
        "onde|guardar|disponivel"
      ],
      "text": "A reserva precisa de poder ser usada quando surgir o imprevisto. Analisa segurança, facilidade de acesso e custos antes de a colocar numa aplicação com restrições."
    },
    {
      "patterns": [
        "repor|voltar|usei|gastei"
      ],
      "text": "Se usaste a reserva para uma necessidade, ela cumpriu a sua função. Revê o orçamento e reconstrói-a com uma quantia possível, sem deixar despesas essenciais por pagar."
    }
  ],
  "impulse": [
    {
      "patterns": [
        "quanto tempo|24|esperar"
      ],
      "text": "Não existe um tempo obrigatório. Podes experimentar esperar um dia numa compra pequena e mais tempo numa compra cara. Usa a pausa para confirmar a necessidade, o preço total e o orçamento."
    }
  ],
  "deposittypes": [
    {
      "patterns": [
        "qual|melhor|escolher"
      ],
      "text": "Depende de quando precisas do dinheiro e das condições. Compara acesso ao capital, prazo, juros e custos. Só com o nome «à ordem» ou «a prazo» não consigo escolher uma opção para ti."
    }
  ],
  "goals": [
    {
      "patterns": [
        "nao chegar|nao conseguir|impossivel|demora"
      ],
      "text": "Revê o custo, o saldo já guardado e o prazo. Se a quantia por mês não couber no orçamento, aumenta o prazo ou escolhe uma meta menor. Não cortes necessidades essenciais para cumprir a data."
    }
  ],
  "contributioninterest": [
    {
      "patterns": [
        "inicio|fim|diferenca"
      ],
      "text": "No início do período, o reforço rende durante esse período; no fim, só começa a render no período seguinte. Por isso, com a mesma taxa positiva, depósitos no início dão um saldo final maior."
    }
  ],
  "debtandsaving": [
    {
      "patterns": [
        "reserva|tudo|primeiro"
      ],
      "text": "Compara os encargos da dívida, o custo de amortizar e o dinheiro de que podes precisar para imprevistos. Uma taxa isolada não chega para decidir se deves usar toda a reserva."
    }
  ],
  "zerosaving": [
    {
      "patterns": [
        "culpa|falha|mal|inutil"
      ],
      "text": "Não conseguir poupar quando o dinheiro só chega para o necessário não é uma falha pessoal. Registar o orçamento continua a ajudar a perceber a situação e a preparar mudanças quando forem possíveis."
    }
  ]
};
  Object.entries(facets).forEach(([id,items])=>{const t=topics.find(t=>t.id===id);t.questions=items.map(q=>({...q,patterns:q.patterns.map(p=>new RegExp(p))}));});

  // Sentence families: actions, obstacles and purpose, rather than only topic nouns.
  const phraseFamilies={
    habits:[[/aprender|comecar|queria|ajuda|preciso/,/gerir|organizar|controlar/,/dinheiro|gastos|financas/]],
    expenselog:[[/dinheiro|mesada/,/desaparece|vai se|voa/,/nem sei|nao sei|onde|em que/]],
    selfcontrol:[[/mesada|dinheiro/,/acaba logo|acaba depressa|gasto tudo|nao dura|desaparece todo/]],
    autosave:[[/guardar|poupar|separar/,/logo|inicio|primeiro/,/sobrar|receber|recebo|fim/]],
    inflationsaving:[[/inflacao|precos/,/guardar|poup|dinheiro/,/perder|come|vale|para que|perco|desvaloriza/]],
    deposits:[[/banco|conta/,/melhor|escolher|comparar|seguro/,/poup|guardar|dinheiro/]],
    little:[[/nao sobra|nao sobrar|nao consigo guardar/,/mal|culpa|falha|fazer|sobra|dinheiro/]],
    importance:[[/para que|para quê|qual.*sentido/,/guardar|poupar/]],
    goals:[[/quero|pretendo/,/chegar aos|alcancar|atingir/,/euros|dinheiro|meta|objetivo/]],
    allowanceplan:[[/mesada/,/gerir|organizar|controlar|comecar/]]
  };
  Object.entries(phraseFamilies).forEach(([id,groups])=>{const t=topics.find(t=>t.id===id);t.intents=[...(t.intents||[]),...groups];});
  const deposited=topics.find(t=>t.id==='deposits');deposited.questions=[{patterns:[/melhor|escolher|banco/],text:'Para comparar locais onde guardar, vê os custos, a possibilidade de levantar, a remuneração e as condições de segurança aplicáveis. O melhor depende do objetivo e do prazo. Não tenho uma comparação atual de bancos para escolher um por ti.'}];
  root.SavingsKnowledge=Object.freeze(topics.map(t=>Object.freeze(t)));
})(typeof window!=='undefined'?window:globalThis);
