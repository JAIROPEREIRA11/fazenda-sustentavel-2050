# 🚜 Fazenda Sustentável 2050

> **Projeto desenvolvido para o Programa Agrinho 2026** > **Categoria:** Robótica / Programação / Game Design  
> **Tema:** Sustentabilidade no Campo e Inovação Agrícola  

---

## 📝 Descrição do Projeto
O **Fazenda Sustentável 2050** é um jogo de simulação e tomada de decisão baseado em turnos (anos), desenvolvido em ambiente web (HTML5, CSS3 e JavaScript). O jogador assume o papel de um gestor agrícola no ano de 2050 e tem a missão de administrar uma propriedade rural durante 10 anos. 

O núcleo pedagógico do jogo gira em torno do **equilíbrio**. O jogador deve produzir alimentos e gerar receita econômica, mas sem esgotar os recursos naturais ou reduzir a qualidade de vida da comunidade local. Se qualquer um dos indicadores chegar a zero, a fazenda entra em colapso, ensinando de forma prática o conceito de **Desenvolvimento Sustentável**.

---

## 🎯 Objetivos Pedagógicos e Relação com o Agrinho
O jogo foi estruturado para instigar o pensamento crítico e a conscientização socioambiental dos alunos, abordando diretamente os pilares do programa:

* **Proteção de Polinizadores (Abelhas):** O jogo demonstra o impacto direto do desaparecimento das abelhas na produtividade dos frutos e incentiva o uso de controle biológico e jardins de polinizadores.
* **Manejo Consciente da Água e Solo:** Desafios relacionados à recuperação de matas ciliares e uso de irrigação inteligente ensinam a combater os efeitos da seca crônica.
* **Energia Limpa e Inovação:** Introdução de conceitos de transição energética através da instalação de painéis solares para reduzir a pegada de carbono no campo.
* **Acessibilidade Universal:** O projeto conta com recursos nativos de alto contraste, modo escuro e controle de zoom de fonte, garantindo a inclusão de todos os estudantes.

---

## 📊 Mecânicas do Jogo

O jogo monitora 4 indicadores vitais em tempo real:
1.  🌾 **Produção:** A eficiência e volume da colheita.
2.  💰 **Economia:** A saúde financeira e os fundos da fazenda.
3.  🌳 **Meio Ambiente:** A preservação dos ecossistemas locais.
4.  😊 **Qualidade de Vida:** O bem-estar dos trabalhadores e da comunidade.

### O Mapa Dinâmico
À medida que as decisões mudam os indicadores, o mapa visual da fazenda se transforma automaticamente:
* **A Floresta** muda visualmente entre *Mata Preservada*, *Reserva Legal* ou *Desmatamento*.
* **O Rio** altera seu estado entre *Rio Protegido*, *Vazão Reduzida* ou *Nascente Secou*.
* **A Lavoura** indica se a fazenda está em uma *Super Safra* ou em estado de *Escassez*.
* **A Matriz Energética** evolui de *Rede Convencional* para *Matriz Renovável*.

---

## 🕹️ Como Jogar

1.  Acesse o link do jogo (ou abra o arquivo `index.html` no navegador).
2.  No menu inicial, leia as seções **"O que a Fazenda Precisa"** e **"Como Funciona"** para entender os conceitos agrícolas aplicados.
3.  Clique em **Jogar** para iniciar no Ano 1.
4.  A cada ano, um desafio surpresa será apresentado. Leia com atenção as três alternativas de solução.
5.  Fique atento aos ícones e números (dicas) nos botões, eles indicam a tendência de impacto de cada escolha.
6.  Ao clicar na resposta, veja o balanço anual na tela de transição e clique em **Avançar** até completar o Ano 10.
7.  Descubra se você se tornou um *Produtor Consciente*, uma *Fazenda Modelo Mundial* ou se levou o ecossistema ao colapso!

---

## 🛠️ Tecnologias Utilizadas

O desenvolvimento priorizou tecnologias nativas, leves e limpas para garantir o funcionamento do jogo em computadores antigos de laboratórios escolares ou celulares de áreas rurais (sem necessidade de downloads pesados):

* **HTML5:** Estruturação semântica das telas e integração de tags de áudio acessíveis.
* **CSS3:** Design responsivo adaptável para celulares e computadores, animações de transição (`keyframes`) e filtros de acessibilidade visual.
* **JavaScript (ES6+):** Lógica de estados, manipulação dinâmica do DOM, sorteio pseudoaleatório de vetores de eventos e gerenciamento de áudio reativo ao clique do usuário.

---

## 📂 Estrutura de Arquivos

```text
├── index.html          # Interface principal do jogo e estrutura das telas
├── style.css           # Estilização visual, responsividade e acessibilidade
├── script.js          # Lógica do jogo, banco de eventos e algoritmos
├── fazenda.png         # Imagem imersiva de fundo do cenário agrícola
└── assets/
    └── sons/           # Efeitos sonoros e música de fundo (.mp3)# fazenda-sustentavel-2050
---

## 👥 Autores e Ficha Técnica
* **Estudante(s):** Rian Eduardo Santos da Silva
* **Professor(a) Orientador(a):** Jairo Pereira da Silva
* **Escola:** Colégio Estadual General Carneiro
* **Município / Núcleo de Educação:** Roncador - PR Nucleo Regional de Campo Mourão
