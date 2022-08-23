import React, { useMemo, useState } from 'react';
import { Form, ToggleButton } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import {
  emailPattern,
  namePattern,
  passwordPattern,
} from '../../../config/vars';
import { isRegisterPage } from '../../helpers/isRegisterPage';
import { IFormMarkupProps } from '../../interfaces/interfaces';
import SignButton from './SignButton';

const NAME_HELPER_TEXT =
  'Your name must be 1-50 characters long, contain uppercase and lowercase letters, whitespace, dash, dot symbols. Example: "John Smith"';

const PASSWORD_HELPER_TEXT =
  'Your password must be 6-12 characters long, contain 1 uppercase, 1 lowercase letter, number, and special character (@$!%*?&.,_-). Example: "Qwerty123-"';

function WarningText({ text }: { text: string }): JSX.Element {
  return (
    <p className="mt-1 mb-1 small text-danger">
      Please provide a valid {text}.
    </p>
  );
}

function FormMarkup({
  onSubmit,
  handleSubmit,
  register,
  errors,
  isSignLoading,
}: IFormMarkupProps) {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const isRegistration = useMemo(() => isRegisterPage(location), [location]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isRegistration && (
        <Form.Group className="mb-3 w-100" controlId="formName">
          <Form.Label>
            Name <sup className="text-danger">*</sup>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            {...register('name', {
              required: true,
              maxLength: 30,
              pattern: namePattern,
            })}
          />
          {errors?.name && <WarningText text="name" />}
          {isRegistration && (
            <Form.Text id="nameHelpBlock" muted>
              {NAME_HELPER_TEXT}
            </Form.Text>
          )}
        </Form.Group>
      )}
      <Form.Group className="mb-3 w-100" controlId="formEmail">
        <Form.Label>
          Email <sup className="text-danger">*</sup>
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register('email', {
            required: true,
            maxLength: 50,
            pattern: emailPattern,
          })}
        />
        {errors?.email && <WarningText text="email" />}
      </Form.Group>

      <Form.Group className="mb-3 w-100" controlId="formPassword">
        <Form.Label>
          Password <sup className="text-danger">*</sup>
        </Form.Label>
        <div className="password-input">
          <Form.Control
            type={!showPassword ? 'password' : 'text'}
            placeholder="Password"
            {...register('password', {
              required: true,
              pattern: passwordPattern,
            })}
          />
          <ToggleButton
            variant="outline-secondary"
            value="1"
            id="toggle-check"
            type="checkbox"
            size="sm"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.currentTarget.checked)}
            className="toggle-button"
            aria-label="set password visibility"
          >
            🧐
          </ToggleButton>
        </div>
        {errors?.password && <WarningText text="password" />}
        {isRegistration && (
          <Form.Text id="passwordHelpBlock" muted>
            {PASSWORD_HELPER_TEXT}
          </Form.Text>
        )}
      </Form.Group>
      <SignButton
        isRegistration={isRegistration}
        isSignLoading={isSignLoading}
      />
    </Form>
  );
}

export default React.memo(FormMarkup);
