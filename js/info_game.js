import questoes from "../questions/quests.js";

const assuntos = JSON.parse(localStorage.getItem("assuntos"));
const quantidadeQuestao = JSON.parse(localStorage.getItem("quantidadeQuestao"));
const modo = JSON.parse(localStorage.getItem("modo"));
const modelo = JSON.parse(localStorage.getItem("modelo"));

const allQuestions = EntregaDeQuestoes(questoes, assuntos);
const questoesParaJogar = Embaralhamento(
  quantidadeQuestao,
  assuntos.length,
  allQuestions
);
ApresentarQuestoes(questoesParaJogar, modo, modelo);

function EntregaDeQuestoes(arrayQuestion, arrayAssuntos) {
  let questoesDoJogo = new Array();
  // arrayQuestion.map((elementArrayQuestion) => {
  //   arrayAssuntos.map((elementArrayAssuntos) => {
  //     console.log(elementArrayQuestion.assunto);
  //     if (elementArrayQuestion.assunto === elementArrayAssuntos) {
  //       questoesDoJogo.push(elementArrayQuestion);
  //     }
  //   });
  // });

  for (let init = 0; init < arrayQuestion.length; init++) {
    const questao = arrayQuestion[init];

    if (arrayAssuntos.includes(questao.assunto)) {
      questoesDoJogo.push(questao);
    }
  }
  console.log(questoesDoJogo);
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
      var questaoRandom = getQuestionRandom(min, position);
      questoes_embaralhadas.push(array[questaoRandom]);
    }
    min = position;
  }
  for (let s = sobra; s !== 0; s--) {
    questaoRandom = getQuestionRandom(0, array.length);
    questoes_embaralhadas.push(array[questaoRandom]);
  }

  return questoes_embaralhadas;
} //embaralha as questoes proporcionalmente e seleciona a quantidade escolhida pelo usuario
function getQuestionRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function ApresentarQuestoes(arrayDeQuestoes, modo, modelo) {
  var contagemDeAcertos = 0;
  const divPergunta = document.getElementById("pergunta");
  const divAlternativas = document.getElementById("options");

  if (modelo === "verdadeiroOuFalso") {
    console.log(arrayDeQuestoes, modo, modelo);
  } else if (modelo === "Alternative") {
    console.log(divPergunta, divAlternativas);
  } else {
    return;
  }
}
