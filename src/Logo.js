import { Box } from '@mui/material';
import logo from './img/logo.png';

export default function Logo(props) {
  return (
    <Box
      component="img"
      sx={{ height: `${props.height}px` || '32px', width: `${props.width}px` || '102px' }}
      src={logo}
      alt="logo"
    />
  );
}
