import { useEffect, useState, createContext, useMemo } from 'react';
import Calendar from 'react-calendar';
import { Box, Container, Typography } from '@mui/material';
import Logo from './Logo';
import ViewButton from './ViewButton';
import Event from './Event';
import BottomToolbar from './BottomToolbar';
import { getShortDate } from './utils';

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

const formatDate = (value) =>
  value.toLocaleString('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const getCurrentEvents = (events, date, oneDay) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const isMonthEvents = events[year] && events[year][month];
  const isDayEvents = isMonthEvents && events[year][month][day];
  if (oneDay) {
    if (isDayEvents) return events[year][month][day];
    return undefined;
  }
  if (isMonthEvents) {
    return Object.values(events[year][month]).flat();
  }
};

export const Context = createContext();

export default function CalendarView() {
  const [today, setToday] = useState(new Date());
  const [view, setView] = useState('month');
  const [todoView, setTodoView] = useState('month');
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [currentDay, setCurrentDay] = useState(null);
  const [events, setEvents] = useState({
    2023: {
      0: {
        1: [
          {
            name: 'meetings',
            date: new Date('2023/01/01 14:00'),
            isDone: false,
          },
        ],
      },
    },
    2022: {
      11: {
        1: [
          {
            name: 'meetings2',
            date: new Date('2022/12/01 20:00'),
            isDone: false,
          },
          {
            name: 'meetings3',
            date: new Date('2022/12/01 18:00'),
            isDone: false,
          },
          {
            name: 'meetings4',
            date: new Date('2022/12/01 17:45'),
            isDone: false,
          },
        ],
      },
    },
  });
  const [currentEvents, setCurrentEvents] = useState(
    getCurrentEvents(events, currentMonth)
  );

  const contextValue = useMemo(() => currentDay || currentMonth, [currentDay, currentMonth]);

  useEffect(() => {
    setCurrentEvents(getCurrentEvents(events, currentMonth));
  }, [currentMonth, events]);

  useEffect(() => {
    currentDay && setCurrentEvents(getCurrentEvents(events, currentDay, true));
  }, [currentDay, events]);

  useEffect(() => {
    if (view === 'month') {
      const firstDayOfMonth = formatDate(currentMonth);
      const dayNumber = currentMonth.getDay();
      const firstDayElement = document.querySelector(
        `.react-calendar__tile abbr[aria-label="${firstDayOfMonth}"]`
      );
      firstDayElement.parentElement.style.gridColumn = dayNumber || 7;
      firstDayElement.parentElement.style.marginLeft = null;
    }
  }, [currentMonth, view]);

  const handleViewClick = (value) => {
    if (todoView === value) return;
    setTodoView(value);
  };

  const handleEventCheckClick = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    setEvents((events) => ({
      ...events,
      [year]: {
        ...events[year],
        [month]: {
          ...events[year][month],
          [day]: events[year][month][day].map((el) => {
            if (el.date.getTime() === date.getTime()) {
              el.isDone = !el.isDone;
            }
            return el;
          }),
        },
      },
    }));
  };

  const handleDayClick = (date) => {
    if (!currentDay) {
      setCurrentDay(date);
    } else if (currentDay.getTime() === date.getTime()) {
      setCurrentDay(null);
    } else {
      setCurrentDay(date);
    }
  };

  return (
    <Context.Provider value={contextValue}>
      <Container
        disableGutters
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
        }}
      >
        <Box sx={{ padding: '28px 0px 18px 0' }}>
          <Box sx={{ margin: '0 auto 19px auto', width: 'fit-content' }}>
            <Logo width="47" height="15" />
          </Box>
          <Box
            sx={{
              maxWidth: '285px',
              height: '50px',
              border: '1px solid rgba(200, 205, 218, 0.306754)',
              borderRadius: '100px',
              margin: '0 auto',
              position: 'relative',
              display: 'flex',
              lineHeight: '1.2',
            }}
          >
            <ViewButton
              active={todoView === 'month'}
              handleClick={handleViewClick}
              view="month"
            >
              Monthly
            </ViewButton>
            <ViewButton
              active={todoView === 'day'}
              handleClick={handleViewClick}
              view="day"
            >
              Daily
            </ViewButton>
            <Box
              sx={{
                position: 'absolute',
                width: '155px',
                height: '100%',
                bgcolor: 'rgb(var(--accent-color))',
                borderRadius: 'inherit',
                zIndex: '-1',
                right: todoView === 'day' ? 0 : 'calc(100% - 155px)',
                transition: 'right .2s ease',
              }}
            ></Box>
          </Box>
        </Box>
        <Box>
          <Calendar
            value={today}
            locale="en"
            minDetail="decade"
            onActiveStartDateChange={({ activeStartDate }) =>
              setCurrentMonth(activeStartDate)
            }
            showNeighboringMonth={true}
            onViewChange={({ view }) => setView(view)}
            onClickDay={handleDayClick}
            tileContent={({ date }) =>
              date.getDate() === 10 ? <div className="green-dot"></div> : null
            }
            tileClassName={({ date }) =>
              currentDay && formatDate(date) === formatDate(currentDay)
                ? 'current-day'
                : null
            }
            formatShortWeekday={(locale, date) =>
              date.toLocaleString(locale, { weekday: 'short' }).slice(0, 2)
            }
            nextLabel={<KeyboardArrowRightRoundedIcon />}
            prevLabel={
              <KeyboardArrowRightRoundedIcon
                sx={{ transform: 'rotate(180deg)' }}
              />
            }
            next2Label={<KeyboardDoubleArrowRightRoundedIcon />}
            prev2Label={
              <KeyboardDoubleArrowRightRoundedIcon
                sx={{ transform: 'rotate(180deg)' }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            textAlign: 'left',
            p: '22px 30px',
            bgcolor: 'var(--day-view-background)',
            flexGrow: 1,
          }}
        >
          <Typography
            variant="p"
            display="block"
            fontWeight={700}
            fontSize="24px"
            marginBottom="24px"
          >
            {currentDay ? getShortDate(currentDay) : 'This month'}
          </Typography>
          {currentEvents ? (
            currentEvents.map((event, index) => {
              return (
                <Event
                  event={event}
                  key={index + event.date.getMonth() + event.date.getDate()}
                  handleClick={handleEventCheckClick}
                />
              );
            })
          ) : (
            <Typography variant="body1" fontWeight={600} align="center">
              {(currentDay && 'No events on this day') ||
                'No events on this month'}
            </Typography>
          )}
        </Box>
        <BottomToolbar />
      </Container>
    </Context.Provider>
  );
}
