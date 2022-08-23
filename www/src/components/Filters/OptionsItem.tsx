import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';

import { IOptionsItemProps } from '../../interfaces/interfaces';

function OptionsItem({
  style,
  _id,
  optionName,
  name,
  index,
  onChange,
  checked,
  setChecked,
}: IOptionsItemProps) {
  const onCheckChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e, index);
      setChecked((prev: boolean[]) => {
        prev[index] = !prev[index];
        return prev;
      });
    },
    [onChange, setChecked, index],
  );
  return (
    <li style={{ ...style, paddingLeft: '0.5rem', paddingTop: '3px' }}>
      <Form.Check
        inline
        value={_id}
        label={name}
        name={optionName}
        type="checkbox"
        id={`${optionName}-${_id}`}
        onChange={onCheckChange}
        checked={checked[index]}
      />
    </li>
  );
}

export default React.memo(OptionsItem);
