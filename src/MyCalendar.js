import Calendar from 'react-calendar';
import { useState, useEffect, useRef, memo } from 'react';
import DoubleArrowRight from './DoubleArrowRight';
import DoubleArrowLeft from './DoubleArrowLeft';
import { ArrowLeft2, ArrowRight2, Calendar as CalIcon } from 'iconsax-react';
import { dateToString } from './utils';
import { Button, Grid, styled } from '@nextui-org/react';
import Arrow from './IconsComponents/Arrow';

const StyledCalendar = styled(Calendar, {});

export default memo(function MyCalendar({
  currentDay,
  handleCurrentDay,
  onViewChange,
  onMonthChange,
  activeStartDate,
  expanded,
  handleExpand,
  showToolbar,
  picker,
  ...props
}) {
  const [today] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');
  const [currentMonth, setCurrentMonth] = useState(
    activeStartDate || new Date(today.getFullYear(), today.getMonth())
  );
  const [calendarExpanded, setCalendarExpanded] = useState(expanded !== undefined ? expanded : true);
  const [calHeight, setCalHeight] = useState('auto');
  const parentRef = useRef(null);

  const handleTodayClick = () => {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth()));
    handleCurrentDay(today);
    calendarView !== 'month' && setCalendarView('month');
  };

  const handleViewChange = ({ view }) => {
    if (!calendarExpanded) return;
    onViewChange !== undefined && onViewChange(view);
    setCalendarView(view);
  };

  const handleMonthChange = ({ activeStartDate }) => {
    setCurrentMonth(activeStartDate);
  };

  useEffect(() => {
    onMonthChange !== undefined && onMonthChange(currentMonth);
  }, [currentMonth, onMonthChange]);


  useEffect(() => {
    if (calendarView === 'month') {
      const firstDayOfMonth = dateToString(currentMonth);
      const dayNumber = currentMonth.getDay();
      const firstDayElement = parentRef.current.querySelector(
        `.react-calendar__tile abbr[aria-label="${firstDayOfMonth}"]`
      );
      firstDayElement.parentElement.style.gridColumn = dayNumber || 7;
      firstDayElement.parentElement.style.marginLeft = null;
    }
  }, [currentMonth, calendarView]);

  useEffect(() => {
    if (showToolbar) {
      const resizeObserver = new ResizeObserver((entries) => {
        setCalHeight(entries[0].target.scrollHeight);
      });
      resizeObserver.observe(parentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [showToolbar]);

  useEffect(() => {
    expanded !== undefined && setCalendarExpanded(expanded)
  }, [expanded]);

  const handleCalendarVisibility = () => {
    expanded === undefined && setCalendarExpanded((prev) => !prev);
    handleExpand !== undefined && handleExpand();
  };

  return (
      <Grid
        className="calendar-container"
        css={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
        }}
      >
        <StyledCalendar
          {...props}
          css={{
            '.react-calendar__viewContainer': {
              maxHeight: calendarExpanded ? calHeight : 0,
              transition: 'max-height .2s ease',
            },
          }}
          inputRef={parentRef}
          activeStartDate={currentMonth}
          onActiveStartDateChange={handleMonthChange}
          onViewChange={handleViewChange}
          view={calendarView}
          formatShortWeekday={(locale, date) =>
            date.toLocaleString(locale, { weekday: 'short' }).slice(0, 2)
          }
          tileClassName={({ date }) =>
            currentDay && dateToString(date) === dateToString(currentDay)
              ? 'current-day'
              : null
          }
          navigationAriaLabel="Change view"
          nextAriaLabel={`Next ${calendarView}`}
          next2AriaLabel={`Next ${
            calendarView === 'month'
              ? 'year'
              : calendarView === 'year'
              ? 'decade'
              : 'century'
          }`}
          prevAriaLabel={`Previous ${calendarView}`}
          prev2AriaLabel={`Previous ${
            calendarView === 'month'
              ? 'year'
              : calendarView === 'year'
              ? 'decade'
              : 'century'
          }`}
          nextLabel={<ArrowRight2 size="1.3rem" variant="Bold" />}
          prevLabel={<ArrowLeft2 size="1.3rem" variant="Bold" />}
          next2Label={<DoubleArrowRight size="1.3rem" />}
          prev2Label={<DoubleArrowLeft size="1.3rem" />}
        />
          <Grid
            css={{
              display: 'flex',
              width: '100%',
              backgroundColor: '$white',
              zIndex: 100,
              justifyContent: 'space-between',
              paddingTop: calendarExpanded ? '$xs' : '',
              transition: 'padding-top .2s ease-out',
              gap: '$5',
            }}
          >
            <Button
              ripple={false}
              auto
              flat
              css={{display: picker ? 'none' : ''}}
              iconRight={<Arrow />}
              iconRightCss={{
                transform: calendarExpanded ? 'rotate(180deg)' : 'rotate(0)',
              }}
              onPress={handleCalendarVisibility}
            >
              <CalIcon />
            </Button>
            <Button
              auto
              flat
              onPress={handleTodayClick}
              css={{
                marginLeft: picker ? 'auto' : '',
                height: picker ? '30px' : '',
                '&:not(:active)': {
                  transform: calendarExpanded ? 'scale(1)' : 'scale(0)',
                },
              }}
            >
              Today
            </Button>
          </Grid>
      </Grid>
  );
});


