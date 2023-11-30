import { card } from "../utils/constants";
import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._photoElement = this._popupElement.querySelector(
      "modal__preview-image"
    );
    this._title = this._popupElement.querySelector("modal__preview-title");
  }

  open(data) {
    data = {
      link: this._photoElement.src,
      alt: this._photoElement.alt,
      title: this._title.textContent,
    };
    super.open();
  }
}
