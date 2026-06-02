// ======================
// VARIÁVEIS DO JOGO
// ======================

let producao = 50;
let economia = 50;
let ambiente = 50;
let qualidade = 50;

let ano = 1;

// ======================
// ELEMENTOS
// ======================

const menu = document.getElementById("menu");
const tutorial = document.getElementById("tutorial");
const jogo = document.getElementById("jogo");
const fim = document.getElementById("fim");

const anoSpan = document.getElementById("ano");

const barraProducao = document.getElementById("barraProducao");
const barraEconomia = document.getElementById("barraEconomia");
const barraAmbiente = document.getElementById("barraAmbiente");
const barraQualidade = document.getElementById("barraQualidade");

const valorProducao = document.getElementById("valorProducao");
const valorEconomia = document.getElementById("valorEconomia");
const valorAmbiente = document.getElementById("valorAmbiente");
const valorQualidade = document.getElementById("valorQualidade");

const tituloEvento = document.getElementById("tituloEvento");
const descricaoEvento = document.getElementById("descricaoEvento");

const opcao1 = document.getElementById("opcao1");
const opcao2 = document.getElementById("opcao2");
const opcao3 = document.getElementById("opcao3");

// ======================
// MAPA DA FAZENDA
// ======================

const lavoura = document.getElementById("lavoura");
const rio = document.getElementById("rio");
const floresta = document.getElementById("floresta");
const energia = document.getElementById("energia");

// ======================
// MENU
// ======================

document.getElementById("btnJogar").addEventListener("click", () => {

    menu.classList.remove("ativa");
    jogo.classList.add("ativa");

    carregarEvento();

});

document.getElementById("btnTutorial").addEventListener("click", () => {

    menu.classList.remove("ativa");
    tutorial.classList.add("ativa");

});

document.getElementById("voltarMenu").addEventListener("click", () => {

    tutorial.classList.remove("ativa");
    menu.classList.add("ativa");

});

// ======================
// MODO ESCURO
// ======================

document.getElementById("modoEscuro").addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});

// ======================
// EVENTOS
// ======================

const eventos = [

{
titulo: "Uma praga atingiu a plantação.",
descricao: "Como deseja resolver o problema?",

opcoes: [

{
texto: "Aplicar agrotóxico",
efeitos: {
producao: 15,
economia: 10,
ambiente: -20,
qualidade: -5
}
},

{
texto: "Controle biológico",
efeitos: {
producao: 8,
economia: -5,
ambiente: 10,
qualidade: 5
}
},

{
texto: "Não fazer nada",
efeitos: {
producao: -15,
economia: -10,
ambiente: 5,
qualidade: 0
}
}

]
},

{
titulo: "Uma seca severa está chegando.",
descricao: "Qual será sua estratégia?",

opcoes: [

{
texto: "Investir em irrigação inteligente",
efeitos: {
producao: 10,
economia: -10,
ambiente: 5,
qualidade: 5
}
},

{
texto: "Abrir poço emergencial",
efeitos: {
producao: 8,
economia: -5,
ambiente: -10,
qualidade: 0
}
},

{
texto: "Não investir",
efeitos: {
producao: -20,
economia: -10,
ambiente: 0,
qualidade: -5
}
}

]
},

{
titulo: "Programa de energia solar disponível.",
descricao: "Deseja participar?",

opcoes: [

{
texto: "Instalar painéis solares",
efeitos: {
producao: 5,
economia: -10,
ambiente: 20,
qualidade: 10
}
},

{
texto: "Instalar parcialmente",
efeitos: {
producao: 3,
economia: -5,
ambiente: 10,
qualidade: 5
}
},

{
texto: "Recusar",
efeitos: {
producao: 0,
economia: 0,
ambiente: -5,
qualidade: 0
}
}

]
}

];

// ======================
// CARREGAR EVENTO
// ======================

function carregarEvento() {

    const evento = eventos[Math.floor(Math.random() * eventos.length)];

    tituloEvento.textContent = evento.titulo;
    descricaoEvento.textContent = evento.descricao;

    opcao1.textContent = evento.opcoes[0].texto;
    opcao2.textContent = evento.opcoes[1].texto;
    opcao3.textContent = evento.opcoes[2].texto;

    opcao1.onclick = () => aplicarEscolha(evento.opcoes[0]);
    opcao2.onclick = () => aplicarEscolha(evento.opcoes[1]);
    opcao3.onclick = () => aplicarEscolha(evento.opcoes[2]);

}

