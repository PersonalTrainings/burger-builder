import { combineReducers } from 'redux'
import burgerBuilder from './burgerBuilder/reducer'
import order from './order/reducer'
import auth from './auth/reducer'

export default combineReducers({
  burgerBuilder,
  order,
  auth
})