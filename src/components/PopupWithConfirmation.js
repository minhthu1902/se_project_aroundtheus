import Popup from "./Popup";
export default class PopupWithConfirmation extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    // this._modalSelector = modalSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._modalButton = this._popupElement.querySelector(".modal__button");
  }

  _removeCard(card) {
    card.remove();
    card = null;
  }
  setSubmit(handleSubmit) {
    this._handleFormSubmit=handleSubmit;
  }

  setLoading(isLoading) {
    if(isLoading){
      this._modalButton.textContent = "Deleting...";
    } else {
      this._modalButton.textContent = "Yes";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}