const initialCards = [
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
// console.log(initialCards);

// TEMPLATE
const cardsListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
// PROFILE EDIT BUTTON
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseModal = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

// Profile add card button
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardEditForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardEditForm.querySelector("#card-title-input");
const cardUrlInput = addCardEditForm.querySelector("#card-url-input");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");

//Preview Image
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewImageTitle = previewImageModal.querySelector(
  ".modal__preview-title"
);
const previewImageModalCloseButton = document.querySelector(
  "#preview-modal-close-button"
);

// closing by clicking on overlay
const handleModalClick = (e) => {
  if (e.target.classList.contains("modal_opened")) {
    closePopUp(e.target);
  }
};
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  modal.removeEventListener("mousedown", handleModalClick);
}
function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
  modal.addEventListener("mousedown", handleModalClick);
}
//close by pressing Esc
function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopUp(openedModal);
  }
}
// close by clicking overlay
// function closeModalOnRemoteClick(e) {
//   //target is element on which the event happened
//   //current target is modal, if they're the same we close modal
//   if (
//     e.target === e.currentTarget ||
//     e.target.classList.contains("modal__close")
//   ) {
//     closePopUp(e.target);
//   }
// }
// [profileEditModal, addCardModal, previewImageModal].forEach((modal) => {
//   modal.addEventListener("mousedown", (e) => {
//     if (
//       e.target.classList.contains("modal") ||
//       e.target.classList.contains("modal__close")
//     ) {
//       closeModal(modal);
//     }
//   });
// });
//get card
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  //like btn
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-active");
  });

  //card delete btn
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  //Image modal
  cardImage.addEventListener("click", function () {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageTitle.textContent = cardData.name;
    openPopUp(previewImageModal);
  });

  return cardElement;
}

function renderCard(cardData, cardsListEl) {
  const cardElement = getCardElement(cardData);
  cardsListEl.prepend(cardElement);
}

// Close profile modal

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}
// Close add card modal
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsListEl);

  addCardEditForm.reset();
  closePopUp(addCardModal);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
//Render content for each card
initialCards.forEach((cardData) => renderCard(cardData, cardsListEl));

//Open edit modal
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});

//close listeners
profileCloseModal.addEventListener("click", () => {
  closePopUp(profileEditModal);
});
addCardModalCloseButton.addEventListener("click", () => {
  closePopUp(addCardModal);
});

previewImageModalCloseButton.addEventListener("click", () => {
  closePopUp(previewImageModal);
});

//Submit Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardEditForm.addEventListener("submit", handleAddCardFormSubmit);

//add card listeners
addNewCardButton.addEventListener("click", () => {
  openPopUp(addCardModal);
});
