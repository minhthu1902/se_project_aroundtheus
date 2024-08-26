import Api from "../components/Api.js";
import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import userInfo from "../components/userInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  authorizationCode,
  avatarPictureButton,
  avatarEditForm,
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


/*-----------------*/
/*       Api      */
/*---------------*/
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: authorizationCode,
  },
});

api.getProfile().then((data) => {
  console.log('Profile Data:', data);
profileUserInfo.setUserInfo(data.name, data.about);
profileUserInfo.setUserAvatar(data.avatar);
}).catch(err => {
  console.error(err);
});

api.getInitialCards().then((cards) => {
  console.log(cards);
  cardSection.renderItems(cards);
  })
  .catch((err) => {console.error("Error fetching cards:", err);
});

api.getProfile().then((data) => {
  console.log('Profile data fetched:', data);
  profileUserInfo.setUserInfo(data.name, data.about);
  profileUserInfo.setUserAvatar(data.avatar);
})
.catch((err) => console.error('Error fetching profile:', err));

//pop up with form
const profileUserInfo = new userInfo({
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
  profileAvatarSelector: ".profile__image"
});

const addCardModal = new PopupWithForm( "#add-card-modal", handleAddCardFormSubmit);
addCardModal.setEventListeners();

const editProfileModal = new PopupWithForm("#profile-edit-modal", handleProfileEditSubmit);
editProfileModal.setEventListeners();

const createCard = (item) => {
  const newCard = getCard(item);
  cardSection.addItem(newCard);
};

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

const editAvatarPopup = new PopupWithForm("#avatar-modal", handleAvatarSubmit);
editAvatarPopup.setEventListeners();

const previewImageModal = new PopupWithImage({
  modalSelector:"#preview-image-modal",});
previewImageModal.setEventListeners();

const deleteAvatarPopup = new PopupWithConfirmation("#avatar-modal");
deleteAvatarPopup.setEventListeners();

/* ------------------- */
/*     Validation     */
/* ----------------- */

const addCardFormValidator = new FormValidator(addCardEditForm, options);

const avatarFormValidator = new FormValidator(avatarEditForm, options);

const profileEditModalFormValidator = new FormValidator( editProfileForm, options); 

//Initialization
profileEditModalFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/* ----------------------- */
/*     Add event listener  */
/* ----------------------- */

profileEditButton.addEventListener("click", () => {
  const user = profileUserInfo.getUserInfo();
  profileEditModalFormValidator.resetValidation();
  profileTitleInput.value = user.profileTitle;
  profileDescriptionInput.value = user.profileDescription;
  editProfileModal.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardModal.open();
});

avatarPictureButton.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarFormValidator.toggleButtonState();
});
/* ----------------------- */
/*     function            */
/* ----------------------- */


function handleProfileEditSubmit({name, description}) {
  editProfileModal.setLoading(true, "Saving...");
  api.patchProfile({name,description}).then((userData) => {
    console.log(userData);
    userInfo.setUserInfo(userData);
    editProfileModal.close();
  }).catch((err)=> {
    console.error(err);
  }).finally(() =>{ editProfileModal.setLoading(false);
  });
}
function handleAddCardFormSubmit({formData}) {
  const card = getCard({ name: formData.name, link: formData.url });
  cardSection.addItem(card);
  addCardModal.close();

}

function getCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImagePreview); //call out Card class with corresponding argument in Card class constructor
  return cardElement.getNewCard();
}

function handleAvatarSubmit({avatar}){
  console.log(avatar);
  editAvatarPopup.setLoading(true, "Saving...");
  api.patchProfileAvatar(avatar)
  .then((data) => {
    userInfo.setUserAvatar(data.avatar);
    editAvatarPopup.close();
    FormValidator["edit-avatar-form"].toggleButtonState();
  }).catch((err)=> {
    console.error(err);
  })
  .finally(()=>{
    editAvatarPopup.setLoading(false);
  });
};

function handleImagePreview(cardData) {
  previewImageModal.open(cardData.name, cardData.link);
} // it needs name and link to display image on preview





