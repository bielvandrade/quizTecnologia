const perguntas = [

{
    pergunta: "O que significa HTML?",
    alternativas: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyper Transfer Main Language"
    ],
    correta: 0,
    explicacao: "HTML significa Hyper Text Markup Language e é utilizado para estruturar o conteúdo de páginas web."
},

{
    pergunta: "Qual linguagem é usada para estilizar páginas web?",
    alternativas: [
        "Python",
        "Java",
        "CSS",
        "Script"
    ],
    correta: 2,
    explicacao: "CSS (Cascading Style Sheets) é responsável pela aparência visual dos sites, como cores, fontes e espaçamentos."
},

{
    pergunta: "Qual empresa desenvolveu o Windows?",
    alternativas: [
        "Google",
        "Apple",
        "Microsoft",
        "Intel"
    ],
    correta: 2,
    explicacao: "O sistema operacional Windows foi desenvolvido pela Microsoft e lançado pela primeira vez em 1985."
},

{
    pergunta: "Para que serve o Google Docs?",
    alternativas: [
        "Editar imagens",
        "Criar e editar planilhas",
        "Criar e editar documentos",
        "Criar e editar códigos"
    ],
    correta: 2,
    explicacao: "O Google Docs é uma ferramenta online para criação e edição de documentos de texto."
},

{
    pergunta: "O que significa CPU?",
    alternativas: [
        "Central Processing Unit",
        "Computer Program Utility",
        "Central Program Unit",
        "Control Processing Utility"
    ],
    correta: 0,
    explicacao: "CPU significa Central Processing Unit, sendo o principal componente responsável pelo processamento de dados do computador."
},

{
    pergunta: "Qual extensão pertence ao JavaScript?",
    alternativas: [
        ".html",
        ".css",
        ".js",
        ".sql"
    ],
    correta: 2,
    explicacao: "Arquivos JavaScript utilizam a extensão .js para armazenar seus códigos."
},

{
    pergunta: "O que seria o comando For?",
    alternativas: [
        "Um comando que escaneia uma informação",
        "Um comando que mostra uma mensagem ao usuário",
        "Um comando para criar um laço de repetição",
        "Um comando que encerra o código"
    ],
    correta: 2,
    explicacao: "O comando for é utilizado para executar um bloco de código repetidamente enquanto uma condição é satisfeita."
},

{
    pergunta: "Quem criou o Android?",
    alternativas: [
        "Apple",
        "Google",
        "Microsoft",
        "Intel"
    ],
    correta: 1,
    explicacao: "O Android é mantido e desenvolvido pelo Google desde a aquisição da Android Inc. em 2005."
},

{
    pergunta: "Qual comando exibe uma mensagem ao usuário?",
    alternativas: [
        "print()",
        "scan()",
        "input()",
        "if()"
    ],
    correta: 0,
    explicacao: "A função print() é utilizada para exibir informações ao usuário na tela em diversas linguagens de programação."
},

{
    pergunta: "Qual destas é uma linguagem de programação?",
    alternativas: [
        "HTML",
        "CSS",
        "JavaScript",
        "Google"
    ],
    correta: 2,
    explicacao: "JavaScript é uma linguagem de programação utilizada para criar interatividade em páginas web."
}

];

let perguntaAtual = 0;
let pontos = 0;
let tempo = 0;
let intervalo;
let erros = [];

const telaInicial = document.getElementById("telaInicial");
const telaQuiz = document.getElementById("telaQuiz");
const telaFinal = document.getElementById("telaFinal");

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");

const contadorPergunta = document.getElementById("contadorPergunta");
const barraProgresso = document.getElementById("barraProgresso");

const resultadoElemento = document.getElementById("resultado");
const cronometro = document.getElementById("cronometro");
const relatorioErros = document.getElementById("relatorioErros");

function iniciarQuiz() {

    perguntaAtual = 0;
    pontos = 0;
    tempo = 0;
    erros = [];

    barraProgresso.style.width = "0%";
    relatorioErros.innerHTML = "";

    cronometro.textContent = "Tempo: 0s";

    telaInicial.style.display = "none";
    telaFinal.style.display = "none";
    telaQuiz.style.display = "block";

    intervalo = setInterval(() => {

        tempo++;

        cronometro.textContent =
            `Tempo: ${tempo}s`;

    }, 1000);

    mostrarPergunta();
}

