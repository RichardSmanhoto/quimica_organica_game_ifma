import questoes from "../questions/quests.js";

const assuntos = JSON.parse(localStorage.getItem("assuntos"));
const quantidadeQuestao = JSON.parse(localStorage.getItem("quantidadeQuestao"));

function EntregaDeQuestoes(arrayQuestion, arrayAssuntos, tamanho) {
  let questoesDoJogo = new Array();
  arrayQuestion.map((elementArrayQuestion) => {
    arrayAssuntos.map((elementArrayAssuntos) => {
      if (elementArrayQuestion.assunto === elementArrayAssuntos) {
        if (questoesDoJogo.length >= tamanho) {
          return;
        }
        questoesDoJogo.push(elementArrayQuestion);
      }
    });
  });
  return questoesDoJogo;
}

console.log(EntregaDeQuestoes(questoes, assuntos, quantidadeQuestao));
