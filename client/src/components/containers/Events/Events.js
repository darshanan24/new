import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import ContentHeadingLayout from '../../Layout/ContentHeadingLayout/ContentHeadingLayout';
import ContentBodyLayout from '../../Layout/ContentBodyLayout/ContentBodyLayout';
import Card from '../../UI/Card/Card';
import Modal from '../../UI/Modal/Modal';
class Events extends Component {
  render() {
    return (
      <Aux>
        <ContentHeadingLayout
          heading="Events"
          subheading="Define your events"
        />
        <ContentBodyLayout>
          <div>New Project Creation </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
            <Card header="Raw events" total="500" />
          </div>
          <Modal>testing</Modal>
        </ContentBodyLayout>
      </Aux>
    );
  }
}

export default Events;
