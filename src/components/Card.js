export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // _handleLikeIcon() {
  //   this._likeButton.addEventListener("click", () =>
  //     this._likeButton.classList.toggle("card__like-button_active")
  //   );
  // }
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    // this._cardElement = null;
  }

  _renderCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    // card delete button
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }
  getNewCard() {
    // const cardData = { name: this._name, link: this._link };
    this._cardElement = this._getTemplate();
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardImage.addEventListener("click", this._handleImageClick);
    this._trashButton = this._cardElement.querySelector(".card__delete-button");
    this._renderCard();
    this._cardTitle.textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  }
}
