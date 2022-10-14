import questoes from "../questions/quests.js";

const assuntos = JSON.parse(localStorage.getItem("assuntos"));
const quantidadeQuestao = JSON.parse(localStorage.getItem("quantidadeQuestao"));

const allQuestions = EntregaDeQuestoes(questoes, assuntos, quantidadeQuestao);
const questoesParaJogar = Embaralhamento(
  quantidadeQuestao,
  assuntos.length,
  allQuestions
);

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
}

function getQuestionRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ApresentarQuestoes(arrayDeQuestoes) {}
