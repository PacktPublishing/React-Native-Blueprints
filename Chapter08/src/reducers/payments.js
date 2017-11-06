import { post } from '../api';

// Actions
const PAY = 'products/PAY';
const PAY_SUCCESS = 'products/PAY_SUCCESS';
const PAY_ERROR = 'products/PAY_ERROR';
const RESET_PAYMENT = 'products/RESET_PAYMENT';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case PAY:
      return { ...state, loading: true, paymentConfirmed: false, error: null };
    case PAY_SUCCESS:
      return {
        ...state,
        paymentConfirmed: true,
        loading: false,
        error: null,
      };
    case PAY_ERROR:
      return {
        ...state,
        loading: false,
        paymentConfirmed: false,
        error: action.payload.error,
      };
    case RESET_PAYMENT:
      return { loading: false, paymentConfirmed: false, error: null };
    default:
      return state;
  }
}

// Action Creators
export function pay(user, cart, card) {
  return dispatch => {
    dispatch({ type: PAY });
    post('/pay', { user, cart, card })
      .then(() => dispatch({ type: PAY_SUCCESS }))
      .catch(error => dispatch({ type: PAY_ERROR, payload: { error } }));
  };
}

export function resetPayment() {
  return { type: RESET_PAYMENT };
}
