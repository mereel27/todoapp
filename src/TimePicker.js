import { useCallback, useEffect, useState } from 'react';
import { Input, Grid, Text, Popover, styled } from '@nextui-org/react';
import TimeButton from './TimeButton';
import { Clock } from 'iconsax-react';
import { hoursArray, minutesArray } from './utils';

const RightFlexbox = styled(Grid, {
  scrollbarColor: '#0072F5 transparent',
  scrollbarWidth: 'thin',
  height: '200px',
  overflow: 'hidden scroll',
  gap: '5px',
  '&::-webkit-scrollbar': {
    backgroundColor: 'transparent',
    width: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$primary',
    backgroundClip: 'content-box',
    height: '35px',
    borderRadius: '4px',
    border: '2px solid transparent',
  },
});

const LeftFlexbox = styled(RightFlexbox, {
  borderRight: '2px solid $accents0',
  '&::-webkit-scrollbar-thumb': {
    height: '30px',
  },
});

export default function TimePicker({hours, minutes, handleHoursChange, handleMinutesChange}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoursBoxRef, setHourBoxRef] = useState(null);
  const [minutesBoxRef, setMinutesBoxRef] = useState(null);
  const [hourPosisition, setHourPosition] = useState();
  const [minutePosisition, setMinutePosition] = useState();

  useEffect(() => {
    if (hoursBoxRef) {
      // Scroll to selected hour on first load
      if (hourPosisition === undefined) {
        console.log('first call hour');
        const selectedHourButton = [...hoursBoxRef.children].find(
          (child) => child.attributes['data-selected']
        );
        setHourPosition(selectedHourButton.offsetTop);
        console.log(hourPosisition);
        hoursBoxRef.scrollTo(0, selectedHourButton.offsetTop - 76);
      } else {
        // Scroll to selected hour on open
        hoursBoxRef.scrollTo(0, hourPosisition - 76);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoursBoxRef]);

  useEffect(() => {
    if (minutesBoxRef) {
      // Scroll to selected minute on first load
      if (minutePosisition === undefined) {
        console.log('first call minute');
        const selectedMinuteButton = [...minutesBoxRef.children].find(
          (child) => child.attributes['data-selected']
        );
        setMinutePosition(selectedMinuteButton.offsetTop);
        console.log(minutePosisition);
        minutesBoxRef.scrollTo(0, selectedMinuteButton.offsetTop - 76);
      } else {
        // Scroll to selected minute on open
        minutesBoxRef.scrollTo(0, minutePosisition - 76);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutesBoxRef]);

  const handleHourButtonPress = useCallback((e) => {
    const value = e.target.attributes['data-value'].value;
    const pos = e.target.offsetTop;
    handleHoursChange(value);
    setHourPosition(pos);
  }, [handleHoursChange]);

  const handleMinuteButtonPress = useCallback((e) => {
    const value = e.target.attributes['data-value'].value;
    const pos = e.target.offsetTop;
    handleMinutesChange(value);
    setMinutePosition(pos);
  }, [handleMinutesChange]);

  return (
    <Grid.Container alignItems="center" direction="column">
      <Text span size="lg" weight="bold" css={{ marginBottom: '$xs' }}>
        Time
      </Text>
      <Popover placement="top" isOpen={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>
          <Input
            value={`${hours}:${minutes}`}
            size="lg"
            width="110px"
            aria-label="Select time"
            contentLeft={<Clock />}
            contentClickable
            readOnly
            initialValue={new Date().toLocaleTimeString('no', {
              hour: 'numeric',
              minute: '2-digit',
            })}
            css={{
              '.nextui-input-content': {
                '&:hover': {
                  color: '$primary',
                },
              },
              '& input': {
                cursor: 'pointer',
                margin: '$1 !important',
                userSelect: 'none',
              },
              '.nextui-input-wrapper': {
                /* borderRadius: '4px', */
                height: '45px',
              },
            }}
          />
        </Popover.Trigger>
        <Popover.Content
          css={{
            overflowY: 'hidden',
            border: '2px solid $accents0',
            /* borderRadius: '3px', */
          }}
        >
          <Grid.Container gap={2}>
            <LeftFlexbox ref={setHourBoxRef} xs direction={'column'}>
              {hoursArray().map((h, index) => (
                <TimeButton
                  key={`${h}-${index}`}
                  data-selected={h === hours ? true : null}
                  data-value={h}
                  shadow={h === hours}
                  color={h === hours ? 'selectedTime' : 'time'}
                  size="timeButton"
                  onPress={handleHourButtonPress}
                >
                  {h}
                </TimeButton>
              ))}
            </LeftFlexbox>
            <RightFlexbox xs direction="column" ref={setMinutesBoxRef}>
              {minutesArray().map((m, index) => (
                <TimeButton
                  key={`${m}-${index}`}
                  data-selected={m === minutes ? true : null}
                  data-value={m}
                  shadow={m === minutes}
                  color={m === minutes ? 'selectedTime' : 'time'}
                  size="timeButton"
                  onPress={handleMinuteButtonPress}
                >
                  {m}
                </TimeButton>
              ))}
            </RightFlexbox>
          </Grid.Container>
        </Popover.Content>
      </Popover>
    </Grid.Container>
  );
}
