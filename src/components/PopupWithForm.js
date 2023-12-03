import { SaveButtons } from "../utils/constants.js";

import Popup from "./Popup.js";

import { UserInfo } from "./userInfo.js";

export default class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector); //add-card-modal
    this._inputList = this._form.querySelector(".modal__input");
    this._form = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this.setEventListeners();
  }

  // open() {
  //   super.open();
  // }
  // close() {
  //   console.log(this._popupForm);
  //   super.close();
  // }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  setInputValues(userInfo) {
    const userArray = Object.values(userInfo);
    for (let i = 0; i < userArray.length; i++) {
      this.inputList[i].value = userArray[i];
    }
  }
  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._handleEscClose();
    });
    super.setEventListeners();
  }
}
