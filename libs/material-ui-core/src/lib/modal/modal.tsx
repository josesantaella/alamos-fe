import React, { ReactNode, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
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
  const [content, setContent] = React.useState<ReactNode | null>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (children === null) return;
    setContent(children);
  }, [children]);

  useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  const handleClose = () => {
    onRequestClose();
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
      {children || content}
    </Dialog>
  );
};

export default FullScreenDialog;
