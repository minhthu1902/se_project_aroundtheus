import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    //modalSelector call back fn when popupWithForm calls and the form submit event on
    super({ modalSelector }); //add-card-modal
    this._form = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._modalButton = this._popupElement.querySelector(".modal__button");
  }

  close() {
    this._form.reset(); // to reset the form once the popup is closed
    super.close();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setSubmit() {
    this._formSubmit = handleFormSubmit;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
  setLoading(isLoading, loadingText = "Saving...") {
    if (this._modalButton) {
      if (isLoading) {
        this._modalButton.textContent = loadingText;
      } else {
        this._modalButton.textContent = this._modalButton.dataset.originalText || "Save";
      }
    } else {
      console.error("Submit button not found.");
    }
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  // getNewForm() {
  //   return this._form;
  // }
}
