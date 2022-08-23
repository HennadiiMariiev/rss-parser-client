import React from 'react';

import { IOptionsModalListProps } from '../../interfaces/interfaces';
import List from '../Filters/OptionsList';
import OptionsModalItem from './OptionsModalItem';

function OptionsModalList({
  data,
  optionName,
  checked,
  setChecked,
  height = 250,
}: IOptionsModalListProps) {
  return (
    <List total={data.length} optionData={data} height={height}>
      {({ data, index, style }) => {
        const { name, _id } = data[index];
        return (
          <OptionsModalItem
            style={style}
            _id={_id}
            optionName={optionName}
            name={name}
            checked={checked}
            setChecked={setChecked}
          />
        );
      }}
    </List>
  );
}

export default React.memo(OptionsModalList);
