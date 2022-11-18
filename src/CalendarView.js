import { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar';
import { MonthView, YearView } from 'react-calendar';
import { Grid, Box, Typography } from '@mui/material';

export default function CalendarView() {
  const [value, onChange] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(
    value.toLocaleString('en', { month: 'long' })
  );
  const [startMonth, setStartMonth] = useState(
    new Date(value.getFullYear(), value.getMonth())
  );

  const change = (e) => {
    /* onChange(e); */
    console.log(e);
  };

  /* console.log(value.getDay()); */

  useEffect(() => {
    const firstDayOfMonth = startMonth.toLocaleString('en', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const dayNumber = startMonth.getDay();
    console.log('dayNumber', dayNumber);
    console.log('firstDay', firstDayOfMonth);
    const firstDayElement = document.querySelector(
      `.calendarTile abbr[aria-label="${firstDayOfMonth}"]`
    );
    console.log(firstDayElement.parentElement);
    firstDayElement.parentElement.style.gridColumn = dayNumber;
    firstDayElement.parentElement.style.marginLeft = null;
  }, [startMonth]);

  const moveDate = (element, label) => {
    /* const dateFromLabel = new Date(label); */
    const dayNumber = currentMonth.getDay();
    element.style.gridColumn = dayNumber;
  };

  const handleMonthChange = ({ activeStartDate, view }) => {
    console.log(activeStartDate);
    view === 'month' &&
      setCurrentMonth(activeStartDate.toLocaleString('en', { month: 'long' }));
  };

  return (
    <Grid
      container
      direction="column"
      sx={{ width: '100%', height: '100vh', m: '0 auto', textAlign: 'center' }}
    >
      <Grid item container>
        <Grid item xs={12}>
          <Box>
            <Typography variant="body" sx={{ fontWeight: 600 }}>
              {currentMonth}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid
          item
          xs={12}
          sx={{ position: 'relative', margin: '0 auto', overflow: 'hidden' }}
        >
          <MonthView
            formatShortWeekday={(locale, date) =>
              date.toLocaleString(locale, { weekday: 'short' }).slice(0, 2)
            }
            activeStartDate={startMonth}
            valueType="day"
            value={value}
            /* showNeighboringMonth */
            tileClassName="calendarTile"
            locale="en"
            tileContent={({ activeStartDate, date, view }) => {
              if (date.getDate() === 7) {
                return <TileContent color='green'/>
              }
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}


const TileContent = ({color}) => {
  return <>
  <Box sx={{display: 'flex'}}>
    <Box sx={{borderRadius: '50%', width: '8px', height: '8px', bgcolor: color, margin: '5px auto auto auto', zIndex: 99999 , bottom: '2px', left: '10px'}}></Box>
  </Box>
  </>
}
