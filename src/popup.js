const $popupContainer = document.querySelector("#popup-container");
const $popupContent = document.querySelector("#popup-content");
const $popupButton = document.querySelector("#popup-button");

const listeners = [];

const popup = {
  show(content) {
    $popupContent.textContent = content;
    $popupContainer.classList.add("visible");
  },
  hide() {
    $popupContainer.classList.remove("visible");

    listeners.forEach((listener) => listener());
  },
  addListener(listener) {
    listeners.push(listener);
  },
};

$popupButton.addEventListener("click", () => popup.hide());

$popupContainer.addEventListener("click", (e) => {
  if (e.target === $popupContainer) {
    popup.hide();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    popup.hide();
  }
});

export default popup;
