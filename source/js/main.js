const mainWrapperElement = document.querySelector('.wrapper');
const navToggleElement = document.querySelector('.header__toggle');
const nameInputElement = document.querySelector('.name-input');
const phoneInputElement = document.querySelector('.phone-input');
const emailInputElement = document.querySelector('.email-input');
const formSubmitElement = document.querySelector('.booking__button');
const checkboxElement = document.querySelector('.booking__checkbox');
const labelElement = document.querySelector('.booking__label');

mainWrapperElement.classList.remove('wrapper--nojs');

navToggleElement.addEventListener('click', function () {
  if (mainWrapperElement.classList.contains('wrapper--menu-closed')) {
    mainWrapperElement.classList.remove('wrapper--menu-closed');
    mainWrapperElement.classList.add('wrapper--menu-opened');
  } else {
    mainWrapperElement.classList.add('wrapper--menu-closed');
    mainWrapperElement.classList.remove('wrapper--menu-opened');
  }
});

const nameInputRe = /[A-Za-zA-Яа-яЁё\s]$/;
const phoneInputRe = /[0-9]$/;
const emailInputRe = /\S+@\S+\.\S+/;

const validateInput = (element, re, text) => {
  element.addEventListener('input', () => {
    const nameInputArray = element.value.split(' ');

    if (element.value.endsWith(' ')) {
      nameInputArray.pop();
    }

    const booleanNameInputArray = nameInputArray.map((nameValidity) =>
      re.test(nameValidity)
    );

    nameInputArray.forEach((word) => {

      if (!re.test(word) || booleanNameInputArray.includes(false)) {
        element.setCustomValidity(text);
      } else {
        element.setCustomValidity('');
      }
      element.reportValidity();
    });
  });
};

labelElement.addEventListener('click', function () {
  if (!checkboxElement.classList.contains('booking__label--checked')) {
    checkboxElement.classList.add('booking__label--checked');
    formSubmitElement.setAttribute('disabled', 'disabled');
  } else {
    checkboxElement.classList.remove('booking__label--checked');
    formSubmitElement.removeAttribute('disabled');
  }
});

validateInput(nameInputElement, nameInputRe, 'Здесь могут быть только буквы');
validateInput(phoneInputElement, phoneInputRe, 'Здесь могут быть только цифры');
validateInput(emailInputElement, emailInputRe, 'Впишите пожалуйста электронный адрес корректно');
