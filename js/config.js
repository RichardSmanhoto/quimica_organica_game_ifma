const form = document.getElementById("form");
const assuntos_select = document.getElementById("assuntos-select");
const quant_questoes = document.getElementById("quant_questoes");
const modelo_select = document.getElementById("modelo-select");

var info_config;

function atualizar_config(
  nome,
  temNome,
  assuntos,
  modo,
  quantidadeQuestao,
  modelo
) {
  info_config = {
    nome: nome,
    temNome: temNome,
    assuntos: assuntos,
    modo: modo,
    quantidadeDeQuestoes: quantidadeQuestao,
    modeloDeJogo: modelo,
  };

  return info_config;
}

form.onsubmit = (e) => {
  console.log(
    atualizar_config(
      null,
      false,
      assuntos_select.value,
      null,
      quant_questoes.value,
      modelo_select.value == 1 ? "verdadeiroOuFalso" : "alternativa"
    )
  );

  if (info_config.modeloDeJogo === "verdadeiroOuFalso") {
    form.setAttribute("action", "./twooptions.html");
  }
};
