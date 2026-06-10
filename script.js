// ======================
// VARIÁVEIS DO JOGO
// ======================
let producao = 50;
let economia = 50;
let ambiente = 50;
let qualidade = 50;
let ano = 1;

let energiaSolar = 0;
let tamanhoFonte = 16; 

// ======================
// ELEMENTOS PRINCIPAIS
// ======================
const menu = document.getElementById("menu");
const tutorial = document.getElementById("tutorial");
const aprendizado = document.getElementById("aprendizado");
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

const lavoura = document.getElementById("lavoura");
const rio = document.getElementById("rio");
const floresta = document.getElementById("floresta");
const energia = document.getElementById("energia");

const somClique = document.getElementById("somClique");
const musicaAmbiente = document.getElementById("musicaAmbiente");
const somVitoria = document.getElementById("somVitoria");
const somDerrota = document.getElementById("somDerrota");

// ======================
// NAVEGAÇÃO DE TELAS
// ======================
document.getElementById("btnJogar").addEventListener("click", () => {
    menu.classList.remove("ativa");
    jogo.classList.add("ativa");
    carregarEvento();
    atualizarMapa();
    atualizarPainel();
});

document.getElementById("btnTutorial").addEventListener("click", () => {
    menu.classList.remove("ativa");
    tutorial.classList.add("ativa");
});

document.getElementById("voltarMenu").addEventListener("click", () => {
    tutorial.classList.remove("ativa");
    menu.classList.add("ativa");
});

const btnAprender = document.getElementById("btnAprender");
if (btnAprender) {
    btnAprender.addEventListener("click", () => {
        menu.classList.remove("ativa");
        if (aprendizado) aprendizado.classList.add("ativa");
    });
}

const btnVoltarMenu = document.getElementById("btnVoltarMenu");
if (btnVoltarMenu) {
    btnVoltarMenu.addEventListener("click", () => {
        if (aprendizado) aprendizado.classList.remove("ativa");
        menu.classList.add("ativa");
    });
}

// ======================
// CONTROLES DE ACESSIBILIDADE
// ======================
document.getElementById("modoEscuro").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

document.getElementById("altoContraste").addEventListener("click", () => {
    document.body.classList.toggle("alto-contraste");
});

document.getElementById("zoomMais").addEventListener("click", () => {
    if (tamanhoFonte < 28) {
        tamanhoFonte += 2;
        document.documentElement.style.setProperty('--tamanho-base', tamanhoFonte + 'px');
        document.body.style.fontSize = tamanhoFonte + "px";
    }
});

document.getElementById("zoomMenos").addEventListener("click", () => {
    if (tamanhoFonte > 12) {
        tamanhoFonte -= 2;
        document.documentElement.style.setProperty('--tamanho-base', tamanhoFonte + 'px');
        document.body.style.fontSize = tamanhoFonte + "px";
    }
});

