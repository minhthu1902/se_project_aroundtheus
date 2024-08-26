export default class FormValidator {
  constructor(formElement, options) {
    this._formElement = formElement;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this.inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector));
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._ButtonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement); //all inputlements are valid
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = errorMessage; //get validation message

    errorMessageEl.classList.add(this._errorClass);
    // inputElement.classList.add(this._errorClass); //add error class and display error message
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
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButtons = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }
  _hasInvalidInput() {
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  toggleButtonState() {
    if (this._hasInvalidInput(this._inputElements)) {
      this._submitButtons.classList.add(this._inactiveButtonClass);
      this._submitButtons.disabled = true;
      return;
    }
    this._submitButtons.classList.remove(this._inactiveButtonClass);
    this._submitButtons.disabled = false;
  }
  resetValidation() {
    this.toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      inputElement.value = "";
      this._hideInputError(inputElement);
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
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
