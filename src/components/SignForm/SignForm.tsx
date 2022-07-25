import React, { useEffect, useMemo } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";

import { IFormValues } from '../../interfaces/interfaces';
import { isRegisterPage } from '../../helpers/isRegisterPage';
import { useSignInAndSignUp } from '../../api/auth';
import { useAppContext } from '../../providers/ContextProvider';
import { SIGNUP_SUCCESS_MESSAGE } from '../../../config/vars/constants';
import FormMarkup from './FormMarkup';
import useStorageToken from '../../hooks/useStorageToken';

import './form.module.css';
import { getAdminName } from '../../helpers/getAdminName';
import { showError, showInfo } from '../../helpers/messageHelpers';
import { extractErrors, getErrorMessage } from '../../helpers/getErrorMessage';

function SignForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAdmin, setMessage } = useAppContext();
  const [, setRefreshToken] = useStorageToken('refreshToken', '');
  const [, setAccessToken] = useStorageToken('accessToken', '');

  const { mutate: signIn, data, isSuccess, isError: isSignError, error: signError, isLoading: isSignLoading } = useSignInAndSignUp();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>();

  const isRegistration = useMemo(() => isRegisterPage(location), [location]);

  useEffect(() => {
   try {
    if(isSuccess && !isRegistration) {
      const admin = data?.data?.data?.admin;
      const { accessToken, refreshToken } = data?.data?.data?.tokens; 

      setAdmin({...admin, isLoggedIn: true, isAuthInProgress: false, accessToken, refreshToken});
      setRefreshToken(refreshToken);
      setAccessToken(accessToken);
      showInfo(setMessage, `Welcome back, ${getAdminName(admin)}! 🙌`);
      return navigate("/");
    } else if (isSuccess && isRegistration) {
      showInfo(setMessage, SIGNUP_SUCCESS_MESSAGE);
    }
    if(isSignError) {
      const message = getErrorMessage({ isSignError, signError});
      showError(setMessage, message);
    }
   } catch (error) {
     console.log(error);
   }
  }, [isSuccess, isSignError, setMessage, navigate, setAdmin, isRegistration])

  const onSubmit : SubmitHandler<IFormValues> = user => {
    const action = isRegistration ? "registration" : "login";
    signIn({user, action});
  };

  return (
    <div className="sign-form">
      <Nav defaultActiveKey="/login" as="ul" className="mb-3">
        <Nav.Item as="li" className="me-3">
          <NavLink to="/login" className={!isRegistration ? 'active' : undefined}>
            Login
          </NavLink>
        </Nav.Item>
        <Nav.Item as="li">
          <NavLink to="/register" className={isRegistration ? 'active' : undefined}>
            Register
          </NavLink>
        </Nav.Item>
      </Nav>
      <FormMarkup 
        handleSubmit={handleSubmit} 
        onSubmit={onSubmit} 
        register={register} 
        errors={errors} 
        isSignLoading={isSignLoading} 
        isSignError={isSignError} 
        signError={signError}
      />
    </div>
  );
}

export default React.memo(SignForm);
