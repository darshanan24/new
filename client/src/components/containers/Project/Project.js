import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import ContentHeadingLayout from '../../Layout/ContentHeadingLayout/ContentHeadingLayout';
import ContentBodyLayout from '../../Layout/ContentBodyLayout/ContentBodyLayout';
import { connect } from 'react-redux';
import Card from '../../UI/Card/Card';
import * as actions from '../../../store/actions/index';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import ProjectBuilder from './ProjectBuilder/ProjectBuilder';
import axios from '../../../axios';

class Project extends Component {
  state = {
    createNew: false
  };

  createNewHandler = () => {
    console.log('button clickeed' + this.state.createNew);
    this.setState({ createNew: true });
  };

  closeNewHandler = () => {
    console.log('button clickeed' + this.state.createNew);
    this.setState({ createNew: false });
  };

  render() {
    const projectInfo = {
      ...this.props.project
    };

    let Heading = 'Create Project';
    if (projectInfo['name']) {
      Heading = projectInfo['name'];
    }

    return (
      <Aux>
        <ContentHeadingLayout
          heading={Heading}
          subheading={projectInfo['description']}
        />
        <ContentBodyLayout>
          <div>
            <Button btnType="btn-primary" clicked={this.createNewHandler}>
              Create New
            </Button>
            <Modal
              show={this.state.createNew}
              modalClosed={this.closeNewHandler}
            >
              <ProjectBuilder closeHandler={this.closeNewHandler} />
            </Modal>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
            <Card header="Raw events" total="500" />
          </div>
        </ContentBodyLayout>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.project.project
  };
};

export default connect(mapStateToProps)(Project);
