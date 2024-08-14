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
  cardSelector,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";
import { data } from "autoprefixer";

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

function handleProfileEditSubmit(formData) {

  //project 9
  api.patchProfile(formData.name, formData.description).then((data) => {
    profileUserInfo.setUserInfo(data.name, data.about);
  // profileUserInfo.setUserInfo(formData.name, formData.description);
  editProfileModal.close();
  }).catch((err)=> console.error(err));
}

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

/* ----------------------- */
/*     ADD CARD            */
/* ----------------------- */

function handleAddCardFormSubmit(formData) {
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

/*---------------------------------------------------*/
/*                      Api                          */
/*---------------------------------------------------*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: authorizationCode,
  },
});
api.getProfile().then(data => {
  console.log('Profile Data:', data);
  profileUserInfo.setUserInfo(data.name, data.about);
}).catch(err => console.error('Error fetching profile:', err));

api.getCards().then(cards => {
  console.log('Cards Data:', cards);
  cards.forEach(cardItem => 
    {
      const aCard = new Card(cardItem, '#card-template', handleImageClick);
      document.querySelector('.cards__list').appendChild(aCard.getNewCard());
   });
  })
.catch(err => console.error("Error fetching cards:", err));
const handleImageClick = ({ name, link}) => {
  console.log('Image Click:', name, link);
};
// const profileApiObject = api.getProfile()
// profileApiObject.then((data) => {
//   UserInfo.setUserInfo(data.name, data.link);
//   avatarPopup.handleProfileEditSubmit(data.avatar)
// })

/*---------------------------------------------------*/
/*               Section Constructor                 */
/*---------------------------------------------------*/

const uniqueCards = getCard();

const section = new Section(
  { items: uniqueCards, renderer: createCard }, ".cards__list"
);
section.renderItems();