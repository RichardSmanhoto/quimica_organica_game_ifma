const dados = JSON.parse(sessionStorage.getItem("dados"));

const divMessage = document.getElementById("message");

function NotaDoUser(info) {
  var porcem = info.acertos / info.totalDeQuestao;
  var resultado = porcem >= 0.5 ? true : false;
  return resultado;
}
if (NotaDoUser(dados)) {
  //NOTA BOA
  divMessage.innerHTML = `Parabéns!!! Você acertou ${dados.acertos} de ${dados.totalDeQuestao} questões`;
} else {
  //NOTA RUIM
  divMessage.innerHTML = `Sentimos muito!!! Você acertou ${dados.acertos} de ${dados.totalDeQuestao} questões`;
}
