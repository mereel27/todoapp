import { Box } from '@mui/material';

export default function ViewButton({ active, handleClick, view, children }) {
  return (
    <Box
      component="button"
      sx={{
        border: 'none',
        fontFamily: 'inherit',
        fontWeight: active ? 600 : 500,
        fontSize: 'inherit',
        padding: 0,
        borderRadius: 'inherit',
        width: active ? '155px' : 'calc(100% - 155px)',
        flexGrow: active ? 0 : 1,
        color: active ? '#fff' : 'inherit',
        bgcolor: 'transparent',
        cursor: 'pointer',
        transition: 'width .2s linear'
      }}
      onClick={(e) => handleClick(view)}
    >
      {children}
    </Box>
  );
}
