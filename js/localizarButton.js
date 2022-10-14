const bttTreinar = document.getElementById("treinar");
const bttJogar = document.getElementById("jogar");

bttTreinar.onclick = () => {
  localStorage.setItem("estado", "treinar");
};
bttJogar.onclick = () => {
  localStorage.setItem("estado", "jogar");
};
