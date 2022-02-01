
class Card {
    constructor(data, selector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
    } 

    _getTemplate() {
        const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elemPhoto = this._element.querySelector('.element__photo');
        this._elemPhoto.src = this._link;
        this._elemPhoto.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }

      _setEventListeners() {
        this._elemPhoto.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link);
        });
        this._elemDeleteBtn = this._element.querySelector(".element__delete-btn");
        this._elemDeleteBtn.addEventListener('click', this._handleDelete);
        this._elemLikeBtn = this._element.querySelector(".element__like-button");
        this._elemLikeBtn.addEventListener('click', this._handleLike);
      }

      _handleDelete = () => {
        this._element.remove();
      }

      _handleLike = () => {
        this._elemLikeBtn.classList.toggle("element__like-button_active");
      }
}
export default Card;