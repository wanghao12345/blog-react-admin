import { combineReducers } from 'redux';
import userInfo from './userInfo';
import tagList from './tagList';
import token from './token';
import { breadCrumb, tags, theme, collapse } from './setting';
export default combineReducers({ userInfo, tagList, breadCrumb, tags, theme, collapse, token });
