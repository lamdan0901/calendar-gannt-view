import { FORM_ERROR } from 'components/Form';
import { ERROR_MESSAGE } from './error-message';
export interface ErrorObject
  extends Record<string, { path: string[]; message: string }> {}

export const SERVER_ERROR_MAP: ErrorObject = {
  'Email already exist': {
    path: ['clientEmail', 'email'],
    message: ERROR_MESSAGE.EMAIL_ALREADY_TAKEN,
  },
  'email already exist.': {
    path: ['clientEmail', 'email'],
    message: ERROR_MESSAGE.EMAIL_ALREADY_TAKEN,
  },
  'At least one primary contact': {
    path: ['isPrimaryContact'],
    message: ERROR_MESSAGE.ONE_PRIMARY_CONTACT,
  },
  'Client email already exist': {
    path: ['clientEmail'],
    message: ERROR_MESSAGE.EMAIL_ALREADY_TAKEN,
  },
  'clientEmail already exist.': {
    path: ['clientEmail'],
    message: ERROR_MESSAGE.EMAIL_ALREADY_TAKEN,
  },
  'Business name already exist': {
    path: ['clientBusinessName'],
    message: 'This Client Business Name is taken. Please try another.',
  },
  'clientEmail must be an email': {
    path: ['clientEmail'],
    message: ERROR_MESSAGE.INVALID_EMAIL,
  },
  'Password incorrect': {
    path: ['currentPassword'],
    message: ERROR_MESSAGE.WRONG_CURRENT_PASSWORD,
  },
  'The newPassword must be between 8 and 64 characters': {
    path: ['newPassword', 'confirmPassword'],
    message: ERROR_MESSAGE.OUT_OF_RANGE_CONFIRM_PASSWORD,
  },
  'The newPassword include uppercase letters, lowercase letters, numbers, and special characters.':
    {
      path: ['newPassword', 'confirmPassword'],
      message: ERROR_MESSAGE.INVALID_PASSWORD,
    },
  'Password not match.': {
    path: ['confirmPassword'],
    message: ERROR_MESSAGE.NOT_MATCH_CONFIRM_PASSWORD,
  },
  'clientName already exist.': {
    path: ['clientName'],
    message: ERROR_MESSAGE.CLIENT_NAME_TAKEN,
  },
  'ProjectId already exist': {
    path: ['projectId'],
    message: ERROR_MESSAGE.PROJECT_ID_TAKEN,
  },
  'subDomain already exist.': {
    path: ['subDomain'],
    message: ERROR_MESSAGE.TAKEN_DOMAIN,
  },
  'Confirmation not found.': {
    path: ['email'],
    message: ERROR_MESSAGE.CONFIRMATION_NOT_FOUND,
  },
  'Account not found.': {
    path: ['email'],
    message: ERROR_MESSAGE.ACCOUNT_NOT_EXIST,
  },
  'Reset password link expired': {
    path: ['confirmPassword'],
    message: ERROR_MESSAGE.RESET_PASSWORD_EXPIRED,
  },
  'User already active': {
    path: ['email'],
    message: ERROR_MESSAGE.ALREADY_CONFIRMED,
  },
  'Unauthorized.': {
    path: [FORM_ERROR],
    message: ERROR_MESSAGE.WRONG_CREDENTIALS,
  },
  "Couldn't find your MetaBrief Account": {
    path: [FORM_ERROR],
    message: ERROR_MESSAGE.ACCOUNT_NOT_FOUND,
  },
  'User not found.': {
    path: [FORM_ERROR],
    message: ERROR_MESSAGE.ACCOUNT_NOT_EXIST,
  },
  'Request join client already exist': {
    path: ['FORM_ERROR'],
    message: ERROR_MESSAGE.ALREADY_REQUEST_JOIN,
  },
  'Client name already exist': {
    path: ['clientName'],
    message: ERROR_MESSAGE.CLIENT_NAME_TAKEN,
  },
  'subDomain already exist': {
    path: ['subDomain'],
    message: ERROR_MESSAGE.TAKEN_DOMAIN,
  },
  'name already exist.': {
    path: ['name'],
    message: ERROR_MESSAGE.TAKEN_ROLE,
  },
  'Role name already exist': {
    path: ['name'],
    message: ERROR_MESSAGE.TAKEN_ROLE,
  },
};
