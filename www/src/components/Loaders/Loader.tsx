import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import classes from './loader.module.scss';

function Loader() {
  return (
    <div className={classes.loader}>
      <Spinner animation="border" role="status">
        <span hidden>Loading...</span>
      </Spinner>
    </div>
  );
}

export default React.memo(Loader);
