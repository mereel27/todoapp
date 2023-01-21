import {
  useEffect,
  useState,
  createContext,
  useMemo,
  useCallback,
} from 'react';
import { Container, Grid, styled } from '@nextui-org/react';
import Logo from './Logo';
import DailyView from './DailyView';
import EventsList from './EventsList';
import BottomToolbar from './BottomToolbar';
import EventMark from './EventMark';
import { getDateWithCurrentTime, getNumericDate, sortEvents, filterOptions } from './utils';
import ViewNavigation from './ViewNavigation';
import MyCalendar from './MyCalendar';
import EventsControlPanel from './EventsControlPanel';

const MarkContainer = styled('div', {
  width: '100%',
  position: 'absolute',
  display: 'flex',
  bottom: '1px',
  justifyContent: 'center',
  overflow: 'hidden',
  zIndex: 3,
});

export const Context = createContext();

export default function CalendarView() {
  /////////////// Events state ////////////////////
  const [today] = useState(new Date());
  /* const [ calendarView, setCalendarView ] = useState('month'); */
  const [todoView, setTodoView] = useState('month');
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [currentDay, setCurrentDay] = useState(null);
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || {}
  );

  const [sortBy, setSortBy] = useState('nearest');
  const [ filters, setFilters ] = useState(filterOptions);

  const dateTime = useMemo(() => {
    if (currentDay && currentDay.getMonth() === currentMonth.getMonth()) {
      return getDateWithCurrentTime(currentDay);
    } else if (currentMonth.getMonth() !== today.getMonth()) {
      return getDateWithCurrentTime(currentMonth);
    } else {
      return today;
    }
  }, [currentDay, currentMonth, today]);

  const allEvents = useMemo(() => {
    console.log('all events change');
    return sortEvents(Object.values(events).flat(), sortBy)
  }, [events, sortBy]);

  const monthViewEvents = useMemo(() => {
    console.log('month events change');
    const date = currentDay
      ? getNumericDate(currentDay)
      : getNumericDate(currentMonth);
    if (currentDay) {
      return events[date] ? sortEvents(events[date], sortBy) : [];
    } else {
      const keys = Object.keys(events).filter(
        (key) => key.slice(-5) === date.slice(-5)
      );
      const monthEvents = keys.flatMap((key) => events[key]);
      return sortEvents(monthEvents, sortBy);
    }
  }, [currentDay, currentMonth, events, sortBy]);

  const dayViewEvents = useMemo(() => {
    console.log('day events change');
    if (currentDay) {
      const date = getNumericDate(currentDay);
      return events[date] ? sortEvents(events[date], sortBy) : [];
    }
    const date = getNumericDate(currentMonth);
    const todayDate = getNumericDate(today);
    if (
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    ) {
      return events[todayDate] ? sortEvents(events[todayDate], sortBy) : [];
    } else {
      return events[date] ? sortEvents(events[date], sortBy) : [];
    }
  }, [currentDay, currentMonth, events, today, sortBy]);
  //////////////// ------------ ///////////////////////

  /////////////// Events effects ////////////////////

  // Save event to local storage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    console.log('effect')
  }, [filters])
  /////////////// ------------ ////////////////////////

  /////////////// Events handlers ////////////////////
  const addNewEvent = useCallback((event) => {
    setEvents((prev) => {
      return {
        ...prev,
        [event.shortDate]: [...(prev[event.shortDate] || []), event],
      };
    });
  }, []);

  const deleteEvent = useCallback((event) => {
    setEvents((prev) => {
      if (prev[event.shortDate].length < 2) {
        const newState = { ...prev };
        delete newState[event.shortDate];
        return newState;
      }
      return {
        ...prev,
        [event.shortDate]: prev[event.shortDate].filter(
          (current) => current.id !== event.id
        ),
      };
    });
  }, []);

  const setMark = useCallback(
    ({ date }) => {
      const selectedDay = getNumericDate(date);
      if (events[selectedDay] && events[selectedDay].length > 0) {
        return (
          <MarkContainer>
            {events[selectedDay].slice(0, 4).map((ev, index) => (
              <EventMark key={index} color={ev.color} />
            ))}
          </MarkContainer>
        );
      }
    },
    [events]
  );

  const handleViewClick = (value) => {
    if (todoView === value) return;
    setTodoView(value);
  };

  const handleEventCheckClick = useCallback((event) => {
    setEvents((prev) => {
      return {
        ...prev,
        [event.shortDate]: prev[event.shortDate].map((current) => {
          if (current.id === event.id) {
            current.isDone = !current.isDone;
          }
          return current;
        }),
      };
    });
  }, []);

  const handleDayClick = useCallback(
    (date) => {
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
    },
    [currentDay]
  );

  const handleMonthChange = useCallback((date) => setCurrentMonth(date), []);

  return (
    <Context.Provider
      value={{
        dateTime,
        events,
        dayViewEvents,
        monthViewEvents,
        allEvents,
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
          minHeight: '100vh',
          padding: 0,
          position: 'relative',
          maxWidth: '500px',
        }}
      >
        <Grid css={{ padding: '28px 0px 18px 0' }}>
          <Grid css={{ margin: '0 auto 19px auto', width: 'fit-content' }}>
            <Logo width="47" height="15" />
          </Grid>
          <ViewNavigation active={todoView} handleClick={handleViewClick} />
        </Grid>
        {todoView === 'day' && (
          <DailyView day={dateTime} handleDayChange={handleDayClick} />
        )}
        {todoView === 'month' && (
          <Grid
            css={{
              '@media (max-width: 500px)': { p: '0 10px' },
            }}
          >
            <MyCalendar
              activeStartDate={currentMonth}
              locale="en"
              minDetail="decade"
              onMonthChange={handleMonthChange}
              onClickDay={handleDayClick}
              tileContent={setMark}
              currentDay={currentDay}
            />
          </Grid>
        )}
        <EventsControlPanel setSortBy={setSortBy} sortBy={new Set([sortBy])} filters={filters} setFilters={setFilters}/>
        <EventsList
          day={
            todoView === 'day'
              ? dateTime
              : todoView === 'month'
              ? currentDay
              : null
          }
        />
        <BottomToolbar />
      </Container>
    </Context.Provider>
  );
}
