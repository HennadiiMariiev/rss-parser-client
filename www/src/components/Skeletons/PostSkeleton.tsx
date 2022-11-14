import React from 'react';
import cn from 'classnames';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

import img from '../../assets/images/default-placeholder.png';

import classes from './skeletons.module.scss';

function PostSkeleton() {
  return (
    <Card className={classes['skeleton-wrapper']}>
      <div className={classes['skeleton-left-wrapper']}>
        <Card.Img
          variant="top"
          className={classes['skeleton-image']}
          src={img}
          alt="image placeholder"
          loading="lazy"
        />
      </div>
      <Card.Body
        className={cn(classes['skeleton-meta'], 'align-items-stretch')}
      >
        <Placeholder animation="glow" className="mb-3">
          <Placeholder xs={5} />
        </Placeholder>
        <Placeholder animation="glow" className="mb-3" as={Card.Title}>
          <Placeholder xs={4} className={classes['skeleton-color']} />{' '}
          <Placeholder xs={3} className={classes['skeleton-color']} />{' '}
          <Placeholder xs={3} className={classes['skeleton-color']} />{' '}
          <Placeholder xs={5} className={classes['skeleton-color']} />{' '}
          <Placeholder xs={3} className={classes['skeleton-color']} />
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
          <Placeholder xs={3} className={classes['skeleton-color']} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

export default React.memo(PostSkeleton);
