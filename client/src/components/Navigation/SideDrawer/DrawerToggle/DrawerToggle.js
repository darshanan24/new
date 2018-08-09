import React from 'react';
import './DrawerToggle.css';
const drawerToggle = props => {
  let icontoggle = 'icon-menu5';
  if (!props.open) {
    let icontoggle = 'icon-sort';
  }
  return (
    <a className="mini-nav-btn" onClick={props.clicked}>
      <i className={icontoggle} />
    </a>
  );
};

export default drawerToggle;
