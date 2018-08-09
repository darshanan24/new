import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../UI/Input/Input';
import axios from '../../../../axios';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { updateObject, checkValidity } from '../../../../shared/utility';
import Spinner from '../../../UI/Spinner/Spinner';

class ProjectList extends Component {
  state = {
    elementType: 'select',
    elementConfig: {
      options: []
    },
    value: ''
  };

  componentDidMount() {
    this.props.onFetchProjects();
  }

  inputChangedHandler = event => {
    console.log('inputidentifier' + event.target.value);
    this.props.onsetProject(event.target.value);
    this.setState({ value: event.target.value });
  };

  render() {
    const parsedArray = this.props.projects.map(element => {
      const test = {
        value: element.id,
        displayValue: element.name
      };
      return test;
    });

    const test = {
      options: parsedArray
    };

    let form = (
      <Input
        elementType={this.state.elementType}
        elementConfig={test}
        value={this.state.value}
        changed={event => this.inputChangedHandler(event)}
      />
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return <div>{form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    projects: state.project.projects,
    loading: state.project.loading,
    project: state.project.project
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProjects: () => dispatch(actions.fetchProjects()),
    onsetProject: projectID => dispatch(actions.setProject(projectID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
