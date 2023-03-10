export const eventColorsMap = {
  work: 'secondary',
  study: 'success',
  entertainment: 'warning',
  workout: 'error',
};

export const notificationTimeMap = {
  'At the start of the event': 0,
  '5 mins before': 300000,
  '10 mins before': 600000,
  '15 mins before': 900000,
  '30 mins before': 1.8e6,
  '1 hour before': 3.6e6,
  '2 hour before': 7.2e6,
  '1 day before': 8.64e7,
  '2 day before': 1.728e8,
  '1 week before': 6.048e8,
};

export const getNotificationTime = (eventTime, option) => {
  return eventTime - notificationTimeMap[option];
};

export const getShortMonth = (value) =>
  value.toLocaleString('en', { month: 'short' });

export const getMonthName = (date) =>
  date.toLocaleString('en', { month: 'long' });

export const getShortDate = (value) => {
  const { date, dateObject } = getDateObject(value);
  let ending;
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
  if (date > 3 && date < 21) {
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
  const stringDate = `${date}.${month}.${year}`;
  return { stringDate, year, month, date, dateObject };
};

export const getTime = (value) => {
  const date = value ? new Date(value) : new Date();
  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return { hours: time.slice(0, 2), minutes: time.slice(-2), time };
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
  const currTime = new Date();
  const newDate = new Date(date);
  newDate.setHours(
    currTime.getHours(),
    currTime.getMinutes(),
    currTime.getSeconds()
  );
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

export const getNumericDate = (date) =>
  new Date(date).toLocaleString('de', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

export const sortEvents = (events, sortBy) => {
  const copy = [...events];
  switch (sortBy) {
    case 'nearest':
      return copy.sort((current, prev) => current.date - prev.date);
    case 'further':
      return copy.sort((current, prev) => prev.date - current.date);
    case 'completed':
      return copy.sort((current, prev) => prev.isDone - current.isDone);
    case 'uncompleted':
      return copy.sort((current, prev) => current.isDone - prev.isDone);
    case 'nameA':
      return copy.sort((current, prev) =>
        current.name.toLowerCase() < prev.name.toLowerCase()
          ? -1
          : current.name.toLowerCase() > prev.name.toLowerCase()
          ? 1
          : 0
      );
    case 'nameZ':
      return copy.sort((current, prev) =>
        current.name.toLowerCase() < prev.name.toLowerCase()
          ? 1
          : current.name.toLowerCase() > prev.name.toLowerCase()
          ? -1
          : 0
      );

    default:
      break;
  }
};

export const defaultFilters = [
  'cat_work',
  'cat_study',
  'cat_entertainment',
  'cat_workout',
  'completed',
  'uncompleted',
];

const filterMap = {
  'cat_work': 'work',
  'cat_study': 'study',
  'cat_entertainment': 'entertainment',
  'cat_workout': 'workout',
  'completed': true,
  'uncompleted': false,
}

export const filterEvents = (events, currentFilters) => {
  if (currentFilters.length < defaultFilters.length) {
    if (currentFilters.length >= defaultFilters.length / 2) {
      const excluded = defaultFilters.filter(el => !currentFilters.includes(el));
      return events.filter(ev => {
        return excluded.every(op => {
          if (op.includes('cat')) {
            return ev.category !== filterMap[op];
          }
          if (op.includes('completed')) {
            return ev.isDone !== filterMap[op]
          }
          return true;
        })
      })
    } else {
      const included = defaultFilters.filter(el => currentFilters.includes(el));
      return events.filter(ev => {
        return included.every(op => {
          if (op.includes('cat')) {
            return ev.category === filterMap[op];
          }
          if (op.includes('completed')) {
            return ev.isDone === filterMap[op]
          }
          return true;
        })
      })
    }
  } else {
    return events;
  }
};