function mostrarPergunta() {

    alternativasElemento.innerHTML = "";

    contadorPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    let progresso =
        (perguntaAtual / perguntas.length) * 100;

    barraProgresso.style.width =
        progresso + "%";

    perguntaElemento.textContent =
        perguntas[perguntaAtual].pergunta;

    perguntas[perguntaAtual].alternativas.forEach(
        (alternativa, indice) => {

        const botao =
            document.createElement("button");

        botao.textContent = alternativa;

        botao.onclick = () =>
            verificarResposta(indice);

        alternativasElemento.appendChild(botao);

    });
}

function verificarResposta(respostaSelecionada) {

    const perguntaAtualObj =
        perguntas[perguntaAtual];

    if (
        respostaSelecionada ===
        perguntaAtualObj.correta
    ) {

        pontos++;

    } else {

        erros.push({

            pergunta:
                perguntaAtualObj.pergunta,

            respostaCorreta:
                perguntaAtualObj.alternativas[
                    perguntaAtualObj.correta
                ],

            explicacao:
                perguntaAtualObj.explicacao

        });

    }

    perguntaAtual++;

    if (
        perguntaAtual <
        perguntas.length
    ) {

        mostrarPergunta();

    } else {

        finalizarQuiz();

    }
}

function finalizarQuiz() {

    clearInterval(intervalo);

    barraProgresso.style.width = "100%";

    telaQuiz.style.display = "none";
    telaFinal.style.display = "block";

    resultadoElemento.innerHTML = `
        <strong>Pontuação:</strong> ${pontos}/${perguntas.length}
        <br><br>
        <strong>Tempo:</strong> ${tempo} segundos
    `;

    relatorioErros.innerHTML = "";

    if (erros.length > 0) {

        relatorioErros.innerHTML +=
            "<h2>Questões que você errou:</h2>";

        erros.forEach(erro => {

            relatorioErros.innerHTML += `

            <div class="erro">

                <h3>${erro.pergunta}</h3>

                <p>
                    <strong>Resposta correta:</strong>
                    ${erro.respostaCorreta}
                </p>

                <p>
                    <strong>Explicação:</strong>
                    ${erro.explicacao}
                </p>

            </div>

            `;

        });

    } else {

        relatorioErros.innerHTML = `
            <h2>
                🎉 Parabéns!
                Você acertou todas as questões!
            </h2>
        `;
    }
}

function reiniciarQuiz() {

    clearInterval(intervalo);

    perguntaAtual = 0;
    pontos = 0;
    tempo = 0;
    erros = [];

    barraProgresso.style.width = "0%";

    telaFinal.style.display = "none";
    telaQuiz.style.display = "none";
    telaInicial.style.display = "block";
}

const conteudos = [

{
titulo: "HTML",
texto: `
HTML significa Hyper Text Markup Language.

É a linguagem responsável por estruturar páginas web.

Exemplos de tags:

<h1> Título </h1>
<p> Parágrafo </p>
<img> Imagens
`
},

{
titulo: "CSS",
texto: `
CSS controla a aparência do site.

Com CSS podemos alterar:

• Cores
• Fontes
• Tamanhos
• Espaçamentos
• Animações
`
},

{
titulo: "Windows",
texto: `
Windows é um sistema operacional desenvolvido pela Microsoft.

Versões famosas:

• Windows XP
• Windows 7
• Windows 10
• Windows 11
`
},

{
titulo: "Google Docs",
texto: `
Ferramenta online para criar documentos.

Permite:

• Compartilhar arquivos
• Trabalhar em equipe
• Salvar automaticamente
`
},

{
titulo: "CPU",
texto: `
CPU significa Central Processing Unit.

É considerada o cérebro do computador.

Responsável por executar cálculos e instruções.
`
},

{
titulo: "JavaScript",
texto: `
JavaScript adiciona interatividade aos sites.

Exemplos:

• Botões
• Menus
• Jogos
• Quiz
• Calculadoras
`
},

{
titulo: "For",
texto: `
O laço FOR é utilizado para repetições.

Exemplo:

for(let i = 0; i < 5; i++){

}
`
},

{
titulo: "Android",
texto: `
Android é um sistema operacional móvel.

Mantido pelo Google.

Presente em milhões de smartphones.
`
},

{
titulo: "Print()",
texto: `
Print exibe informações ao usuário.

Exemplo em Python:

print("Olá Mundo")
`
},

{
titulo: "Programação",
texto: `
Programar é criar instruções para o computador.

Exemplos de linguagens:

• JavaScript
• Python
• Java
• C#
`
}

];

function mostrarConteudo(indice){

    const conteudo =
        document.getElementById("conteudoExtra");

    conteudo.innerHTML = `

        <h3>${conteudos[indice].titulo}</h3>

        <p>
            ${conteudos[indice].texto.replace(/\n/g,"<br>")}
        </p>

    `;
}