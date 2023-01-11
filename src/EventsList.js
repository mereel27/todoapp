import { useContext, useState, useCallback } from 'react';
import { Container, Text } from '@nextui-org/react';
import Event from './Event';
import { getShortDate, getMonthName } from './utils';
import EventDetails from './EventDetails';
import { Context } from './CalendarView';

export default function EventsList({ day }) {
  const [event, setEvent] = useState(null);
  const [deletedEvent, setDeletedEvent] = useState(null);
  const [open, setOpen] = useState(undefined);
  const {
    dateTime,
    currentEvents,
    deleteEvent,
    handleEventCheckClick,
    todoView,
  } = useContext(Context);

  const handleDetailsClick = (event) => {
    setEvent(event);
    setOpen(true);
  };

  const handleDeleteEvent = useCallback(
    (selectedEvent) => {
      setDeletedEvent(selectedEvent);
      setTimeout(() => deleteEvent(selectedEvent), 250);
    },
    [deleteEvent]
  );

  return (
    <Container
      css={{
        p: '$xl $xl 90px',
        backgroundColor: '$eventsBackground',
        flexGrow: 1,
        '@media (max-width: 450px)': {
          p: '$xl $md 90px',
        },
        '@media (max-width: 350px)': {
          p: '$md $sm 90px',
        },
      }}
    >
      <Text
        span
        size={24}
        weight="semibold"
        css={{ marginBottom: '22px', display: 'block' }}
      >
        {todoView === 'month' &&
          (day
            ? `${getShortDate(day)}, ${day.getFullYear()}`
            : `${getMonthName(dateTime)}, ${dateTime.getFullYear()}`)}
      </Text>
      {currentEvents && currentEvents.length > 0 ? (
        currentEvents.map((event) => {
          return (
            <Event
              event={event}
              key={event.id}
              handleClick={handleEventCheckClick}
              handleDetailsClick={handleDetailsClick}
              handleDeleteEvent={handleDeleteEvent}
              deleted={deletedEvent ? event.id === deletedEvent.id : false}
            />
          );
        })
      ) : (
        <Text css={{ textAlign: 'center' }}>
          {(day && 'No events on this day') || 'No events on this month'}
        </Text>
      )}
      {event && (
        <EventDetails
          open={open}
          handleClose={setOpen}
          event={event}
          handleEventCheckClick={handleEventCheckClick}
          handleDeleteEvent={handleDeleteEvent}
        />
      )}
    </Container>
  );
}