// Custom navigation


/*  <Button.Group
        css={{
          width: '100%',
          justifyContent: 'center',
          margin: 0,
          paddingBottom: '$sm',
        }}
        light
        color='primary'
      >
        <NavigationButton
          auto
          onPress={handleClickPrev2}
          aria-label={`Previous ${
            calendarView === 'month'
              ? 'year'
              : calendarView === 'year'
              ? 'decade'
              : 'century'
          }`}
        >
          <DoubleArrowLeft size="1.3rem" />
        </NavigationButton>
        <NavigationButton
          auto
          onPress={handleClickPrev}
          aria-label={`Previous ${calendarView}`}
        >
          <ArrowLeft2 size="1.3rem" variant="Bold" />
        </NavigationButton>
        <NavigationButton
          auto
          onPress={handleViewClick}
          grow={true}
          aria-label="Change view"
        >
          {calendarLabel}
        </NavigationButton>
        <NavigationButton
          auto
          onPress={handleClickNext}
          aria-label={`Next ${calendarView}`}
        >
          <ArrowRight2 size="1.3rem" variant="Bold" />
        </NavigationButton>
        <NavigationButton
          auto
          onPress={handleClickNext2}
          aria-label={`Next ${
            calendarView === 'month'
              ? 'year'
              : calendarView === 'year'
              ? 'decade'
              : 'century'
          }`}
        >
          <DoubleArrowRight size="1.3rem" />
        </NavigationButton>
      </Button.Group> */

/* const handleClickNext = () => {
    let current, nextDate, newDate;
    if (calendarView === 'month') {
      current = currentMonth.getMonth();
      nextDate = new Date(currentMonth).setMonth(current + 1);
      newDate = new Date(nextDate);
    }
    if (calendarView === 'year') {
      current = currentMonth.getFullYear();
      nextDate = new Date(currentMonth).setFullYear(current + 1);
      newDate = new Date(nextDate);
    }
    if (calendarView === 'decade') {
      current = currentMonth.getFullYear();
      nextDate = new Date(currentMonth).setFullYear(current + 10);
      newDate = new Date(nextDate);
    }
    setCurrentMonth(newDate);
  };

  const handleClickNext2 = () => {
    let current, nextDate, newDate;
    if (calendarView === 'month') {
      current = currentMonth.getFullYear();
      nextDate = new Date(currentMonth).setFullYear(current + 1);
      newDate = new Date(nextDate);
    }
    if (calendarView === 'year') {
      current = currentMonth.getFullYear();
      nextDate = new Date(currentMonth).setFullYear(current + 10);
      newDate = new Date(nextDate);
    }
    if (calendarView === 'decade') {
      current = currentMonth.getFullYear();
      nextDate = new Date(currentMonth).setFullYear(current + 100);
      newDate = new Date(nextDate);
    }
    setCurrentMonth(newDate);
  };

  const handleClickPrev = () => {
    let current, prevDate, newDate;
    if (calendarView === 'month') {
      current = currentMonth.getMonth();
      prevDate = new Date(currentMonth).setMonth(current - 1);
      newDate = new Date(prevDate);
    }
    if (calendarView === 'year') {
      current = currentMonth.getFullYear();
      prevDate = new Date(currentMonth).setFullYear(current - 1);
      newDate = new Date(prevDate);
    }
    if (calendarView === 'decade') {
      current = currentMonth.getFullYear();
      prevDate = new Date(currentMonth).setFullYear(current - 10);
      newDate = new Date(prevDate);
    }
    setCurrentMonth(newDate);
  };

  const handleClickPrev2 = () => {
    let current, prevDate, newDate;
    if (calendarView === 'month') {
      current = currentMonth.getFullYear();
      prevDate = new Date(currentMonth).setFullYear(current - 1);
      newDate = new Date(prevDate);
    }
    if (calendarView === 'year') {
      current = currentMonth.getFullYear();
      prevDate = new Date(currentMonth).setFullYear(current - 10);
      newDate = new Date(prevDate);
    }
    if (calendarView === 'decade') {
      current = currentMonth.getFullYear();
      prevDate = new Date(currentMonth).setFullYear(current - 100);
      newDate = new Date(prevDate);
    }
    setCurrentMonth(newDate);
  }

  const handleViewClick = () => {
    let newView;
    if (calendarView === 'month') {
      newView = 'year';
    } else if (calendarView === 'year') {
      newView = 'decade';
    } else {
      newView = 'month';
    }
    setCalendarView(newView);
  }; */


/* const NavigationButton = ({ children, grow, ...props }) => {
  return (
    <Button
      color='success'
      css={{
        padding: 0,
        fontWeight: '$bold',
        flexBasis: '14.2857%',
        flexGrow: grow ? '1' : '0',
        '&:hover': {
          backgroundColor: '$accents0',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}; */

/* const calendarLabel = useMemo(() => {
    let label = currentMonth.toLocaleString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
    if (calendarView === 'year') {
      label = currentMonth.toLocaleString('en-GB', {
        year: 'numeric',
      });
    }
    if (calendarView === 'decade') {
      label = `${currentMonth.getFullYear()}-${
        currentMonth.getFullYear() + 10
      }`;
    }
    return label;
  }, [calendarView, currentMonth]); */