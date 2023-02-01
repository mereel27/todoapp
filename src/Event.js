import { memo } from 'react';
import { getShortDate, getDateObject, eventColorsMap } from './utils';
import {
  Text,
  Collapse,
  Button,
  Grid,
  Checkbox,
  Card,
} from '@nextui-org/react';
import { Trash } from 'iconsax-react';
import DeleteEventDialog from './DeleteEventDialog';
import { useContext, useState } from 'react';
import { Context } from './CalendarView';
import EventCheckbox from './EventCheckbox';

export default memo(function Event({
  event,
  expanded,
  handleClick,
  handleCollapse,
  handleDetailsClick,
  handleDeleteEvent,
  handleSelectEvent,
  isSelected,
  deleted,
}) {
  const { dateObject } = getDateObject(event.date);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { todoView, selectMode } = useContext(Context);

  const handleDelete = () => {
    setDialogOpen(false);
    handleDeleteEvent(event);
  };

  return (
    <Grid css={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <Checkbox
        aria-label="select"
        aria-hidden={!selectMode}
        css={
          selectMode
            ? {
                marginRight: '10px',
                scale: 1,
                transition: 'transform .2s ease-out',
                willChange: 'transform',
              }
            : { width: 0, scale: 0, pointerEvents: 'none' }
        }
        onChange={() => handleSelectEvent(event)}
        isSelected={isSelected}
      />
      <Collapse
        disabled={selectMode}
        expanded={selectMode ? false : expanded}
        onClick={selectMode ? () => handleSelectEvent(event) : () => handleCollapse(event.id)}
        shadow
        css={{
          width: '100%',
          opacity: deleted ? '0' : '',
          flexGrow: 1,
          transform: deleted ? 'translateX(50%)' : '',
          transition: 'opacity .25s, transform .25s',
          backgroundColor: isSelected ? '$primaryLight' : '$background',
          /* padding: '$lg $sm', */
          userSelect: 'none',
          '[aria-disabled="true"]': {
            cursor: 'pointer',
          },
          '.nextui-collapse-view': {
            padding: '$md 0',
          },
          '.nextui-collapse-title-content-left': {
            flexBasis: '100%',
            flexShrink: 0,
            width: '100%',
            margin: 0,
            /* overflow: 'hidden', */
          },
          '.nextui-collapse-content': {
            paddingBottom: '$md',
          },
        }}
        showArrow={false}
        contentLeft={
          <>
          <Grid css={{display: 'flex', minWidth: 0, overflow: 'hidden'}}>
            <EventCheckbox
              isSelected={event.isDone}
              onChange={() => handleClick(event)}
              lineThrough
              disabled={selectMode}
            >
              {event.name}
            </EventCheckbox>
            </Grid>
            <Card
              role='separator'
              css={{
                borderRadius: '50%',
                backgroundColor: `$${eventColorsMap[event.category]}`,
                width: '8px',
                height: '8px',
                margin: '0 6px',
                flexShrink: 0,
              }}
            ></Card>
            <Text span weight="medium" size="$sm" css={{ marginLeft: 'auto' }}>
              {todoView === 'day' ? (
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
              ) : (
                <>
                  <Text
                    span
                    css={{
                      display: 'none',
                      '@media (max-width: 350px)': { display: 'inline' },
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {dateObject.toLocaleDateString('en-uk', {
                      day: '2-digit',
                      month: '2-digit',
                    })}
                  </Text>
                  <Text
                    span
                    css={{ '@media (max-width: 350px)': { display: 'none' }, whiteSpace: 'nowrap' }}
                  >
                    {getShortDate(event.date)}
                  </Text>
                </>
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
            paddingTop: '$md',
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
              /* padding: '0 $sm' */
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
    </Grid>
  );
});
