import { Grid, Text, Button } from '@nextui-org/react';
import { Calendar, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useState } from 'react';
import { dateToString } from './utils/utils';
import DatePicker from './DatePicker/DatePicker';

const NavigationButton = ({ children, grow, left, right, ...props }) => {
  return (
    <Button
      auto
      light
      css={{
        padding: 0,
        fontWeight: '$bold',
        flexBasis: '50px',
        minWidth: '40px',
        borderTopLeftRadius: left ? '$sm' : 0,
        borderBottomLeftRadius: left ? '$sm' : 0,
        borderTopRightRadius: right ? '$sm' : 0,
        borderBottomRightRadius: right ? '$sm' : 0,
        '@media (max-width: 285px)': { minWidth: '30px' },
        flexGrow: 1,
        '&:hover': {
          backgroundColor: '$accents0',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default function DailyView({ day, handleDayChange, handleCurrentDayChange }) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSubmit = (date) => {
    console.log(date);
    handleDayChange(date);
    setPickerOpen(false);
  };

  const handleClose = () => setPickerOpen(false);

  return (
    <Grid
      css={{
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        flexGrow: 0,
        overflow: 'hidden',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 $md',
      }}
    >
      <Grid css={{ width: '60px' }}></Grid>
      <Grid
        css={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          gap: '$3'
        }}
      >
        <NavigationButton onPress={() => handleCurrentDayChange('prev')} left>
          <ArrowLeft2 variant="Bold" />
        </NavigationButton>
        <Text
          span
          weight="bold"
          css={{
            whiteSpace: 'nowrap',
            textAlign: 'center',
            flexGrow: 1,
            fontSize: '$xl',
            '@media (max-width: 340px)': { fontSize: '$md' },
            '@media (max-width: 304px)': { fontSize: '$sm' },
            '@media (max-width: 285px)': { fontSize: '$xs' },
          }}
        >
          {dateToString(day)}
        </Text>
        <NavigationButton onPress={() => handleCurrentDayChange('next')} right>
          <ArrowRight2 variant="Bold" />
        </NavigationButton>
      </Grid>
      <Grid css={{width: '20px'}}></Grid>
      <Button
        css={{
          color: '$primary',
          flexShrink: 0,
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
  );
}
