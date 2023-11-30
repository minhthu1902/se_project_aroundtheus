export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this._items = items;
    this.renderer = renderer;
    this._cardSelector = cardSelector;
    this.addItem = this.addItem;
  }

  renderItems() {
    this._items.forEach((data) => {
      this.addItem(data);
    });
  }
  addItem(data) {
    const element = this.renderer(data);
    this._cardSelector.prepend(element);
  }
}
