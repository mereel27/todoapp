import { Box, Typography, Modal } from '@mui/material';
import InputField from './InputField';
import { useContext, useEffect, useState, useCallback } from 'react';
import { formatDate } from './utils';
import { Context } from './CalendarView';
import DatePicker from './DatePicker';
import CheckboxInput from './CheckboxInput';
/* import { Input, Card } from "@nextui-org/react"; */

const colors = ['blue', 'red', 'cyan', 'orange'];

const notificationOptions = [
  'At the start of the event',
  '5 mins before',
  '10 mins before',
  '15 mins before',
  '30 mins before',
  '1 hour before',
  '2 hour before',
  '1 day before',
  '2 day before',
  '1 week before',
];

export default function NewEvent({ handleClose, open }) {
  const date = useContext(Context);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [inputDate, setInputDate] = useState([formatDate(date), date]);
  const [inputColor, setInputColor] = useState('blue');
  const [checkedNotifications, setCheckedNotifications] = useState(
    new Array(notificationOptions.length).fill(false)
  );

  useEffect(() => {
    setInputDate([formatDate(date), date])
  }, [date]);

  const handleTopicChange = useCallback((e) => {
    setTopic(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const handleColorRadioChange = useCallback(({ target }) => {
    setInputColor(target.value);
  }, []);

  const handleDatePickerSubmit = useCallback((date) => {
    setInputDate([formatDate(date), date]);
    setPickerOpen(false);
  }, []);

  const handleDatePickerClose = useCallback(() => setPickerOpen(false), []);

  const handleDateInputClick = useCallback(() => setPickerOpen(true), []);

  const handleNotificationsChange = (position) => {
    console.log(position);
    const updatedState = checkedNotifications.map((el, index) =>
      index === position ? !el : el
    );
    setCheckedNotifications(updatedState);
  };

  const handleAddButton = (e) => {
    console.log('submit');
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-container"
        onClose={handleClose}
      >
        <Box className="new-event">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              mb: '30px',
            }}
            className="new-event__header-container"
          >
            <Typography variant="p" noWrap className="new-event-header bold">
              Create New Tasks
            </Typography>
            <hr className="modal-hr" />
          </Box>
          <Box sx={{ widht: '100%' }}>
            <form name="new-event" id="new-event" onSubmit={handleAddButton}>
              <div className="new-event__input-container">
                <InputField
                  name="topic"
                  label="Topic"
                  placeholder="Write topic"
                  required
                  value={topic}
                  onChange={handleTopicChange}
                />
                <InputField
                  name="description"
                  label="Description"
                  placeholder="Write description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <InputField
                  name="date"
                  label="Date"
                  placeholder="Day"
                  readOnly
                  value={inputDate[0]}
                  onClick={handleDateInputClick}
                  required
                />
                <CheckboxInput
                  label="Notification"
                  options={notificationOptions}
                  checked={checkedNotifications}
                  handleChange={handleNotificationsChange}
                />
                <div
                  className="new-event__color-fieldset"
                  role="radiogroup"
                  aria-labelledby="color-input-label"
                >
                  <div className="input-field__label" id="color-input-label">
                    Select color
                  </div>
                  <div className="color-fieldset__container flex align-center">
                    {colors.map((color, index) => {
                      return (
                        <InputField
                          id={`event-color--${color}`}
                          key={color}
                          name="color"
                          label={color}
                          value={color}
                          type="radio"
                          checked={inputColor === color}
                          onChange={handleColorRadioChange}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <button type="submit" className="modal-container__button">
                ADD
              </button>
            </form>
          </Box>
          <DatePicker
            open={pickerOpen}
            date={date}
            handleClose={handleDatePickerClose}
            handleSubmit={handleDatePickerSubmit}
          />
        </Box>
      </Modal>
    </div>
  );
}
