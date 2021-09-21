import React from 'react';
import { default as MaterialAppBar } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Home, Localization, NavItem } from './app-bar.model';
import LanguageIcon from '@mui/icons-material/Language';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';

/* eslint-disable-next-line */
export interface AppBarProps {
  navItems: NavItem[];
  localization: Localization;
  home: Home;
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%'
//     },
//     menuButton: {
//       marginRight: theme.spacing(2)
//     },
//     header: {
//       flexGrow: 1
//     },
//     localeButton: {
//       textTransform: 'uppercase'
//     }
//   })
// );

export const AppBar: React.FC<AppBarProps> = ({ localization, home }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialAppBar position="static">
        <Toolbar>
          <IconButton edge="start" sx={{ marginRight: '2em' }} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton size="medium" color="inherit" onClick={home.handler}>
              <Typography variant="button" display="block">
                {home.text}
              </Typography>
            </IconButton>
          </Box>
          <div>
            <IconButton
              size="medium"
              aria-label="localization"
              aria-controls="menu-appbar-localization"
              onClick={handleMenu}
              color="inherit"
            >
              <LanguageIcon />
              <Typography variant="button" display="block">
                {localization.active}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar-localization"
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
                    sx={{ textTransform: 'uppercase' }}
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
    </Box>
  );
};

export default AppBar;
