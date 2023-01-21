import { Textarea } from '@nextui-org/react';

export default function EventDescriptionInput(props) {
  return (
    <Textarea
      shadow={false}
      /* underlined */
      color='primary'
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
          borderRadius: '$md',
          width: '100%',
          overflowX: 'hidden',
          '&:focus-within': {
            outline: '2px solid $blue300',
            transition: 'outline 0s',
          },
        },
        '.nextui-input-container': {
          height: 'unset',
        },
      }}
      {...props}
    />
  );
}
