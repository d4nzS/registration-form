import { REGISTRATION_FORM } from './constants.js';
import { formInputHandler, submitFormHandler, validateFormHandler } from './utils.js';

REGISTRATION_FORM.addEventListener('input', formInputHandler);
REGISTRATION_FORM.addEventListener('input', validateFormHandler);
REGISTRATION_FORM.addEventListener('submit', submitFormHandler);