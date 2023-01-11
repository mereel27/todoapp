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
  getDateWithCurrentTime,
  dateToString,
  getNumericDate,
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

  const [currentEvents, setCurrentEvents] = useState([]);
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

  // Change current events on date change
  useEffect(() => {
    if (currentDay) {
      const date = getNumericDate(currentDay);
      setCurrentEvents(events[date] || []);
    } else {
      const date = getNumericDate(currentMonth);
      const todayDate = getNumericDate(today);
      if (todoView === 'day') {
        if (currentMonth.getMonth() === today.getMonth() 
            && currentMonth.getFullYear() === today.getFullYear()) {
              setCurrentEvents(events[todayDate] || []);
            } else {
              setCurrentEvents(events[date] || []);
            }
      } else {
        const keys = Object.keys(events).filter(
          (key) => key.slice(-5) === date.slice(-5)
        );
        const monthEvents = keys.flatMap((key) => events[key]);
        setCurrentEvents(monthEvents);
      }
    }
  }, [currentDay, currentMonth, events, todoView, today]);

  // Save event to local storage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // First day of month position
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
    const pending = Object.keys(pendingNotifications);
    pending.length > 0 &&
      pending.forEach((key) => {
        console.log(key);
      });
  }, [pendingNotifications]);
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
        const newState = {...prev};
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
                tileContent={setMark}
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
