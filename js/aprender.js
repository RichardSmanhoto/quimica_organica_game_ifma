import lista_assuntos from "./assuntos.js";

const btt_abrir = document.getElementById("btt-abrir");
const btt_fechar = document.getElementById("btt-fechar");
const menu = document.getElementById("menu");
const menu_assuntos = document.getElementById("menu-assuntos");
const conteudo = document.querySelector("main");

function subir_conteudo(lista, menu_ass) {
  lista.forEach((element) => {
    menu_ass.innerHTML += `<li><a href="#">${element}</a></li>`;
  });
}

btt_abrir.onclick = () => {
  menu.style.width = "250px";
  conteudo.style.marginLeft = "250px";
};

btt_fechar.onclick = () => {
  menu.style.width = "0";
  conteudo.style.marginLeft = "0";
};

subir_conteudo(lista_assuntos, menu_assuntos);
