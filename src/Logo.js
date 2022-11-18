import { Box } from "@mui/material";
import logo from './img/logo.png';

export default function Logo(props) {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '0',
        right: '0',
        top: '208px',
      }}
    >
      <Box component='img' sx={{height: props.height || '32px', width: props.width || '102px'}} src={logo} alt="logo" />
    </Box>
  );
}
