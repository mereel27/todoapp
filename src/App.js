import './App.css';
/* import StartPage from './StartPage'; */
import CalendarView from './CalendarView';
import { createTheme, Switch, Grid, NextUIProvider } from '@nextui-org/react';
import Logo from './Logo';
import { useEffect, useState } from 'react';
import { Sun1, Moon } from 'iconsax-react';

const lightTheme = createTheme({
  type: 'light',
  theme: {
    breakpoints: {
      bp1: '320px',
    },
    colors: {
      accentColor: 'rgba(90, 149, 255)',
      mainText: '#050505',
      inputPlaceholder: 'rgba(124, 135, 165, 0.598)',
      inputBg: '$accents0',
      dateHoverBg: '$accents0',
      eventsBackground: '$accents0',
      violetEvent: '#7828C8',
      greenEvent: '#17C964',
      orangeEvent: '#F5A524',
      redEvent: '#F31260',
    },
    fonts: {
      sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'",
    },
  },
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    breakpoints: {
      bp1: '320px',
    },
    colors: {
      accentColor: 'rgba(90, 149, 255)',
      mainText: '#050505',
      inputPlaceholder: 'rgba(124, 135, 165, 0.598)',
      inputBg: '$accents1',
      dateHoverBg: '$accents1',
      eventsBackground: '$backgroundContrast',
      violetEvent: '#7828C8',
      greenEvent: '#17C964',
      orangeEvent: '#F5A524',
      redEvent: '#F31260',
    },
    fonts: {
      sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'",
    },
  },
});

function App() {
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDark')));
  const handleThemeSwitch = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('isDark', isDark);
  }, [isDark]);

  return (
    <NextUIProvider theme={isDark ? darkTheme : lightTheme}>
      <div className="App">
        {/* <StartPage /> */}
        <Grid
          css={{
            margin: '0 auto',
            width: 'calc(100% - 20px)',
            maxWidth: '500px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '$7 0',
          }}
        >
          <Logo width="47" height="15" />
          <Switch
            name={`switch to ${isDark ? 'light' : 'dark'}`}
            aria-label={`switch to ${isDark ? 'light' : 'dark'}`}
            onChange={handleThemeSwitch}
            checked={isDark}
            iconOn={<Sun1 variant="Bold" size={32}/>}
            iconOff={<Moon variant="Bold" size={32}/>}
          />
        </Grid>
        <CalendarView />
      </div>
    </NextUIProvider>
  );
}

export default App;
