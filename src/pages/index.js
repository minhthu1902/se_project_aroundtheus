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
  options,
  cardTemplate,
} from "../utils/constants.js";

// closing by clicking on overlay
const handleModalClick = (e) => {
  if (e.target.classList.contains("modal_opened")) {
    closePopUp(e.target);
  }
};

// form init

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
  UserInfo.setUserInfo(formData.title, formData.description);
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
  editProfileModal._getInputValues(userInfo);
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
  ({ title, description }) => handleProfileEditSubmit(title, description)
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
  const newCard = new Card( //call out Card class with corresponding
    // argument in constructor
    // luu y: thu tu cua argument phai trung voi thu tu o Card class
    // ben card.js
    cardData,
    "#card-template", // khop voi cardSelector ben Card class
    previewImageModal,
    (name, link) => previewImageModal.open(name, link)
  );
  cardSection.addItem(newCard.getNewCard());
};

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
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
