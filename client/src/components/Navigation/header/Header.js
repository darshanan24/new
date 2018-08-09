import React from 'react';
import './Header.css';
import Logo from './logo/Logo';
import Usernav from '../usernav/Usernav';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Header = props => (
  <header className="app-header">
    <div className="container-fluid">
      <div className="row gutters">
        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-4">
          <DrawerToggle open={props.open} />
        </div>
        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-4">
          <Logo />
        </div>
        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-4">
          <Usernav />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