// ======================
// BANCO DE EVENTOS
// ======================
const eventos = [
    {
        titulo: "Uma praga atingiu a plantação.",
        descricao: "Como deseja resolver o problema?",
        opcoes: [
            { texto: "Aplicar agrotóxico químico", efeitos: { producao: 15, economia: 10, ambiente: -20, qualidade: -5 } },
            { texto: "Controle biológico natural", efeitos: { producao: 8, economia: -5, ambiente: 10, qualidade: 5 } },
            { texto: "Não fazer nada", efeitos: { producao: -15, economia: -10, ambiente: 5, qualidade: 0 } }
        ]
    },
    {
        titulo: "Uma seca severa está chegando.",
        descricao: "Qual será sua estratégia?",
        opcoes: [
            { texto: "Investir em irrigação inteligente", efeitos: { producao: 10, economia: -10, ambiente: 5, qualidade: 5 } },
            { texto: "Abrir poço artesiano emergencial", efeitos: { producao: 8, economia: -5, ambiente: -10, qualidade: 0 } },
            { texto: "Não investir", efeitos: { producao: -20, economia: -10, ambiente: 0, qualidade: -5 } }
        ]
    },
    {
        titulo: "Programa de incentivo à energia limpa.",
        descricao: "Deseja investir no sistema de captação solar da fazenda?",
        opcoes: [
            { texto: "Instalar painéis solares na sede", efeitos: { producao: 5, economia: -15, ambiente: 15, qualidade: 5 } },
            { texto: "Instalar parcialmente", efeitos: { producao: 3, economia: -5, ambiente: 10, qualidade: 5 } },
            { texto: "Recusar e usar gerador a diesel", efeitos: { producao: 0, economia: 0, ambiente: -5, qualidade: 0 } }
        ]
    },
    {
        titulo: "Uma nascente está perdendo vazão de água.",
        descricao: "Como deseja agir?",
        opcoes: [
            { texto: "Recuperar mata ciliar protetora", efeitos: { producao: 0, economia: -5, ambiente: 15, qualidade: 10 } },
            { texto: "Construir reservatório artificial", efeitos: { producao: 5, economia: -10, ambiente: 5, qualidade: 5 } },
            { texto: "Ignorar o sumiço da água", efeitos: { producao: -5, economia: 0, ambiente: -15, qualidade: -10 } }
        ]
    },
    {
        titulo: "A população de abelhas locais sumiu.",
        descricao: "A falta de polinização está derrubando os frutos.",
        opcoes: [
            { texto: "Criar jardim para polinizadores", efeitos: { producao: 12, economy: -5, economia: -5, ambiente: 15, qualidade: 5 } },
            { texto: "Contratar polinização mecânica", efeitos: { producao: 8, economy: -15, economia: -15, ambiente: -5, qualidade: 0 } },
            { texto: "Não fazer nada", efeitos: { producao: -12, economy: -5, economia: -5, ambiente: -10, qualidade: -5 } }
        ]
    }
];

function formatarTextoBotao(opcao) {
    let dicas = [];
    if (opcao.efeitos.producao) dicas.push(`🌾${opcao.efeitos.producao > 0 ? '+' : ''}${opcao.efeitos.producao}`);
    if (opcao.efeitos.economia) dicas.push(`💰${opcao.efeitos.economia > 0 ? '+' : ''}${opcao.efeitos.economia}`);
    if (opcao.efeitos.ambiente) dicas.push(`🌳${opcao.efeitos.ambiente > 0 ? '+' : ''}${opcao.efeitos.ambiente}`);
    if (opcao.efeitos.qualidade) dicas.push(`😊${opcao.efeitos.qualidade > 0 ? '+' : ''}${opcao.efeitos.qualidade}`);
    
    return `${opcao.texto} (${dicas.join(' | ')})`;
}

function carregarEvento() {
    if (!opcao1 || !opcao2 || !opcao3) return;
    
    const evento = eventos[Math.floor(Math.random() * eventos.length)];

    tituloEvento.textContent = evento.titulo;
    descricaoEvento.textContent = evento.descricao;

    opcao1.textContent = formatarTextoBotao(evento.opcoes[0]);
    opcao2.textContent = formatarTextoBotao(evento.opcoes[1]);
    opcao3.textContent = formatarTextoBotao(evento.opcoes[2]);

    opcao1.onclick = () => t_escolha(evento.opcoes[0]);
    opcao2.onclick = () => t_escolha(evento.opcoes[1]);
    opcao3.onclick = () => t_escolha(evento.opcoes[2]);
}

function t_escolha(opcao) {
    if (somClique) {
        somClique.currentTime = 0;
        somClique.play().catch(() => {});
    }

    producao += opcao.efeitos.producao || 0;
    economia += opcao.efeitos.economia || 0;
    ambiente += opcao.efeitos.ambiente || 0;
    qualidade += opcao.efeitos.qualidade || 0;

    if (opcao.texto.toLowerCase().includes("solar")) {
        energiaSolar++;
    }

    producao = Math.max(0, Math.min(100, producao));
    economia = Math.max(0, Math.min(100, economy || economia));
    ambiente = Math.max(0, Math.min(100, ambiente));
    qualidade = Math.max(0, Math.min(100, qualidade));

    atualizarPainel();
    verificarFim();
}

