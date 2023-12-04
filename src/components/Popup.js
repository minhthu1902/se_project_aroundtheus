export default class Popup {
  constructor(modalSelector) {
    this._popupElement = document.querySelector(modalSelector);
    // this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    //open popup
    // console.log(this);
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleModalClick);
  }

  close() {
    // console.log(this);
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleModalClick);
  }
  _handleEscClose = (e) => {
    // console.log(this);
    if (e.key === "Escape") {
      this.close();
      // document.removeEventListener("click", this._handleOverlay);
    }
  };
  _handleModalClick = (e) => {
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
  }
}
