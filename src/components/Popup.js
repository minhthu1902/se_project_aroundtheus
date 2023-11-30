export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    //open popup

    this._popupElement.classList.add("modal_opened");
    document.addEventListener("click", this.close);
    document.addEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlay);
  }
  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
      document.removeEventListener("click", this._handleOverlay);
    }
  }
  _handleOverlay(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }
  setEventListener() {
    document.addEventListener("keydown", this._handleEscCLose);
    this.open();

    this.close();
  }
}
