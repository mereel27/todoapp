import { useContext, useEffect, useState, useCallback } from 'react';
import { formatDate, getNotificationTime, getNumericDate } from './utils';
import { Context } from './CalendarView';
import DatePicker from './DatePicker';
import EventInput from './EventInput';
import ItemList from './ItemList';
import NotificationCheckboxGroup from './NotificationCheckboxGroup';
import ColorButtons from './ColorButtons';
import ModalButton from './ModalButton';
import EventDescriptionInput from './EventDescriptionInput';
import { Modal, Text } from '@nextui-org/react';

const colors = ['violet', 'green', 'orange', 'red'];

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

const validateTopicName = (name) => {
  let isValid = true;
  let description = '';
  switch (true) {
    case name.length < 2:
      description = 'Topic title must contain at least 2 symbols';
      isValid = false;
      break;
    default:
      break;
  }
  return { isValid, description };
};

export default function NewEvent({ handleClose, open }) {
  const { dateTime, addNewEvent } = useContext(Context);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [topicValidStatus, setTopicValidStatus] = useState({
    isValid: true,
    description: '',
  });
  const [description, setDescription] = useState('');
  const [inputDate, setInputDate] = useState([formatDate(dateTime), dateTime]);
  const [eventColor, setEventColor] = useState(colors[0]);
  const [selected, setSelected] = useState([]);
  const [checkboxOpen, setCheckboxOpen] = useState(false);

  useEffect(() => {
    setInputDate([formatDate(dateTime), dateTime]);
  }, [dateTime]);

  const handleTopicChange = useCallback((e) => {
    setTopic(e.target.value);
    setTopicValidStatus({
      isValid: true,
      description: '',
    });
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const handleDatePickerSubmit = useCallback((date) => {
    console.log(date)
    setInputDate([formatDate(date), date]);
    setPickerOpen(false);
  }, []);

  const handleDatePickerClose = useCallback(() => setPickerOpen(false), []);

  const handleDateInputClick = useCallback(() => setPickerOpen(true), []);

  const handleNotificationClick = useCallback(() => setCheckboxOpen(true), []);

  const handleNotificationClose = useCallback(() => setCheckboxOpen(false), []);

  const getSelectedItems = notificationOptions.filter((_, index) =>
    selected.includes(index)
  );

  const handleAddButton = () => {
    const validStatus = validateTopicName(topic);
    !validStatus.isValid && setTopicValidStatus(validStatus);
    if (validStatus.isValid) {
      const eventDate = inputDate[1].getTime();
      const formData = {
        name: topic,
        date: eventDate,
        shortDate: getNumericDate(inputDate[1]),
        isDone: false,
        description,
        color: eventColor,
        notifications: /* getSelectedItems.map(option => {
          return getNotificationTime(eventDate, option)
        }) */ selected.map(el => notificationOptions[el]),
        id: Date.now(),
      };
      addNewEvent(formData)
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        css={{ fontSize: '16px' }}
        width="500px"
        closeButton
        blur
      >
        <Modal.Header css={{ padding: '20px 30px' }}>
          <Text h3>Create New Task</Text>
        </Modal.Header>
        <Modal.Body>
          <form name="new-event" id="new-event" onSubmit={handleAddButton}>
            <div>
              <EventInput
                name="topic"
                label="Topic"
                placeholder="Write topic"
                required
                value={topic}
                onChange={handleTopicChange}
                helperText={
                  topicValidStatus.isValid ? '' : topicValidStatus.description
                }
                helperColor="error"
                status={topicValidStatus.isValid ? 'default' : 'error'}
              />
              <EventDescriptionInput
                cacheMeasurements
                size="lg"
                fullWidth
                minRows={1}
                maxRows={4}
                maxLength={200}
                name="description"
                label="Description"
                placeholder="Write description"
                value={description}
                onChange={handleDescriptionChange}
              />
              <EventInput
                name="date"
                label="Date"
                placeholder="Choose date"
                readOnly
                value={inputDate[0]}
                onClick={handleDateInputClick}
                required
                aria-haspopup="true"
                role="button"
              />
              <EventInput
                name="notification"
                label="Notification"
                value={getSelectedItems.join(', ')}
                contentLeft={<ItemList items={getSelectedItems} />}
                onClick={handleNotificationClick}
                aria-haspopup="true"
                aria-placeholder="Choose notification options"
                readOnly
              />
              <NotificationCheckboxGroup
                open={checkboxOpen}
                selected={selected}
                options={notificationOptions}
                handleClose={handleNotificationClose}
                handleChange={setSelected}
              />
              <ColorButtons
                colors={colors}
                currentColor={eventColor}
                handleClick={setEventColor}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer css={{ flexWrap: 'nowrap', padding: '$lg' }}>
          <ModalButton
            color="error"
            onPress={handleClose}
            aria-label="Close modal"
            flat
          >
            Close
          </ModalButton>
          <ModalButton shadow type="submit" onPress={handleAddButton}>
            Add
          </ModalButton>
        </Modal.Footer>
        <DatePicker
          open={pickerOpen}
          date={dateTime}
          handleClose={handleDatePickerClose}
          handleSubmit={handleDatePickerSubmit}
        />
      </Modal>
    </div>
  );
}
