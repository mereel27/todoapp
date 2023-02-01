import { Popover, Grid, Button, Text, styled } from '@nextui-org/react';

const PopoverButton = styled(Button, {
  flexBasis: '50%',
  flexGrow: 1,
  borderRadius: '$xs',
  display: 'inline-flex',
  fontSize: '$md !important',
});

export default function DeleteEventDialog({
  open,
  setOpen,
  children,
  itemsQuantity,
  handleDelete,
}) {
  return (
    <Popover
      placement="top"
      isBordered
      isOpen={open}
      onOpenChange={setOpen}
      disableAnimation
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content
        css={{
          borderRadius: '$xs',
          p: '$5 $7',
          textAlign: 'center',
        }}
      >
        <Text span weight="semibold" css={{ display: 'block' }}>
          Сonfirm
        </Text>
        <Text size="$sm">
          Are you sure you want to delete{' '}
          {itemsQuantity ? (
            <Text span weight="bold">
              {itemsQuantity}
            </Text>
          ) : (
            'this'
          )}{' '}
          event{`${itemsQuantity && itemsQuantity > 1 ? 's' : ''}?`}
        </Text>
        <Grid css={{ display: 'flex', marginTop: '$5', gap: '$5' }}>
          <PopoverButton auto light onPress={() => setOpen(false)}>
            Cancel
          </PopoverButton>
          <PopoverButton auto shadow color="error" onPress={handleDelete}>
            Delete
          </PopoverButton>
        </Grid>
      </Popover.Content>
    </Popover>
  );
}
