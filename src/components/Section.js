export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //item that wants to convert to html
    this._renderer = renderer; //take data and convert to html
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }
  // addItem(data, placement = "prepend") {
  //   const element = this.renderer(data);
  //   if (place === "append") {
  //     this.container.append(element);
  //   } else if (placement === "prepend") {
  //     this._container.prepend(element);
  //   }
  // }
  addItem(element) {
    this._container.prepend(element);
  }
}
