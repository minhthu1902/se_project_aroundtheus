// enabling  validation by calling enableValidation()
// pass all the settings on call

function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorMessage.textContent = inputElement.validationMessage;
  errorMessage.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorMessage.textContent = "";
  errorMessage.classList.remove(errorClass);
}

function hasInvalidInput(inputElement) {
  return !inputElement.validity.valid;
}

function checkInputValidity(formElement, inputElement, options) {
  if (hasInvalidInput(inputElement)) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

// function disableButton(submitButton, options) {
//   submitButton.classList.add(options.inactiveButtonClass);
//   submitButton.disabled = true;
// }
// function enableButton(submitButton, options) {
//   submitButton.classList.remove(options.inactiveButtonClass);
//   submitButton.disabled = false;
// }

function toggleButtonState(
  inputElement,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElement)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElement, submitButton, options);
    });
  });
  //   const inputElements = Array.from(
  //     formElement.querySelectorAll(options.inputSelector)
  //   );

  //   const submitButton = formElement.querySelector(options.submitButtonSelector);
  //   inputElements.forEach((inputElement) => {
  //     inputElement.addEventListener("input", () => {
  //       checkInputValidity(formElement, inputElement, options);
  //       toggleButtonState(inputElements, submitButton, options);
  //     });
  //   });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    // look for all inputs inside of form
    // loop through all the inputs to see if all are valid
    //if input is not valid
    //get validation message
    //display error message

    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form", //line 92
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
