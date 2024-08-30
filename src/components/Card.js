export default class Card {
  constructor({ name, link, _id, isLiked }, cardSelector, 
  handleImagePreview,
  handleDeleteClick,
  handleLikeClick,


  ) {
    this.name = name;
    this.link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._handleImagePreview = handleImagePreview;
    this._cardSelector = cardSelector;
    this._handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
  }

  getId(){
    return this._id;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  // _setCardLike(isLiked){
  //   this._isLiked = isLiked;
  //   this._handleLikeIcon();
  // }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button-active");
    
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
    return this._cardElement;
  }

  _renderCard() {
    this._cardTitle.textContent = this.name;
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    this._trashButton.addEventListener("click", () => {
      this.handleDeleteCard();
    });
    this._trashButton.addEventListener("click", () => {
      this._handleCardDeleteSubmit(this);
    }) 
    this._cardImage.addEventListener("click", () => {
      this._handleImagePreview({ name: this.name, link: this.link });
    });
  }

  getNewCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.dataset.id = this._id;
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._trashButton = this._cardElement.querySelector(".card__delete-button");
    this._renderCard();
    this._setEventListeners();

    return this._cardElement;
  }
}
