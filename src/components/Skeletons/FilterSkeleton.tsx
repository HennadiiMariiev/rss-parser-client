import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';

import './skeletons.module.css';

function ItemSkeleton() {
  const width = ~~(Math.random() * 7 + 3);
  return (
    <Placeholder animation="glow" className="p-0 w-100 mb-2">
      <Placeholder xs={1} /> <Placeholder xs={width} />
    </Placeholder>
  );
}

function FilterSkeleton() {
  const skeletons = Array.from({ length: 8 }, (_, idx) => <ItemSkeleton key={idx} />);

  return <div className="skeleton-filter">{skeletons}</div>;
}

export default React.memo(FilterSkeleton);
