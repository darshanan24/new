import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Project from './containers/Project/Project';
import Events from './containers/Events/Events';

const MainApp = ({ match }) => (
  <div>
    <Layout>
      <Switch>
        <div>
          <Route path={match.url} component={Project} />
          <Route path={match.url + '/events'} component={Events} />
        </div>
      </Switch>
    </Layout>
  </div>
);

export default MainApp;
