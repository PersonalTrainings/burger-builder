import * as types from './actionTypes'

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

export const purchaseBurgerStart = () => {
  return {
    type: types.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData, token) => {
  return {
    type: types.PURCHASE_BURGER,
    orderData,
    token
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

export const fetchedOrdersStart = () => {
  return {
    type: types.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  return {
    type: types.FETCH_ORDERS,
    token,
    userId
  }
}

export const removeOrderSuccess = (id) => {
  return {
    type: types.REMOVE_ORDER_SUCCESS, payload: {id}
  }
}

export const removeOrder = id => {
  return {
    type: types.REMOVE_ORDER,
    id
  }
}

export const purchaseInit = () => {
  return {
    type: types.PURCHASE_INIT
  }
}

