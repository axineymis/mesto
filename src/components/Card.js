
class Card {
  constructor(data, selector, handleCardClick, userInfo, handleDeleteBtnClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._selector = selector;
    this._likes = data.likes || [];
    this._id = data._id;
    this._isLiked = data.likes.some((like) => userInfo._userId === like._id);
    this._handleLikeClick = handleLikeClick;  
    this._deletable = data.owner && data.owner._id === userInfo._userId;  
    this._element = document
        .querySelector(this._selector)
        .content
        .querySelector('.element')
        .cloneNode(true);
      
  } 

  generateCard() {
    this._delBtn = this._element.querySelector(".element__delete-btn");
    this._cardLikeBtn = this._element.querySelector(".element__like-button");
    this._elemPhoto = this._element.querySelector('.element__photo');
    this._elemPhoto.src = this._link;
    this._elemPhoto.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector(".element__like_counter").textContent = this._likes.length;
    this.showDeleteBtn();
    this._setEventListeners();
      if(this._isLiked) {
        this._cardLikeBtn.classList.add("element__like-button_active");
      }
      return this._element;
  }

  getId() {
    return this._id;
  }

  showDeleteBtn() {
    if (!this._deletable) {
      this._delBtn.style.display = 'none';
    }
  }

  isLiked(){
    return this._isLiked;
  }

  _setEventListeners() {
    this._elemPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._elemLikeBtn = this._element.querySelector(".element__like-button");
    this._elemLikeBtn.addEventListener('click', this._handleLike);
    this._delBtn.addEventListener('click', () => { this._handleDeleteBtnClick(this) });
    this._cardLikeBtn.addEventListener('click', () => { this._handleLikeClick(this)});
  }

  deleteCard = () => {
    this._element.remove();
  }

  //  функция изменения вида лайка
  changeLikeBtnColor(){
    if(this._isLiked){
      this._cardLikeBtn.classList.remove("element__like-button_active");
    }else{
      this._cardLikeBtn.classList.add("element__like-button_active");
    }
  }

  likeAmount = (response) => {
    this.changeLikeBtnColor();
    this._isLiked = !this._isLiked;
    this._likes = response.likes;
    this._element.querySelector(".element__like_counter").textContent = response.likes.length;
  }    
}
export default Card;