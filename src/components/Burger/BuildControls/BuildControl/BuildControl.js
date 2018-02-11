import React from 'react'
import PropTypes from 'prop-types'

import classes from './BuildControl.css'

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}>
      Less
    </button>
    <button className={classes.More} onClick={props.added}>More</button>
  </div>
)

buildControl.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  removed: PropTypes.func,
  added: PropTypes.func
}

export default buildControl