import { Popover, Grid, Button, Text, styled } from '@nextui-org/react';

const PopoverButton = styled(Button, {
  flexBasis: '50%',
  flexGrow: 1,
  borderRadius: '3px',
  display: 'inline-flex',
  fontSize: '$md !important',
});

export default function DeleteEventDialog({
  open,
  setOpen,
  children,
  handleDelete,
}) {
  return (
    <Popover placement="top" isBordered isOpen={open} onOpenChange={setOpen}>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content
        css={{
          maxWidth: '250px',
          borderRadius: '3px',
          p: '$5',
          textAlign: 'center',
        }}
        className="HUUUUI"
      >
        <Text span weight="semibold" css={{ display: 'block' }}>
          Сonfirm
        </Text>
        <Text span size="$sm">
          Are you sure you want to delete this event?
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
