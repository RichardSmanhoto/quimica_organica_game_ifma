const dados = JSON.parse(sessionStorage.getItem("dados"));

const divMessage = document.getElementById("message");

function NotaDoUser(info) {
  var porcem = info.acertos / info.totalDeQuestao;
  var resultado = porcem >= 0.5 ? true : false;
  return resultado;
}

function modoText(info) {
  if (info.modo === "infinidade") return "infinidade";
  else if (info.modo === "umMinuto") return "um minuto";
  else return "três vidas";
}

if (NotaDoUser(dados)) {
  //NOTA BOA
  divMessage.innerHTML = `<p id="title">Parabéns, ${
    dados.nome
  }!!!</p><p>Você acertou ${dados.acertos} de ${
    dados.totalDeQuestao
  } questões no modo ${modoText(dados.modo)}</p>`;
} else {
  //NOTA RUIM
  divMessage.innerHTML = `<p id="title">Vamos se esforçar um pouco mais, ${
    dados.nome
  }! &#128530 &#128542</p><p>Você acertou ${dados.acertos} de ${
    dados.totalDeQuestao
  } questões no modo ${modoText(dados.modo)}...</p>`;
}
