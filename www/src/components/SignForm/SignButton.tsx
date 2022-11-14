import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

import { ISignButton } from '../../interfaces/interfaces';

import classes from './form.module.scss';

function SignButton({ isRegistration, isSignLoading }: ISignButton) {
  if (isSignLoading) {
    return (
      <Button type="submit" className={classes['submit-button']} disabled>
        <Spinner
          animation="border"
          variant="light"
          size="sm"
          className="me-2"
        />
        Loading...
      </Button>
    );
  }

  return (
    <Button type="submit" className={classes['submit-button']}>
      {isRegistration ? '✍🏻 Register' : '🏃‍♂️ Log In'}
    </Button>
  );
}

export default React.memo(SignButton);
