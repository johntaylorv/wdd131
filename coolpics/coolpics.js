const menuButton = document.querySelector(".menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", function() {
    nav.classList.toggle("open");
});

const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", (event) => {
  const imgClicked = event.target.closest("img");
  if (!imgClicked) return;

  const src = imgClicked.getAttribute("src");
  const alt = imgClicked.getAttribute("alt");
  const baseName = src.split("-")[0]; 
  const fullSrc = `${baseName}-full.jpeg`;

  const modal = document.createElement("dialog");
  modal.innerHTML = `
    <img src="${fullSrc}" alt="${alt}">
    <button class="close-viewer">X</button>
  `;
  document.body.appendChild(modal);

  modal.showModal();

  modal.querySelector(".close-viewer").addEventListener("click", () => {
    modal.close();
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });
  modal.addEventListener("close", () => {
    modal.remove();
  });
});