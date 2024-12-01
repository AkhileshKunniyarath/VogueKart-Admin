import {LOGIN, SIGNOUT} from './constants';

const initialState = {
  isLoggedIn: false,
  userId: '',
};
export const VogueKartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        isLoggedIn: true,
      };
    case SIGNOUT:
      return {
        ...state,
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        profileImage: '',
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
