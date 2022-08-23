import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import { namePattern } from '../../../config/vars';
import {
  IEditOptionModalProps,
  IOptionForm,
} from '../../interfaces/interfaces';
import { useAddOption, useDeleteOptions } from '../../api/option';
import { useAppContext } from '../../providers/ContextProvider';
import { extractErrors, getErrorMessage } from '../../helpers/getErrorMessage';
import OptionsModalList from './OptionsModalList';
import { showInfo, showError } from '../../helpers/messageHelpers';
import ButtonLoader from '../Loaders/ButtonLoader';

function EditOptionModal({
  showModal,
  onCloseModal,
  optionName,
  optionData,
}: IEditOptionModalProps) {
  const { setMessage } = useAppContext();
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const optionNameStr = optionName === 'categories' ? 'category' : 'creator';
  const useAdd = useAddOption(optionName);
  const useDelete = useDeleteOptions(optionName);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IOptionForm>();

  useEffect(() => {
    if (useAdd.isSuccess) {
      showInfo(
        setMessage,
        `New ${optionNameStr} has been added successfully 👌`,
      );
      reset({ name: '' });
    }
    if (useDelete.isSuccess) {
      showInfo(setMessage, `Deleted successfully 👌`);
    }
    if (useAdd.isError || useDelete.isError) {
      const errors = extractErrors(useAdd, useDelete);
      const message = getErrorMessage(errors);
      showError(setMessage, message);
    }
    useAdd.reset();
    useDelete.reset();
  }, [
    useAdd.isSuccess,
    useAdd.isError,
    useDelete.isError,
    useDelete.isSuccess,
    setMessage,
  ]);

  const OptionsList = useCallback(() => {
    const data = Array.isArray(optionData) ? optionData : [];
    const [checked, setChecked] = useState<string[]>([]);

    useEffect(() => setCheckedOptions(checked), [checked]);

    return (
      <OptionsModalList
        data={data}
        checked={checked}
        setChecked={setChecked}
        optionName={optionName}
      />
    );
  }, [optionData]);

  const onSubmit: SubmitHandler<IOptionForm> = useCallback(
    (option) => {
      useAdd.mutate({ option, optionName });
    },
    [useAdd, optionName],
  );

  const onDeleteClick = useCallback(() => {
    useDelete.mutate({ options: checkedOptions, optionName });
  }, [useDelete, checkedOptions]);

  const onHide = useCallback(() => {
    clearErrors();
    onCloseModal();
  }, [clearErrors, onCloseModal]);

  const isDeleteDisabled =
    useAdd.isLoading || useDelete.isLoading || !checkedOptions.length;
  const isAddDisabled = useAdd.isLoading || useDelete.isLoading;

  return (
    <Modal show={showModal} onHide={onHide} backdrop="static" centered>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {optionName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column mb-3">
            <h5>Delete {optionNameStr}</h5>
            <OptionsList />
            <Button
              variant="danger"
              onClick={onDeleteClick}
              disabled={isDeleteDisabled}
              className="align-self-end mt-3"
            >
              {useDelete.isLoading && <ButtonLoader />}
              {!useDelete.isLoading ? 'Delete' : 'Deleting...'}
            </Button>
          </div>
          <h5>Add new {optionNameStr}</h5>
          <Form.Label id="option-name">Name</Form.Label>
          <InputGroup className="mb-3 d-flex flex-column">
            <Form.Control
              placeholder="Name"
              aria-describedby="option-name"
              className="w-100"
              {...register('name', {
                required: true,
                maxLength: 30,
                pattern: namePattern,
              })}
            />
            {errors?.name && (
              <p className="small text-danger mb-0 mt-1">
                Please provide a valid {optionNameStr} name
              </p>
            )}
          </InputGroup>
          <div className="d-flex justify-content-end mt-2">
            <Button
              variant="danger"
              type="submit"
              disabled={isAddDisabled}
              className="me-2"
            >
              {useAdd.isLoading && <ButtonLoader />}
              {!useAdd.isLoading ? 'Add' : 'Adding...'}
            </Button>
            <Button variant="secondary" onClick={onCloseModal}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default React.memo(EditOptionModal);
