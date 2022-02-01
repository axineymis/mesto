export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    
    open() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keyup', this._handleEscClose);
<<<<<<< HEAD
=======
        this.setEventListeners();
>>>>>>> d96c792ac94b7d01c63ba9701d35fcca2a8eebc9
    }

    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === "Escape" || event.key === "Esc") {
        this.close();
        }
    }

    setEventListeners() {
        this._overlay = this._popup.querySelector('.popup__overlay');
        this._overlay.addEventListener('click', () => {
        this.close();
        });
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._closeButton.addEventListener('click', () => {
        this.close();
        })
    }
  }