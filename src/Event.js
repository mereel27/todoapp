import { Box, Typography, IconButton } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { getShortDate } from './utils';

export default function Event({ event, handleClick }) {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'white', p: '16px' }}>
      <Box mr="10px">
        <IconButton sx={{ p: '5px' }} onClick={() => handleClick(event.date)}>
          <CheckCircleOutlineRoundedIcon
            fontSize="medium"
            htmlColor={event.isDone ? 'lightgreen' : 'var(--icon-inactive-color)'}
          />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="p" fontWeight={700} sx={{textDecoration: event.isDone ? 'line-through' : null}}>
          {event.name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', fontWeight: '600'}}>
        <Typography variant="p">
          {getShortDate(event.date)}
        </Typography>
        <Box
          sx={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            bgcolor: 'rgba(var(--main-text-color), 1)',
            margin: '0 8px'
          }}
        ></Box>
        <Typography variant="p">
          {event.date.toLocaleString('en', {
            hour: '2-digit',
          })}
        </Typography>
      </Box>
    </Box>
  );
}
