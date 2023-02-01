import {
  useEffect,
  useState,
  createContext,
  useMemo,
  useCallback,
} from 'react';
import { Container, Grid, styled } from '@nextui-org/react';
import DailyView from './DailyView';
import EventsList from './EventsList';
import BottomToolbar from './BottomToolbar';
import EventMark from './EventMark';
import {
  getDateWithCurrentTime,
  getNumericDate,
  sortEvents,
  defaultFilters,
  filterEvents,
} from './utils';
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
  // Events state
  const [today] = useState(new Date());
  /* const [ calendarView, setCalendarView ] = useState('month'); */
  const [todoView, setTodoView] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [currentDay, setCurrentDay] = useState(null);
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || {}
  );
  const [calendarExpanded, setCalendarExpanded] = useState(
    localStorage.getItem('calendarExpanded')
      ? JSON.parse(localStorage.getItem('calendarExpanded'))
      : true
  );
  const [sortBy, setSortBy] = useState(
    JSON.parse(localStorage.getItem('sortBy')) || 'nearest'
  );
  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem('filters')) || defaultFilters
  );
  const [selectMode, setSelectMode] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

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
    const eventsWithFilter = filterEvents(
      Object.values(events).flat(),
      filters
    );
    return sortEvents(eventsWithFilter, sortBy);
  }, [events, sortBy, filters]);

  const monthViewEvents = useMemo(() => {
    const date = currentDay
      ? getNumericDate(currentDay)
      : getNumericDate(currentMonth);
    if (currentDay) {
      return events[date]
        ? sortEvents(filterEvents(events[date], filters), sortBy)
        : [];
    } else {
      const keys = Object.keys(events).filter(
        (key) => key.slice(-5) === date.slice(-5)
      );
      const monthEvents = keys.flatMap((key) => events[key]);
      return sortEvents(filterEvents(monthEvents, filters), sortBy);
    }
  }, [currentDay, currentMonth, events, sortBy, filters]);

  const dayViewEvents = useMemo(() => {
    if (currentDay) {
      const date = getNumericDate(currentDay);
      return events[date]
        ? sortEvents(filterEvents(events[date], filters), sortBy)
        : [];
    }
    const date = getNumericDate(currentMonth);
    const todayDate = getNumericDate(today);
    if (
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    ) {
      return events[todayDate]
        ? sortEvents(filterEvents(events[todayDate], filters), sortBy)
        : [];
    } else {
      return events[date]
        ? sortEvents(filterEvents(events[date], filters), sortBy)
        : [];
    }
  }, [currentDay, currentMonth, events, today, sortBy, filters]);

  // Events effects

  // Save events to local storage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  //Save filter settings to local storage
  useEffect(
    () => localStorage.setItem('filters', JSON.stringify(filters)),
    [filters]
  );

  //Save sortBy settings to local storage
  useEffect(
    () => localStorage.setItem('sortBy', JSON.stringify(sortBy)),
    [sortBy]
  );

  useEffect(() => {
    localStorage.setItem('calendarExpanded', calendarExpanded);
  }, [calendarExpanded]);

  // Reset Selection
  useEffect(() => {
    !selectMode && setSelectedEvents([]);
  }, [selectMode]);

  // Turn off select mode
  useEffect(() => {
    allEvents.length < 1 && setSelectMode(false);
  }, [allEvents.length]);

  // Events handlers
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

  // Event mark for calendar
  const setMark = useCallback(
    ({ date }) => {
      const selectedDay = getNumericDate(date);
      if (events[selectedDay] && events[selectedDay].length > 0) {
        return (
          <MarkContainer>
            {events[selectedDay].slice(0, 4).map((ev, index) => (
              <EventMark key={index} category={ev.category} />
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

  const handleCalendarExpand = useCallback(() => {
    calendarExpanded && setCurrentDay(null);
    setCalendarExpanded((prev) => !prev);
  }, [calendarExpanded]);

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

  const handleSelectClick = () => setSelectMode((prev) => !prev);

  const handleSelectEvent = useCallback((selectedEvent) => {
    setSelectedEvents((prev) => {
      const isPresent = prev.find((current) => current.id === selectedEvent.id);
      if (isPresent) {
        return prev.filter((current) => current.id !== selectedEvent.id);
      } else {
        return [
          ...prev,
          { id: selectedEvent.id, key: selectedEvent.shortDate },
        ];
      }
    });
  }, []);

  const handleMultiplyDelete = useCallback(() => {
    setEvents((prev) => {
      let newState = { ...prev };
      selectedEvents.forEach((el) => {
        if (newState[el.key].length < 2) {
          delete newState[el.key];
        } else {
          newState = {
            ...newState,
            [el.key]: newState[el.key].filter(
              (current) => current.id !== el.id
            ),
          };
        }
      });
      return newState;
    });
    setSelectedEvents([]);
  }, [selectedEvents]);

  const handleMultiplyCategoryChange = useCallback(
    (cat) => {
      setEvents((prev) => {
        let newState = { ...prev };
        selectedEvents.forEach((el) => {
          newState[el.key] = newState[el.key].map((event) => {
            if (event.id === el.id) {
              event.category = cat;
            }
            return event;
          });
        });
        return newState;
      });
    },
    [selectedEvents]
  );

  const handleMultiplyStatusChange = useCallback(
    (status) => {
      setEvents((prev) => {
        let newState = { ...prev };
        selectedEvents.forEach((el) => {
          newState[el.key] = newState[el.key].map((event) => {
            if (event.id === el.id) {
              event.isDone = status;
            }
            return event;
          });
        });
        return newState;
      });
    },
    [selectedEvents]
  );

  const handleCurrentDay = useCallback((value) => {
    setCurrentDay(value);
  }, []);

  const handleCurrentDayChange = useCallback(
    (option) => {
      if (!option) return;
      const day = currentDay || dateTime;
      const current = day.getDate();
      const dateChange =
        option === 'next'
          ? current + 1
          : option === 'prev'
          ? current - 1
          : current;
      const nextDate = new Date(day).setDate(dateChange);
      const newDate = new Date(nextDate);
      if (newDate.getMonth() !== day.getMonth()) {
        const month = new Date(newDate.getFullYear(), newDate.getMonth());
        setCurrentMonth(month);
      }
      setCurrentDay(newDate);
    },
    [currentDay, dateTime]
  );

  const currentEvents = useCallback(() => {
    const events =
      todoView === 'day'
        ? dayViewEvents
        : todoView === 'month'
        ? monthViewEvents
        : allEvents;
    return events;
  }, [allEvents, dayViewEvents, monthViewEvents, todoView]);

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
        selectMode,
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
        <Grid
          css={{
            padding: '$7 0',
            backgroundColor: '$background',
            zIndex: 10,
          }}
        >
          {/* <Grid css={{ margin: '0 auto 19px auto', width: 'fit-content' }}>
            <Logo width="47" height="15" />
          </Grid> */}
          <ViewNavigation active={todoView} handleClick={handleViewClick} />
        </Grid>
        {todoView === 'day' && (
          <DailyView
            day={dateTime}
            handleDayChange={handleDayClick}
            handleCurrentDayChange={handleCurrentDayChange}
          />
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
              handleCurrentDay={handleCurrentDay}
              handleExpand={handleCalendarExpand}
              expanded={calendarExpanded}
              showToolbar={true}
            />
          </Grid>
        )}
        <EventsControlPanel
          setSortBy={setSortBy}
          sortBy={new Set([sortBy])}
          filters={filters}
          setFilters={setFilters}
          handleSelect={handleSelectClick}
          handleMultiplyDelete={handleMultiplyDelete}
          handleMultiplyCategoryChange={handleMultiplyCategoryChange}
          handleMultiplyStatusChange={handleMultiplyStatusChange}
          isSelect={selectMode}
          actionsDisabled={selectedEvents.length < 1}
          disabled={currentEvents().length < 1}
          filterDisabled={Object.values(events).flat().length < 1}
          itemsQuantity={selectedEvents.length}
        />
        <EventsList
          day={
            todoView === 'day'
              ? dateTime
              : todoView === 'month'
              ? currentDay
              : null
          }
          selectedEvents={selectedEvents}
          handleSelectEvent={handleSelectEvent}
        />
        <BottomToolbar />
      </Container>
    </Context.Provider>
  );
}
