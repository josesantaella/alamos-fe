import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { default as MaterialAppBar } from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '../button/button';
import { Localization, NavItem } from './app-bar.model';
import LanguageIcon from '@mui/icons-material/Language';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

/* eslint-disable-next-line */
export interface AppBarProps {
  navItems: NavItem[];
  localization: Localization;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    localeButton: {
      textTransform: 'uppercase'
    }
  })
);

export const AppBar: React.FC<AppBarProps> = (props) => {
  const { localization } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <div>
            <IconButton
              size="medium"
              aria-label="localization"
              aria-controls="menu-appbar-localization"
              onClick={handleMenu}
              color="inherit"
            >
              <LanguageIcon className={classes.localeIcon} />
              <Typography variant="button" display="block">
                {localization.active}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar-localization"
              getContentAnchorEl={null}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              {localization.locales
                .filter((x) => x.value !== localization.active)
                .map((locale) => (
                  <MenuItem
                    key={locale.value}
                    onClick={() => {
                      locale.handler();
                      handleClose();
                    }}
                    className={classes.localeButton}
                  >
                    <Typography variant="button" display="block">
                      {locale.label}
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </div>
        </Toolbar>
      </MaterialAppBar>
    </div>
  );
};

export default AppBar;
