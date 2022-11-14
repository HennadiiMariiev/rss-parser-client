import React, { useCallback } from 'react';
import { Toast } from 'react-bootstrap';

import { useAppContext } from '../../providers/ContextProvider';

import classes from './toast.module.scss';

function ToastMessage() {
  const { setMessage, message } = useAppContext();
  const { text, show, isError } = message;

  const onClose = useCallback(() => {
    setMessage({ text: '', show: false, isError: false });
  }, [setMessage]);

  return (
    <div className={classes['toast-wrapper']}>
      <Toast
        show={show}
        onClose={onClose}
        className={classes['toast-message']}
        delay={3000}
        autohide
      >
        <Toast.Header className={classes['toast-header']}>
          <span className="rounded me-2">{!!isError ? '❌' : 'ℹ️'}</span>
          <strong className="me-auto">{!!isError ? 'Error' : 'Info'}</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body>{text as string}</Toast.Body>
      </Toast>
    </div>
  );
}

export default React.memo(ToastMessage);
