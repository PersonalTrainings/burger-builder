import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as authActions from '../../store/auth/actions'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.css'
import { updateObject, checkValidity } from '../../shared/utility'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 14
        },
        valid: false,
        touched: false
      },
      confirmPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 14,
          confirm: true
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }
  
  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.dispatch(authActions.setAuthRedirectPath('/'))
    }
  }  

  inputChangedHandler = (e, controlName) => {
    const updateControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: e.target.value,
        valid: checkValidity(e.target.value, this.state.controls[controlName].validation, this.state.controls.password.value),
        touched: true
      })
    })

    this.setState({ controls: updateControls })
  }

  submitHandler = (e) => {
    e.preventDefault()

    const formData = {}
    for (let controlName in this.state.controls) {
      formData[controlName] = this.state.controls[controlName].value
    }

    if (this.state.isSignup && formData.password !== formData.confirmPassword) return

    this.props.dispatch(authActions.auth(formData, this.state.isSignup))
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
    })
  }

  render() {
    let formElementArray = []

    for (let key in this.state.controls) {
       formElementArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    if (!this.state.isSignup) {
      formElementArray = formElementArray.filter(el => el.id !== 'confirmPassword')
    }
    
    let form = formElementArray.map(formElement => (
      <Input 
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        inValid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        onChange={(e) => this.inputChangedHandler(e, formElement.id)} />
    ))

    if (this.props.isLoading) {
      form = <Spinner />
    }

    let errorMessage = null

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>   
        <Button 
          btnType='Danger'
          clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>     
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.token !== null,
  error: state.auth.error,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath

})

export default connect(mapStateToProps)(Auth)
