import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import ContentHeadingLayout from '../../Layout/ContentHeadingLayout/ContentHeadingLayout';
import ContentBodyLayout from '../../Layout/ContentBodyLayout/ContentBodyLayout';
import SourceBuilder from './SourceBuilder/SourceBuilder';
import Card from '../../UI/Card/Card';
import List from '../../UI/List/List';
import { connect } from 'react-redux';
import Button from '../../UI/Button/Button';

import * as actions from '../../../store/actions/index';

class Sources extends Component {
  state = {
    isCreate: false
  };

  componentDidMount() {
    this.props.onFetchSources();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isCreate: !prevState.isCreate };
    });
  };

  render() {
    //  const numbers = this.props.sources;
    //  const listItems = numbers.map(number => <li>{number}</li>);

    return (
      <Aux>
        <ContentHeadingLayout
          heading="SOURCES"
          subheading="This is where you define your sources"
        />
        <ContentBodyLayout>
          <div className="row gutters">
            <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12">
              <Card heading="Sources">
                <Button clicked={this.switchModeHandler} btnType="Danger">
                  {this.state.isCreate ? 'BACK' : 'NEW'}
                </Button>
                <List items={this.props.sources} />
              </Card>
            </div>

            <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12">
              <Card heading="DASHBOARD">
                {this.state.isCreate ? <SourceBuilder /> : null}
              </Card>
            </div>
          </div>
        </ContentBodyLayout>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    sources: state.source.sources
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchSources: () => dispatch(actions.fetchSources())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sources);
