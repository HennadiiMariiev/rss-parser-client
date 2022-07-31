import React from 'react';
import { Form } from 'react-bootstrap';

import { IOptionsItemProps } from '../../interfaces/interfaces';

function OptionsItem({ style, _id, optionName, name, index, onChange, checked, setChecked }: IOptionsItemProps) {
  return (
    <li style={{ ...style, paddingLeft: '0.5rem', paddingTop: '3px' }}>
      <Form.Check
        inline
        value={_id}
        label={name}
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
  );
}

export default OptionsItem;
