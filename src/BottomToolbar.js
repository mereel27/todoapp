import { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NewEvent from './NewEvent';

export default function BottomToolbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: '87px',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          bgcolor: 'rgb(var(--accent-color))',
          top: 0,
          left: 0,
          right: 0,
          margin: '0 auto',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 20px 30px rgba(74, 144, 226, 0.393541)',
          '&:hover': {
            backgroundColor: 'var(--accent-hover)',
          },
        }}
        onClick={handleOpen}
      >
        <AddRoundedIcon
          sx={{ width: '24px', height: '24px', color: 'white' }}
          viewBox="4 4 16 16"
        />
      </IconButton>
      <Box
        sx={{
          height: '60px',
          width: '100%',
          maxWidth: '500px',
          bottom: 0,
          bgcolor: 'var(--bottom-panel-blur)',
          position: 'fixed',
          backdropFilter: 'blur(24px)',
        }}
      >
        <Box
          className="bottom-panel-flex-container"
          sx={{
            width: '100%',
            maxWidth: '500px',
            display: 'flex',
            color: 'var(--bottom-panel-color)',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            padding: '0 28px',
          }}
        >
          <IconButton size="large" color="inherit">
            <FormatListBulletedRoundedIcon />
          </IconButton>
          <IconButton size="large" color="inherit">
            <AccessTimeRoundedIcon />
          </IconButton>
          <Box sx={{ flexBasis: '110px', flexShrink: 2, height: '100%' }}></Box>
          <IconButton size="large" color="inherit">
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <IconButton size="large" color="inherit">
            <PersonOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <NewEvent open={open} handleClose={handleClose}/>
    </Box>
  );
}
