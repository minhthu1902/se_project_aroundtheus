export default class Card {
  constructor({ name, link, _id, isLiked}, cardSelector, 
  handleImagePreview,
  handleDeleteClick,
  handleLikeClick,
  ) {
    this._name = name;
    this._link = link;
    this._id = _id
     // getting id
    this._isLiked = isLiked;
    this._handleImagePreview = handleImagePreview;
    this._cardSelector = cardSelector;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

  updateLikes(isLiked){
    this._isLiked = isLiked;
    this._handleLikeIcon();
  }

  _handleLikeIcon() {
    this._handleLikeClick(this); //passing api function from index file
    this._likeButton.classList.toggle("card__like-button-active");
    
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
    return this._cardElement;
  }

  _renderCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      // this._handleLikeIcon();
      this._handleLikeClick();
    });
    // this._trashButton.addEventListener("click", () => {
    //   this.handleDeleteCard(); //this won't work because it's not a method of the Card class and delete the card before the confirmation modal is shown
    // });
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    }) 
    this._cardImage.addEventListener("click", () => {
      this._handleImagePreview({ name: this._name, link: this._link });
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
