const form = document.getElementById("form");
const assuntos_select = document.getElementById("assuntos-select");
const quant_questoes = document.getElementById("quant_questoes");
const modelo_select = document.getElementById("modelo-select");

var info;

form.addEventListener("submit", () => {
  adicionar();
  adicionar_localStorage(info);
  selecionar_modelo(info.modelo);
});

function Informacoes_config(
  nome,
  temNome,
  assuntos,
  modo,
  quantidadeQuestao,
  modelo
) {
  info = {
    nome: nome,
    temNome: temNome,
    assuntos: assuntos,
    modo: modo,
    quantidadeQuestao: quantidadeQuestao,
    modelo: modelo,
  };

  return info;
}

function adicionar() {
  Informacoes_config(
    null,
    false,
    assuntos_select.value.sort(),
    null,
    quant_questoes.value,
    modelo_select.value == 1 ? "verdadeiroOuFalso" : "DuasOpcoes"
  );
}

function selecionar_modelo(modelo) {
  if (modelo === "verdadeiroOuFalso") {
    form.setAttribute("action", "./twooptions.html");
  } else {
    form.setAttribute("action", "./alternative.html");
  }
}

function adicionar_localStorage(object) {
  for (const key in object) {
    localStorage.setItem(key, JSON.stringify(object[key]));
  }
}
