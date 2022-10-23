import questoes from "../questions/quests.js";

const assuntos = JSON.parse(localStorage.getItem("assuntos"));
const quantidadeQuestao = JSON.parse(localStorage.getItem("quantidadeQuestao"));
const modo = JSON.parse(localStorage.getItem("modo"));
const modelo = JSON.parse(localStorage.getItem("modelo"));

var ordemQ = 0;
var contagemDeAcertos = 0;

const allQuestions = EntregaDeQuestoes(questoes, assuntos);
const questoesParaJogar = Embaralhamento(
  quantidadeQuestao,
  assuntos.length,
  allQuestions
);
ApresentarQuestoes(questoesParaJogar, modo, modelo, ordemQ, contagemDeAcertos);

function EntregaDeQuestoes(arrayQuestion, arrayAssuntos) {
  let questoesDoJogo = new Array();

  for (let init = 0; init < arrayQuestion.length; init++) {
    const questao = arrayQuestion[init];

    if (arrayAssuntos.includes(questao.assunto)) {
      questoesDoJogo.push(questao);
    }
  }
  return questoesDoJogo;
} //Entrega todos as questoes relacionados aos assuntos escolhidos

function Embaralhamento(n_select, tamanhoDaLista, array) {
  n_select = parseInt(n_select);

  let questoes_embaralhadas = [];

  const questoesMinimas = 20;
  const totalDeQuestoes = array.length;
  const proportion = Math.floor((n_select / totalDeQuestoes) * questoesMinimas);
  const sobra = n_select - proportion * tamanhoDaLista;

  let min = 0;
  for (let position = 20; position <= totalDeQuestoes; position += 20) {
    for (let p = proportion; p > 0; p--) {
      var questaoRandom = getNumberRandom(min, position);
      questoes_embaralhadas.push(array[questaoRandom]);
    }
    min = position;
  }
  for (let s = sobra; s !== 0; s--) {
    questaoRandom = getNumberRandom(0, array.length);
    questoes_embaralhadas.push(array[questaoRandom]);
  }

  return questoes_embaralhadas;
} //embaralha as questoes proporcionalmente e seleciona a quantidade escolhida pelo usuario

function getNumberRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function ApresentarQuestoes(arrayDeQuestoes, modo, modelo, ordem, acertos) {
  const divPergunta = document.getElementById("pergunta");
  const divAlternativas = document.getElementById("options");
  const opCorreta = document.getElementById("correto");
  const opErrada = document.getElementById("errado");

  if (modelo === "verdadeiroOuFalso") {
    var alternativas = Alternativas(arrayDeQuestoes[ordem]);
    var RandomAlt = getNumberRandom(0, alternativas.length);

    var resposta = alternativas[RandomAlt];
    var pergunta = arrayDeQuestoes[ordem].pergunta;
    var correta = arrayDeQuestoes[ordem].correta;
    divPergunta.innerHTML = `${pergunta} Resposta: ${resposta}?<br>${
      ordem + 1
    }`;
    if (modo === "infinidade") {
      opCorreta.onclick = () => {
        if (correta === resposta) {
          acertos += 1;
          ordem += 1;
          if (ordem === arrayDeQuestoes.length) {
            ///botar uma função para levar a outra tela de finalização
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        } else {
          ordem += 1;
          if (ordem === arrayDeQuestoes.length) {
            ///botar uma função para levar a outra tela de finalização
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        }
      };
      opErrada.onclick = () => {
        if (correta !== resposta) {
          acertos += 1;
          ordem += 1;
          if (ordem === arrayDeQuestoes.length) {
            ///botar uma função para levar a outra tela de finalização
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        } else {
          ordem += 1;
          if (ordem === arrayDeQuestoes.length) {
            ///botar uma função para levar a outra tela de finalização
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        }
      };
    } else if (modo === "umMinuto") {
      const span_temporizador = document.getElementById("temporizador");
      var temporizador = 1;
      const tempo = setInterval(() => {
        if (temporizador >= 60) {
          clearInterval(tempo);
        }
        span_temporizador.innerHTML = temporizador;
        temporizador += 1;
      }, 1000);
    } else if (modo === "tresVidas") {
      console.log("ok3");
    }
  } else if (modelo === "Alternative") {
    console.log(divPergunta, divAlternativas);
  } else {
    return;
  }
}

function Alternativas(objeto) {
  let ArrayAlternativas = new Array();
  ArrayAlternativas.push(`${objeto.alternativas.a}`);
  ArrayAlternativas.push(`${objeto.alternativas.b}`);
  ArrayAlternativas.push(`${objeto.alternativas.c}`);
  ArrayAlternativas.push(`${objeto.alternativas.d}`);
  ArrayAlternativas.push(`${objeto.alternativas.e}`);

  return ArrayAlternativas;
}
