import { useState, memo, useCallback } from 'react';
import { getTime } from './utils';
import { Modal } from '@nextui-org/react';
import MyCalendar from './MyCalendar';
import ModalButton from './ModalButton';
import TimePicker from './TimePicker';

export default memo(function DatePicker({
  open,
  date,
  handleClose,
  handleSubmit,
}) {
  const [currentDate, setCurrentDate] = useState(date);
  const [hours, setHours] = useState(getTime(date).hours);
  const [minutes, setMinutes] = useState(getTime(date).minutes)

  const handleDayClick = useCallback((date) => {
    if (!currentDate) {
      setCurrentDate(date);
    } else if (
      currentDate.getMonth() === date.getMonth() &&
      currentDate.getDate() === date.getDate()
    ) {
      setCurrentDate(null);
    } else {
      setCurrentDate(date);
    }
  }, [currentDate]);

  const handleOkButton = () => {
    currentDate.setHours(hours, minutes);
    handleSubmit(new Date(currentDate));
  };

  const handleHoursChange = useCallback((value) => setHours(value), []);
  const handleMinutesChange = useCallback((value) => setMinutes(value), []);

  return (
    <Modal
      css={{paddingTop: '$xl'}}
      open={open}
      onClose={handleClose}
      className="modal-container"
      width="480px"
      blur
      closeButton
    >
      <Modal.Body css={{ padding: '$sm $lg', '@media (max-width: 350px)': {padding: '$sm'} }}>
        <div className="date-picker__calendar-container">
          <MyCalendar
            onClickDay={handleDayClick}
            currentDay={currentDate}
            activeStartDate={currentDate}
            value={date}
            locale="en"
            minDetail="decade"
            className="date-picker__calendar"
            /* showNeighboringMonth={true} */
          />
        </div>
        <TimePicker
          hours={hours}
          minutes={minutes}
          handleHoursChange={handleHoursChange}
          handleMinutesChange={handleMinutesChange}
        />
      </Modal.Body>
      <Modal.Footer css={{ flexWrap: 'nowrap', padding: '$lg', '@media (max-width: 350px)': {padding: '$sm $sm $lg'} }}>
        <ModalButton
          color="error"
          flat
          onPress={handleClose}
          aria-label="Close modal"
        >
          Close
        </ModalButton>
        <ModalButton
          disabled={currentDate ? false : true}
          onPress={() => handleOkButton(currentDate)}
          regular={true}
        >
          Ok
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
});
