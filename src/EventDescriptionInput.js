import { Textarea } from '@nextui-org/react';

export default function EventDescriptionInput(props) {
  return (
    <Textarea
      css={{
        marginBottom: '30px',
        '.nextui-input-block-label': {
          fontWeight: '$semibold',
          color: '$text',
          padding: 0,
        },
        '& textarea': {
          '&::placeholder': {
            color: '$inputPlaceholder !important',
          },
          padding: '8px 0',
          margin: '$2 $5 !important',
          height: '100% !important',
        },
        '.nextui-input-wrapper': {
          width: '100%',
          overflowX: 'hidden',
        },
        '.nextui-input-container': {
          height: 'unset',
        },
      }}
      {...props}
    />
  );
}
