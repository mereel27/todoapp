import { styled } from "@nextui-org/react";

const Mark = styled('div', {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  flexShrink: 0,
  border: '1px solid white',
  boxSizing: 'border-box',
  variants: {
    color: {
      violet: {
        backgroundColor: '$secondary',
      },
      green: {
        backgroundColor: '$success',
      },
      orange: {
        backgroundColor: '$warning',
      },
      red: {
        backgroundColor: '$error',
      },
    }
  }
});

export default function EventMark({color}) {
  return (
    <Mark color={color}/>
  )
}