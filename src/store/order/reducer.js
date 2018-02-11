import * as types from './actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  isLoading: false,
  purchased: false,
  orders: []
}

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false })
}

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { isLoading: true })
}

const purchaseBurgerSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    purchased: true,
    orders: state.orders.concat(action.payload)
  })
}

const purchaseBurgerError = (state, action) => {
  return updateObject(state, { isLoading: false })
}

const fetchOredersStart = (state, action) => {
  return updateObject(state, { isLoading: true })
}

const fetchOredersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.payload.fetchedOrders,
    isLoading: false
  })
}

const fetchOredersError = (state, action) => {
  return updateObject(state, { isLoading: false })
}

const removeOrder =(state, action) => {
  const orderIndex = state.orders.findIndex(order => order.id === action.payload.id)
  const updatedOrders = [
    ...state.orders.slice(0, orderIndex),
    ...state.orders.slice(orderIndex + 1)
  ]

  return updateObject(state, { orders: updatedOrders })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PURCHASE_INIT: return purchaseInit(state, action)
      
    case types.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)      
    case types.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)      
    case types.PURCHASE_BURGER_ERROR: return purchaseBurgerError(state, action)

    case types.FETCH_ORDERS_START: return fetchOredersStart(state, action)      
    case types.FETCH_ORDERS_SUCCESS: return fetchOredersSuccess(state, action)      
    case types.FETCH_ORDERS_ERROR: return fetchOredersError(state, action)

    case types.REMOVE_ORDER: return removeOrder(state, action)
      
    default: return state
  }
}

export default reducer