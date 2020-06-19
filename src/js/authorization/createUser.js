import { RSSCHOOL_API_URL } from './variables';

const REGISTRATION_EMAIL = document.querySelector('#registration-email');
const REGISTRATION_EMAIL_ERROR = document.querySelector('#email-error');
const REGISTRATION_PASSWORD_ERROR = document.querySelector('#password-error');
const REGISTRATION_PASSWORD = document.querySelector('#registration-password');
const REGISTRATION_BUTTON = document.querySelector('#registration__button');

const VALIDATE_EMAIL = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
const VALIDATE_PASSWORD = new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%&? "]).*$');

async function createUser(user) {
  const response = await fetch(`${RSSCHOOL_API_URL}users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.status === 417) {
    REGISTRATION_EMAIL_ERROR.textContent = 'This email is already registered';
  } else if (response.status === 200) {
    REGISTRATION_EMAIL.value = '';
    REGISTRATION_PASSWORD.value = '';

    const data = await response.json();
    window.console.log(data);
  } else {
    window.console.warn(response.statusText);
  }
}

REGISTRATION_BUTTON.addEventListener('click', (event) => {
  event.preventDefault();

  const newUser = {
    email: REGISTRATION_EMAIL.value,
    password: REGISTRATION_PASSWORD.value,
  };

  if (REGISTRATION_EMAIL.value.length === 0) {
    REGISTRATION_EMAIL_ERROR.textContent = 'Введите email';
  } else if (!REGISTRATION_EMAIL.value.match(VALIDATE_EMAIL)) {
    REGISTRATION_EMAIL_ERROR.textContent = 'Некорректный email';
  } else {
    REGISTRATION_EMAIL_ERROR.textContent = '';
  }

  if (REGISTRATION_PASSWORD.value.length === 0) {
    REGISTRATION_PASSWORD_ERROR.textContent = 'Введите пароль';
  } else if (!REGISTRATION_PASSWORD.value.match(VALIDATE_PASSWORD)) {
    REGISTRATION_PASSWORD_ERROR.textContent = 'Пароль должен содержать не менее 8 символов, как минимум одну прописную букву, одну заглавную букву, одну цифру и один спецсимвол';
  } else {
    REGISTRATION_PASSWORD_ERROR.textContent = '';
  }

  createUser(newUser);
});
