import { Input } from '@nextui-org/react';

export default function EventInput(props) {
  return (
    <Input
      fullWidth
      size="lg"
      css={{
        marginBottom: '30px',
        '& > label': {
          fontWeight: '$semibold',
          color: '$text',
          padding: 0,
        },
        '& input': { 
          '&::placeholder': {
            color: '$inputPlaceholder !important'
          },
          padding: '10px 0',
          cursor: props.name === 'date' || props.name === 'notification' ? 'pointer' : '',
          color: props.name === 'notification' ? 'transparent' : '',
        },
        '.nextui-input-wrapper': {
          width: '100%',
          overflowX: 'hidden',
        },
        '.nextui-input-content': props.name === 'notification' ? {
          padding: '10px 0',
          gap: '10px',
          position: 'absolute',
          width: 'calc(100% - 20px)',
          overflow: 'hidden',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: 'auto',
          height: 'unset',
          '&:after': {
            content: '',
            position: 'absolute',
            right: 0,
            width: '20px',
            height: '100%',
            background: 'linear-gradient(to right, transparent, var(--nextui--inputColor))'
          }
        } : {
          padding: '0 10px 0 20px',
          fontSize: '20px',
          color: '$accents6',
          height: '100%',
          flexShrink: 0,
          display: 'inline-flex',
          justifyContent: 'center'
        },
        '.nextui-input-container': {
          height: 'unset',
        },
        '.nextui-input-helper-text': {
          fontWeight: '$semibold'
        }
      }}
      {...props}
    />
  );
}
