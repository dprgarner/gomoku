import * as React from 'react';

export type EmailFormState = {
  view: 'EMAIL' | 'CREATE' | 'EXISTS';
  email: string;
  password: string;
  name: string;
  errors: {
    email?: string;
    password?: string;
  };
  emailToCheck: string;
  createAccountDetails?: {
    email: string;
    password: string;
    name: string;
  };
  signInDetails?: {
    email: string;
    password: string;
  };
};

type SetEmailAction = {
  type: 'SET_EMAIL';
  email: string;
};

type SetPasswordAction = {
  type: 'SET_PASSWORD';
  password: string;
};

type SetNameAction = {
  type: 'SET_NAME';
  name: string;
};

type CheckEmailAction = {
  type: 'CHECK_EMAIL';
  email: string;
};

type CheckEmailErrorAction = {
  type: 'CHECK_EMAIL_ERROR';
  message: string;
};

type CheckEmailCompleteAction = {
  type: 'CHECK_EMAIL_COMPLETE';
  methods: string[];
};

type CreateAccountAction = {
  type: 'CREATE_ACCOUNT';
  email: string;
  password: string;
  name: string;
};

type CreateAccountEmailErrorAction = {
  type: 'CREATE_ACCOUNT_EMAIL_ERROR';
  message: string;
};

type CreateAccountPasswordErrorAction = {
  type: 'CREATE_ACCOUNT_PASSWORD_ERROR';
  message: string;
};

type SignInAction = {
  type: 'SIGN_IN';
  email: string;
  password: string;
};

type SignInEmailErrorAction = {
  type: 'SIGN_IN_EMAIL_ERROR';
  message: string;
};

type SignInPasswordErrorAction = {
  type: 'SIGN_IN_PASSWORD_ERROR';
  message: string;
};

type EmailFormAction =
  | SetEmailAction
  | SetPasswordAction
  | SetNameAction
  | CheckEmailAction
  | CheckEmailErrorAction
  | CheckEmailCompleteAction
  | CreateAccountAction
  | CreateAccountEmailErrorAction
  | CreateAccountPasswordErrorAction
  | SignInAction
  | SignInEmailErrorAction
  | SignInPasswordErrorAction;

export type EmailFormDispatch = React.Dispatch<EmailFormAction>;

const reducer = (
  state: EmailFormState,
  action: EmailFormAction,
): EmailFormState => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.email };
    case 'SET_PASSWORD':
      return { ...state, password: action.password };
    case 'SET_NAME':
      return { ...state, name: action.name };
    case 'CHECK_EMAIL':
      return { ...state, emailToCheck: action.email, errors: {} };
    case 'CHECK_EMAIL_ERROR':
      return {
        ...state,
        emailToCheck: '',
        errors: {
          email: action.message,
        },
      };
    case 'CHECK_EMAIL_COMPLETE':
      return {
        ...state,
        emailToCheck: '',
        view: action.methods.includes('password') ? 'EXISTS' : 'CREATE',
      };
    case 'CREATE_ACCOUNT':
      return {
        ...state,
        createAccountDetails: {
          email: action.email,
          password: action.password,
          name: action.name,
        },
        errors: {},
      };
    case 'CREATE_ACCOUNT_EMAIL_ERROR':
      return {
        ...state,
        createAccountDetails: undefined,
        errors: {
          email: action.message,
        },
      };
    case 'CREATE_ACCOUNT_PASSWORD_ERROR':
      return {
        ...state,
        createAccountDetails: undefined,
        errors: {
          password: action.message,
        },
      };
    case 'SIGN_IN':
      return {
        ...state,
        signInDetails: {
          email: action.email,
          password: action.password,
        },
        errors: {},
      };
    case 'SIGN_IN_EMAIL_ERROR':
      return {
        ...state,
        signInDetails: undefined,
        errors: {
          email: action.message,
        },
      };
    case 'SIGN_IN_PASSWORD_ERROR':
      return {
        ...state,
        signInDetails: undefined,
        errors: {
          password: action.message,
        },
      };
  }
};

const initialState: EmailFormState = {
  email: '',
  password: '',
  name: '',
  view: 'EMAIL',
  emailToCheck: '',
  errors: {},
};

const useEmailFormReducer = () => React.useReducer(reducer, initialState);

export default useEmailFormReducer;
