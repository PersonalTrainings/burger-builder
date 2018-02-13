import * as types from './actionTypes'

export const addIngredient = ingredientName => {
  return {
    type: types.ADD_INGREDIENT,
    payload: { ingredientName }
  }
}

export const removeIngredinet = ingredientName => {
  return {
    type: types.REMOVE_INGREDIENT,
    payload: { ingredientName }
  }
}

export const setIngredients = ingredients => {
  return {
    type: types.SET_INGREDIENTS,
    payload: { ingredients }
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: types.FETCH_INGREDIENTS_FAILED
  }
}

export const fetchIngredients = () => {
  return {
    type: types.FETCH_INGREDIENTS
  }
}