function atualizarPainel() {
    if(barraProducao) barraProducao.value = producao;
    if(barraEconomia) barraEconomia.value = economia;
    if(barraAmbiente) barraAmbiente.value = ambiente;
    if(barraQualidade) barraQualidade.value = qualidade;

    if(valorProducao) valorProducao.textContent = producao;
    if(valorEconomia) valorEconomia.textContent = economia;
    if(valorAmbiente) valorAmbiente.textContent = ambiente;
    if(valorQualidade) valorQualidade.textContent = qualidade;

    atualizarMapa();
}

function verificarFim() {
    if (producao <= 0 || economia <= 0 || ambiente <= 0 || qualidade <= 0) {
        if (musicaAmbiente) musicaAmbiente.pause();
        if (somDerrota) somDerrota.play().catch(() => {});
        finalizarJogo("💀 Sua fazenda entrou em colapso devido a escolhas insustentáveis.");
        return;
    }

    ano++;
    if (anoSpan) anoSpan.textContent = ano;

    if (ano > 10) {
        if (musicaAmbiente) musicaAmbiente.pause();
        const media = (producao + economia + ambiente + qualidade) / 4;

        if (media >= 80) {
            if (somVitoria) somVitoria.play().catch(() => {});
            finalizarJogo("🏆 Incrível! Sua Fazenda é Modelo de Sustentabilidade Mundial 2050!");
        } else if (media >= 55) {
            if (somVitoria) somVitoria.play().catch(() => {});
            finalizarJogo("🥈 Bom trabalho! Você é um Produtor Consciente.");
        } else {
            if (somDerrota) somDerrota.play().catch(() => {});
            finalizarJogo("⚠️ Alerta! Desenvolvimento Insustentável.");
        }
        return;
    }

    carregarEvento();
}

function finalizarJogo(resultado) {
    if(jogo) jogo.classList.remove("ativa");
    if(fim) fim.classList.add("ativa");

    const resTitulo = document.getElementById("resultadoTitulo");
    if (resTitulo) resTitulo.textContent = resultado;
    
    const fProd = document.getElementById("finalProducao");
    const fEcon = document.getElementById("finalEconomia");
    const fAmb = document.getElementById("finalAmbiente");
    const fQual = document.getElementById("finalQualidade");
    
    if(fProd) fProd.textContent = producao;
    if(fEcon) fEcon.textContent = economia;
    if(fAmb) fAmb.textContent = ambiente;
    if(fQual) fQual.textContent = qualidade;
}

function atualizarMapa() {
    if (floresta) {
        floresta.innerHTML = ambiente >= 80 ? "🌳🌳🌳<br>Mata Preservada" : (ambiente >= 50 ? "🌳🌳<br>Reserva Legal" : "🪵<br>Desmatamento");
    }
    if (rio) {
        rio.innerHTML = ambiente >= 70 ? "💧💧💧<br>Rio Protegido" : (ambiente >= 40 ? "💧<br>Vazão Reduzida" : "🟤<br>Nascente Secou");
    }
    if (lavoura) {
        lavoura.innerHTML = producao >= 80 ? "🌾🌾🌾<br>Super Safra" : (producao >= 50 ? "🌾🌾<br>Boa Colheita" : "🌱<br>Escassez");
    }
    if (energia) {
        energia.innerHTML = energiaSolar >= 1 ? "☀️⚡<br>Matriz Renovável" : "⚡<br>Rede Convencional";
    }
}

const btnMusica = document.getElementById("btnMusica");
if (btnMusica) {
    btnMusica.addEventListener("click", () => {
        if (musicaAmbiente) {
            if (musicaAmbiente.paused) {
                musicaAmbiente.play().catch(() => {});
            } else {
                musicaAmbiente.pause();
            }
        }
    });
}