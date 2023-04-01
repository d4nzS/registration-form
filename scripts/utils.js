import {
  API_URL,
  EMAIL_PATTERN,
  FIRSTNAME_PATTERN,
  LASTNAME_PATTERN,
  LOCAL_TIME_OFFSET,
  PASSWORD_PATTERN,
  POST_POSTS,
  REGISTRATION_FORM,
  REGISTRATION_FORM_BUTTON,
  REGISTRATION_FORM_INPUTS_QUANTITY
} from './constants.js';

const createPatternValidator = pattern => value => pattern.test(value);

const firstnameValidator = createPatternValidator(FIRSTNAME_PATTERN);

const lastnameValidator = createPatternValidator(LASTNAME_PATTERN);

const birthdayValidator = () => +new Date(REGISTRATION_FORM.birthday.value) + LOCAL_TIME_OFFSET < Date.now();

const emailValidator = createPatternValidator(EMAIL_PATTERN);

const passwordValidator = createPatternValidator(PASSWORD_PATTERN);

const confirmPasswordValidator = () => REGISTRATION_FORM.password.value === REGISTRATION_FORM['confirm-password'].value;

const getValidator = inputEl => {
  switch (inputEl.name) {
    case 'firstname':
      return firstnameValidator;

    case 'lastname':
      return lastnameValidator;

    case 'birthday':
      return birthdayValidator;

    case 'email':
      return emailValidator;

    case 'password':
      return passwordValidator;

    case 'confirm-password':
      return confirmPasswordValidator;

    default:
      throw new Error('Input with this name is not declared.');
  }
};

const formValidator = () => Array.from(REGISTRATION_FORM.elements)
  .slice(0, REGISTRATION_FORM_INPUTS_QUANTITY)
  .every(inputEl => {
    const validator = getValidator(inputEl);

    return validator(inputEl.value);
  });

const toggleHintVisibilityHandler = (inputEl, isValid) => {
  const hintEl = inputEl.nextElementSibling;

  if (isValid) {
    inputEl.classList.remove('form__input_invalid');
    hintEl.classList.remove('form__hint_visible');
  } else {
    inputEl.classList.add('form__input_invalid');
    hintEl.classList.add('form__hint_visible');
  }
};

export const formInputHandler = event => {
  const inputEl = event.target;
  const validator = getValidator(inputEl);

  toggleHintVisibilityHandler(inputEl, validator(inputEl.value));
};

export const validateFormHandler = () => {
  REGISTRATION_FORM_BUTTON.disabled = !formValidator();
};

export const submitFormHandler = async event => {
  event.preventDefault();

  if (!formValidator()) {
    return;
  }

  const formData = new FormData(REGISTRATION_FORM);
  const data = Object.fromEntries(formData);

  try {
    await fetch(`${API_URL}/${POST_POSTS}`, {
      method: 'post',
      body: JSON.stringify(data)
    });

    console.log(data);
    alert('Вы успешно зарегистрировались!');

    REGISTRATION_FORM.reset();
    REGISTRATION_FORM_BUTTON.disabled = true;
  } catch {
    alert('Что-то пошло не так! Попробуйте снова через некоторое время.');
  }
};