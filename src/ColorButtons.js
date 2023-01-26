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
  categories,
  currentCategory,
  handleClick,
  ...props
}) {
  return (
    <ColorsRadioGroup
      value={currentCategory}
      orientation="horizontal"
      onChange={handleClick}
      label='Select color'
      {...props}
    >
      {categories.map((cat, index) => (
        <ColorButton
          key={index}
          color={eventColorsMap[cat]}
          size="colorRound"
          shadow={currentCategory === cat}
          icon={currentCategory === cat ? <TickIcon size='40' /> : ''}
          onPress={() => handleClick(cat)}
          aria-label={cat}
          aria-checked={currentCategory === cat}
          value={cat}
          role="radio"
          tabIndex={currentCategory === cat ? 0 : -1}
        />
      ))}
    </ColorsRadioGroup>
  );
}
