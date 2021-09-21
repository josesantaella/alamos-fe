import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import colors from './styles/palette.module.scss';
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  }
});

export default theme;
