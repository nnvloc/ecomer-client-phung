import React, {memo} from "react";
import { Link } from "react-router-dom";
import {useGetCurrentUser} from '../../redux/selectors';

import './styles.css';

const Header = (props) => {
  const user = useGetCurrentUser();
  const {type} = user || {};

  const renderUserHeader = () => {
    return (
      <>
        { !user ? renderLoginLinks() : renderLoggedInUserLinks() }
      </>
    );
  }

  const renderLoggedInUserLinks = () => {
    return (
      <>
        <Link to="/orders" className="menu-link">
          Orders
        </Link>
        <Link to ='#' className="menu-link">
          {user.firstName} {user.lastName}
        </Link>
      </>
    )
  }

  const renderLoginLinks = () => {
    return (
      <>
        <Link to="/login" className="menu-link">
          Login
        </Link>
        <Link to="/signup" className="menu-link">
          Sign up
        </Link>
      </>
    )
  }
  return (
    <div className="header">
      <div>
        <Link to="/" className="header-logo"></Link>
      </div>
      <div className="header-menu">
        <div className="header-menu-product">
          {type === 'admin' ? null : renderUserHeader()}
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
