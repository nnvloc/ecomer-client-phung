import React, {useState, memo} from "react";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import './styles.css';

import HelmetComp from "../../Components/Helmet";
import Loading from '../../Components/Loading'
import {validateLogInForm} from './validations';
import {handleLogIn} from './services';

import {setUser} from '../../redux/actions/user';

const LogIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [LogInInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = ({key, value}) => {
    setSignUpInfo({...LogInInfo, [key]: value});
  }

  const onSubmit = async () => {
    const errors = validateLogInForm(LogInInfo);
    setErrors(errors);
    if (errors.email || errors.password) {
      return;
    }
    setLoading(true);
    try {
      const res = await handleLogIn(LogInInfo);
      const {data: {token, user}} = res;
      localStorage.setItem('token', token);
      setLoading(false);
      dispatch(setUser(user))
      const {type} = user;
      type !== 'admin' ? history.push('/home') : history.push('/admin/products');
    } catch(err) {
      const {response} = err;
      const {data: {success, error_message}} = response || {data: {}};
      setLoading(false);
      alert(error_message);
    }
  }

  return (
    <>
      <HelmetComp title={"Log in "} />
      <div className="signup-page">
        <form className="needs-validation">
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={LogInInfo.email}
              onChange={(e) => onChange({key: 'email', value: e.target.value})}
            />
            {formErrors.email ? (<div className="error">{formErrors.email}</div>) : null}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={LogInInfo.password}
              onChange={(e) => onChange({key: 'password', value: e.target.value})}
            />
            {formErrors.password ? (<div className="error">{formErrors.password}</div>) : null}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSubmit}>
            Login
          </button>
        </form>
        <Loading loading={loading} />
      </div>
    </>
  );
};

export default memo(LogIn);
