import React, {memo} from 'react';
import { Link } from "react-router-dom";

import './styles.css';

const AdminLeftMenu = (props) => {
  return (
    <div className="left-menu">
      <Link to="/admin/users" className="menu-link">
        Users
      </Link>
      <Link to="/admin/products" className="menu-link">
        Products
      </Link>
      <Link to="/admin/orders" className="menu-link">
        Orders
      </Link>
    </div>
  )
}

export default memo(AdminLeftMenu);
