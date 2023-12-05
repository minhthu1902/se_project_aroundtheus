export default class FormValidator {
  constructor(formElement, options) {
    this._formElement = formElement;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    // this.inputList = Array.from(
    //   this._formElement.querySelectorAll(this._inputSelector)
    // );
    // this._submitButton = this._formElement.querySelector(
    //   options.submitButtonSelector
    // );
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement); //all inputlements are valid
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

  disableButton() {
    this._submitButtons.classList.add(this._inactiveButtonClass);
    this._submitButtons.disabled = true;
  }
  // _enableButton() {
  //   this._submitButtons.classList.remove(this._inactiveButtonClass);
  //   this._submitButtons.disabled = false;
  // }

  _hasInvalidInput() {
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputElements)) {
      this.disableButton();
    } else {
      this._submitButtons.classList.remove(this._inactiveButtonClass);
      this._submitButtons.disabled = false;
    }
  }

  _setEventListeners() {
    const inputs = this._formElement.querySelectorAll(this._inputSelector);
    this._inputElements = Array.from(inputs);

    this._submitButtons = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
    // this.toggleButtonState();
  }

  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  enableValidation() {
    // addeventlistener # setevenlisteners
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
