export default class Section {
  constructor({ item, renderer }, containerSelector) {
    this._item = item; //item that wants to convert to html
    this._renderer = renderer; //take data and convert to html
    this._container = document.querySelector(containerSelector);
  }

  renderItems(item) {
    item.forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element); // handle rendering of the cards
  }
}
