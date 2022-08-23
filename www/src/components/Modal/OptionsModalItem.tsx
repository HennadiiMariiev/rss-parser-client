import React from 'react';
import { Form } from 'react-bootstrap';

import { IOptionsModalItemProps } from '../../interfaces/interfaces';

function OptionsModalItem({
  style,
  _id,
  optionName,
  name,
  checked,
  setChecked,
}: IOptionsModalItemProps) {
  return (
    <li style={{ ...style, paddingLeft: '0.5rem', paddingTop: '3px' }}>
      <Form.Check
        inline
        value={_id}
        label={name}
        name={optionName}
        type="checkbox"
        id={`${optionName}-modal-${_id}`}
        onChange={(e) => {
          e.target.checked
            ? setChecked((prev) => [...prev, e.target.value])
            : setChecked((prev) => [
                ...prev.filter((i) => i !== e.target.value),
              ]);
        }}
        checked={checked.includes(_id)}
      />
    </li>
  );
}

export default React.memo(OptionsModalItem);
