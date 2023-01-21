import Calendar from 'react-calendar';
import { useState, useEffect, useRef, memo } from 'react';
import DoubleArrowRight from './DoubleArrowRight';
import DoubleArrowLeft from './DoubleArrowLeft';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { dateToString } from './utils';

export default memo(function MyCalendar({ currentDay, onViewChange, onMonthChange, activeStartDate, ...props }) {
  const [today] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');
  const [currentMonth, setCurrentMonth] = useState(activeStartDate || new Date(today.getFullYear(), today.getMonth()));
  const parentRef = useRef(null);

  const handleViewChange = ({view}) => {
    console.log('view')
    onViewChange !== undefined && onViewChange(view);
    setCalendarView(view);
  };

  const handleMonthChange = ({ activeStartDate }) => {
    onMonthChange !== undefined && onMonthChange(activeStartDate);
    setCurrentMonth(activeStartDate);
  }

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

  /* useEffect(() => {
    if (calendarView === 'month') {
      const weekends = parentRef.current.querySelectorAll('.react-calendar__month-view__days__day--weekend');
      console.log('weekends[0]', weekends[0])
      weekends[0].style.borderTopLeftRadius = '20px'
      console.log('weekends[1]', weekends[1])
      console.log('[weekends.length - 2]', weekends[weekends.length - 2])
      console.log('[weekends.length - 1]', weekends[weekends.length - 1])
    }
    
  }, [currentMonth]) */

  return (
    <Calendar
      {...props}
      inputRef={parentRef}
      activeStartDate={currentMonth}
      onActiveStartDateChange={handleMonthChange}
      onViewChange={handleViewChange}
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
      nextLabel={<ArrowRight2 size="1.3rem" />}
      prevLabel={<ArrowLeft2 size="1.3rem" />}
      next2Label={<DoubleArrowRight size="1.3rem" />}
      prev2Label={<DoubleArrowLeft size="1.3rem" />}
    />
  );
});
