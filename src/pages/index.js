import Card from "../components/Card";
import { FormValidator } from "../components/FormValidator.js";
import "./index.css";
import UserInfo from "../components/userInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import { initialCards, options } from "../utils/constants.js";

// const cardData = {
//   name: "Yosemite Valley",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
// };

// TEMPLATE
const cardsListEl = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
// PROFILE EDIT BUTTON
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseModal = profileEditModal.querySelector(".modal__close");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

// Profile add card button
// const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
// const addCardEditForm = addCardModal.querySelector(".modal__form");
// const cardTitleInput = addCardEditForm.querySelector("#card-title-input");
// const cardUrlInput = addCardEditForm.querySelector("#card-url-input");
// const addCardModalCloseButton = addCardModal.querySelector(".modal__close");

//Preview Image
// const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector("#preview-image");
const previewImageTitle = document.querySelector("#preview-title");
const previewImageModalCloseButton = document.querySelector(
  "#preview-modal-close-button"
);

// closing by clicking on overlay
const handleModalClick = (e) => {
  if (e.target.classList.contains("modal_opened")) {
    closePopUp(e.target);
  }
};

// form init
const editProfileForm = document.querySelector("#edit-profile-form");
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
// function closePopUp(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeByEscape);
//   modal.removeEventListener("mousedown", handleModalClick);
// }
// function openPopUp(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeByEscape);
//   modal.addEventListener("mousedown", handleModalClick);
// }

// function renderCard(cardData) {
//   const card = new Card(cardData, "#card-template", handleImageClick);

//   // return card.getNewCard();
//   cardsListEl.prepend(card.getNewCard());
//}
//Render content for each card
// initialCards.forEach((cardData) => {
//   const cardElement = renderCard(cardData);
//   cardsListEl.prepend(cardElement);
// });
// initialCards.forEach(renderCard);

function handleImageClick() {
  // previewImageModal.open(title, link);
  previewImage.src = this._link;
  previewImage.alt = this._name;
  previewImageTitle.textContent = this._name;
  openPopUp(previewImageModal);
}
//-----Close profile modal----//

function handleProfileEditSubmit(formData) {
  console.log(formData);
  profileUserInfo.setUserInfo(formData.title, formData.description);
  // e.preventDefault();
  // profileTitle.textContent = profileTitleInput.value;
  // profileDescription.textContent = profileDescriptionInput.value;
  // closePopUp(profileEditModal);
}
// Close add card modal
function handleAddCardFormSubmit(inputValues) {
  const cardData = { name: inputValues.title, link: inputValues.url };
  cardSection.addItem(cardData);
  addCardFormValidator.resetValidation();
  // e.preventDefault();
  // const name = cardTitleInput.value;
  // const link = cardUrlInput.value;
  // renderCard({ name, link });

  // addCardEditForm.reset();
  // closePopUp(addCardModal);
  // e.target.reset();
  // addCardFormValidator.disableButton();
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getNewCard();
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//Open edit modal
profileEditButton.addEventListener("click", () => {
  const userInfo = profileUserInfo.getUserInfo();
  profileEditModalFormValidator.resetValidation();
  editProfileModal.setInputValues(userInfo);
  editProfileModal.open();
});

//close listeners
profileCloseModal.addEventListener("click", () => {
  closePopUp(profileEditModal);
});
addCardModalCloseButton.addEventListener("click", () => {
  closePopUp(addCardModal);
});

previewImageModalCloseButton.addEventListener("click", () => {
  closePopUp(previewImageModal);
});

//Submit Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardEditForm.addEventListener("submit", handleAddCardFormSubmit);

//add card listeners
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardModal.open();
});

//objects

const addCardFormValidator = new FormValidator(addCardEditForm, options);
const profileEditModalFormValidator = new FormValidator(
  editProfileForm,
  options
);
const editProfileModal = new PopupWithForm(
  "#add-card-modal",
  handleProfileEditSubmit
);
const addCardModal = new PopupWithForm(
  "#profile-edit-modal",
  handleAddCardFormSubmit
);

const profileUserInfo = new UserInfo(
  ".profile__title",
  ".profile__description"
);

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);
export const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();
//Initialization
profileEditModalFormValidator.enableValidation();
addCardFormValidator.enableValidation();
cardSection.renderItems();
