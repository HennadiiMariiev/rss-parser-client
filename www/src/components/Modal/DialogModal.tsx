import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

import { IDialogModalProps } from '../../interfaces/interfaces';

function DialogModal({
  showModal,
  onCloseModal,
  onConfirm,
}: IDialogModalProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => setLoading(false);
  });

  const onConfirmClick = useCallback(() => {
    setLoading(true);
    if (onConfirm) {
      onConfirm();
    }
  }, [setLoading, onConfirm]);

  return (
    <Modal show={showModal} onHide={onCloseModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Please, confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete this post?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onConfirmClick} disabled={loading}>
          {loading && (
            <Spinner
              animation="border"
              variant="light"
              size="sm"
              className="me-2"
            />
          )}
          {!loading ? 'Delete' : 'Deleting...'}
        </Button>
        <Button variant="secondary" onClick={onCloseModal} disabled={loading}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default React.memo(DialogModal);
