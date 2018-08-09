import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className="unifyMenu">
    <NavigationItem link="/sources" icon="icon-border_all">
      Sources
    </NavigationItem>
    <NavigationItem link="/events" icon="icon-flash-outline">
      Events
    </NavigationItem>
    <NavigationItem link="/dimensions" icon="icon-border_outer">
      Dimensions
    </NavigationItem>
    <NavigationItem link="/cubes" icon="icon-layers">
      Cubes
    </NavigationItem>
    <NavigationItem link="/analyze" icon="icon-chart-area-outline">
      Analyze
    </NavigationItem>
  </ul>
);

export default NavigationItems;
