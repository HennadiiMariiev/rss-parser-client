import React from 'react';
import { Button } from 'react-bootstrap';

interface ILightButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  className?: string;
  disabled?: boolean;
}

function LightButton({
  onClick,
  text,
  className,
  ...props
}: ILightButtonProps) {
  return (
    <Button
      variant="light"
      size="sm"
      className={className}
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
}

export default React.memo(LightButton);
