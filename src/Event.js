import { getShortDate, getDateObject } from './utils';
import { Text, Collapse, Button, Grid } from '@nextui-org/react';
import { Trash } from 'iconsax-react';
import DeleteEventDialog from './DeleteEventDialog';
import { useContext, useState } from 'react';
import { Context } from './CalendarView';
import EventCheckbox from './EventCheckbox';

export default function Event({
  event,
  handleClick,
  handleDetailsClick,
  handleDeleteEvent,
  deleted,
}) {
  const { dateObject } = getDateObject(event.date);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { todoView } = useContext(Context);

  const handleDelete = () => {
    setDialogOpen(false);
    handleDeleteEvent(event);
  };

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
          <EventCheckbox
            isSelected={event.isDone}
            onChange={() => handleClick(event)}
            lineThrough
          >
            {event.name}
          </EventCheckbox>
          <Text span weight="medium" size="$sm" css={{ marginLeft: 'auto' }}>
            {todoView === 'month' ? (
              <>
                <Text
                  span
                  css={{
                    display: 'none',
                    '@media (max-width: 350px)': { display: 'inline' },
                  }}
                >
                  {dateObject.toLocaleDateString('en-uk', {
                    day: '2-digit',
                    month: '2-digit',
                  })}
                </Text>
                <Text
                  span
                  css={{ '@media (max-width: 350px)': { display: 'none' } }}
                >
                  {getShortDate(event.date)}
                </Text>
              </>
            ) : (
              <Text
                span
                css={{
                  marginLeft: '10px',
                  '@media (max-width: 350px)': { display: 'none' },
                }}
              >
                {dateObject.toLocaleString('en', {
                  hour: '2-digit',
                })}
              </Text>
            )}
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
          light
          color="secondary"
          auto
          onPress={() => handleDetailsClick(event)}
          aria-label="View details"
          css={{
            '&:hover': {
              backgroundColor: '$purple100',
            },
          }}
        >
          View details
        </Button>
        <DeleteEventDialog
          open={isDialogOpen}
          setOpen={setDialogOpen}
          handleDelete={handleDelete}
        >
          <Button
            aria-label="Delete event"
            auto={true}
            light
            color="error"
            css={{
              marginLeft: 'auto',
              fontSize: '20px',
              padding: '$0 $sm',
              '&:hover': {
                backgroundColor: '$red100',
              },
            }}
            icon={<Trash />}
          ></Button>
        </DeleteEventDialog>
      </Grid>
    </Collapse>
  );
}
