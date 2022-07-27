import React from 'react';
import { Toast } from 'react-bootstrap';

import { useAppContext } from '../../providers/ContextProvider';

import './toast.module.css';

function ToastMessage() {    
  const { setMessage, message} = useAppContext();
  const {text, show, isError} = message;

  const onClose = () => {
      setMessage({text: '', show: false, isError: false});
  };

  return (
    <div className="toast-wrapper">
        <Toast show={show} onClose={onClose} className='toast-message' delay={3000} autohide>
            <Toast.Header className='toast-header'>  
                <span className="rounded me-2">{!!isError ? "❌" : "ℹ️"}</span>
                <strong className="me-auto">{!!isError ? "Error" : "Info"}</strong>
                <small>now</small>
            </Toast.Header>
            <Toast.Body>{text as string}</Toast.Body>
        </Toast>
    </div>
  );
}

export default ToastMessage;
