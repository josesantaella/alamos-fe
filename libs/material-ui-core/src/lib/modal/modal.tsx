import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export interface ModalProps {
  isOpened: boolean;
  onRequestClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FullScreenDialog: React.FC<ModalProps> = ({ isOpened, onRequestClose, children }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => onRequestClose(), 350);
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Button sx={{ ml: 'auto' }} autoFocus color="inherit" onClick={handleClose}>
            share
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
};

export default FullScreenDialog;
