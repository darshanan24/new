import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login/Login';
import Layout from './Layout/Layout';
import Aux from './hoc/Aux/Aux';
import Project from './containers/Project/Project';
import Events from './containers/Events/Events';
import Cubes from './containers/Cubes/Cubes';
import Dimensions from './containers/Dimensions/Dimensions';
import Analyze from './containers/Analyze/Analyze';
import Sources from './containers/Sources/Sources';

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
          <Switch>
            <div>
              <Route exact={true} path="/" component={Project} />
              <Route exact={true} path="/events" component={Events} />
              <Route exact={true} path="/cubes" component={Cubes} />
              <Route exact={true} path="/dimensions" component={Dimensions} />
              <Route exact={true} path="/sources" component={Sources} />
              <Route exact={true} path="/login" component={Login} />
              <Route exact={true} path="/analyze" component={Analyze} />
            </div>
          </Switch>
        </Layout>
      </Aux>
    );
  }
}

export default App;
