import React from 'react'
import PropTypes from 'prop-types'

import classes from './DrawerToggle.css'

const drawerToggle = props => (
  <div className={classes.DrawerToggle} onClick={props.drawerToogleClick}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

drawerToggle.propTypes = {
  open: PropTypes.bool,
  closed: PropTypes.func,
}

export default drawerToggle