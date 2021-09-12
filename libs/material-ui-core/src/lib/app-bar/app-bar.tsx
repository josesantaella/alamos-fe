
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { default as MaterialAppBar } from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@alamos-fe/material-ui-core';

/* eslint-disable-next-line */
export interface AppBarProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const AppBar: React.FC<AppBarProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MaterialAppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button>Categories</Button>
        </Toolbar>
      </MaterialAppBar>
    </div>
  );
}

export default AppBar;
