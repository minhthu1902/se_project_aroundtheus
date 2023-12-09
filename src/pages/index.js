import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import UserInfo from "../components/userInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  initialCards,
  cardData,
  cardsListEl,
  profileEditButton,
  profileEditForm,
  addNewCardButton,
  addCardEditForm,
  addCardModalCloseButton,
  editProfileForm,
  previewImageModalCloseButton,
  options,
  cardTemplate,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";

/* ----------------------- */
/*     Profile Edit        */
/* ----------------------- */
const profileEditModalFormValidator = new FormValidator(
  editProfileForm,
  options
);
const profileUserInfo = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
});

profileEditButton.addEventListener("click", () => {
  profileUserInfo.getUserInfo({
    userName: profileTitleInput.value,
    userDescription: profileDescriptionInput.value,
  });
  profileEditModalFormValidator.resetValidation();
  editProfileModal.open();
});

function handleProfileEditSubmit(formData) {
  console.log(formData);
  profileUserInfo.setUserInfo(formData.name, formData.description);
  editProfileModal.close();
  profileEditModalFormValidator.toggleButtonState();
}

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

/* ----------------------- */
/*     ADD CARD            */
/* ----------------------- */

function handleAddCardFormSubmit(formData) {
  const cards = getCard({ name: formData.name, link: formData.url });
  cardSection.addItem(cards);
  addCardModal.close();
  // addCardEditForm.reset();
  // addCardFormValidator.toggleButtonState();
}

function getCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImagePreview); //call out Card class with corresponding argument in Card class constructor
  return cardElement.getNewCard();
}

const createCard = (item) => {
  const newCard = getCard(item);
  cardSection.addItem(newCard);
};

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardModal.open();
});

const addCardFormValidator = new FormValidator(addCardEditForm, options);

const addCardModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

/* ----------------------- */
/*     Image Preview      */
/* ----------------------*/

const previewImageModal = new PopupWithImage({
  modalSelector: "#preview-image-modal",
});
previewImageModal.setEventListeners();

function handleImagePreview(cardData) {
  previewImageModal.open(cardData.name, cardData.link);
} // it needs name and link to display image on preview

previewImageModalCloseButton.addEventListener("click", () => {
  previewImageModal.close();
});

/* ----------------------- */
/*     Form Validation     */
/* ----------------------- */
// const formValidators = {};

// const enableValidation = (options) => {
//   const formList = Array.from(document.querySelectorAll(options.formSelector));
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(formElement, options);
//     const formName = formElement.getAttribute("name");
//     formValidators[formName] = validator;
//     validator.enableValidation();
//   });
// };
// enableValidation(options);

//Initialization
profileEditModalFormValidator.enableValidation();
addCardFormValidator.enableValidation();
cardSection.renderItems();
