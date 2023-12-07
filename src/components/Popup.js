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
    // document.addEventListener("mousedown", this._handleImageClick);
  }

  close() {
    // console.log(this);
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleModalClick);
  }
  _handleEscClose(e) {
    e.preventDefault();
    if (e.key === "Escape") {
      this.close();
      document.removeEventListener("click", this._handleOverlay);
    }
  }
  _handleImageClick = (e) => {
    if (
      e.target.classList.contains("modal_opened") ||
      e.target.classList.contains("modal__close")
    ) {
      this.close();
    }
  };
  setEventListeners() {
    // add a click event listener to close icon
    this._popupCloseButton = this._popupElement.querySelector(".modal__close");
    this._popupCloseButton.addEventListener("click", () => this.close());

    this._popupElement.addEventListener("click", (e) => {
      if (
        e.target === this._popupElement ||
        e.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
