import { Button, styled, Radio } from '@nextui-org/react';
import { eventColorsMap } from './utils';
import TickIcon from './IconsComponents/TickIcon';

const ColorButton = styled(Button, {
  variants: {
    size: {
      colorRound: {
        minWidth: '45px',
        flexBasis: '50px',
        height: 'unset',
        aspectRatio: 1 / 1,
        borderRadius: '50%',
      },
    },
  },
  '&:focus-visible': {
    outline: '2px ridge $primary'
  }
});

const ColorsRadioGroup = styled(Radio.Group, {
  '.nextui-radio-group-items' : {
    gap: '10px',
    padding: '10px 0',
  },
  '.nextui-radio-group-label': {
    fontWeight: '$semibold',
    marginBottom: '$3',
    lineHeight: '$md',
    color: '$text',
  },
});

export default function ColorButtons({
  colors,
  currentColor,
  handleClick,
  ...props
}) {
  return (
    <ColorsRadioGroup
      value={currentColor}
      orientation="horizontal"
      onChange={handleClick}
      label='Select color'
      {...props}
    >
      {colors.map((color, index) => (
        <ColorButton
          key={index}
          color={eventColorsMap[color]}
          size="colorRound"
          shadow={currentColor === color}
          icon={currentColor === color ? <TickIcon size='40' /> : ''}
          onPress={() => handleClick(color)}
          aria-label={color}
          aria-checked={currentColor === color}
          value={color}
          role="radio"
          tabIndex={currentColor === color ? 0 : -1}
        />
      ))}
    </ColorsRadioGroup>
  );
}
