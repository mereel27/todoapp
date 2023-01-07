import {
  useEffect,
  useState,
  createContext,
  useMemo,
  useCallback,
} from 'react';
import Calendar from 'react-calendar';
import { Container, Grid } from '@nextui-org/react';
import Logo from './Logo';
import DailyView from './DailyView';
import EventsList from './EventsList';
import BottomToolbar from './BottomToolbar';
import ViewSwitcher from './ViewSwitcher';
import EventMark from './EventMark';
import {
  getDateObject,
  getDateWithCurrentTime,
  getCurrentEvents,
  dateToString,
} from './utils';
import DoubleArrowRight from './DoubleArrowRight';
import DoubleArrowLeft from './DoubleArrowLeft';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { styled } from '@nextui-org/react';

const MarkContainer = styled('div', {
  width: '100%',
  position: 'absolute',
  display: 'flex',
  bottom: '1px',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const Context = createContext();

export default function CalendarView() {
  /////////////// Events state ////////////////////
  const [today] = useState(new Date());
  const [view, setView] = useState('month');
  const [todoView, setTodoView] = useState('month');
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [currentDay, setCurrentDay] = useState(null);
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || {}
  );
  const [currentEvents, setCurrentEvents] = useState(
    getCurrentEvents(events, currentMonth)
  );
  const [pendingNotifications, setPendingNotifications] = useState({});

  const dateTime = useMemo(() => {
    if (currentDay && currentDay.getMonth() === currentMonth.getMonth()) {
      return getDateWithCurrentTime(currentDay);
    } else if (currentMonth.getMonth() !== today.getMonth()) {
      return getDateWithCurrentTime(currentMonth);
    } else {
      return today;
    }
  }, [currentDay, currentMonth, today]);
  //////////////// ------------ ///////////////////////

  /////////////// Events effects ////////////////////
  useEffect(() => {
    if (currentDay) {
      setCurrentEvents(getCurrentEvents(events, currentDay, true));
    } else {
      setCurrentEvents(getCurrentEvents(events, currentMonth));
    }
  }, [currentDay, currentMonth, events]);

  useEffect(() => {
    Object.keys(events).length > 0 &&
      localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    if (view === 'month') {
      const firstDayOfMonth = dateToString(currentMonth);
      const dayNumber = currentMonth.getDay();
      const firstDayElement = document.querySelector(
        `.react-calendar__tile abbr[aria-label="${firstDayOfMonth}"]`
      );
      firstDayElement.parentElement.style.gridColumn = dayNumber || 7;
      firstDayElement.parentElement.style.marginLeft = null;
    }
  }, [currentMonth, view]);

  useEffect(() => {
    const keys = Object.keys(events);
    const currentYear = today.getFullYear();
    const currMonth = today.getMonth();
    const currDate = today.getDate();
    const future = keys.filter(year => year >= currentYear);

    future.forEach(year => {
      Object.keys(events[year]).forEach(month => {
        Object.keys(events[year][month]).filter(el => {
          if (year === currentYear) {
            if (month < currMonth) return false;
            }
          return true;
        }).forEach(date => {
          events[year][month][date].filter(el => {
            if (date < currDate) return false;
            return true;
          }).forEach(el => {
            if (el.notifications.length > 0) {
              const notifications = { [el.id]: {notifications: el.notifications, id: el.id, date: el.shortDate} };
              console.log(notifications)
              setPendingNotifications(prev => {
                return {...prev, ...notifications};
              })
            }
          })
        })
      });

    })
  }, [events, today])

  useEffect(() => {
    const pending = Object.keys(pendingNotifications);
    pending.length > 0 &&
    pending.forEach((key) => {
        console.log(key)
      });
  }, [pendingNotifications]);
  /////////////// ------------ ////////////////////////


  /////////////// Events handlers ////////////////////
  const addNewEvent = useCallback((event) => {
    const { year, month, date: day } = getDateObject(event.date);
    setEvents((events) => ({
      ...events,
      [year]: {
        ...(events[year] || []),
        [month]: {
          ...(events[year] ? events[year][month] : []),
          [day]: [
            ...(events[year] && events[year][month] && events[year][month][day]
              ? events[year][month][day]
              : []),
            event,
          ],
        },
      },
    }));
    /* if (event.notifications.length > 0) {
      let notifications = {}; 
      event.notifications.forEach(time => {
        const newNotification = {[`${event.id}-${time}`]: {year, month, day, id: event.id, time }};
        notifications = {...notifications, ...newNotification};
      })
      setPendingNotifications(prev => {
        return {...prev, ...notifications};
      })
    } */
  }, []);

  const deleteEvent = useCallback((event) => {
    const { year, month, date: day } = getDateObject(event.date);
    setEvents((prevEvents) => {
      const newEvents = { ...prevEvents };
      newEvents[year][month][day] = newEvents[year][month][day].filter(
        (target) => target.id !== event.id
      );
      return newEvents;
    });
  }, []);

  const setEventMark = useCallback(
    ({ date }) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const selectedDate = events?.[year]?.[month]?.[day];
      if (selectedDate && selectedDate.length > 0) {
        return (
          <MarkContainer>
            {events[year][month][day].slice(0, 4).map((ev, index) => (
              <EventMark key={index} color={ev.color} />
            ))}
          </MarkContainer>
        );
      }
    },
    [events]
  );

  const handleViewClick = (value) => {
    console.log('click');
    if (todoView === value) return;
    setTodoView(value);
  };

  const handleEventCheckClick = useCallback((event) => {
    const { year, month, date: day } = getDateObject(event.date);
    console.log(year, month ,day)
    setEvents((events) => ({
      ...events,
      [year]: {
        ...events[year],
        [month]: {
          ...events[year][month],
          [day]: events[year][month][day].map((el) => {
            console.log(el)
            if (el.id === event.id) {
              el.isDone = !el.isDone;
            }
            return el;
          }),
        },
      },
    }));
  }, []);

  const handleDayClick = (date) => {
    const month = new Date(date.getFullYear(), date.getMonth());
    if (!currentDay) {
      setCurrentDay(date);
      setCurrentMonth(month);
    } else if (currentDay.getTime() === date.getTime()) {
      setCurrentDay(null);
    } else {
      setCurrentDay(date);
      setCurrentMonth(month);
    }
  };
  /////////////// ------------ ////////////////////////

  return (
    <Context.Provider
      value={{
        dateTime,
        events,
        currentEvents,
        addNewEvent,
        deleteEvent,
        handleEventCheckClick,
        todoView,
      }}
    >
      <Container
        xs
        css={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          padding: 0,
          position: 'relative',
          maxWidth: '500px',
        }}
      >
        <Grid css={{ padding: '28px 0px 18px 0' }}>
          <Grid css={{ margin: '0 auto 19px auto', width: 'fit-content' }}>
            <Logo width="47" height="15" />
          </Grid>
          <ViewSwitcher todoView={todoView} handleClick={handleViewClick} />
        </Grid>
        {todoView === 'month' ? (
          <>
            <Grid css={{ marginBottom: '20px' }}>
              <Calendar
                /* value={today} */
                activeStartDate={currentMonth}
                locale="en"
                minDetail="decade"
                onActiveStartDateChange={({ activeStartDate }) => {
                  /* setCurrentDay(null); */
                  setCurrentMonth(activeStartDate);
                }}
                showNeighboringMonth={true}
                onViewChange={({ view }) => setView(view)}
                onClickDay={handleDayClick}
                tileContent={setEventMark}
                tileClassName={({ date }) =>
                  currentDay && dateToString(date) === dateToString(currentDay)
                    ? 'current-day'
                    : null
                }
                formatShortWeekday={(locale, date) =>
                  date.toLocaleString(locale, { weekday: 'short' }).slice(0, 2)
                }
                nextLabel={<ArrowRight2 size="1.3rem" />}
                prevLabel={<ArrowLeft2 size="1.3rem" />}
                next2Label={<DoubleArrowRight size="1.3rem" />}
                prev2Label={<DoubleArrowLeft size="1.3rem" />}
              />
            </Grid>
            <EventsList
              handleEventCheckClick={handleEventCheckClick}
              events={currentEvents}
              day={currentDay}
            />
          </>
        ) : (
          <DailyView day={dateTime} handleDayChange={handleDayClick} />
        )}
        <BottomToolbar />
      </Container>
    </Context.Provider>
  );
}
