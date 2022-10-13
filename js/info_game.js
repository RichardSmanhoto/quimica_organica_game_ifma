import questoes from "../questions/quests.js";

const assuntos = JSON.parse(localStorage.getItem("assuntos"));
const quantidadeQuestao = JSON.parse(localStorage.getItem("quantidadeQuestao"));
const allQuestions = EntregaDeQuestoes(questoes, assuntos, quantidadeQuestao);

function EntregaDeQuestoes(arrayQuestion, arrayAssuntos) {
  let questoesDoJogo = new Array();
  arrayQuestion.map((elementArrayQuestion) => {
    arrayAssuntos.map((elementArrayAssuntos) => {
      if (elementArrayQuestion.assunto === elementArrayAssuntos) {
        questoesDoJogo.push(elementArrayQuestion);
      }
    });
  });
  return questoesDoJogo;
}

function Embaralhamento(n_select, tamanhoDaLista, array) {
  n_select = parseInt(n_select);
  const minQ = 20;
  const maxQ = minQ * tamanhoDaLista;
  const proportion = Math.floor((n_select / maxQ) * minQ);
  console.log(
    `Voce selecionou: ${n_select} questoes.\n${proportion} questões de cada assunto para ${tamanhoDaLista} assuntos.\nTotal de questoes: ${
      proportion * tamanhoDaLista
    }. Para completar a lista, falta ${
      n_select - proportion * tamanhoDaLista
    } questao(oes)`
  );
  let min = 0;
  for (let position = 20; position <= maxQ; position += 20) {
    var questaoRandom = getQuestionRandom(min, position);
  }
}

Embaralhamento(quantidadeQuestao, assuntos.length, allQuestions);

function getQuestionRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
