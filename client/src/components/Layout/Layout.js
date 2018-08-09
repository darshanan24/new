import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux';
import './Layout.css';
import Header from '../Navigation/header/Header';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: true
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Header open={this.state.showSideDrawer} />
        <div className="app-container">
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
          />
          <div className="app-main">{this.props.children}</div>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

export default connect(mapStateToProps)(Layout);
