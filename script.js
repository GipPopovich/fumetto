// Immagini PNG numerate: 01.png, 02.png, 03.png...
const totalPages = 8; // ⬅️ METTI QUI IL NUMERO REALE DI PAGINE

const images = Array.from({ length: totalPages }, (_, i) => {
  const n = String(i + 1).padStart(2, "0"); // 01, 02, 03...
  return `images/${n}.png`;
});

let current = 0;
const pageEl = document.getElementById("page");
const counterEl = document.getElementById("counter");

function render() {
  pageEl.src = images[current];
  counterEl.textContent = `${current + 1} / ${images.length}`;
}

document.getElementById("prev").onclick = () => {
  if (current > 0) current--;
  render();
};

document.getElementById("next").onclick = () => {
  if (current < images.length - 1) current++;
  render();
};

// Swipe su mobile
let startX = null;
pageEl.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
}, { passive: true });

pageEl.addEventListener("touchend", e => {
  if (startX === null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 40) {
    if (dx > 0 && current > 0) current--;
    if (dx < 0 && current < images.length - 1) current++;
    render();
  }
  startX = null;
}, { passive: true });

render();

