import '@fontsource/raleway';
import Grid from '@mui/material/Grid';
import { Typography} from '@mui/material';
import './App.css';
import TextCarousel from './Carousel';
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Logo from './Logo';

export default function StartPage() {
  return (
    <Grid
      container
      direction="column"
      sx={{ width: '100%', height: '100vh', m: '0 auto', textAlign: 'center' }}
    >
      <Grid item container sx={{ position: 'relative' }}>
        <Button
          sx={{
            p: '10px',
            minWidth: 'fit-content',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'none',
            color: '#373737',
            position: 'absolute',
            zIndex: 10,
            top: '17px',
            right: '38px',
            letterSpacing: '1px',
            lineHeight: '1.2',
          }}
        >
          Skip
        </Button>
        <Grid
          item
          xs={12}
          sx={{
            position: 'relative',
            bgcolor: '#F8FBFC',
            clipPath:
              'polygon(50% 0%, 100% 0%, 100% 0%, 100% 94%, 51.9% 100%, 48.1% 100%, 0% 94%, 0% 0%, 0% 0%)',
            height: '295px',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              position: 'absolute',
              fontFamily: 'Raleway',
              fontSize: '14px',
              lineHeight: '1.2',
              fontWeight: '500',
              left: '0',
              right: '0',
              top: '168px',
              margin: '0 auto',
              width: '137px',
              height: '16px',
            }}
          >
            Hi there! Welcome to
          </Typography>
          <Logo />
        </Grid>
      </Grid>
      <Grid item container>
        <Grid
          item
          xs={12}
          sx={{ position: 'relative', margin: '0 10px', overflow: 'hidden' }}
        >
          <TextCarousel />
        </Grid>
      </Grid>
      <Grid item container sx={{ flexGrow: '1'}}>
        <Grid item sx={{ margin: 'auto auto 50px auto' }}>
          <Button
            variant="contained"
            sx={{
              justifyContent: 'flex-start',
              fontWeight: 700,
              fontFamily: 'inherit',
              p: 0,
              display: 'flex',
              width: '280px',
              height: '50px',
              bgcolor: '#3B5798',
              marginBottom: '15px',
              borderRadius: '3px',
              boxShadow:
                '0px 4px 8px rgba(59, 87, 152, 0.115149), 0px 8px 16px rgba(0, 0, 0, 0.04)',
              '&:hover': {
                bgcolor: '#4f68a2',
              },
            }}
            disableElevation
          >
            <span class="btnIconBg fb">
              <FacebookIcon sx={{ fontSize: '28px' }} />
            </span>
            facebook
          </Button>
          <Button
            variant="contained"
            sx={{
              justifyContent: 'flex-start',
              fontWeight: 700,
              fontFamily: 'inherit',
              p: 0,
              display: 'flex',
              width: '280px',
              height: '50px',
              bgcolor: '#59DCFF',
              borderRadius: '3px',
              boxShadow:
                '0px 4px 8px rgba(80, 199, 227, 0.130293), 0px 8px 16px rgba(0, 0, 0, 0.04)',
              '&:hover': {
                bgcolor: '#7ae3ff',
              },
            }}
            disableElevation
          >
            <span class="btnIconBg tw">
              <TwitterIcon sx={{ fontSize: '28px' }} />
            </span>
            twitter
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
