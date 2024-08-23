import Api from "../components/Api.js";
import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  authorizationCode,
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: authorizationCode,
  },
});
const profileEditModalFormValidator = new FormValidator(
  editProfileForm,
  options
);
const profileUserInfo = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
  profileAvatarSelector: ".profile__image"
});
// fetch profile and set user info and avatar
api.getProfile().then((data) => {
  console.log('Profile data fetched:', data);
  profileUserInfo.setUserInfo(data.name, data.about);

  profileUserInfo.setUserAvatar(data.avatar);
})
.catch((err) => console.error('Error fetching profile:', err));



profileEditButton.addEventListener("click", () => {
  const user = profileUserInfo.getUserInfo();
  profileEditModalFormValidator.resetValidation();
  profileTitleInput.value = user.profileTitle;
  profileDescriptionInput.value = user.profileDescription;
  editProfileModal.open();
});

function handleProfileEditSubmit({name, description}) {
  editProfileModal.setLoading(true);
  api.patchProfile({name,description}).then((userData) => {
    console.log(userData);
    UserInfo.setUserInfo(userData);
    editProfileModal.close();
  }).catch((err)=> {
    console.error(err);
  }).finally(() =>{ editProfileModal.setLoading(false);

  });
}

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

/* ----------------------- */
/*     ADD CARD            */
/* ----------------------- */

function handleAddCardFormSubmit({formData}) {
  const card = getCard({ name: formData.name, link: formData.url });
  cardSection.addItem(card);
  addCardModal.close();
  
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
/*       Avatar           */
/* ----------------------*/

const handleAvatarSubmit = ({ userAvatar}) =>{
  console.log(userAvatar);
  editAvatarPopup.setLoading(true);
  api.updateAvatar(userAvatar)
  .then((data) => {
    UserInfo.setUserAvatar(data.userAvatar);
    editAvatarPopup.close();
    FormValidator["edit-avatar-form"].toggleButtonState();
  }).catch((err)=> {
    console.error(err);
  })
  .finally(()=>{
    editAvatarPopup.setLoading(false);
  });
};

const editAvatarPopup = new PopupWithForm("#edit-avatar-modal", handleAvatarSubmit);
editAvatarPopup.setEventListeners();


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



//Initialization
profileEditModalFormValidator.enableValidation();
addCardFormValidator.enableValidation();
cardSection.renderItems();

/*-----------------*/
/*       Api      */
/*---------------*/

api.getProfile().then(data => {
  console.log('Profile Data:', data);
  UserInfo.setUserInfo(data);
  UserInfo.setUserAvatar(data.userAvatar);
}).catch(err => {
  console.error(err);
});

api.getInitialCards().then(cards => {
  console.log('Cards Data:', cards);
  cardSection.renderItems(cards);
  })
  .catch((err) => {console.error("Error fetching cards:", err);
});
