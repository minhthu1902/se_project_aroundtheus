import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor({ modalSelector }) {
    super({ modalSelector });
    this._photoElement = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._title = this._popupElement.querySelector(".modal__preview-title");
  }

  open(name, link) {
    // add image to the popup and images corresponding to caption
    this._photoElement.src = link;
    this._photoElement.alt = name;
    this._title.textContent = name;
    super.open();
  }
}
