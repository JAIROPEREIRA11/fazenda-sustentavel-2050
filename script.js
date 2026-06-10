// ======================
// VARIÁVEIS DO JOGO
// ======================

let producao = 50;
let economia = 50;
let ambiente = 50;
let qualidade = 50;

let ano = 1;

let energiaSolar = 0;
let irrigacao = 0;
let reflorestamento = 0;
let compostagem = 0;

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

// SOM
const somClique = document.getElementById("somClique");
const musicaAmbiente = document.getElementById("musicaAmbiente");
const somVitoria = document.getElementById("somVitoria");
const somDerrota = document.getElementById("somDerrota");

// ACESSIBILIDADE
let tamanhoFonte = 16;

// ======================
// MENU
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
                efeitos: { producao: 15, economia: 10, ambiente: -20, qualidade: -5 }
            },
            {
                texto: "Controle biológico",
                efeitos: { producao: 8, economia: -5, ambiente: 10, qualidade: 5 }
            },
            {
                texto: "Não fazer nada",
                efeitos: { producao: -15, economia: -10, ambiente: 5, qualidade: 0 }
            }
        ]
    },
    {
        titulo: "Uma seca severa está chegando.",
        descricao: "Qual será sua estratégia?",
        opcoes: [
            {
                texto: "Investir em irrigação inteligente",
                efeitos: { producao: 10, economia: -10, ambiente: 5, qualidade: 5 }
            },
            {
                texto: "Abrir poço emergencial",
                efeitos: { producao: 8, economia: -5, ambiente: -10, qualidade: 0 }
            },
            {
                texto: "Não investir",
                efeitos: { producao: -20, economia: -10, ambiente: 0, qualidade: -5 }
            }
        ]
    },
    {
        titulo: "Programa de energia solar.",
        descricao: "Deseja investir no sistema de energia da fazenda?",
        opcoes: [
            {
                texto: "Instalar/Ampliar painéis solares",
                efeitos: { producao: 5, economia: -15, ambiente: 15, qualidade: 5 }
            },
            {
                texto: "Instalar parcialmente",
                efeitos: { producao: 3, economia: -5, ambiente: 10, qualidade: 5 }
            },
            {
                texto: "Recusar",
                efeitos: { producao: 0, economia: 0, ambiente: -5, qualidade: 0 }
            }
        ]
    },
    {
        titulo: "Uma nascente da propriedade está perdendo vazão.",
        descricao: "Como deseja agir?",
        opcoes: [
            {
                texto: "Recuperar mata ciliar",
                efeitos: { producao: 0, economia: -5, ambiente: 15, qualidade: 10 }
            },
            {
                texto: "Construir reservatório",
                efeitos: { producao: 5, economia: -10, ambiente: 5, qualidade: 5 }
            },
            {
                texto: "Ignorar",
                efeitos: { producao: -5, economia: 0, ambiente: -15, qualidade: -10 }
            }
        ]
    },
    {
        titulo: "A população de abelhas diminuiu.",
        descricao: "Como resolver?",
        opcoes: [
            {
                texto: "Criar jardim para polinizadores",
                efeitos: { producao: 10, economia: -5, ambiente: 15, qualidade: 5 }
            },
            {
                texto: "Contratar polinização artificial",
                efeitos: { producao: 8, economia: -10, ambiente: -5, qualidade: 0 }
            },
            {
                texto: "Não fazer nada",
                efeitos: { producao: -10, economia: -5, ambiente: -10, qualidade: -5 }
            }
        ]
    },
    {
        titulo: "Há excesso de resíduos orgânicos.",
        descricao: "O que fazer?",
        opcoes: [
            {
                texto: "Criar sistema de compostagem",
                efeitos: { producao: 10, economia: 5, ambiente: 15, qualidade: 10 }
            },
            {
                texto: "Enviar para aterro",
                efeitos: { producao: 0, economia: -5, ambiente: -10, qualidade: 0 }
            },
            {
                texto: "Queimar resíduos",
                efeitos: { producao: 0, economia: 0, ambiente: -20, qualidade: -10 }
            }
        ]
    },
    {
        titulo: "Um drone agrícola está disponível.",
        descricao: "Deseja utilizar a tecnologia?",
        opcoes: [
            {
                texto: "Comprar drone",
                efeitos: { producao: 15, economia: -15, ambiente: 5, qualidade: 5 }
            },
            {
                texto: "Alugar drone",
                efeitos: { producao: 10, economia: -5, ambiente: 5, qualidade: 5 }
            },
            {
                texto: "Não utilizar",
                efeitos: { producao: 0, economia: 0, ambiente: 0, qualidade: 0 }
            }
        ]
    },
    {
        titulo: "Projeto de reflorestamento disponível.",
        descricao: "Participar?",
        opcoes: [
            {
                texto: "Reflorestar área degradada",
                efeitos: { producao: 5, economy: -10, ambiente: 25, qualidade: 10 }
            },
            {
                texto: "Reflorestar parcialmente",
                efeitos: { producao: 3, economia: -5, ambiente: 10, qualidade: 5 }
            },
            {
                texto: "Recusar",
                efeitos: { producao: 0, economia: 0, ambiente: -5, qualidade: -5 }
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

    opcao1.onclick = () => {
        if (somClique) {
            somClique.currentTime = 0;
            somClique.play();
        }
        aplicarEscolha(evento.opcoes[0]);
    };

    opcao2.onclick = () => {
        if (somClique) {
            somClique.currentTime = 0;
            somClique.play();
        }
        aplicarEscolha(evento.opcoes[1]);
    };

    opcao3.onclick = () => {
        if (somClique) {
            somClique.currentTime = 0;
            somClique.play();
        }
        aplicarEscolha(evento.opcoes[2]);
    };
}

// ======================
// ESCOLHAS
// ======================

function aplicarEscolha(opcao) {
    // Tratando erro caso a propriedade venha errada do array (ex: economy vs economia)
    producao += opcao.efeitos.producao || 0;
    economia += (opcao.efeitos.economia !== undefined ? opcao.efeitos.economia : (opcao.efeitos.economy || 0));
    ambiente += opcao.efeitos.ambiente || 0;
    qualidade += opcao.efeitos.qualidade || 0;

    if (opcao.texto.toLowerCase().includes("solar")) {
        energiaSolar++;
    }

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
    if (producao <= 0 || economia <= 0 || ambiente <= 0 || qualidade <= 0) {
        if (musicaAmbiente) musicaAmbiente.pause();
        if (somDerrota) somDerrota.play();
        finalizarJogo("💀 Sua fazenda entrou em colapso.");
        return;
    }

    ano++;
    if (anoSpan) anoSpan.textContent = ano;

    if (ano > 10) {
        const media = (producao + economia + ambiente + qualidade) / 4;
        if (musicaAmbiente) musicaAmbiente.pause();

        if (media >= 80) {
            if (somVitoria) somVitoria.play();
            document.body.style.background = "linear-gradient(135deg, #FFD700, #FFA500)";
            finalizarJogo("🏆 Modelo de Fazenda Sustentável");
        } else if (media >= 60) {
            if (somVitoria) somVitoria.play();
            finalizarJogo("🥈 Produtor Consciente");
        } else {
            if (somDerrota) somDerrota.play();
            finalizarJogo("⚠️ Desenvolvimento Insustentável");
        }
        return;
    }

    carregarEvento();
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

function atualizarMapa() {
    // FLORESTA
    if (floresta) {
        if (ambiente >= 80) {
            floresta.innerHTML = "🌳🌳🌳<br>Floresta Preservada";
        } else if (ambiente >= 50) {
            floresta.innerHTML = "🌳🌳<br>Floresta Estável";
        } else {
            floresta.innerHTML = "🪵<br>Área Degradada";
        }
    }

    // RIO
    if (rio) {
        if (ambiente >= 70) {
            rio.innerHTML = "💧💧💧<br>Rio Limpo";
        } else if (ambiente >= 40) {
            rio.innerHTML = "💧<br>Rio Sob Pressão";
        } else {
            rio.innerHTML = "🟤<br>Rio Poluído";
        }
    }

    // LAVOURA
    if (lavoura) {
        if (producao >= 80) {
            lavoura.innerHTML = "🌾🌾🌾<br>Alta... Produção";
        } else if (producao >= 50) {
            lavoura.innerHTML = "🌾🌾<br>Boa Produção";
        } else {
            lavoura.innerHTML = "🌱<br>Baixa Produção";
        }
    }

    // ENERGIA
    if (energia) {
        if (energiaSolar >= 2) {
            energia.innerHTML = "☀️☀️☀️<br>Energia Solar Avançada";
        } else if (energiaSolar >= 1) {
            energia.innerHTML = "☀️⚡<br>Energia Solar";
        } else if (economia >= 80) {
            energia.innerHTML = "⚡⚡<br>Energia Eficiente";
        } else {
            energia.innerHTML = "⚡<br>Energia Padrão";
        }
    }
}

// ======================
// BOTÃO MÚSICA
// ======================

const btnMusica = document.getElementById("btnMusica");
if (btnMusica) {
    btnMusica.addEventListener("click", () => {
        if (musicaAmbiente) {
            if (musicaAmbiente.paused) {
                musicaAmbiente.play();
            } else {
                musicaAmbiente.pause();
            }
        }
    });
}

// ======================
// ZOOM
// ======================

document.getElementById("zoomMais").addEventListener("click", () => {
    tamanhoFonte += 2;
    document.body.style.fontSize = tamanhoFonte + "px";
});

document.getElementById("zoomMenos").addEventListener("click", () => {
    tamanhoFonte -= 2;
    document.body.style.fontSize = tamanhoFonte + "px";
});

// ======================
// ALTO CONTRASTE
// ======================

document.getElementById("altoContraste").addEventListener("click", () => {
    document.body.classList.toggle("alto-contraste");
});