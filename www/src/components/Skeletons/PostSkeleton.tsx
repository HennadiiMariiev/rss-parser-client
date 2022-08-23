import React from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

//@ts-ignore
import img from '../../assets/images/default-placeholder.png';

import './skeletons.module.css';

function PostSkeleton() {
  return (
    <Card className="skeleton-wrapper">
      <div className="skeleton-left-wrapper">
        <Card.Img variant="top" className="skeleton-image" src={img} />
      </div>
      <Card.Body className="skeleton-meta align-items-stretch">
        <Placeholder animation="glow" className="mb-3">
          <Placeholder xs={5} />
        </Placeholder>
        <Placeholder animation="glow" className="mb-3" as={Card.Title}>
          <Placeholder xs={4} className="skeleton-color" />{' '}
          <Placeholder xs={3} className="skeleton-color" />{' '}
          <Placeholder xs={3} className="skeleton-color" />{' '}
          <Placeholder xs={5} className="skeleton-color" />{' '}
          <Placeholder xs={3} className="skeleton-color" />
        </Placeholder>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder animation="glow" className="mb-2">
          <Placeholder xs={4} /> <Placeholder xs={3} /> <Placeholder xs={4} />
          <Placeholder xs={2} /> <Placeholder xs={4} /> <Placeholder xs={3} />{' '}
          <Placeholder xs={2} />
          <Placeholder xs={3} />
        </Placeholder>
        <Placeholder animation="glow" className="mb-3 text-end">
          <Placeholder xs={3} />
        </Placeholder>
        <Placeholder animation="glow">
          <Placeholder xs={3} className="skeleton-color" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

export default React.memo(PostSkeleton);
