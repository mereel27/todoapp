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
      work: {
        backgroundColor: '$secondary',
      },
      study: {
        backgroundColor: '$success',
      },
      entertainment: {
        backgroundColor: '$warning',
      },
      workout: {
        backgroundColor: '$error',
      },
    }
  }
});

export default function EventMark({category}) {
  return (
    <Mark color={category}/>
  )
}