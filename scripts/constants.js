export const API_URL = 'https://jsonplaceholder.typicode.com';
export const POST_POSTS = 'posts';

export const REGISTRATION_FORM = document.forms.registration;
export const REGISTRATION_FORM_BUTTON = REGISTRATION_FORM.querySelector('button[type="submit"]');

export const FIRSTNAME_PATTERN = /^.{2,25}$/;
export const LASTNAME_PATTERN = /^.{2,25}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$/;

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
export const LOCAL_TIME_OFFSET = new Date().getTimezoneOffset() * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;