import { useContext, useState, useCallback, memo, useEffect } from 'react';
import { Grid, Container, Text } from '@nextui-org/react';
import Event from './Event';
import { getShortDate, getMonthName } from './utils';
import EventDetails from './EventDetails';
import { Context } from './CalendarView';

export default memo(function EventsList({ day, selectedEvents, handleSelectEvent }) {
  const [event, setEvent] = useState(null);
  const [deletedEvent, setDeletedEvent] = useState(null);
  const [open, setOpen] = useState(undefined);
  const [openedEvent, setOpenedEvent] = useState(null);
  const {
    dateTime,
    allEvents,
    dayViewEvents,
    monthViewEvents,
    deleteEvent,
    handleEventCheckClick,
    todoView,
  } = useContext(Context);

  const list =
    todoView === 'day'
      ? dayViewEvents
      : todoView === 'all'
      ? allEvents
      : monthViewEvents;

  const handleDetailsClick = useCallback(
    (currentEvent) => {
      if (!event || (event && currentEvent.id !== event.id)) {
        setEvent(currentEvent);
      }
      setOpen(true);
    },
    [event]
  );

  const handleDeleteEvent = useCallback(
    (selectedEvent) => {
      setDeletedEvent(selectedEvent);
      setTimeout(() => deleteEvent(selectedEvent), 250);
    },
    [deleteEvent]
  );

  const handleCollapse = useCallback((key) => {
    setOpenedEvent(key);
  }, []);

  useEffect(() => {
    return () => setOpenedEvent(null)
  }, [todoView]);

  return (
    <Grid.Container
      direction="column"
      css={{ gap: '$5', height: '100%', flexWrap: 'nowrap', flexGrow: 1, marginTop: allEvents.length === 0 ? '$sm' : '' }}
    >
      <Container
        css={{
          p: '$xl $xl 90px',
          backgroundColor: '$eventsBackground',
          borderRadius: '$xs',
          flexGrow: 1,
          '@media (max-width: 450px)': {
            p: '$xl $md 90px',
          },
          '@media (max-width: 350px)': {
            p: '$md $sm 90px',
          },
        }}
        id="container"
      >
        {todoView === 'month' && (
          <Text
            span
            size={24}
            weight="semibold"
            css={{ marginBottom: '22px', display: 'block' }}
          >
            {day
              ? `${getShortDate(day)}, ${day.getFullYear()}`
              : `${getMonthName(dateTime)}, ${dateTime.getFullYear()}`}
          </Text>
        )}
        {list && list.length > 0 ? (
          list.map((event) => {
            return (
              <Event
                event={event}
                key={event.id}
                handleClick={handleEventCheckClick}
                expanded={openedEvent === event.id}
                handleCollapse={handleCollapse}
                handleDetailsClick={handleDetailsClick}
                handleDeleteEvent={handleDeleteEvent}
                handleSelectEvent={handleSelectEvent}
                isSelected={selectedEvents.some(el => el.id === event.id)}
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
    </Grid.Container>
  );
});
