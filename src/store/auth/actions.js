import * as types from './actionTypes'
import axios from 'axios'

const API_KEY = 'AIzaSyDS6ROlvggkPNK1k-cw9M4CNggWdrl6CqQ'
const AUTH_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'

export const authStart = () => {
  return {
    type: types.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: types.AUTH_SUCCES,
    payload: {token, userId}
  }
}

export const authFail = (error) => {
  return {
    type: types.AUTH_FAIL,
    payload: {error}
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  return {
    type: types.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
   return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000);
  }
}

export const auth = ({email, password}, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = `${AUTH_URL}/signupNewUser?key=${API_KEY}`
    if (!isSignup) {
      url = `${AUTH_URL}/verifyPassword?key=${API_KEY}`
    }
    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error))
      })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: types.SET_AUTH_REDIRECT_PATH,
    payload: {path}
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      } else {
        dispatch(logout())
      }
    }
  }
}