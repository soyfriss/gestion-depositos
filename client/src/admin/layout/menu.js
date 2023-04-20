import * as React from "react";
import { MenuItemLink } from "react-admin";
import { Divider } from '@mui/material';
import PeopleIcon from "@mui/icons-material/People";
import OutboxIcon from '@mui/icons-material/Outbox';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BadgeIcon from '@mui/icons-material/Badge';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsIcon from '@mui/icons-material/Settings';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout } from 'react-admin';

export const Menu = () => {

  const logout = useLogout();
  const handleLogout = () => logout();
  
  const userId = localStorage.getItem('userId');
  return (
    <div>
      <MenuItemLink to="/categories" primaryText="Category" leftIcon={<CategoryIcon />} />
      <MenuItemLink to="/products" primaryText="Product" leftIcon={<ListIcon />} />
      <MenuItemLink to="/users" primaryText="User" leftIcon={<PeopleIcon />} />
      <MenuItemLink to="/employees" primaryText="Employees" leftIcon={<BadgeIcon />} />
      <MenuItemLink to="/suppliers" primaryText="Suppliers" leftIcon={<LocalShippingIcon />} />
      <MenuItemLink to="/delivery-notes" primaryText="Delivery Notes" leftIcon={<OutboxIcon />} />
      <MenuItemLink to="/purchase-receipts" primaryText="Purchase Receipts" leftIcon={<MoveToInboxIcon />} />
      <Divider/>
      <MenuItemLink to={`/profile/${userId}`} primaryText="My Profile" leftIcon={<SettingsIcon />} />
      <MenuItemLink to="" onClick={handleLogout} primaryText="Logout" leftIcon={<LogoutIcon />} />

      
    </div>
  );
}