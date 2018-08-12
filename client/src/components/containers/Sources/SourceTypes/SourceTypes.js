import React from 'react';
import './SourceTypes.css';
import Input from '../../../UI/Input/Input';
const SourceTypes = props => {
  let formElement = null;
  /*
  const inputClasses = ['form-control InputElement'];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('Invalid');
  }
  */

  switch (props.elementType) {
    case 'File':
      inputElement = (
        <div>
          <Input key="name" elementType="input" />
          <Input key="filepath" elementType="textarea" />
        </div>
      );
      break;
    case 'Jdbc':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'Twitter':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return <div className="input-group">{inputElement}</div>;
};
export default SourceTypes;
