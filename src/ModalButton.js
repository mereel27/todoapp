import { Button } from '@nextui-org/react';

export default function ModalButton({ children, ...props}) {
  return (
    <Button
      size={props.size || 'lg'}
      css={{
        width: '100%',
        fontWeight: '$medium',
        minWidth: 'unset',
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
