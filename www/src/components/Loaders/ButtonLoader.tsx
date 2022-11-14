import React from 'react';
import { Spinner } from 'react-bootstrap';

function ButtonLoader() {
  return (
    <Spinner animation="border" variant="light" size="sm" className="me-2" />
  );
}

export default React.memo(ButtonLoader);
