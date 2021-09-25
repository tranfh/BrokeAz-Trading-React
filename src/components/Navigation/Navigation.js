import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

function Navigation() {
  return (
    <ProSidebar>
      <SidebarHeader>
        <h2>BrokeAz-Trading</h2>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem>Watchlist</MenuItem>
          <MenuItem>Chart</MenuItem>
          <MenuItem>Stocks</MenuItem>
        </Menu>{' '}
      </SidebarContent>
      <SidebarFooter>
        <p>Copyright BrokeAz-Trading 2021</p>
      </SidebarFooter>
    </ProSidebar>
  );
}

export default Navigation;
