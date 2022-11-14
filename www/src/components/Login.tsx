import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../layouts/Header';
import Logo from './NavBar/Logo';
import UserMenu from './NavBar/UserMenu';
import SignForm from './SignForm/SignForm';
import Container from '../layouts/Container';
import { useAppContext } from '../providers/ContextProvider';

function Login() {
  const { admin } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (admin.isLoggedIn) {
      return navigate('/');
    }
  }, [admin.isLoggedIn]);

  return (
    <React.Fragment>
      <Header>
        <Logo />
        <UserMenu />
      </Header>
      <Container>
        <SignForm />
      </Container>
    </React.Fragment>
  );
}

export default React.memo(Login);
