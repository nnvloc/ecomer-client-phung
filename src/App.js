import React, {memo, useEffect, useState} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {useDispatch} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Loading from './Components/Loading';

import HttpLayer from './HttpLayer';
import Home from './Containers/Home';
import SignUp from './Containers/SignUp';
import LogIn from './Containers/Login';
import Orders from './Containers/Orders';

import AdminProducts from './Containers/AdminProducts';

import {setUser} from './redux/actions/user';
import {useGetCurrentUser} from './redux/selectors';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useGetCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const handleGetUser = async (token) => {
    try {
      const res =  await HttpLayer.get(`${global.API_URL}/api/users/profile`);
      const {data: {user}} = res;
      setLoading(false);
      dispatch(setUser(user));
    } catch(err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleGetUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const user = useGetCurrentUser();

  const renderUserRoutes = () => {
    return (
      <>
        <Route exact path="/">
          <Home />
        </Route>
        {user && (
          <Route exact path="/orders">
            <Orders />
          </Route>
        )}
      </>
    )
  }

  const renderAdminRoutes = () => {
    return (
      <>
        <PrivateRoute exact path="/" component={AdminProducts} />
        <PrivateRoute exact path="/admin/products" component={AdminProducts} />
      </>
    )
  }

  return loading ? <Loading loading={loading} /> : (
    <Router>
      <Switch>

        <Route path="/login">
          <LogIn />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        {user && user.type === 'admin' ? renderAdminRoutes() : renderUserRoutes()}
      </Switch>
    </Router>
  );
}

export default memo(App);
