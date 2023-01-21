import { Button, styled } from '@nextui-org/react';
import { Check } from 'iconsax-react';

/* const CheckedIcon = styled(BsCheckCircleFill, {
  color: '$success',
});

const Icon = styled(BsCheckCircle, {
  color: '$accents8',
}); */

export default function CheckButton({ checked, ...props }) {
  return (
    <Button
      auto
      rounded
      css={{
        width: '30px',
        height: '30px',
        padding: '5px',
        fontSize: '18px',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: '$accents0'
        }
      }}
      icon={checked ? <Check /> : <Check />}
      {...props}
    ></Button>
  );
}
