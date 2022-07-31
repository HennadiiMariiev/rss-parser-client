import React from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { IOptionsItemProps } from '../../interfaces/interfaces';
import { prepareName } from '../../helpers/prepareName';
import { OPTION_NAME_SLICE_COUNT } from '../../../config/vars';

function OptionsItem({ style, _id, optionName, name, index, onChange, checked, setChecked }: IOptionsItemProps) {
 const FormCheck = () => {
  return (
    <li style={{ ...style, paddingLeft: '0.5rem', paddingTop: '3px' }}>
      <Form.Check
        inline
        value={_id}
        label={prepareName(name)}
        name={optionName}
        type="checkbox"
        id={`${optionName}-${_id}`}
        onChange={(e) => {
        onChange(e, index);
        setChecked((prev: boolean[]) => {
            prev[index] = !prev[index];
            return prev;
          });
        }}
        checked={checked[index]}
      />
    </li>
  )
 };
  
  if (name.length > OPTION_NAME_SLICE_COUNT) {
    return (
      <OverlayTrigger
        key={`${optionName}-tooltip`}
        placement="bottom"
        overlay={<Tooltip id={`${optionName}-tooltip`}>{name}</Tooltip>}
      >
        <FormCheck />
      </OverlayTrigger>
    );
  }

  return <FormCheck />;
}

export default OptionsItem;
