import PopupWithForm from "../components/PopupWithForm.js";
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    alt: "Yosemite Valley",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    alt: "Lake Louise",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    alt: "Bald Mountains",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    alt: "Latemar",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    alt: "Vanoise National Park",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    alt: "Lago di Braies",
  },
];

export const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

//templates and button
export const cardsListEl = document.querySelector(".cards__list");
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const addNewCardButton = document.querySelector(".profile__add-button");
//inputs
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileCloseModal =
  profileEditModal.querySelector(".modal__close");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
export const profileEditForm = profileEditModal.querySelector(".modal__form");
// Profile add card button
// const addCardModal = document.querySelector("#add-card-modal");
export const addCardEditForm = document.querySelector("#add-card-form");
// const cardTitleInput = addCardEditForm.querySelector("#card-title-input");
// const cardUrlInput = addCardEditForm.querySelector("#card-url-input");
export const addCardModalCloseButton = document.querySelector(".modal__close");

//Preview Image
// const previewImageModal = document.querySelector("#preview-image-modal");
export const previewImage = document.querySelector("#preview-image");
export const previewImageTitle = document.querySelector("#preview-title");
export const previewImageModalCloseButton = document.querySelector(
  "#preview-modal-close-button"
);
export const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
//content.firstElementChild;
export const editProfileForm = document.querySelector("#edit-profile-form");

//avatar
export const avatarPictureButton = document.querySelector(".profile__edit-button");
export const avatarEditModal= document.querySelector("#avatar-modal");
export const avatarEditForm = avatarEditModal.querySelector("#avatar-modal-form");


//Validation options
export const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const authorizationCode = "a93eae64-e670-4bc7-86e7-6fe2158b62a7";

