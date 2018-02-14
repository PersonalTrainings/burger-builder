import { put } from 'redux-saga/effects'

import axios from '../../axios-orders'
import { ordersRef } from '../../firebase'
import * as actions from '../order/actions'

export function* purchaseBurgerSaga (action) {
  yield put(actions.purchaseBurgerStart())
  try {
    const response = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData)
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))

  } catch (err) {
    yield put(actions.purchaseBurgerFailed(err))
  }
}

export function* fetchOrdersSaga (action) {
  yield put(actions.fetchedOrdersStart())
  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
  try {
    const response = yield axios.get(`/orders.json${queryParams}`)
    const fetchedOrders = []
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key
      })
    }
    yield put(actions.fetchOrdersStartSuccess(fetchedOrders))      

  } catch (err) {
    yield put(actions.fetchOrdersStartFailed(err))
  }
}

export function* removeOrderSaga (action) {
  yield ordersRef.child(action.id).remove()
  yield put(actions.removeOrderSuccess(action.id))
}