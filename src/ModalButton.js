import { Button } from '@nextui-org/react';
import { forwardRef } from 'react';

export default forwardRef(function ModalButton({ children, regular,...props}, ref) {
  return (
    <Button
      ref={ref}
      size={props.size || 'lg'}
      css={{
        width: '100%',
        fontWeight: '$medium',
        minWidth: 'unset',
        borderRadius: '3px',
        '&:hover': {
          backgroundColor: regular ? '$blue700' : '',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
});
