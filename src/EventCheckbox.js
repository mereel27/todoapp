import { Checkbox } from '@nextui-org/react';

export default function EventCheckbox({ children, isSelected, lineThrough, onChange,...props}) {
  return (
    <Checkbox
      aria-label='Switch event status'
      isRounded
      lineThrough={lineThrough}
      onChange={onChange}
      isSelected={isSelected}
      color='success'
      css={{
        '.nextui-checkbox-text': {
          fontSize: '$md',
          fontWeight: '$semibold'
        }
      }}
      {...props}
    >
    {children}
    </Checkbox>
  )
}
