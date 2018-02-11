import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  
  render () {
    const ingredients = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>
        )
      })
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredients}
        </ul>
        <p>Continue to Checkout?</p>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <Button btnType='Danger' clicked={this.props.onClose}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.onContinue}>CONTINUE</Button>
      </Aux>
    ) 
  }
  
  
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number,
  onClose: PropTypes.func,
  onContinue: PropTypes.func
}

export default OrderSummary