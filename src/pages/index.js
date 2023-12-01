import Card from "../components/Card";
import { FormValidator } from "../components/FormValidator.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";

import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import { initialCards, options } from "../utils/constants.js";

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

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
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

// Profile add card button
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardEditForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardEditForm.querySelector("#card-title-input");
const cardUrlInput = addCardEditForm.querySelector("#card-url-input");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");

//Preview Image
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewImageTitle = previewImageModal.querySelector(
  ".modal__preview-title"
);
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
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  modal.removeEventListener("mousedown", handleModalClick);
}
function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
  modal.addEventListener("mousedown", handleModalClick);
}
//close by pressing Esc
function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopUp(openedModal);
  }
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);

  // return card.getNewCard();
  cardsListEl.prepend(card.getNewCard());
}
//Render content for each card
// initialCards.forEach((cardData) => {
//   const cardElement = renderCard(cardData);
//   cardsListEl.prepend(cardElement);
// });
initialCards.forEach(renderCard);

function handleImageClick() {
  previewImage.src = this._link;
  previewImage.alt = this._name;
  previewImageTitle.textContent = this._name;
  openPopUp(previewImageModal);
}
//-----Close profile modal----//

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}
// Close add card modal
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });

  addCardEditForm.reset();
  closePopUp(addCardModal);
  e.target.reset();
  addCardFormValidator.disableButton();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//Open edit modal
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
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
  openPopUp(addCardModal);
});

const addCardFormValidator = new FormValidator(addCardEditForm, options);
addCardFormValidator.enableValidation();

const profileEditModalFormValidator = new FormValidator(
  editProfileForm,
  options
);

profileEditModalFormValidator.enableValidation();
