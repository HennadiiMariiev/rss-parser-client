import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { IMobileMenuProps } from '../../interfaces/interfaces';

import classes from './navbar.module.scss';
import UserMenu from './UserMenu';

const options = {
  scroll: true,
  backdrop: true,
};

function MobileMenu({ show, setShow, children }: IMobileMenuProps) {
  const handleClose = () => setShow(false);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      className={classes.menu__wrapper}
      {...options}
    >
      <Offcanvas.Header closeButton className={classes['menu-header']}>
        <Offcanvas.Title className="d-flex">
          <UserMenu />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={classes['menu-body']}>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default React.memo(MobileMenu);
