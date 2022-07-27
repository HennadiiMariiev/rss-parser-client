import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { ISignButton } from '../../interfaces/interfaces';

function SignButton({ isRegistration, isSignLoading }: ISignButton) {
  if (isSignLoading) {
    return (
      <Button type="submit" className="submit-button" disabled>
        <Spinner animation="border" variant="light" size="sm" className="me-2" />
        Loading...
      </Button>
    );
  }

  return (
    <Button type="submit" className="submit-button">
      {isRegistration ? '✍🏻 Register' : '🏃‍♂️ Log In'}
    </Button>
  );
}

export default SignButton;
