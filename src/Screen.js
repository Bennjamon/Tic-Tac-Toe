export default class Screen {
  constructor($element) {
    this.$element = $element;
  }

  render(screenHandler) {
    this.$element.classList.add("visible");

    this.screenHandler = screenHandler;

    this.start();
  }

  hide() {
    this.$element.classList.remove("visible");
  }
}
