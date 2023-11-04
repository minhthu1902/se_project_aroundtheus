export default class FormValidator {
  constructor(formElement, options) {
    this._formElement = formElement;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
  }

  // _checkInputValidity(inputElement) {
  //   if (!inputElement.validity.valid) {
  //     return this._showInputError(inputElement);
  //   } else {
  //     this._hideInputError(inputElement);
  //   }
  // }
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  // _showInputError(inputElement) {
  //   const errorMessageEl = this._formElement.querySelector(
  //     `#${inputElement.id}-error`
  //   );
  //   inputElement.classList.add(this._inputErrorClass);
  //   errorMessageEl.textContent = inputElement.validationMessage; //get validation message
  //   inputElement.classList.add(this._errorClass); //add error class and display error message
  // }
  _showInputError(inputElement) {
    const errorElementEl = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElementEl.textContent = "";
    errorElementEl.classList.add(this._errorClass);
  }

  // _hideInputError(inputElement) {
  //   const errorMessageEl = this._formElement.querySelector(
  //     `#${inputElement.id}-error`
  //   );
  //   inputElement.classList.remove(this._inputErrorClass);
  //   errorMessageEl.textContent = ""; //reset error
  //   errorMessageEl.classList.remove(this._errorClass);
  // }
  _hideInputError(inputElement) {
    const errorElementEl = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElementEl.classList.remove(this._errorClass);
    errorElementEl.textContent = "";
  }

  // _disableButton() {
  //   this._submitButtons.classList.add(this._inactiveButtonClass);
  //   this._submitButtons.disabled = true;
  // }
  // _enableButton() {
  //   this._submitButtons.classList.remove(this._inactiveButtonClass);
  //   this._submitButtons.disabled = false;
  // }
  _hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  // toggleButtonState() {
  //   if (this._hasInvalidInput(this._inputElement)) {
  //     this._disableButton(submitButtons);
  //   } else {
  //     this._enableButton(submitButtons);
  //   }
  // }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", "");
    }
  }

  // _setEventListeners() {
  //   const inputs = this._formElement.querySelectorAll(this._inputSelector);
  //   this._inputElement = Array.from(inputs);

  //   this._submitButtons = this._formElement.querySelector(
  //     this._submitButtonSelector
  //   );

  //   this._inputElement.forEach((inputElement) => {
  //     inputElement.addEventListener("input", (e) => {
  //       this._checkInputValidity(inputElement);
  //       this.toggleButtonState();
  //     });
  //   });
  //   // this.toggleButtonState();
  // }
  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    // this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
    this.toggleButtonState();
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
