import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.css'

const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink
      exact={props.exact}
      to={props.link}
      activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
)

navigationItem.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string
}

export default navigationItem