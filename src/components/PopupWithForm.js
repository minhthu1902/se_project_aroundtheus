import { SaveButtons } from "../utils/constants.js";

import Popup from "./Popup.js";

import { UserInfo } from "./userInfo.js";

export class PopupWithForm extends Popup {
  constructor(
    { popupSelector, handleFormSubmit } //where you set up method
  ) {
    super({ popupSelector }); //add-card-modal

    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelectorAll(".modal_form");
    this._saveButtons = saveButtons;
  }

  open() {
    super.open();
  }
  close() {
    console.log(this._popupForm);
    super.close();
  }

  _getInputValue() {
    const inputInfos = this._popupForm.querySelectorAll(".modal__input");

    inputInfos.forEach((input) => {
      info[input.name] = input.value;

      return info;
    });
  }
  setEventListeners() {
    this._saveButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValue());
        this.close();
      });
    });
  }
}
