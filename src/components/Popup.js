export default class Popup {
  constructor({ modalSelector }) {
    this._popupElement = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    //open popup
    console.log(this);
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }
  close() {
    // console.log(this);
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }
  _handleEscClose(e) {
    e.preventDefault();
    if (e.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    // add a click event listener to close icon
    this._popupElement.addEventListener("mousedown", (e) => {
      if (
        e.target === this._popupElement ||
        e.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}

