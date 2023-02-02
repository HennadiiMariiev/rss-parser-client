import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

import { imageUrlPattern, LHLinkPattern } from '../../../config/vars/regexp';
import { IPostModalMarkupProps } from '../../interfaces/interfaces';
import ButtonLoader from '../Loaders/ButtonLoader';

import classes from './modal.module.scss';

function WarningText({ text }: { text: string }): JSX.Element {
  return (
    <p className="mt-1 mb-1 small text-danger">
      Please provide a valid {text}.
    </p>
  );
}

function PostModalMarkup({
  show,
  onHide,
  creatorsOptions,
  loading,
  onSubmit,
  handleSubmit,
  OptionsList,
  register,
  imgSrc,
  errors,
  isEdit = false,
}: IPostModalMarkupProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      centered
      size="xl"
      fullscreen="sm-down"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit post' : 'New post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2 w-100" controlId="post-title">
            <Form.Label id="post-title" className={classes.title}>
              Title
            </Form.Label>
            <Form.Control
              placeholder="Title"
              aria-describedby="post-title"
              {...register('title', {
                required: true,
                minLength: 10,
                maxLength: 100,
              })}
            />
            {errors?.title && <WarningText text="title" />}
          </Form.Group>

          <Form.Group className="mb-2 w-100" controlId="post-description">
            <Form.Label id="post-description" className={classes.title}>
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              aria-describedby="post-description"
              {...register('description', {
                required: true,
                minLength: 10,
                maxLength: 1000,
              })}
            />
            {errors?.description && (
              <WarningText
                text={`description ${errors?.description?.message}`}
              />
            )}
          </Form.Group>

          <Form.Group className={classes.imageWrapper} controlId="post-image">
            <Form.Label id="post-image" className={classes.title}>
              Image link
            </Form.Label>
            <Form.Control
              className="mb-2"
              placeholder="Link to related image"
              aria-describedby="post-image"
              {...register('image', {
                required: true,
                minLength: 10,
                maxLength: 500,
                pattern: imageUrlPattern,
              })}
            />
            {errors?.image && (
              <WarningText text={`image link ${errors?.image?.message}`} />
            )}
            <img
              src={imgSrc}
              alt="Post Image Preview"
              width="200"
              height="100"
            />
          </Form.Group>

          <Form.Group className="mb-2 w-100" controlId="post-link">
            <Form.Label id="post-link" className={classes.title}>
              Post Link
            </Form.Label>
            <Form.Control
              placeholder="https://lifehacker.com/..."
              aria-describedby="post-link"
              {...register('link', {
                required: true,
                maxLength: 500,
                pattern: LHLinkPattern,
              })}
            />
            {errors?.link && <WarningText text="post link" />}
          </Form.Group>

          <Form.Label id="post-creator" className={classes.title}>
            Creator
          </Form.Label>
          <Form.Select
            placeholder="Creator"
            aria-describedby="post-creator"
            {...register('creator', { required: true })}
            className="mb-2"
          >
            {creatorsOptions}
          </Form.Select>
          <Form.Label id="post-categories" className={classes.title}>
            Categories
          </Form.Label>
          <OptionsList />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit" disabled={loading}>
            {loading && <ButtonLoader />}
            {!loading ? 'Save' : 'Saving...'}
          </Button>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default PostModalMarkup;
