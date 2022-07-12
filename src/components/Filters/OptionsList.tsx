import React from 'react';
import { FixedSizeList } from 'react-window';

import { IOptionsListProps } from '../../interfaces/interfaces';
import { inlineListStyles } from './inlineListStyle';

function List({ total, optionData, children }: IOptionsListProps) {
  return (
    <FixedSizeList
      innerElementType="ul"
      height={250}
      width={'100%'}
      itemCount={total}
      itemSize={29}
      itemData={optionData}
      style={inlineListStyles}
    >
      {children}
    </FixedSizeList>
  );
}

export default React.memo(List);
