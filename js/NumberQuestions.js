const assuntos_select = document.getElementById("assuntos-select");
const quant_questoes = document.getElementById("quant_questoes");

var quant_questao = [];

assuntos_select.onchange = () => {
  quant_questao = assuntos_select.value;
  retornar_NQuestoes(quant_questao);
};

function retornar_NQuestoes(array) {
  const quant_assuntos_selecionados = array.length;
  if (quant_assuntos_selecionados !== 0) {
    quant_questoes.removeAttribute("disabled");
    quant_questoes.innerHTML = "";
    const min = 20;
    var n_questoes = quant_assuntos_selecionados * min;
    while (n_questoes >= 5) {
      quant_questoes.innerHTML += `<option value="${n_questoes}">${n_questoes}</option>`;

      if (n_questoes === 10) {
        n_questoes -= 5;
      } else {
        n_questoes -= 10;
      }
    }
  } else {
    quant_questoes.innerHTML = "";
    quant_questoes.setAttribute("disabled", "disabled");
  }
}
