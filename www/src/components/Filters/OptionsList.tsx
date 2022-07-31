import React from 'react';
import { FixedSizeList } from 'react-window';

import { IOptionsListProps } from '../../interfaces/interfaces';
import { inlineListStyles } from './inlineListStyle';

function List({ total, optionData, children, height = 250, listRef }: IOptionsListProps) {
  return (
    <FixedSizeList
      ref={el => (listRef.current = el)}
      innerElementType="ul"
      height={height}
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
