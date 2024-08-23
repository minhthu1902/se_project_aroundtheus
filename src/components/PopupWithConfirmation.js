import Popup from "./Popup";
export default class PopupWithConfirmation extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalSelector = modalSelector;
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
  // setEventListeners(data) {
  //   this.trashModal = document.querySelector(`${this._modalSelector}`);
  //   this.trashModalSubmitButton = this.trashModal.querySelector(
  //     "#modal-button-trash"
  //   );

  //   this.cardTitle = data.cardElement.querySelector(".card__title");

  //   this.trashModal.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     this._handleFormSubmit(this.cardTitle);
  //     this._removeCard(data.cardElement);
  //   });
  // }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}