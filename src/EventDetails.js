import { eventColorsMap } from './utils';
import { Modal, Text, Card, Grid, styled } from '@nextui-org/react';
import DeleteEventDialog from './DeleteEventDialog';
import EventCheckbox from './EventCheckbox';
import ModalButton from './ModalButton';
import { Calendar } from 'iconsax-react';
import { getDateObject, formatDate } from './utils';
import { useState } from 'react';

const CalendarIcon = styled(Calendar, {
  marginRight: '10px',
  fontSize: '18px',
  color: '$text',
});

export default function EventDetails({
  open,
  event,
  handleClose,
  handleEventCheckClick,
  handleDeleteEvent,
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const deleteEvent = () => {
    setDialogOpen(false);
    handleClose(false);
    setTimeout(() => handleDeleteEvent(event), 200);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      css={{ padding: '$10' }}
      blur
      closeButton
    >
      <Modal.Header
        noPadding
        justify="flex-start"
        css={{ marginBottom: '$10' }}
      >
        <Card
          css={{
            borderRadius: '50%',
            backgroundColor: `$${eventColorsMap[event.color]}`,
            width: '10px',
            height: '10px',
            margin: '0 5px',
          }}
        ></Card>
        <Text
          h4
          css={{
            textDecoration: event.isDone ? 'line-through' : null,
            marginLeft: '10px',
            fontWeight: '$semibold',
            whiteSpace: 'nowrap',
          }}
        >
          {event.name}
        </Text>
      </Modal.Header>
      <Modal.Body noPadding css={{ marginBottom: '$10' }}>
        <Grid css={{ display: 'flex', alignItems: 'center' }}>
          <CalendarIcon />
          <Text span>{formatDate(getDateObject(event.date).dateObject)}</Text>
        </Grid>
        <Card.Divider css={{ marginBottom: '$8' }}></Card.Divider>
        <Text>{event.description}</Text>
        <Card.Divider css={{ marginBottom: '$10' }}></Card.Divider>
        <Grid css={{ display: 'flex', alignItems: 'center' }}>
          <EventCheckbox
            isSelected={event.isDone}
            onChange={() => handleEventCheckClick(event)}
          >
            {event.isDone ? 'completed' : 'uncompleted'}
          </EventCheckbox>
        </Grid>
      </Modal.Body>
      <Modal.Footer
        css={{
          flexWrap: 'nowrap',
          '@media (max-width: 320px)': { flexWrap: 'wrap' },
        }}
        noPadding
      >
        <DeleteEventDialog
          open={isDialogOpen}
          setOpen={setDialogOpen}
          handleDelete={deleteEvent}
        >
          <ModalButton color="error" aria-label="Delete event" flat auto>
            Delete
          </ModalButton>
        </DeleteEventDialog>
        <ModalButton
          color="primary"
          onPress={() => handleClose(false)}
          aria-label="Close modal"
          flat
          auto
        >
          Close
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
}
