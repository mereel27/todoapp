export const eventColorsMap = {
  violet: 'secondary',
  green: 'success',
  orange: 'warning',
  red: 'error',
};

export const notificationTimeMap = {
  'At the start of the event': 0,
  '5 mins before': 300000,
  '10 mins before': 600000,
  '15 mins before': 900000,
  '30 mins before': 1.8e+6,
  '1 hour before': 3.6e+6,
  '2 hour before': 7.2e+6,
  '1 day before': 8.64e+7,
  '2 day before': 1.728e+8,
  '1 week before': 6.048e+8,
};

export const getNotificationTime = (eventTime, option) => {
  return eventTime - notificationTimeMap[option];
}

export const getShortMonth = (value) =>
  value.toLocaleString('en', { month: 'short' });

export const getMonthName = date => date.toLocaleString('en', {month: 'long'})

export const getShortDate = (value) => {
  const { date, dateObject } = getDateObject(value);
  let ending;
  if (date > 3 && date < 21) {
    ending = 'th';
  }
  switch (date % 10) {
    case 1:
      ending = 'st';
      break;
    case 2:
      ending = 'nd';
      break;
    case 3:
      ending = 'rd';
      break;
    default:
      ending = 'th';
  }
  const dateString = getShortMonth(dateObject);
  if (date === new Date().getDate()) {
    return 'Today';
  }
  return date + ending + ' ' + dateString;
};

export const formatDate = (value) => {
  const dateString = value.toLocaleString('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const timeString = value.toLocaleTimeString('en-uk', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${dateString} - ${timeString}`;
};

export const getDateObject = (value) => {
  const dateObject = new Date(value);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const date = dateObject.getDate();
  return { year, month, date, dateObject };
};

export const getTime = (value) => {
  const date = value || new Date();
  const time = date
    .toLocaleTimeString('en-uk', { hour: '2-digit', minute: '2-digit' })
    .split(':');
  return {hours: time[0], minutes: time[1]}
};

export const hoursArray = () => {
  const hours = [];
  for (let i = 0; i <= 23; i++) {
    hours.push(i > 9 ? i.toString() : '0' + i);
  }
  return hours;
};

export const minutesArray = () => {
  const mins = [];
  for (let i = 0; i <= 59; i++) {
    mins.push(i > 9 ? i.toString() : '0' + i);
  }
  return mins;
};

export const getDateWithCurrentTime = (date) => {
  const newDate = new Date();
  newDate.setMonth(date.getMonth());
  newDate.setDate(date.getDate());
  return newDate;
};

export const getCurrentEvents = (events, date, oneDay) => {
  if (Object.keys(events) === 0) {
    return undefined;
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const isMonthEvents = events[year] && events[year][month];
  const isDayEvents = isMonthEvents && events[year][month][day];
  if (oneDay) {
    if (isDayEvents) return events[year][month][day];
    return undefined;
  }
  if (isMonthEvents) {
    return Object.values(events[year][month]).flat();
  }
};

export const dateToString = (value) =>
value.toLocaleString('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});