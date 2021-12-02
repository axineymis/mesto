const formContent = document.querySelector('.popup');
let formElement = document.querySelector('.popup__content-form')
let nameInput = formContent.querySelector('.popup__input_type_name');
let textInput = formContent.querySelector('.popup__input_type_text');
const saveButton = formContent.querySelector('.popup__button');
const closeButton = formContent.querySelector('.popup__close-icon');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add');
 
const popupProfile = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupClose = document.querySelector(".popup_type_add");

let titleImput = formContent.querySelector('.popup__input_type_title');
let imgImput = formContent.querySelector('.popup__input_type_img');
let elementTitle = document.querySelector('.element__title');
let elementImg = document.querySelector('.element__photo');
const saveImgBtn = document.querySelector('.popup_add-button');
const cardElements = document.querySelector(".elements");
const templateEl = document.querySelector(".template__card");
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  function render() {
    const html = initialCards
      .map((item, idx, arr) => {
        return getItem(item);
      });
  
      cardElements.append(...html);
  }
  

function getItem(item) {
    const newItem = templateEl.content.cloneNode(true);
    const cardTitle = newItem.querySelector('.element__title');
    const cardPhoto = newItem.querySelector('.element__photo');
    const cardLikeBtn = newItem.querySelector('.element__like-button');
    const deleteBtn = newItem.querySelector('.element__delete-btn');
    cardTitle.textContent = item.name;
    cardPhoto.src = item.link;
    cardPhoto.alt = item.name;
    deleteBtn.addEventListener('click', handDelete);

    return newItem;
};

render();

function handDelete(evt) {
    const targetCard = evt.target;
    const listItem = targetCard.closest(".element");
    listItem.remove();
  }

function openPopupEdit() {
    nameInput.value = profileName.textContent;
    textInput.value = profileText.textContent;
    popupProfile.classList.add("popup_open")
}

function closePopupEdit() {
    popupProfile.classList.remove("popup_open")
}

editButton.addEventListener('click', openPopupEdit);
closeButton.addEventListener('click', closePopupEdit);
formElement.addEventListener('submit', formSubmitHandler);

function openPopupAdd() {
    popupAdd.classList.add("popup_open")
}

function closePopupAdd() {
    popupAdd.classList.remove("popup_open")
}

addButton.addEventListener('click', openPopupAdd);
popupClose.addEventListener('click', closePopupAdd);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value
    profileText.textContent = textInput.value
    closePopupEdit();
}



