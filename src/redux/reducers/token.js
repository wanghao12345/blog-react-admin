import * as actionTypes from '../constants/index';
const token = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return action.data;
    default:
      return state;
  }
};

export default token;
