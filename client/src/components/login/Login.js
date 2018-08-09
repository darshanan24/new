import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.css';
import Input from '../UI/Input/Input';

import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';
import * as actions from '../../store/actions';

class Login extends Component {
  state = {
    controls: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
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
          minLength: 6
        },
        valid: false,
        touched: false
      },
      passwordConfirm: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password confirmation'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.username.value,
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.controls.passwordConfirm.value,
      this.state.isSignup
    );
  };
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];
    if (this.state.isSignup) {
      for (let key in this.state.controls) {
        formElementsArray.push({
          id: key,
          config: this.state.controls[key]
        });
      }
    } else {
      formElementsArray.push({
        id: 'username',
        config: this.state.controls['username']
      });
      formElementsArray.push({
        id: 'password',
        config: this.state.controls['password']
      });
    }

    let form = formElementsArray.map(formElement => (
      <div>
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => this.inputChangedHandler(event, formElement.id)}
        />
        <br />
      </div>
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }

    return (
      <div className="container">
        <div className="login-screen row align-items-center">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="login-container">
              <div className="row no-gutters">
                <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                  {errorMessage}
                  <div className="login-box">
                    <form onSubmit={this.submitHandler}>
                      {form}
                      <div className="actions clearfix">
                        <Button btnType="btn-primary">SUBMIT</Button>
                      </div>
                      <div className="or" />
                    </form>
                    <div className="mt-4">
                      <Button
                        clicked={this.switchAuthModeHandler}
                        btnType="Danger"
                      >
                        {this.state.isSignup
                          ? 'Already have an account ? SIGNIN'
                          : 'Dont have an account ? SIGNUP'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password, passwordConfirm, isSignup) =>
      dispatch(
        actions.auth(username, email, password, passwordConfirm, isSignup)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
