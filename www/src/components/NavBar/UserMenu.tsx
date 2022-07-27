import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useLogout } from '../../api/auth';
import { getAdminName } from '../../helpers/getAdminName';
import { showError, showInfo } from '../../helpers/messageHelpers';
import useStorageToken from '../../hooks/useStorageToken';
import { useAppContext } from '../../providers/ContextProvider';
import UserMenuSkeleton from '../Skeletons/UserMenuSkeleton';

import './navbar.module.css';

function UserMenu() {
  const { admin, setAdmin, setMessage } = useAppContext();
  const [refreshToken, setRefreshToken] = useStorageToken('refreshToken', '');
  const { mutate, isSuccess, isError } = useLogout();

  useEffect(() => {
    if (isSuccess && refreshToken) {
      setRefreshToken('');
      setAdmin({
        isEmailVerified: false,
        isLoggedIn: false,
        isAuthInProgress: false,
        name: '',
        email: '',
        accessToken: '',
        refreshToken: '',
      });
      showInfo(setMessage, 'Goodbye! See you next time! 👋')
    }
    if(isError) {
      showError(setMessage, 'Can`t perform logout! 🙄')
    }
  }, [isSuccess, isError, setAdmin, refreshToken, setRefreshToken, setMessage]);

  const onLogOut = () => {
    if (admin.refreshToken) {
      mutate(admin.refreshToken);
    }
  };

  if (admin.isAuthInProgress) {
    return <UserMenuSkeleton />;
  }

  if (admin?.isLoggedIn) {
    return (
      <div className="user-menu">
        <span className="logo-emoji">👤</span> {getAdminName(admin)}
        <Button variant="light" size="sm" className="ms-3 border-0" onClick={onLogOut}>
          👣 LogOut
        </Button>
      </div>
    );
  }

  return (
    <div className="user-menu">
      <span className="logo-emoji">👤</span>Welcome,&nbsp;
      <Link to="/login" className="user-menu-name">
        {' '}
        guest!
      </Link>
    </div>
  );
}

export default React.memo(UserMenu);
