export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    const cardImage = this._formElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name);
    });

    const likeButton = this._formElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    const trashButton = this._formElement.querySelector(".card__delete-button");
    trashButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
  }

  _handleLikeIcon() {
    const likeButton = this._formElement.querySelector(".card__like-button");
    likeButton.classList.toggle("card__like-button_active");
  }
  _handleDeleteCard() {
    this._formElement.remove();
    this._formElement = null;
  }

  getNewCard() {
    this._formElement = this._getTemplate();
    this._setEventListeners();

    const cardTitle = this._formElement.querySelector(".card__title");
    const cardImage = this._formElement.querySelector(".card__image");

    cardImage.setAttribute("src", this._link);
    cardImage.setAttribute("alt", this._name);
    cardTitle.textContent = this._name;

    return this._formElement;
  }
}
