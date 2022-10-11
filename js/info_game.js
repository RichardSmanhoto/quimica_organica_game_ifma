import questoes from "../questions/quests.js";

const assuntos = JSON.parse(localStorage.getItem("assuntos"));
console.log(`chamando valor da chave assuntos: ${assuntos}`);

function pegar_assunto(arrayQuestion, arrayAssuntos) {
  for (let i = 0; i < arrayQuestion.length; i++) {
    let QuestionAssunto = arrayQuestion[i].assunto;
    console.log(
      `Assunto da array de questoes: ${QuestionAssunto} \nassunto do localstorage: ${arrayAssuntos[i]}`
    );
    if (QuestionAssunto === arrayAssuntos[i]) {
      console.log(QuestionAssunto);
    }
  }
}

pegar_assunto(questoes, assuntos);
