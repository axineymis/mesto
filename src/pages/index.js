import "./index.css";

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../components/data.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js"; 
import Api from "../components/Api.js";

const popupProfile = document.querySelector(".popup_type_edit");
const profileForm = document.querySelector('.popup__content-form')
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const textInput = popupProfile.querySelector('.popup__input_type_text');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add');
 
const popupAdd = document.querySelector(".popup_type_add");
const formImg = popupAdd.querySelector('.popup__content-form');

const config = {
  formSelector: '.popup__content-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'error_visible'
};

const contentFormValidation = new FormValidator(config, formImg);
const profileFormValidation = new FormValidator(config, profileForm);
const popupWithImage = new PopupWithImage('.popup_type_img');



const userInfo = new UserInfo({ 
  nameSelector: '.profile__name', 
  userInfoSelector: '.profile__text',
  avatarSelector: '.profile__avatar'
});

const popupProfileClass = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: ({ name, about, avatar }) => {
    userInfo.setUserInfo({ name, about, avatar });
    api.patchUserInfo({ name, about });
    popupProfileClass.close();
  }
});

const popupPlaceClass = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: ({ title, img }) => {
    api.addCards({ name:title, link: img })
      .then(card => {
        const newCard = createCard(card);
        cardsList.prependItem(newCard);
        popupPlaceClass.close();
      })
      .catch(err => console.log('Ошибка при добавлении карточки: ${err}'))
  }
});

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardsList.addItem(card);
  },
},
".elements");
// cardsList.renderItems();

const api = new Api ({
  address:'https://mesto.nomoreparties.co/v1/cohort-35/',
  token: '8bcdd003-6ade-478d-94ee-ebb5cd09f115'
})



function showPopupAdd() {
  popupPlaceClass.open();

  contentFormValidation.removeInputError();
  contentFormValidation._toggleButtonError();
}

function showProfilePopup() {
  
  const userEdit = userInfo.getUserInfo();
  nameInput.value = userEdit.name;
  textInput.value = userEdit.about;

  profileFormValidation.removeInputError();
  popupProfileClass.open(); 
}



buttonEdit.addEventListener('click', showProfilePopup);
buttonAdd.addEventListener('click', showPopupAdd);


function createCard(data) {
  const card = new Card(data, '#templateCard', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}

  contentFormValidation.enableValidation();
  profileFormValidation.enableValidation();

  popupProfileClass.setEventListeners();
  popupPlaceClass.setEventListeners();
  popupWithImage.setEventListeners();


  Promise.all([api.getUserInfo(), api.getCards()])
  .then(([newUserData, cards]) => {
    userInfo.setUserInfo(newUserData);
    cardsList.renderItems(cards);
  })
  .catch((err) =>
    console.log(`${err}`)
  );


  // api.getCards()
  // .then(cards => {
  //   cardsList.renderItems(cards);
  // })
  // .catch(err => console.log(err));

  // api.getUserInfo()
  // .then(newUserData => {
  //   userInfo.setUserInfo({ newUserData });
  // })
  // .catch(err => console.log(err));