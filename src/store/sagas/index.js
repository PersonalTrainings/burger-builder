
import { takeEvery } from 'redux-saga/effects'

import * as authTypes from '../auth/actionTypes'
import * as burgerBuilderTypes from '../burgerBuilder/actionTypes'
import * as orderTypes from '../order/actionTypes'

import { logoutSaga,
         checkAuthTimeoutSaga,
         authUserSaga,
         authCheckStateSaga } from './auth'

import { fetchIngredientsSaga } from './burgerBuilder'

import { purchaseOrderSaga,
         fetchOrdersSaga,
         removeOrderSaga } from './order'

export function* watchAuth () {
  yield takeEvery(authTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(authTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(authTypes.AUTH_USER, authUserSaga)
  yield takeEvery(authTypes.AUTH_CHECK_STATE, authCheckStateSaga)

  yield takeEvery(burgerBuilderTypes.FETCH_INGREDIENTS, fetchIngredientsSaga)

  yield takeEvery(orderTypes.PURCHASE_BURGER, purchaseOrderSaga)
  yield takeEvery(orderTypes.FETCH_ORDERS, fetchOrdersSaga)
  yield takeEvery(orderTypes.REMOVE_ORDER, removeOrderSaga)
}

