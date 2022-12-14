import '@fontsource/raleway';
import './App.css';
/* import StartPage from './StartPage'; */
import CalendarView from './CalendarView';
import { createTheme, ThemeProvider } from '@mui/material';

const colors = {
  border: '#979797',
}

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          color: 'inherit'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '::placeholder': {
            color: '#7C87A599'
          },
        },
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '::before': {
            borderBottom: `1px solid ${colors.border}`
          },
          ':hover:not(.Mui-disabled):before': {
            borderBottom: `1px solid`
          },
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#5A95FF'
    },
    secondary: {
      main: '#6670FF',
    },
    inputBorder: {
      main: '#979797'
    }
  },
  typography: {
    fontFamily: '"Raleway", "sans-serif"',
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <StartPage /> */}
        <CalendarView />
      </div>
    </ThemeProvider>
  );
}

export default App;
