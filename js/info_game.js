import questoes from "../questions/quests.js";

sessionStorage.setItem("acertos", 0);
sessionStorage.setItem("ordem", 1);

const assuntos = JSON.parse(localStorage.getItem("assuntos"));
const quantidadeQuestao = JSON.parse(localStorage.getItem("quantidadeQuestao"));
const modo = JSON.parse(localStorage.getItem("modo"));
const modelo = JSON.parse(localStorage.getItem("modelo"));
const estado = localStorage.getItem("estado");

const allQuestions = EntregaDeQuestoes(questoes, assuntos);
const questoesParaJogar = Embaralhamento(
  quantidadeQuestao,
  assuntos.length,
  allQuestions
);
ApresentarQuestoes(questoesParaJogar, modo, modelo, 0, 0);

function EntregaDeQuestoes(arrayQuestion, arrayAssuntos) {
  let questoesDoJogo = new Array();

  for (let init = 0; init < arrayQuestion.length; init++) {
    const questao = arrayQuestion[init];

    if (arrayAssuntos.includes(questao.assunto)) {
      questoesDoJogo.push(questao);
    }
  }

  return questoesDoJogo;
} //Entrega todos as questoes relacionados aos assuntos escolhidos

function Embaralhamento(n_select, tamanhoDaLista, array) {
  n_select = parseInt(n_select);

  let questoes_embaralhadas = [];

  const questoesMinimas = 20;
  const totalDeQuestoes = array.length;
  const proportion = Math.floor((n_select / totalDeQuestoes) * questoesMinimas);
  const sobra = n_select - proportion * tamanhoDaLista;

  let min = 0;
  for (let position = 20; position <= totalDeQuestoes; position += 20) {
    for (let p = proportion; p > 0; p--) {
      var questaoRandom = getNumberRandom(min, position);
      questoes_embaralhadas.push(array[questaoRandom]);
    }
    min = position;
  }
  for (let s = sobra; s !== 0; s--) {
    questaoRandom = getNumberRandom(0, array.length);
    questoes_embaralhadas.push(array[questaoRandom]);
  }

  return questoes_embaralhadas;
} //embaralha as questoes proporcionalmente e seleciona a quantidade escolhida pelo usuario

function getNumberRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function ApresentarQuestoes(arrayDeQuestoes, modo, modelo, ordem, acertos) {
  const divPergunta = document.getElementById("pergunta");
  const divAlternativas = document.getElementById("options");
  const opCorreta = document.getElementById("correto");
  const opErrada = document.getElementById("errado");

  const inform = document.getElementById("info");

  var pergunta = arrayDeQuestoes[ordem].pergunta;
  var alternativas = Alternativas(arrayDeQuestoes[ordem]);
  var correta = arrayDeQuestoes[ordem].correta;

  if (modelo === "verdadeiroOuFalso") {
    var RandomAlt = getNumberRandom(0, alternativas.length);
    var resposta = alternativas[RandomAlt];
    divPergunta.innerHTML = `${pergunta} Resposta: ${resposta}?<br>${
      ordem + 1
    }/${arrayDeQuestoes.length}`;

    if (modo === "infinidade") {
      opCorreta.onclick = () => {
        if (correta === resposta) {
          acertos += 1;
          ordem += 1;
          if (ordem === arrayDeQuestoes.length) {
            if (estado === "treinar") {
              window.location.assign("./treinoconcluido.html");
            }
            if (estado === "jogar") {
              window.location.assign("./jogoconcluido.html");
            }
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        } else {
          ordem += 1;
          if (ordem === arrayDeQuestoes.length) {
            if (estado === "treinar") {
              window.location.assign("./treinoconcluido.html");
            }
            if (estado === "jogar") {
              window.location.assign("./jogoconcluido.html");
            }
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        }
      };
      opErrada.onclick = () => {
        if (correta !== resposta) {
          acertos += 1;
          ordem += 1;
          if (ordem === arrayDeQuestoes.length) {
            if (estado === "treinar") {
              window.location.assign("./treinoconcluido.html");
            }
            if (estado === "jogar") {
              window.location.assign("./jogoconcluido.html");
            }
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        } else {
          ordem += 1;
          if (ordem === arrayDeQuestoes.length) {
            if (estado === "treinar") {
              window.location.assign("../treinoconcluido.html");
            }
            if (estado === "jogar") {
              window.location.assign("./jogoconcluido.html");
            }
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        }
      };
    } else if (modo === "umMinuto") {
      opCorreta.setAttribute("disabled", "disabled");
      opErrada.setAttribute("disabled", "disabled");
      const span_temporizador = inform;
      var temporizador = 1;
      const tempo = setInterval(() => {
        if (temporizador === 1) {
          opCorreta.removeAttribute("disabled");
          opErrada.removeAttribute("disabled");
        }
        if (temporizador >= 60) {
          clearInterval(tempo);
          window.location.assign("./jogoconcluido.html");
        }
        span_temporizador.innerHTML = temporizador;
        temporizador += 1;

        opCorreta.onclick = () => {
          ordem += 1;
          clearInterval(tempo);
          span_temporizador.innerHTML = 0;
          if (correta === resposta) {
            acertos += 1;
            if (ordem === arrayDeQuestoes.length) {
              if (estado === "treinar") {
                window.location.assign("./treinoconcluido.html");
              }
              if (estado === "jogar") {
                window.location.assign("./jogoconcluido.html");
              }
            } else {
              ApresentarQuestoes(
                questoesParaJogar,
                modo,
                modelo,
                ordem,
                acertos
              );
            }
          } else {
            if (ordem === arrayDeQuestoes.length) {
              if (estado === "treinar") {
                window.location.assign("./treinoconcluido.html");
              }
              if (estado === "jogar") {
                window.location.assign("./jogoconcluido.html");
              }
            } else {
              ApresentarQuestoes(
                questoesParaJogar,
                modo,
                modelo,
                ordem,
                acertos
              );
            }
          }
        };
        opErrada.onclick = () => {
          ordem += 1;
          clearInterval(tempo);
          span_temporizador.innerHTML = 0;
          if (correta !== resposta) {
            acertos += 1;
            if (ordem === arrayDeQuestoes.length) {
              if (estado === "treinar") {
                window.location.assign("./treinoconcluido.html");
              }
              if (estado === "jogar") {
                window.location.assign("./jogoconcluido.html");
              }
            } else {
              ApresentarQuestoes(
                questoesParaJogar,
                modo,
                modelo,
                ordem,
                acertos
              );
            }
          } else {
            if (ordem === arrayDeQuestoes.length) {
              if (estado === "treinar") {
                window.location.assign("./treinoconcluido.html");
              }
              if (estado === "jogar") {
                window.location.assign("./jogoconcluido.html");
              }
            } else {
              ApresentarQuestoes(
                questoesParaJogar,
                modo,
                modelo,
                ordem,
                acertos
              );
            }
          }
        };
      }, 1000);
    } else if (modo === "tresVidas") {
      if (ordem === 0) {
        sessionStorage.setItem("corações", 3);
      }
      var quant_coracao = sessionStorage.getItem("corações");
      const span_hearts = inform;
      const carregarCoracoes = mostrarCoracoes(
        span_hearts,
        quant_coracao,
        "../frames/heart.png"
      );

      opCorreta.onclick = () => {
        ordem += 1;
        if (correta === resposta) {
          //acertou
          acertos += 1;
          if (ordem === arrayDeQuestoes.length) {
            window.location.assign("./jogoconcluido.html");
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        } else {
          // errou
          sessionStorage.setItem("corações", quant_coracao - 1);
          if (quant_coracao - 1 === 0) {
            window.location.assign("./jogoconcluido.html");
          }
          if (ordem === arrayDeQuestoes.length) {
            window.location.assign("./jogoconcluido.html");
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        }
      };
      opErrada.onclick = () => {
        ordem += 1;
        if (correta !== resposta) {
          //acertou
          acertos += 1;
          if (ordem === arrayDeQuestoes.length) {
            window.location.assign("./jogoconcluido.html");
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        } else {
          //errou
          sessionStorage.setItem("corações", quant_coracao - 1);
          if (quant_coracao - 1 === 0) {
            window.location.assign("./jogoconcluido.html");
          }
          if (ordem === arrayDeQuestoes.length) {
            window.location.assign("./jogoconcluido.html");
          } else {
            ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
          }
        }
      };
    }
  } else if (modelo === "Alternative") {
    divAlternativas.innerHTML = "";
    divPergunta.innerHTML = `${pergunta}<br>${parseInt(ordem) + 1}/${
      arrayDeQuestoes.length
    }`;

    if (modo == "infinidade") {
      alternativas.forEach((element, i) => {
        divAlternativas.innerHTML += `<button id="valor0${i}" value="${element}">${element}</button>`;
      });
      var valor00 = document.getElementById("valor00");
      valor00.onclick = () => {
        analisarAlt(arrayDeQuestoes, valor00.value, correta, modo);
      };
      var valor01 = document.getElementById("valor01");
      valor01.onclick = () => {
        analisarAlt(arrayDeQuestoes, valor01.value, correta, modo);
      };
      var valor02 = document.getElementById("valor02");
      valor02.onclick = () => {
        analisarAlt(arrayDeQuestoes, valor02.value, correta, modo);
      };
      var valor03 = document.getElementById("valor03");
      valor03.onclick = () => {
        analisarAlt(arrayDeQuestoes, valor03.value, correta, modo);
      };
      var valor04 = document.getElementById("valor04");
      valor04.onclick = () => {
        analisarAlt(arrayDeQuestoes, valor04.value, correta, modo);
      };
    } else if (modo == "umMinuto") {
      alternativas.forEach((element, i) => {
        divAlternativas.innerHTML += `<button id="valor0${i}" value="${element}" disabled>${element}</button>`;
      });
      var valor00 = document.getElementById("valor00");
      var valor01 = document.getElementById("valor01");
      var valor02 = document.getElementById("valor02");
      var valor03 = document.getElementById("valor03");
      var valor04 = document.getElementById("valor04");

      const span_temporizador = inform;
      var temporizador = 1;
      const tempo = setInterval(() => {
        if (temporizador === 1) {
          valor00.removeAttribute("disabled");
          valor01.removeAttribute("disabled");
          valor02.removeAttribute("disabled");
          valor03.removeAttribute("disabled");
          valor04.removeAttribute("disabled");
        }
        if (temporizador >= 60) {
          clearInterval(tempo);
          window.location.assign("./jogoconcluido.html");
        }
        span_temporizador.innerHTML = temporizador;
        temporizador += 1;

        valor00.onclick = () => {
          clearInterval(tempo);
          analisarAlt(arrayDeQuestoes, valor00.value, correta, modo);
        };
        valor01.onclick = () => {
          clearInterval(tempo);
          analisarAlt(arrayDeQuestoes, valor01.value, correta, modo);
        };
        valor02.onclick = () => {
          clearInterval(tempo);
          analisarAlt(arrayDeQuestoes, valor02.value, correta, modo);
        };
        valor03.onclick = () => {
          clearInterval(tempo);
          analisarAlt(arrayDeQuestoes, valor03.value, correta, modo);
        };
        valor04.onclick = () => {
          clearInterval(tempo);
          analisarAlt(arrayDeQuestoes, valor04.value, correta, modo);
        };
      }, 1000);
    } else if (modo === "tresVidas") {
      alternativas.forEach((element, i) => {
        divAlternativas.innerHTML += `<button id="valor0${i}" value="${element}">${element}</button>`;
      });
      var ordem = sessionStorage.getItem("ordem");
      if (ordem == 1) {
        sessionStorage.setItem("corações", 3);
      }
      var quant_coracao = sessionStorage.getItem("corações");
      const span_hearts = inform;
      const carregarCoracoes = mostrarCoracoes(
        span_hearts,
        quant_coracao,
        "../frames/heart.png"
      );

      var valor00 = document.getElementById("valor00");
      valor00.onclick = () => {
        analisarAlt(arrayDeQuestoes, valor00.value, correta, modo);
      };
      var valor01 = document.getElementById("valor01");
      valor01.onclick = () => {
        analisarAlt(arrayDeQuestoes, valor01.value, correta, modo);
      };
      var valor02 = document.getElementById("valor02");
      valor02.onclick = () => {
        analisarAlt(arrayDeQuestoes, valor02.value, correta, modo);
      };
      var valor03 = document.getElementById("valor03");
      valor03.onclick = () => {
        analisarAlt(arrayDeQuestoes, valor03.value, correta, modo);
      };
      var valor04 = document.getElementById("valor04");
      valor04.onclick = () => {
        analisarAlt(arrayDeQuestoes, valor04.value, correta, modo);
      };
    }
  }
}

function Alternativas(objeto) {
  let ArrayAlternativas = new Array();
  ArrayAlternativas.push(`${objeto.alternativas.a}`);
  ArrayAlternativas.push(`${objeto.alternativas.b}`);
  ArrayAlternativas.push(`${objeto.alternativas.c}`);
  ArrayAlternativas.push(`${objeto.alternativas.d}`);
  ArrayAlternativas.push(`${objeto.alternativas.e}`);

  return ArrayAlternativas;
}

function mostrarCoracoes(element, index_max, img) {
  for (let index = 0; index < index_max; index++) {
    var print = `<img src=${img} width=30px heigth=30px>`;
    if (index === 0) element.innerHTML = print;
    else element.innerHTML += print;
  }
}

function analisarAlt(arrayDeQuestoes, resposta, correta, modo) {
  var acertos = sessionStorage.getItem("acertos");
  var ordem = sessionStorage.getItem("ordem");

  if (resposta === correta) {
    sessionStorage.setItem("acertos", parseInt(acertos) + 1);
    sessionStorage.setItem("ordem", parseInt(ordem) + 1);

    if (ordem >= arrayDeQuestoes.length) {
      window.location.assign("./jogoconcluido.html");
    } else {
      ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
    }
  } else {
    if (modo === "tresVidas") {
      sessionStorage.setItem(
        "corações",
        sessionStorage.getItem("corações") - 1
      );
      if (sessionStorage.getItem("corações") == 0) {
        window.location.assign("./jogoconcluido.html");
      }
    }
    if (ordem >= arrayDeQuestoes.length) {
      window.location.assign("./jogoconcluido.html");
    }
  }
  sessionStorage.setItem("ordem", parseInt(ordem) + 1);
  if (ordem >= arrayDeQuestoes.length) {
    window.location.assign("./jogoconcluido.html");
  } else {
    ApresentarQuestoes(questoesParaJogar, modo, modelo, ordem, acertos);
  }
}
