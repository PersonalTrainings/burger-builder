import { put } from 'redux-saga/effects'

import axios from '../../axios-orders'
import * as actions from '../burgerBuilder/actions'

export function* fetchIngredientsSaga (action) {
  try {
    const response = yield axios.get('/ingredients.json')
    yield put(actions.setIngredients(response.data))

  } catch (err){
    yield put(actions.fetchIngredientsFailed())
  }

}