import * as actionTypes from '../constants/index';
const setToken = (data) => {
  return {
    type: actionTypes.SET_TOKEN,
    data
  }
};
export {setToken};
