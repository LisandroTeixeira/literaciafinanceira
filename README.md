# Poupança & Economia

Site e trabalho elaborados por **Lisandro Teixeira e Rui Faria**.

O projeto está pronto para GitHub Pages. O site usa apenas HTML, CSS e JavaScript: não precisa de contas dos visitantes, chaves, inteligência artificial, bases de dados ou serviços de recolha de perguntas. Não recolhe emails. As conversas ficam em memória na página e desaparecem quando esta é atualizada.

## Publicar no GitHub Pages

1. Descomprime o ZIP.
2. Cria um repositório no GitHub. Com o plano gratuito, usa um repositório público para GitHub Pages.
3. Envia **o conteúdo da pasta `site-poupanca`** para a raiz do repositório. A pasta `docs` deve aparecer diretamente na raiz, ao lado deste README.
4. No repositório, abre **Settings → Pages**.
5. Em **Build and deployment**, escolhe **Deploy from a branch**.
6. Seleciona a branch **main** e a pasta **/docs**, depois clica em **Save**.
7. Aguarda a publicação. O endereço do site aparece na mesma página. Abre esse endereço e confirma o assistente e o PDF.

O endereço habitual é `https://O-TEU-UTILIZADOR.github.io/NOME-DO-REPOSITORIO/`. Usa o endereço que o GitHub apresentar, sobretudo se usares um domínio próprio.

Para fazer um QR Code para o trabalho, usa o **endereço final do site publicado**, não o endereço do repositório.

## O que está incluído

- Site adaptado a computador e telemóvel, com roxo escuro (`#160c29`), branco e turquesa (`#5ee8d3`).
- Assistente programado com **74 temas**, exemplos, explicações mais simples, fórmulas e referências educativas.
- Conversa com caixa de texto em várias linhas, Enter para enviar e Shift+Enter para mudar de linha.
- Pausa de 5 a 10 segundos em algumas respostas, com pontos animados.
- Página inicial simples: conversa e apresentação, sem catálogo de temas.
- PDF de **9 slides**, baseado nos textos que preparámos, com abertura e download.
- Créditos dos dois autores no rodapé.
- Navegação por teclado, etiquetas de acessibilidade e respeito pela preferência de movimento reduzido.

## Experimentar o assistente

- «O que é a poupança?»
- «Como criar hábitos de poupança?»
- «Qual é a diferença entre inflação e deflação?»
- «Como se calcula o PIB?»
- «O que é o custo de oportunidade?»
- «O que é globalização?»
- Depois de uma resposta: «Dá-me um exemplo», «Mais simples», «Explica melhor» ou «Qual é a fórmula?».

### Cálculos disponíveis

Os números aceitam vírgula decimal, por exemplo `2,50`. Os exemplos são simplificados e o guia apresenta os pressupostos.

| Escreve no assistente | Resultado esperado |
| --- | --- |
| Guardar 10 € por mês durante 2 anos | 240 €, sem juros |
| Quero juntar 100 € em 3 meses | 33,34 € por mês, arredondado por excesso |
| Juros simples: capital 1000 €, taxa anual 3%, tempo 2 anos | 60 € de juros; 1 060 € no total |
| Juros compostos: capital 1000 €, taxa anual 3%, tempo 2 anos | 60,90 € de juros; 1 060,90 € no total |
| Taxa de poupança: poupança 100, rendimento 1000 | 10% |
| Taxa de desemprego: desempregados 200, população ativa 1000 | 20% |
| Produtividade: produção 80, trabalhadores 4 | 20 unidades por trabalhador |
| Inflação: valor inicial 100, valor final 105 | Variação de 5%; só representa inflação se os dados forem de um índice ou cabaz adequado |
| Orçamento: rendimento 1000, despesas 800 | Saldo de 200 € |

O assistente reconhece palavras-chave, expressões e alguns pequenos erros de escrita. Mantém o tema para perguntas de seguimento e explica comparações entre conceitos. **Não é uma IA:** não compreende todas as formas de escrever, não resolve qualquer exercício e não consulta estatísticas em tempo real. Quando não consegue interpretar a pergunta, pede que a pergunta seja reformulada. Os conteúdos não substituem o manual nem garantem cobertura integral dos exames.

## Substituir a apresentação

1. Exporta a tua apresentação final em PDF.
2. Substitui `docs/pdf/apresentacao-poupanca.pdf`, mantendo o mesmo nome.
3. Se alterares o número ou os títulos dos slides, atualiza a indicação «9 slides» e a lista na secção Apresentação de `docs/index.html`.
4. Para atualizar a capa mostrada no telemóvel, substitui `docs/assets/capa-apresentacao.png` por uma imagem do primeiro slide.

O PDF incluído não tem QR Code, porque o endereço de publicação ainda não foi definido.

## Editar o site

- Textos e estrutura: `docs/index.html`.
- Cores e apresentação visual: `docs/assets/styles.css`.
- Conteúdos, exemplos e palavras-chave: `docs/assets/knowledge.js`.
- Reconhecimento de perguntas e cálculos: `docs/assets/chatbot.js`.
- Conversa, navegação e filtros: `docs/assets/app.js`.

Todos os caminhos dos recursos são relativos para funcionar num repositório de projeto do GitHub Pages. A pasta `docs` contém tudo o que é publicado. Não há bibliotecas ou fontes externas para carregar.

## Testar no computador

Para uma experiência simples, abre `docs/index.html` num navegador. Para uma pré-visualização por HTTP, com Node.js 18 ou superior:

```bash
npm run dev
```

O servidor indica a porta local utilizada. Não precisas de executar `npm install`: o projeto não tem dependências. O servidor de pré-visualização não é usado pelo GitHub Pages.

Para executar os testes do assistente:

```bash
npm test
```

## Verificação realizada

Foram verificadas respostas, contexto da conversa, comparações, cálculos e limites de entradas. Também foram testados o atraso antes das respostas, o bloqueio de envios duplicados, Enter/Shift+Enter e o cancelamento de uma resposta ao recomeçar a conversa. O PDF foi renderizado e revisto visualmente nas nove páginas. Foram verificados os recursos locais e a sintaxe dos scripts. A infraestrutura de navegador não esteve disponível para confirmar visualmente as várias larguras de ecrã; a adaptação foi implementada com estilos responsivos.

## Referências educativas

- [DGE — Economia A, 10.º ano](https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/10_economia_a.pdf)
- [DGE — Economia A, 11.º ano](https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/11_economia_a.pdf)
- [DGE — Economia C, 12.º ano](https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/12_economia_c.pdf)
- [Todos Contam — Definir objetivos](https://www.todoscontam.pt/pt-pt/definir-objetivos)
- [BCE — O que é a inflação?](https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_inflation.pt.html)
- [GitHub — Criar um site GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

Os conteúdos e exemplos do assistente foram redigidos para este projeto. Os documentos da DGE servem de referência para a organização temática; o site não é uma publicação oficial da DGE.
