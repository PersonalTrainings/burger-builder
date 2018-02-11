import * as types from './actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  isLoading: false,
  userId: null,
  token: null,
  error: null,
  authRedirectPath: '/'
}

const authStart = (state, action) => {
  return updateObject(state, { isLoading: true, error: null })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.payload.token,
    userId: action.payload.userId,
    error: null,
    isLoading: false
  })
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    isLoading: false
  })
}

const authLogout = (state, aciton) => {
  return updateObject(state, {
    token: null,
    userId: null
  })
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.payload.path })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START: return authStart(state, action)      
    case types.AUTH_SUCCES: return authSuccess(state, action)      
    case types.AUTH_FAIL: return authFail(state, action)     
    case types.AUTH_LOGOUT: return authLogout(state, action)  
    case types.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)  
    default: return state
  }
}

export default reducer