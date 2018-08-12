import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';
import axios from '../../../../axios';
import Button from '../../../UI/Button/Button';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';

class SourceBuilder extends Component {
  state = {
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Source Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      configuration: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          placeholder: 'Source Configuration'
        },
        value: '',
        validation: {
          required: false,
          maxLength: 5
        },
        valid: false,
        touched: false
      }
    },
    loading: false,
    error: false,
    created: false
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    const sourceData = {
      name: this.state.controls.name.value,
      configuration: this.state.controls.configuration.value
    };
    this.props.onCreateSource(sourceData);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = null;
    if (this.state.loading) {
      form = <Spinner />;
    } else {
      form = formElementsArray.map(formElement => (
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
    }
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          {form}
          <div className="actions clearfix">
            <Button btnType="btn-primary">SUBMIT</Button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.source.loading,
    error: state.source.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateSource: sourceData => dispatch(actions.createSource(sourceData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(SourceBuilder, axios));
