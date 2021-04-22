import React, {useState, memo} from "react";
import {useHistory} from 'react-router-dom';
import './styles.css';

import HelmetComp from "../../Components/Helmet";
import Loading from '../../Components/Loading';
import {validateSignUpForm} from './validations';
import {handleSignUp} from './services';

const SignUp = (props) => {
  const history = useHistory();
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = ({key, value}) => {
    setSignUpInfo({...signUpInfo, [key]: value});
  }

  const onSubmit = async () => {
    const errors = validateSignUpForm(signUpInfo);
    setErrors(errors);
    if (errors.email || errors.password) {
      return;
    }
    setLoading(true);
    try {
      const res = await handleSignUp(signUpInfo);
      setLoading(false);
      history.push('/login');
    } catch(err) {
      const {response} = err;
      const {data: {success, error_message}} = response || {data: {}};
      setLoading(false);
      alert(error_message);
    }
  }

  return (
    <>
      <HelmetComp title={"Sign Up"} />
      <div className="signup-page">
        <form className="needs-validation">
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              value={signUpInfo.firstName}
              onChange={(e) => onChange({key: 'firstName', value: e.target.value})}
            />
            {formErrors.firstName ? (<div className="error">{formErrors.firstName}</div>) : null}
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter last name"
              value={signUpInfo.lastName}
              onChange={(e) => onChange({key: 'lastName', value: e.target.value})}
            />
            {formErrors.lastName ? (<div className="error">{formErrors.lastName}</div>) : null}
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={signUpInfo.email}
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
              value={signUpInfo.password}
              onChange={(e) => onChange({key: 'password', value: e.target.value})}
            />
            {formErrors.password ? (<div className="error">{formErrors.password}</div>) : null}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSubmit}>
            Sign up
          </button>
          <Loading loading={loading} />
        </form>
      </div>
    </>
  );
};

export default memo(SignUp);
