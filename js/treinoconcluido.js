const dados = JSON.parse(sessionStorage.getItem("dados"));

const divMessage = document.getElementById("message");

function NotaDoUser(info) {
  var porcem = info.acertos / info.totalDeQuestao;
  var resultado = porcem >= 0.5 ? true : false;
  return resultado;
}
if (NotaDoUser(dados)) {
  //NOTA BOA
  divMessage.innerHTML = `<p id="title">Parabéns!!!</p> <p>Você acertou ${dados.acertos} de ${dados.totalDeQuestao} questões</p>`;
} else {
  //NOTA RUIM
  divMessage.innerHTML = `<p id="title">Vamos se esforçar um pouco mais!&#128530 &#128542</p> <p>Você acertou ${dados.acertos} de ${dados.totalDeQuestao} questões...</p>`;
}
