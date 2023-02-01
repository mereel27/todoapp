import { useContext, useEffect, useState, useCallback } from 'react';
import { formatDate, /* getNotificationTime, */ getNumericDate } from '../utils/utils';
import { Context } from '../CalendarView';
import DatePicker from '../DatePicker/DatePicker';
import EventInput from './EventInput';
import ItemList from './ItemList';
import NotificationCheckboxGroup from './NotificationCheckboxGroup';
import ColorButtons from '../Buttons/ColorButtons';
import ModalButton from '../Buttons/ModalButton';
import EventDescriptionInput from './EventDescriptionInput';
import { Modal, Text, Checkbox, styled } from '@nextui-org/react';

const categories = ['work', 'study', 'entertainment', 'workout'];

const Form = styled('form', {});

const Succes = styled(Checkbox, {
  pointerEvents: 'none',
  width: '100px',
  height: '100px',
  '.nextui-checkbox-container': {
    backgroundColor: '$success',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  '.nextui-icon-check': {
    width: '32px',
    height: '52px',
    position: 'absolute',
    top: '50%',
    left: '26%',
    transform: 'rotate(45deg) translate(-50%, -50%)',
  },
  '.nextui-icon-check-line1': {
    width: '32px',
    height: '8px',
    '&:after': {
      height: '8px',
    },
  },
  '.nextui-icon-check-line2': {
    height: '52px',
    width: '8px',
    '&:after': {
      width: '8px',
    },
  },
});

const SuccessContainer = styled('div', {
  width: 'fit-content',
  height: 'fit-content',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  margin: 'auto !important',
  transition: 'transform .3s ease-out, opacity .3s ease-out',
  position: 'absolute',
  zIndex: 99999999,
});

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
  const [eventCategory, setEventCategory] = useState(categories[0]);
  const [selected, setSelected] = useState([]);
  const [checkboxOpen, setCheckboxOpen] = useState(false);
  const [successCheck, setSuccessCheck] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

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
    console.log(date);
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
        category: eventCategory,
        notifications: selected.map((el) => notificationOptions[el]),
        id: Date.now(),
      };
      addNewEvent(formData);
      handleClearForm();
      successIconAnimation();
    }
  };

  const handleClearForm = () => {
    setSelected([]);
    setTopic('');
    setDescription('');
    setEventCategory(categories[0]);
  };

  const successIconAnimation = () => {
    setSuccessOpen(true);
    setTimeout(() => setSuccessCheck(true), 200);
    setTimeout(() => setSuccessOpen(false), 2000);
    setSuccessCheck(false);
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
        <Modal.Header css={{ padding: '$sm $10 0' }}>
          <Text h3>Create New Task</Text>
        </Modal.Header>
        <Modal.Body css={{ padding: '$12 $10 $sm' }}>
          <SuccessContainer
            css={{ scale: successOpen ? 1 : 0, opacity: successOpen ? 1 : 0 }}
            aria-hidden={!successOpen}
          >
            <Succes
              color="successIcon"
              isSelected={successCheck}
              readOnly
              /* excludeFromTabOrder */
              aria-label="success icon"
            />
          </SuccessContainer>
          <Form name="new-event" id="new-event" onSubmit={handleAddButton}>
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
                label="Notifications"
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
                categories={categories}
                currentCategory={eventCategory}
                handleClick={setEventCategory}
              />
            </div>
          </Form>
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
          <ModalButton type="submit" onPress={handleAddButton} regular={true}>
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
