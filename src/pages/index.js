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
import userInfo from "../components/userInfo.js";

// function handleImageClick() {
//   // previewImageModal.open(title, link);
//   previewImage.src = this._link;
//   previewImage.alt = this._name;
//   previewImageTitle.textContent = this._name;
//   openPopUp(previewImageModal);
// }

//Handle profile edit
const profileUserInfo = new userInfo({
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
});

// profileEditButton.addEventListener("click", () => {
//   const userInfo = profileUserInfo.getUserInfo();
//   profileEditModalFormValidator.resetValidation();
//   editProfileModal._getInputValues(userInfo);
//   editProfileModal.open();
// });
profileEditButton.addEventListener("click", () => {
  const { userName, userDescription } = profileUserInfo.getUserInfo();
  profileTitleInput.value = userName;
  profileDescriptionInput.value = userDescription;
  profileEditModalFormValidator.resetValidation();
  editProfileModal._getInputValues(userInfo);
  editProfileModal.open();
});

function handleProfileEditSubmit(formData) {
  console.log(formData);
  profileUserInfo.setUserInfo(formData.name, formData.description);
  editProfileModal.close();
  profileEditModalFormValidator.open();
}
const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  ({ name, link }) => {
    handleProfileEditSubmit(name, link);
  }
);

// Close add card modal
function handleAddCardFormSubmit(formData) {
  const cards = createCard({ name: formData.name, link: formData.url });
  cardTemplate.prepend(cards);
  addCardEditForm.reset();
  addCardModal.close();
  addCardFormValidator.toggleButtonState();
}

function handleImagePreview(name, link) {
  previewImageModal.open(name, link);
}
const createCard = (cardData) => {
  const newCard = new Card( //call out Card class with corresponding argument in constructor
    // luu y: thu tu cua argument phai trung voi thu tu o Card class ben card.js
    cardData,
    "#card-template", // khop voi cardSelector ben Card class
    handleImagePreview,
    (name, link) => previewImageModal.open(name, link)
  );
  cardSection.addItem(newCard.getNewCard());
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
const profileEditModalFormValidator = new FormValidator(
  editProfileForm,
  options
);

const addCardModal = new PopupWithForm("#add-card-modal", ({ name, link }) => {
  handleAddCardFormSubmit(name, link);
});
addCardModal.setEventListeners();

addCardModalCloseButton.addEventListener("click", () => {
  addCardModal.close();
});

//Submit Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardEditForm.addEventListener("submit", handleAddCardFormSubmit);

// Image preview
const previewImageModal = new PopupWithImage({
  modalSelector: "#preview-image-modal",
});
previewImageModal.setEventListeners();

previewImageModalCloseButton.addEventListener("click", () => {
  previewImageModal.close();
});
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
