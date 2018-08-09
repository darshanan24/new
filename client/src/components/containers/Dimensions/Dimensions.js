import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import ContentHeadingLayout from '../../Layout/ContentHeadingLayout/ContentHeadingLayout';
import ContentBodyLayout from '../../Layout/ContentBodyLayout/ContentBodyLayout';
import Card from '../../UI/Card/Card';

class Dimensions extends Component {
  render() {
    return (
      <Aux>
        <ContentHeadingLayout
          heading="Dimensions"
          subheading="Define your lookup data"
        />
        <ContentBodyLayout>
          <div>New Project Creation </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
            <Card header="Raw events" total="500" />
          </div>
        </ContentBodyLayout>
      </Aux>
    );
  }
}

export default Dimensions;
