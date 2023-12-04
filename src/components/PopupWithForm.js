import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    //modalSelector call back fn when popupWithForm calls and the form submit event on
    super(modalSelector); //add-card-modal
    this._form = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelector(".modal__input");
    this.setEventListeners();
  }

  // open() {
  //   super.open();
  // }
  close() {
    super.close();
    this._form.reset(); // to reset the form once the popup is closed
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formValues = this._getInputValues();
      this._handleFormSubmit(formValues);
      // this._handleEscClose();
    });
  }
}
