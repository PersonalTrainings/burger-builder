import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Aux from '../Aux/Aux'

import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => { 
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }
  sideDrawerClosedHandler = () => this.setState({showSideDrawer: false})

  render () {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthentiacted}
          drawerToogleClick={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthentiacted}
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.any
}

const mapStateToProps = state => ({
  isAuthentiacted: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout)
