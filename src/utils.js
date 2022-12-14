export const getShortMonth = (value) =>
  value.toLocaleString('en', { month: 'short' });

export const getShortDate = (value) => {
  const date = value.getDate();
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
  const dateString = getShortMonth(value);
  if (value.getDate() === new Date().getDate()) {
    return 'Today';
  }
  return date + ending + ' ' + dateString;
};

export const formatDate = (value) =>
  value.toLocaleString('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
