import * as types from './actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  ingredients: null, 
  totalPrice: 2.10,
  isError: false,
  building: false
}

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 2.0,
  cheese: 1.0,
  meat: 2.7
}

const INGREDIENTS = ['salad', 'bacon', 'cheese', 'meat']

const addIngredient = (state, action) => {
  const updatedIngredient = { [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1 }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.payload.ingredientName],
    building: true
  }
  return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
  const updatedIng = { [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1 }
  const updatedIngs = updateObject(state.ingredients, updatedIng)
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.payload.ingredientName],
    building: true
  }
  return updateObject(state, updatedSt)
}

const setIngredients = (state, action) => {
  const ingredients = {}
  for (let ing of INGREDIENTS) {
    ingredients[ing] = action.payload.ingredients[ing]
  }
  return updateObject(state, {
    ingredients,
    isError: false,
    totalPrice: 2.10,
    building: false
  })
}

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {isError: true})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_INGREDIENT: return addIngredient(state, action)      
    case types.REMOVE_INGREDIENT: return removeIngredient(state, action)     
    case types.SET_INGREDIENTS: return setIngredients(state, action)      
    case types.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)      
    default: return state
  }
}

export default reducer