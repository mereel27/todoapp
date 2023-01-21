import './App.css';
/* import StartPage from './StartPage'; */
import CalendarView from './CalendarView';
import { createTheme, NextUIProvider } from '@nextui-org/react';

const theme = createTheme({
  type: 'light', // it could be "light" or "dark"
  theme: {
    breakpoints: {
      bp1: '320px'
    },
    colors: {
      /* text: 'rgb(3, 27, 78)', */
      accentColor: 'rgba(90, 149, 255)',
      mainText: '#050505',
      inputPlaceholder: 'rgba(124, 135, 165, 0.598)',
      eventsBackground: 'rgba(241, 243, 245, 0.5)',
      violetEvent: '#7828C8',
      greenEvent: '#17C964',
      orangeEvent: '#F5A524',
      redEvent: '#F31260',
    },
    space: {},
    fonts: {
      sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'",
    },
  },
});

function App() {
  return (
    <NextUIProvider theme={theme}>
      <div className="App">
        {/* <StartPage /> */}
        <CalendarView />
      </div>
    </NextUIProvider>
  );
}

export default App;
