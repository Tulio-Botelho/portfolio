const raiz = document.documentElement;   

const botaoTema = document.querySelector(".botao-tema");

const temaSalvo = localStorage.getItem("tema");
if (temaSalvo) raiz.dataset.tema = temaSalvo;  

botaoTema.addEventListener("click", () => {
  const novo = raiz.dataset.tema === "escuro" ? "claro" : "escuro";
  raiz.dataset.tema = novo;
  localStorage.setItem("tema", novo);
});

const cursor = document.querySelector(".cursor");
const imagemCursor = cursor.querySelector("img");
const mouseDisponivel = window.matchMedia("(hover: hover) and (pointer: fine)");
let mouseX = 0, mouseY = 0;
let quadroCursor = null;

function ocultarCursor() {
  raiz.classList.remove("cursor-3d");
  cursor.classList.remove("cursor--visivel", "cursor--ativo", "cursor--pressionado");
  if (quadroCursor !== null) {
    cancelAnimationFrame(quadroCursor);
    quadroCursor = null;
  }
}

window.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse" || !mouseDisponivel.matches || !imagemCursor.complete || !imagemCursor.naturalWidth) {
    ocultarCursor();
    return;
  }

  mouseX = e.clientX;
  mouseY = e.clientY;
  const clicavel = e.target.closest?.("a, button, input, textarea, select, [role='button']");
  cursor.classList.toggle("cursor--ativo", Boolean(clicavel));

  if (quadroCursor === null) {
    quadroCursor = requestAnimationFrame(() => {
      quadroCursor = null;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-20%, -5%)`;
      raiz.classList.add("cursor-3d");
      cursor.classList.add("cursor--visivel");
    });
  }
});

window.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse" && raiz.classList.contains("cursor-3d")) {
    cursor.classList.add("cursor--pressionado");
  }
});

window.addEventListener("pointerup", () => cursor.classList.remove("cursor--pressionado"));
window.addEventListener("blur", ocultarCursor);
document.documentElement.addEventListener("pointerleave", ocultarCursor);
imagemCursor.addEventListener("error", ocultarCursor);
mouseDisponivel.addEventListener("change", ocultarCursor);

const botaoMenu = document.querySelector(".botao-menu");
botaoMenu.addEventListener("click", () => document.body.classList.toggle("menu-aberto"));

document.querySelectorAll(".menu-tela a").forEach((link) => {
  link.addEventListener("click", () => document.body.classList.remove("menu-aberto"));
});

document.getElementById("rodape-ano").textContent = new Date().getFullYear();
