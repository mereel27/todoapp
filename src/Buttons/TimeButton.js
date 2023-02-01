import { memo } from 'react';
import { Button, styled } from '@nextui-org/react';

const TimeBtn = styled(Button, {
  fontWeight: '$semibold',
  '&:hover': {
    backgroundColor: '$primary',
    color: '$white',
  },
  variants: {
    color: {
      selectedTime: {
        backgroundColor: '$primary',
        color: '$white',
      },
      time: {
        backgroundColor: '$inputBg',
        color: '$text',
      },
    },
    size: {
      timeButton: {
        width: '60px',
        height: '40px',
        flexShrink: '0',
        flexGrow: '0',
        minWidth: 'unset',
        /* borderRadius: '$xs', */
      },
    },
  },
});

export default memo(function TimeButton({ children, ...props }) {
  return <TimeBtn {...props}>{children}</TimeBtn>;
});
