import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initIngredients, removeIngredinet, addIngredient } from '../../store/burgerBuilder/actions'
import { purchaseInit } from '../../store/order/actions'
import { setAuthRedirectPath } from '../../store/auth/actions'

import axios from '../../axios-orders'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import showErrorHandler from '../../hoc/showErrorHandler/showErrorHandler'

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  
  componentDidMount() {
    this.props.dispatch(initIngredients())
  }

  addIngredient = ingredientName => {
    this.props.dispatch(addIngredient(ingredientName))
  }

  removeIngredinet = ingredientName => {
    this.props.dispatch(removeIngredinet(ingredientName))
  }
  

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  showModalHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true})
    } else {
      this.props.dispatch(setAuthRedirectPath('/checkout'))
      this.props.history.push('/auth')
    }
  }
  closeModalHandler = () => this.setState({purchasing: false})

  continueHandler = () => {
    this.props.dispatch(purchaseInit())
    this.props.history.push('/checkout')
  }

  render() {
    const { ings, price } = this.props

    const disabledInfo = {
      ...ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = this.props.isError ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Spinner />

    if (ings) {      
      burger = (
        <Aux>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={this.addIngredient}
            ingredientRemoved={this.removeIngredinet}
            onShowModal={this.showModalHandler}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(ings)}
            isAuth={this.props.isAuthenticated}
            price={price} />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          onClose={this.closeModalHandler}
          onContinue={this.continueHandler}
          price={price}
          ingredients={ings} />
      )
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} onClose={this.closeModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  isError: state.burgerBuilder.isError,
  orders: state.order.orders,
  isAuthenticated: state.auth.token !== null,
})

export default connect(mapStateToProps)(showErrorHandler(BurgerBuilder, axios))