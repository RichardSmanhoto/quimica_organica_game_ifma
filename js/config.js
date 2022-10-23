const form = document.getElementById("form");
const assuntos_select = document.getElementById("assuntos-select");
const quant_questoes = document.getElementById("quant_questoes");
const modelo_select = document.getElementById("modelo-select");
const modo_select = document.getElementById("modo-select");
const nome_input = document.getElementById("name");

const estadoAtual = localStorage.getItem("estado");

var info;

form.addEventListener("submit", () => {
  if (estadoAtual === "treinar") {
    Informacoes_config(
      null,
      assuntos_select.value.sort(),
      "infinidade",
      quant_questoes.value,
      modelo_select.value === "1" ? "verdadeiroOuFalso" : "Alternative"
    );
  } else if (estadoAtual === "jogar") {
    Informacoes_config(
      nome_input.value,
      assuntos_select.value.sort(),
      modo_select.value === "1"
        ? "infinidade"
        : modo_select.value === "2"
        ? "umMinuto"
        : "tresVidas",
      quant_questoes.value,
      modelo_select.value === "1" ? "verdadeiroOuFalso" : "Alternative"
    );
  } else {
  }
  adicionar_localStorage(info);
  selecionar_modelo(info.modelo);
});

function Informacoes_config(nome, assuntos, modo, quantidadeQuestao, modelo) {
  info = {
    nome: nome,
    assuntos: assuntos,
    modo: modo,
    quantidadeQuestao: quantidadeQuestao,
    modelo: modelo,
  };

  return info;
}

function selecionar_modelo(modelo) {
  if (modelo === "verdadeiroOuFalso") {
    form.setAttribute("action", "./game/twooptions.html");
  } else {
    form.setAttribute("action", "./game/alternative.html");
  }
}

function adicionar_localStorage(object) {
  for (const key in object) {
    localStorage.setItem(key, JSON.stringify(object[key]));
  }
}
