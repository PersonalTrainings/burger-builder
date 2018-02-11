import React from 'react'
import PropTypes from 'prop-types'

import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle drawerToogleClick={props.drawerToogleClick} />
    <Logo height='80%' />
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
)

toolbar.propTypes = {
  drawerToogleClick: PropTypes.func
}

export default toolbar