import { Grid } from '@nextui-org/react';
import SwitchButton from './SwitchButton';

export default function ViewSwitcher({todoView, handleClick}) {
  return (
    <Grid
      css={{
        maxWidth: '285px',
        height: '50px',
        border: '1px solid rgba(200, 205, 218, 0.306754)',
        borderRadius: '100px',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        lineHeight: '1.2',
        zIndex: '0',
      }}
    >
      <SwitchButton
        active={todoView === 'month'}
        handleClick={handleClick}
        view="month"
      >
        Monthly
      </SwitchButton>
      <SwitchButton
        active={todoView === 'day'}
        handleClick={handleClick}
        view="day"
      >
        Daily
      </SwitchButton>
      <Grid
        css={{
          position: 'absolute',
          width: '155px',
          height: '100%',
          backgroundColor: '$primary',
          borderRadius: 'inherit',
          zIndex: '-1',
          right: todoView === 'day' ? 0 : 'calc(100% - 155px)',
          transition: 'right .2s ease',
        }}
      ></Grid>
    </Grid>
  );
}
