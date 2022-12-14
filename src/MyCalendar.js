import Calendar from 'react-calendar';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

export default function MyCalendar(props) {
  return (
    <Calendar
      {...props}
      formatShortWeekday={(locale, date) =>
        date.toLocaleString(locale, { weekday: 'short' }).slice(0, 2)
      }
      nextLabel={<KeyboardArrowRightRoundedIcon />}
      prevLabel={
        <KeyboardArrowRightRoundedIcon sx={{ transform: 'rotate(180deg)' }} />
      }
      next2Label={<KeyboardDoubleArrowRightRoundedIcon />}
      prev2Label={
        <KeyboardDoubleArrowRightRoundedIcon
          sx={{ transform: 'rotate(180deg)' }}
        />
      }
    />
  );
}
