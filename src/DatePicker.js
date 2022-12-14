import MyCalendar from './MyCalendar';
import { Modal } from '@mui/material';
import { useState, memo } from 'react';
import { formatDate } from './utils';

export default memo(function DatePicker({ open, date, handleClose, handleSubmit }) {
  const [currentDay, setCurrentDay] = useState(date);
  console.log('date render')

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
    <Modal open={open} onClose={handleClose} className="modal-container">
      <div className="date-picker">
        <div className="date-picker__calendar-container">
          <MyCalendar
            onClickDay={handleDayClick}
            tileClassName={({ date }) =>
              currentDay && formatDate(date) === formatDate(currentDay)
                ? 'current-day'
                : null
            }
            value={date}
            locale="en"
            minDetail="decade"
            className="date-picker__calendar"
          />
          <div className="date-picker__buttons-container">
            <button
              onClick={() => handleSubmit(currentDay)}
              className="modal-container__button"
              disabled={currentDay ? false : true}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
});
