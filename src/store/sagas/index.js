
import { takeEvery, all } from 'redux-saga/effects'

import * as authTypes from '../auth/actionTypes'
import * as burgerBuilderTypes from '../burgerBuilder/actionTypes'
import * as orderTypes from '../order/actionTypes'

import { logoutSaga,
         checkAuthTimeoutSaga,
         authUserSaga,
         authCheckStateSaga } from './auth'

import { fetchIngredientsSaga } from './burgerBuilder'

import { purchaseBurgerSaga,
         fetchOrdersSaga,
         removeOrderSaga } from './order'

export function* watchAuth () {
  yield all([
    takeEvery(authTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(authTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(authTypes.AUTH_USER, authUserSaga),
    takeEvery(authTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ])
}

export function* watchBurgerBuilder () {
  yield takeEvery(burgerBuilderTypes.FETCH_INGREDIENTS, fetchIngredientsSaga)
}

export function* watchOrder () {
  yield all([
    takeEvery(orderTypes.PURCHASE_BURGER, purchaseBurgerSaga),
    takeEvery(orderTypes.FETCH_ORDERS, fetchOrdersSaga),
    takeEvery(orderTypes.REMOVE_ORDER, removeOrderSaga)
  ])
}

