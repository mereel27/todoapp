import { Grid, Text, Button } from '@nextui-org/react';
import { Calendar } from 'iconsax-react';
import { useState } from 'react';
import { dateToString } from './utils';
import EventsList from './EventsList';
import DatePicker from './DatePicker';

export default function DailyView({ day, handleDayChange }) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSubmit = (date) => {
    console.log(date);
    handleDayChange(date);
    setPickerOpen(false);
  };

  const handleClose = () => setPickerOpen(false);

  return (
    <Grid.Container direction="column" css={{ gap: '$10', height: '100%' }}>
      <Grid
        css={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexGrow: 0,
          width: '100%',
          padding: '0 $md',
        }}
      >
        <Text span weight="bold" size="$xl">
          {dateToString(day)}
        </Text>
        <Button
          css={{
            borderRadius: '3px',
            color: '$primary',
            '&:hover': { backgroundColor: '$blue100' },
          }}
          auto
          light
          icon={<Calendar />}
          onPress={() => setPickerOpen(true)}
        ></Button>
        <DatePicker
          date={day}
          open={pickerOpen}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </Grid>
      <EventsList day={day} />
    </Grid.Container>
  );
}
