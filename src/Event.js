import { getShortDate, getDateObject } from './utils';
import { Text, Collapse, Button, Grid, } from '@nextui-org/react';
import { FiTrash2 } from 'react-icons/fi';
import CheckButton from './CheckButton';
import { useContext } from 'react';
import { Context } from './CalendarView';

export default function Event({
  event,
  handleClick,
  handleDetailsClick,
  handleDeleteEvent,
  deleted,
}) {
  const { dateObject } = getDateObject(event.date);
  const { todoView } = useContext(Context);
  return (
    <Collapse
      shadow
      css={{
        opacity: deleted ? '0' : '',
        transform: deleted ? 'translateX(50%)' : '',
        transition: 'opacity .25s, transform .25s',
        marginBottom: '10px',
        backgroundColor: '$white',
        padding: '$lg $sm',
        userSelect: 'none',
        '.nextui-collapse-view': {
          padding: 0,
        },
        '.nextui-collapse-title-content-left': {
          flexBasis: '100%',
          flexShrink: 0,
        },
        '.nextui-collapse-content': {
          padding: '$lg 0 0',
        },
      }}
      showArrow={false}
      contentLeft={
        <>
          <CheckButton
            checked={event.isDone}
            onPress={() => handleClick(event.id)}
          />
          <Text
            span
            css={{
              textDecoration: event.isDone ? 'line-through' : null,
              marginLeft: '10px',
              fontWeight: '$semibold',
              whiteSpace: 'nowrap',
            }}
          >
            {event.name}
          </Text>
          <Text span weight="medium" size="$sm" css={{ marginLeft: 'auto' }}>
            <Text span css={{display: 'none', '@media (max-width: 350px)': { display: 'inline' }}}>
              {dateObject.toLocaleDateString('en-uk', {day: '2-digit', month: '2-digit'})}
            </Text>
            <Text span css={{'@media (max-width: 350px)': { display: 'none' }}}>
              {getShortDate(event.date)}
            </Text>
            {/* <Text span css={{ marginLeft: '10px', '@media (max-width: 350px)': { display: 'none' } }}>
              {dateObject.toLocaleString('en', {
                hour: '2-digit',
              })}
            </Text> */}
          </Text>
        </>
      }
      divider={false}
    >
      <Grid
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid $border',
          paddingTop: '$lg',
        }}
      >
        <Button
          flat
          color="secondary"
          auto
          onPress={() => handleDetailsClick(event)}
          aria-label="View details"
        >
          View details
        </Button>
        <Button
          aria-label="Delete event"
          auto={true}
          flat
          color="error"
          css={{ marginLeft: 'auto', fontSize: '20px', padding: '$0 $sm' }}
          icon={<FiTrash2 />}
          onPress={() => handleDeleteEvent(event)}
        ></Button>
      </Grid>
    </Collapse>
  );
}
