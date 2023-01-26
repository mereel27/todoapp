import { Checkbox, Grid } from '@nextui-org/react';

export default function EventCheckbox({
  children,
  isSelected,
  lineThrough,
  onChange,
  disabled,
  ...props
}) {
  return (
    <Checkbox
      aria-label="Switch event status"
      isRounded
      lineThrough={lineThrough}
      onChange={onChange}
      isSelected={isSelected}
      color="success"
      css={{
        minWidth: 0,
        pointerEvents: disabled ? 'none' : '',
        '.nextui-checkbox-text': {
          maxWidth: '250px',
          fontSize: '$md',
          fontWeight: '$semibold',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
      }}
      {...props}
    >
      <Grid
        css={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {children}
      </Grid>
    </Checkbox>
  );
}
