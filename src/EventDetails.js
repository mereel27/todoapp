import { eventColorsMap } from './utils';
import { Modal, Text, Card, Grid, styled } from '@nextui-org/react';
import CheckButton from './CheckButton';
import ModalButton from './ModalButton';
import { Calendar } from 'iconsax-react';
import { getDateObject, formatDate } from './utils';

const CalendarIcon = styled(Calendar, {
  marginRight: '10px',
  fontSize: '18px',
});

export default function EventDetails({
  open,
  event,
  handleClose,
  handleEventCheckClick,
  handleDeleteEvent,
}) {
  const deleteEvent = () => {
    handleClose(false);
    setTimeout(() => handleDeleteEvent(event), 200);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      css={{ padding: '$10' }}
      blur
      width="500px"
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
          <CheckButton
            checked={event.isDone}
            onPress={() => handleEventCheckClick(event)}
          />
          <Text span weight="medium" css={{ marginLeft: '10px' }}>
            {event.isDone ? 'Completed' : 'Uncompleted'}
          </Text>
        </Grid>
      </Modal.Body>
      <Modal.Footer
        css={{
          flexWrap: 'nowrap',
          '@media (max-width: 320px)': { flexWrap: 'wrap' },
        }}
        noPadding
      >
        <ModalButton
          color="error"
          onPress={deleteEvent}
          aria-label="Close modal"
          flat
          auto
        >
          Delete
        </ModalButton>
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
