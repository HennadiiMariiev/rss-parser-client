import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { IMobileMenuProps } from '../../interfaces/interfaces';

import './navbar.module.css';

const options = {
  scroll: true,
  backdrop: true,
};

function MobileMenu({ show, setShow, children }: IMobileMenuProps) {
  const handleClose = () => setShow(false);

  return (
    <Offcanvas show={show} onHide={handleClose} className="menu__wrapper" {...options}>
      <Offcanvas.Header closeButton className="menu-header">
        <Offcanvas.Title className="d-flex">
          <span className="logo-emoji">📰</span>LifeHacker
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="menu-body">{children}</Offcanvas.Body>
    </Offcanvas>
  );
}

export default React.memo(MobileMenu);
