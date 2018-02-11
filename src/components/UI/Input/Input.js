import React from 'react'

import classes from './Input.css'

const input = props => {
  let inputElement = null
  const inputClasses = [classes.Input]

  if (props.inValid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        value={props.value}
        onChange={props.onChange}
        className={inputClasses.join(' ')}
        {...props.elementConfig} />
      break
    case ('textarea'):
      inputElement = <textarea
        value={props.value}
        onChange={props.onChange}
        className={inputClasses.join(' ')}
        {...props.elementConfig} />
      break
    case ('select'):
      inputElement = <select
        value={props.value}
        onChange={props.onChange}
        className={inputClasses.join(' ')}>
        {props.elementConfig.options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.displayValue}
          </option>
        ))}
        </select>
      break
    default:
      inputElement = <input
        value={props.value}
        onChange={props.onChange}
        className={inputClasses.join(' ')}
        {...props.elementConfig} />
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input