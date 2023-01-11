import { Input } from '@nextui-org/react';

export default function NewInput(props) {
  return (
    <Input
      size='lg'
      fullWidth
      underlined
      color='primary'
      css={{
        marginBottom: '30px',
        '& label': {
          color: props.status === 'error' ? '$error' : '$text',
          fontWeight: '$semibold',
        },
        '& input': { 
          '&::placeholder': {
            color: '$inputPlaceholder !important'
          },
          padding: '10px 0',
          cursor: props.name === 'date' || props.name === 'notification' ? 'pointer' : '',
          color: props.name === 'notification' ? 'transparent' : '',
        },
        '&[data-state="with-value"], &[data-state="hover"]': {
          '& label': {
            top: '-20px'
          }
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
          marginRight: '$3',
          marginLeft: '$3',
          height: 'unset',
          '&:after': {
            content: '',
            position: 'absolute',
            right: 0,
            width: '20px',
            height: '100%',
            background: 'linear-gradient(to right, transparent, white)'
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
        },
        '.nextui-input-wrapper': {
          borderRadius: '0',
          width: '100%',
          overflowX: 'hidden',
        },
      }}
      {...props}
    />
  );
}