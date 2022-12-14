import { MonthView } from 'react-calendar';
/* import { useSwiperSlide } from 'swiper/react';
import { useEffect } from 'react'; */

export default function Month({ month, handleMonthChange, active }) {

  /* useEffect(() => {
    active && handleMonthChange(month);
  }, [active]); */

  return (
    <MonthView
      formatShortWeekday={(locale, date) =>
        date.toLocaleString(locale, { weekday: 'short' }).slice(0, 2)
      }
      activeStartDate={month}
      tileClassName="calendarTile"
      locale="en"
      showNeighboringMonth={false}
    />
  );
}
