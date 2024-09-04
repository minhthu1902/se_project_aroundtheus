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
  deleteButtonSubmit,
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


api.getInitialCards().then((cards) => {
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

const createCard = (items) => {
  const newCard = getCard(items);
  cardSection.addItem(newCard);
};

const cardSection = new Section(
  { items: [], renderer: createCard },
  ".cards__list"
);

const editAvatarPopup = new PopupWithForm("#avatar-modal", handleAvatarSubmit);
editAvatarPopup.setEventListeners();

const previewImageModal = new PopupWithImage({
  modalSelector:"#preview-image-modal",});
previewImageModal.setEventListeners();

const deleteSubmitConfirmModal = new PopupWithConfirmation("#delete-modal", handleCardDeleteSubmit);
deleteSubmitConfirmModal.setEventListeners();


/* ------------------- */
/*     Validation     */
/* ----------------- */

const addCardFormValidator = new FormValidator(addCardEditForm, options);

const avatarFormValidator = new FormValidator(avatarEditForm, options);

const profileEditModalFormValidator = new FormValidator(editProfileForm, options); 

// const deleteButtonSubmitValidator = new FormValidator("#delete-modal-form",options);

//Initialization
profileEditModalFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
// deleteButtonSubmitValidator.enableValidation();

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


function handleProfileEditSubmit({name, description}) {//name and description have to match the name of profile edit form input name
  editProfileModal.setLoading(true, "Saving...");
  api.patchProfile(name, description).then((userData) => {
    console.log(userData);
    profileUserInfo.setUserInfo(userData.name, userData.about);
    editProfileModal.close();
  }).finally(() => { 
    editProfileModal.setLoading(false);
  })
  .catch((err)=> {
    console.error(err);
  })
}

function handleAddCardFormSubmit({name, url}) {
  addCardModal.setLoading(true,"Saving...");
  api.postCards(name, url).then((cardData) => {
    // console.log(cardData);
    const card = getCard(cardData);
    // addCardFormValidator.toggleButtonState();
    cardSection.addItem(card);
    addCardModal.close();

  }).finally(() => {
    addCardModal.setLoading(false);
  }).catch((err) => {
    console.error(err);
  })

}

// function getCard (cardData) {
//   const cardElement = new Card(cardData, "#card-template", handleImagePreview); //call out Card class with corresponding argument in Card class constructor
//   return cardElement.getNewCard();
// }

// const getCard = () => {
//   const cardElement = new Card({
//     handleDeleteClick: (cardElement ) => {
//       api.deleteCard(cardElement.getId()).then(() => {cardElement.deleteCard()}).catch((err)=> {
//         console.error(err);
//       })
//     }  
//   });
//   return cardElement.getNewCard();
// }
 
function getCard(items) {
  const cardElement = new Card(
    items,
    "#card-template",
    handleImagePreview,
    handleDeleteClick,
    handleCardDeleteSubmit,
  );

  return cardElement.getNewCard();
}
function handleDeleteClick(items){
  console.log(items);
  deleteSubmitConfirmModal.open(items);
}


// function handleLikeClick(items, isLiked, card, ) {

// }


function handleAvatarSubmit({ avatarUrl }){
  console.log(avatarUrl);
  editAvatarPopup.setLoading(true, "Saving...");
  api.patchProfileAvatar(avatarUrl)
  .then((data) => {
    profileUserInfo.setUserAvatar(data.avatar);
    editAvatarPopup.close();
  })
  .finally(()=>{
    editAvatarPopup.setLoading(false);
  }).catch((err)=> {
    console.error(err);
  })
}

function handleImagePreview(cardElement) {
  previewImageModal.open(cardElement.name, cardElement.link);
} // it needs name and link to display image on preview

//create a function that handle delete button modal
function handleCardDeleteSubmit(cardElement){
  deleteSubmitConfirmModal.open();
  deleteSubmitConfirmModal.setSubmit(()=> {
    deleteSubmitConfirmModal.setLoading(true, "Deleting...");
    api.deleteCard(cardElement._id).then(() => {
      console.log("Card deleted successfully");
      cardElement.handleDeleteCard();
      deleteSubmitConfirmModal.close();
    }). catch((err) => {
      console.error(err);
    }).finally(() => {
      deleteSubmitConfirmModal.setLoading(false, "Yes");
    });
  });
}

