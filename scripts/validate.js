// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const showError = (form, input, errorMessageText, errorMessageClass, inputErrorClass) => {
    const errorMessage = form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = errorMessageText;
    errorMessage.classList.add(errorMessageClass);
    input.classList.add(inputErrorClass);
}

const hideError = (form, input, errorMessageClass, inputErrorClass) => {
    const errorMessage = form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = '';
    errorMessage.classList.remove(errorMessageClass);
    input.classList.remove(inputErrorClass);
}

const hasInvalidInput = (inputs) => {
    
    return Array.from(inputs).some((el) => !el.validity.valid);
  }

  const toggleButtonError = (inputs, button, inactiveButtonClass) => {
    //   console.log(inputs);
      console.log(hasInvalidInput(inputs))
    if (hasInvalidInput(inputs)) {
        console.log(inactiveButtonClass)
      button.classList.add(inactiveButtonClass);
   
      button.disabled = true;
    } else {
       
      button.classList.remove(inactiveButtonClass)
      button.disabled = false;
    }
  }

const checkIfInputValid = (form, input, {inputErrorClass, errorClass}) => {
    if(!input.validity.valid) {
        showError(form, input, input.validationMessage, errorClass, inputErrorClass);
    } else {
        hideError(form, input, errorClass, inputErrorClass);
    }
}


const setInputListners = (form, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
    const inputs = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector);
    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkIfInputValid(form, input, rest);
            toggleButtonError(inputs, submitButton, inactiveButtonClass);
        });
    });
}

const enableValidation = ({formSelector, ...rest}) => {
    const forms = document.querySelectorAll(formSelector);
    console.log(forms);
    forms.forEach((form) => {
        console.log(form)
      form.addEventListener('submit', (event) => {
        event.preventDefault();
      });
  
      setInputListners(form, rest);
    })
  }

enableValidation({
    formSelector: '.popup__content-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'error_visible'
  });
  