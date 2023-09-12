const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Element */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Functions
function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
}

function openPopUp() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTextEl = cardElement.querySelector(".card__text");
  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);
  cardTextEl.textContent = cardData.name;
  return cardElement;
}
// Event handler
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp();
}

// Eventlistener

profileEditButton.addEventListener("click", openPopUp);

profileCloseModal.addEventListener("click", closePopUp);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

/*
// find the form in the DOM
const profileFormElement = // Use the querySelector() method

// find the form fields in the DOM
const nameInput = // Use querySelector()
const jobInput = // Use querySelector()

// find the profile elements in the DOM
const profileName = // Use querySelector()
const profileJob = // Use querySelector()

// the form submission handler. Note that its name 
// starts with a verb and concisely describes what it does
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
 
  // get the values of each field from the value property 
  // of the corresponding input element

  // insert new values into the textContent property of the 
  // corresponding profile elements
}

// connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit); */
