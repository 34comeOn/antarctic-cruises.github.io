import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✔️

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)

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
  if (mainWrapperElement.classList.contains('wrapper--closed')) {
    mainWrapperElement.classList.remove('wrapper--closed');
    mainWrapperElement.classList.add('wrapper--opened');
  } else {
    mainWrapperElement.classList.add('wrapper--closed');
    mainWrapperElement.classList.remove('wrapper--opened');
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
  if (!checkboxElement.hasAttribute('checked')) {
    checkboxElement.setAttribute('checked', 'checked');
    if (formSubmitElement.hasAttribute('disabled')) {
      formSubmitElement.removeAttribute('disabled');
    }
  } else {
    checkboxElement.removeAttribute('checked');
    formSubmitElement.setAttribute('disabled', 'disabled');
  }
});

validateInput(nameInputElement, nameInputRe, 'Здесь могут быть только буквы');
validateInput(phoneInputElement, phoneInputRe, 'Здесь могут быть только цифры');
validateInput(emailInputElement, emailInputRe, 'Впишите пожалуйста электронный адрес корректно');
