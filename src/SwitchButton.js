import { Button } from '@nextui-org/react';

export default function SwitchButton({ active, handleClick, view, children }) {
  return (
    <Button
      auto
      css={{
        fontSize: 'inherit',
        borderRadius: 'inherit',
        width: active ? '155px' : 'calc(100% - 155px)',
        height: '100%',
        flexGrow: active ? 0 : 1,
        color: active ? '' : '$text',
        backgroundColor: 'transparent',
        transition: 'width .2s linear',
        zIndex: '0',
      }}
      onPress={() => handleClick(view)}
    >
      {children}
    </Button>
  );
}
