import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import ContentHeadingLayout from '../../Layout/ContentHeadingLayout/ContentHeadingLayout';
import ContentBodyLayout from '../../Layout/ContentBodyLayout/ContentBodyLayout';

class Sources extends Component {
  render() {
    return (
      <Aux>
        <ContentHeadingLayout>
          <h5>Analyze HEADING</h5>
          <h6 className="sub-heading">This is the subheading</h6>
        </ContentHeadingLayout>
        <ContentBodyLayout>
          <div>Event Creation </div>
        </ContentBodyLayout>
      </Aux>
    );
  }
}

export default Sources;
