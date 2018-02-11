import React from 'react'

import classes from './Order.css'

const order = props => {
  const ingredients = []
  for (let ingredientName in props.ingredients) {
    ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName]})
  }
  const ingredientOutput = ingredients.map((ing, i) => {
    return (
      <span
        key={i}
        className={classes.Ingredient}>
        {ing.name} ({ing.amount})
      </span>
    )
  })
  return (
    <div className={classes.Order}>      
      <div className={classes.Ingredients}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>USD {props.price}</strong></p>
      </div>
      <span
        className={classes.DeleteButton}
        onClick={() => props.deleteOrder(props.id)}>
        &#x2715;
      </span>
    </div>
  )
}

export default order