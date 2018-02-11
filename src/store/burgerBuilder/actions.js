import * as types from './actionTypes'
import axios from '../../axios-orders'

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

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data))
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed())
      })
  }
}