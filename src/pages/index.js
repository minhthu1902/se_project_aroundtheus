import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import "./index.css";
import UserInfo from "../components/userInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  initialCards,
  cardsListEl,
  options,
  profileTitleInput,
  profileDescriptionInput,
  profileEditButton,
  addNewCardButton,
} from "../utils/constants.js";

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
// PROFILE EDIT BUTTON
const profileEditModal = document.querySelector("#profile-edit-modal");

const profileCloseModal = profileEditModal.querySelector(".modal__close");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");

const profileEditForm = profileEditModal.querySelector(".modal__form");

// Profile add card button
// const addCardModal = document.querySelector("#add-card-modal");
const addCardEditForm = document.querySelector("#add-card-form");
// const cardTitleInput = addCardEditForm.querySelector("#card-title-input");
// const cardUrlInput = addCardEditForm.querySelector("#card-url-input");
const addCardModalCloseButton = document.querySelector(".modal__close");
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

// function handleImageClick() {
//   // previewImageModal.open(title, link);
//   previewImage.src = this._link;
//   previewImage.alt = this._name;
//   previewImageTitle.textContent = this._name;
//   openPopUp(previewImageModal);
// }
//-----Close profile modal----//

function handleProfileEditSubmit(formData) {
  console.log(formData);
  userInfo.setUserInfo(formData.title, formData.description);
  editProfileModal.close();
  // e.preventDefault();
  // profileTitle.textContent = profileTitleInput.value;
  // profileDescription.textContent = profileDescriptionInput.value;
  // closePopUp(profileEditModal);
}
// Close add card modal
function handleAddCardFormSubmit(formData) {
  const card = createCard(formData);
  cardsListEl.prepend(card);
  addCardEditForm.reset();
  addCardModal.close();
  addCardFormValidator.toggleButtonState();
}

/* -------------------------------------------------------------------------- */
/* Event Listeners */
/* -------------------------------------------------------------------------- */

//Handle profile edit popup
profileEditButton.addEventListener("click", () => {
  const userInfo = profileUserInfo.getUserInfo();
  profileEditModalFormValidator.resetValidation();
  editProfileModal.setInputValues(userInfo);
  editProfileModal.open();
});

//close listeners
// profileCloseModal.addEventListener("click", () => {
//   closePopUp(profileEditModal);
// });
addCardModalCloseButton.addEventListener("click", () => {
  closePopUp(addCardModal);
});

// previewImageModalCloseButton.addEventListener("click", () => {
//   previewImageModal.close();
// });

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
  "#profile-edit-modal",
  ({ name, description }) => handleProfileEditSubmit(name, description)
);
editProfileModal.setEventListeners();

const addCardModal = new PopupWithForm("#add-card-modal", ({ title, link }) => {
  handleAddCardFormSubmit(title, link);
});
addCardModal.setEventListeners();

const profileUserInfo = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
});

const createCard = (cardData) => {
  const newCard = new Card(
    cardData,
    cardsListEl,
    previewImageModal,
    (title, link) => previewImageModal.open(title, link)
  );
  cardSection.addItem(newCard.getNewCard());
};

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".card__list"
);

const previewImageModal = new PopupWithImage({
  modalSelector: "#preview-image-modal",
});
previewImageModal.setEventListeners();
/* ----------------------- */
/*     Form Validation     */
/* ----------------------- */
const formValidators = {};
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, options);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(options);
//Initialization
profileEditModalFormValidator.enableValidation();
addCardFormValidator.enableValidation();
cardSection.renderItems(); // render InitialsCard