// ======================
// ESCOLHAS
// ======================

function aplicarEscolha(opcao) {

    producao += opcao.efeitos.producao;
    economia += opcao.efeitos.economia;
    ambiente += opcao.efeitos.ambiente;
    qualidade += opcao.efeitos.qualidade;

    limitarValores();

    atualizarPainel();

    verificarFim();

}

// ======================
// LIMITES
// ======================

function limitarValores() {

    producao = Math.max(0, Math.min(100, producao));
    economia = Math.max(0, Math.min(100, economia));
    ambiente = Math.max(0, Math.min(100, ambiente));
    qualidade = Math.max(0, Math.min(100, qualidade));

}

// ======================
// ATUALIZAR
// ======================

function atualizarPainel() {

    barraProducao.value = producao;
    barraEconomia.value = economia;
    barraAmbiente.value = ambiente;
    barraQualidade.value = qualidade;

    valorProducao.textContent = producao;
    valorEconomia.textContent = economia;
    valorAmbiente.textContent = ambiente;
    valorQualidade.textContent = qualidade;

    atualizarMapa();

}

// ======================
// FIM
// ======================

function verificarFim() {

    if (
        producao <= 0 ||
        economia <= 0 ||
        ambiente <= 0 ||
        qualidade <= 0
    ) {

        finalizarJogo("💀 Sua fazenda entrou em colapso.");

        return;

    }

    ano++;

    anoSpan.textContent = ano;

    if (ano > 10) {

        const media =
            (producao + economia + ambiente + qualidade) / 4;

        if (media >= 80) {

            finalizarJogo(
                "🏆 Modelo de Fazenda Sustentável"
            );

        } else if (media >= 60) {

            finalizarJogo(
                "🥈 Produtor Consciente"
            );

        } else {

            finalizarJogo(
                "⚠️ Desenvolvimento Insustentável"
            );

        }

        return;

    }

    carregarEvento();
    atualizarMapa();

}

// ======================
// TELA FINAL
// ======================

function finalizarJogo(resultado) {

    jogo.classList.remove("ativa");
    fim.classList.add("ativa");

    document.getElementById("resultadoTitulo").textContent = resultado;

    document.getElementById("finalProducao").textContent = producao;
    document.getElementById("finalEconomia").textContent = economia;
    document.getElementById("finalAmbiente").textContent = ambiente;
    document.getElementById("finalQualidade").textContent = qualidade;

}
// ======================
// MAPA DINÂMICO
// ======================

function atualizarMapa(){

    // FLORESTA

    if(ambiente >= 80){

        floresta.innerHTML =
        "🌳🌳🌳<br>Floresta Preservada";

    }

    else if(ambiente >= 50){

        floresta.innerHTML =
        "🌳🌳<br>Floresta Estável";

    }

    else{

        floresta.innerHTML =
        "🪵<br>Área Degradada";

    }

    // RIO

    if(ambiente >= 70){

        rio.innerHTML =
        "💧💧💧<br>Rio Limpo";

    }

    else if(ambiente >= 40){

        rio.innerHTML =
        "💧<br>Rio Sob Pressão";

    }

    else{

        rio.innerHTML =
        "🟤<br>Rio Poluído";

    }

    // LAVOURA

    if(producao >= 80){

        lavoura.innerHTML =
        "🌾🌾🌾<br>Alta Produção";

    }

    else if(producao >= 50){

        lavoura.innerHTML =
        "🌾🌾<br>Boa Produção";

    }

    else{

        lavoura.innerHTML =
        "🌱<br>Baixa Produção";

    }

    // ENERGIA

    if(economia >= 80){

        energia.innerHTML =
        "☀️⚡<br>Energia Sustentável";

    }

    else if(economia >= 50){

        energia.innerHTML =
        "⚡<br>Energia Estável";

    }

    else{

        energia.innerHTML =
        "🔌<br>Infraestrutura Precária";

    }

}