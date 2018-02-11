import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import { fetchOrders, removeOrder } from '../../store/order/actions'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import Modal from '../../components/UI/Modal/Modal'
import Button from '../../components/UI/Button/Button'
import Aux from '../../hoc/Aux/Aux'
import showErrorHandler from '../../hoc/showErrorHandler/showErrorHandler'

class Orders extends Component {
  state = {
    removeModal: false,
    clickedOrderId: ''
  }

  componentDidMount() {
    this.props.dispatch(fetchOrders(this.props.token, this.props.userId))
  }

  openRemoveModal = id => this.setState({removeModal: true, clickedOrderId: id})
  closeRemoveModal = () => this.setState({removeModal: false, clickedOrderId: ''})

  deleteOrderHandler = () => {
    this.props.dispatch(removeOrder(this.state.clickedOrderId))
    this.closeRemoveModal()
  }
  
  render() {
    let orders = <Spinner />

    if (!this.props.isLoading) {
      orders = this.props.orders.map(order => {
        return (
          <Order
            key={order.id}
            id={order.id}
            price={order.price}
            ingredients={order.ingredients}
            deleteOrder={this.openRemoveModal} />
        )
      })
    }

    return (
      <Aux>
        <Modal
          show={this.state.removeModal}
          onClose={this.closeRemoveModal}>
          <div>
            <p>Do you want to delete this order?</p>
            <div style={{float: 'right'}}>
              <Button
                btnType='Danger'
                clicked={this.closeRemoveModal}>CANCEL</Button>
              <Button
                btnType='Success'
                clicked={this.deleteOrderHandler}>DELETE</Button>
            </div>
          </div>
        </Modal>
        {orders}
      </Aux>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  isLoading: state.order.isLoading,
  token: state.auth.token,
  userId: state.auth.userId
})

export default connect(mapStateToProps)(showErrorHandler(Orders, axios))
