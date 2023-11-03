export default class FormValidator {
  constructor(options, formElement) {
    this._formElement = formElement;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage; //get validation message
    inputElement.classList.add(this._errorClass); //add error class and display error message
  }

  _hideInputError(inputElement) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = ""; //reset error
    errorMessageEl.classList.remove(this._errorClass);
  }

  _setEventListeners() {
    this._inputElements = Array.from(this._formElement).querySelectorAll(
      this._inputSelector
    );

    this._submitButtons = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(inputElement, submitButtons);
      });
    });
    // this.toggleButtonState();
  }
  _disableButton() {
    this._submitButtons.classList.add(this._inactiveButtonClass);
    this._submitButtons.disabled = true;
  }
  _enableButton() {
    this._submitButtons.classList.remove(this._inactiveButtonClass);
    this._submitButtons.disabled = false;
  }
  _hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  toggleButtonState() {
    if (this._hasInvalidInput(inputElement)) {
      this._disableButton(submitButtons);
    } else {
      this._enableButton(submitButtons);
    }
  }

  enableValidation() {
    this._formElement.setEventListeners("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

//enabling validation by calling enableValidation()
// pass all the settings on call
// look for input is not valid
// get validation message
//add error class to input
// display error message
//disable button
// if all inputs are valid , enable button
// reset error message
