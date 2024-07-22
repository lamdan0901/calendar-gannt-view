import { MAX_BUGDET } from './project';

export const ERROR_MESSAGE = {
  REQUIRED: 'This is a required field.',
  INVALID_EMAIL: 'Email address is not in the correct format.',
  INVALID_FILE_TYPE: 'Your file is not in the correct format.',
  UPLOAD_FAILDED: 'Upload failed.',
  WRONG_CREDENTIALS: 'The Email or Password is Incorrect.',
  WRONG_CURRENT_PASSWORD: 'The current password is incorrect.',
  OUT_OF_RANGE_CONFIRM_PASSWORD:
    'The new password must be between 8 and 64 characters.',
  INVALID_PASSWORD:
    'You need at least a capital letter, a number and a special character.',
  NOT_MATCH_CONFIRM_PASSWORD: 'The password confirmation does not match.',
  TOO_SMALL_STRING: (value: number) => `You need at least ${value} characters.`,
  TOO_BIG_STRING: (value: number) => `You have exceeded ${value} characters.`,
  TOO_BIG_DIGIT: (value: number) => `You have exceeded ${value} digits.`,
  TOO_BIG_FILE_SIZE: (value: number) =>
    `Maximum size for upload is ${value / 1024 / 1024} MB.`,
  ONLY_TEXT: 'Only text is allowed.',
  ONLY_TEXT_NUMBER: 'Only text and number allowed.',
  ONLY_TEXT_NUMBER_DASH_UNDERSCORE:
    'Only text, number, dash and underscore allowed.',
  NOT_ALLOW_2_CONSECUTIVE_CAPPITAL: (field?: string) =>
    field
      ? `${field} should not include more than 2 consecutive capital letter.`
      : 'It is not allowed to enter 2 adjacent space characters.',
  ONLY_NUMBER: 'Only number is allowed.',
  ONE_PRIMARY_CONTACT: 'You need at least 1 Primary contact.',

  AT_LEAST_ONE_TYPE: (type: string) => `You need at least 1 ${type}.`,
  UNIQUE_FIELD: (field: string) => `${field} must be unique.`,
  ALREADY_IN_CONTACT:
    'This Email address is already in the contact list. Please try another.',
  USER_EMAIL_NOT_EQUAL_CLIENT:
    "User's email must be DIFFERENT from Client's email.",
  USER_EMAIL_NOT_EQUAL_PARTNER:
    "User's email must be DIFFERENT from Partner's email.",
  CLIENT_NOT_EQUAL_PARTNER:
    "Partner's email must be DIFFERENT from Client user's email.",
  EMAIL_ALREADY_TAKEN: 'This Email address is taken. Please try another.',
  PC_EMAIL_ALREADY_TAKEN: 'PrimaryContact email is already exist',
  CLIENT_NAME_TAKEN: 'This Corporate Entity is taken. Please try another.',
  PROJECT_ID_TAKEN: 'This Project ID is taken. Please try another.',
  GREATER_OR_EQUAL_CURRENT_DATE:
    'Please enter a value equal to or greater than the current date.',
  INVALID_DOMAIN:
    'Sorry, only letters (a-z), numbers (0-9), and periods (_) (-) are allowed.',
  TAKEN_DOMAIN: 'This Corporate Sub Domain is taken. Please try another.',
  WRONG_PERCENT_NUMBER: 'Please enter an integer between 0 and 100.',
  BUDGET_ALLOWANCE: `Please enter a value greater than 0 and less than ${MAX_BUGDET.toLocaleString()}.`,
  CONFIRMATION_NOT_FOUND: 'Your account was not confirmed yet.',
  ACCOUNT_NOT_EXIST: 'No account found with that email address.',
  RESET_PASSWORD_EXPIRED:
    'Password reset link has expired. Please use the most recent link.',
  ALREADY_CONFIRMED: 'This account is already confirmed.',
  DIFFERENT_PASSWORD: 'New password cannot be the same as the old password.',
  ACCOUNT_NOT_FOUND: "Couldn't find your MetaBrief account.",
  UNAUTHORIZED_BRIEF: 'You are no longer authorized to access this brief.',
  ALREADY_REQUEST_JOIN: "You've already requested to join this corporate.",
  TAKEN_ROLE: 'This Role is taken. Please try another.',
};
