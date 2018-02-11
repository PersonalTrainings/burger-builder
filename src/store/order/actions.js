import * as types from './actionTypes'
import axios from '../../axios-orders'
import { ordersRef } from '../../firebase'

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: types.PURCHASE_BURGER_SUCCESS,
    payload: {id, orderData}
  }
}

export const purchaseBurgerFailed = (error) => {
  return {
    type: types.PURCHASE_BURGER_ERROR,
    payload: {error}
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch({type: types.PURCHASE_BURGER_START})
    axios.post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))        
      })
      .catch(err => {
        dispatch(purchaseBurgerFailed(err))
      })
  }
}

export const fetchOrdersStartSuccess = fetchedOrders => {
  return {
    type: types.FETCH_ORDERS_SUCCESS,
    payload: { fetchedOrders }
  }
}

export const fetchOrdersStartFailed = (error) => {
  return {
    type: types.FETCH_ORDERS_ERROR,
    payload: { error }
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch({ type: types.FETCH_ORDERS_START })
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    axios.get(`/orders.json${queryParams}`)
      .then(res => {
        const fetchedOrders = []
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        dispatch(fetchOrdersStartSuccess(fetchedOrders))
      })
      .catch(err => {
        dispatch(fetchOrdersStartFailed(err))
      })

  }
}

export const removeOrder = id => {
  return dispatch => {
    ordersRef.child(id).remove()
    dispatch({type: types.REMOVE_ORDER, payload: {id}})
  }
}

export const purchaseInit = () => {
  return {
    type: types.PURCHASE_INIT
  }
}

