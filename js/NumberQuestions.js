const assuntos_select = document.getElementById("assuntos-select");
const select_quantQuestoes = document.getElementById("quant_questoes");

var quant_questao = [];

assuntos_select.onchange = () => {
  quant_questao = assuntos_select.value;
  retornar_NQuestoes(quant_questao, select_quantQuestoes);
};

function retornar_NQuestoes(array, element) {
  const quant_assuntos_selecionados = array.length;
  if (quant_assuntos_selecionados !== 0) {
    element.removeAttribute("disabled");
    element.innerHTML = "";
    let numDeQuestoes = 0;
    const min = 20;
    var max_numDeQuestoes =
      quant_assuntos_selecionados * min > 100
        ? 100
        : quant_assuntos_selecionados * min;
    while (numDeQuestoes < max_numDeQuestoes) {
      if (numDeQuestoes === 0) {
        numDeQuestoes += 5;
        element.innerHTML += `<option value="${numDeQuestoes}">${numDeQuestoes}</option>`;
        numDeQuestoes += 5;
      } else {
        numDeQuestoes += 10;
      }
      element.innerHTML += `<option value="${numDeQuestoes}">${numDeQuestoes}</option>`;
    }
  } else {
    element.innerHTML = "";
    element.setAttribute("disabled", "disabled");
  }
}
