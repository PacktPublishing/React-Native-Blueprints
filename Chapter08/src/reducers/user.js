import { post } from '../api';

// Actions
const LOGIN = 'user/LOGIN';
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
const LOGIN_ERROR = 'user/LOGIN_ERROR';
const REGISTER = 'user/REGISTER';
const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS';
const REGISTER_ERROR = 'user/REGISTER_ERROR';
const LOGOUT = 'user/LOGOUT';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return { ...state, user: null, loading: true, error: null };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload.error,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

// Action Creators
export function login({ email, password }) {
  return dispatch => {
    dispatch({ type: LOGIN });
    post('/login', { email, password })
      .then(user => dispatch({ type: LOGIN_SUCCESS, payload: { user } }))
      .catch(error => dispatch({ type: LOGIN_ERROR, payload: { error } }));
  };
}

export function register({
  email,
  repeatEmail,
  name,
  password,
  address,
  postcode,
  city,
}) {
  if (
    !email ||
    !repeatEmail ||
    !name ||
    !password ||
    !name ||
    !address ||
    !postcode ||
    !city
  ) {
    return {
      type: REGISTER_ERROR,
      payload: { error: 'All fields are mandatory' },
    };
  }
  if (email !== repeatEmail) {
    return {
      type: REGISTER_ERROR,
      payload: { error: "Email fields don't match" },
    };
  }
  return dispatch => {
    dispatch({ type: REGISTER });
    post('/register', {
      email,
      name,
      password,
      address,
      postcode,
      city,
    })
      .then(user => dispatch({ type: REGISTER_SUCCESS, payload: { user } }))
      .catch(error => dispatch({ type: REGISTER_ERROR, payload: { error } }));
  };
}

export function logout() {
  return { type: LOGOUT };
}
