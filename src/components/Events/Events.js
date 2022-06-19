import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EventForm from './EventForm';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Events = () => {
  const [open, setOpen] = useState(false);

  const giveMessage = () => {
    toast.success('Event created successfully!', {
      position: 'top-center',
    });
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ marginLeft: 'auto' }}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Create Event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Event</DialogTitle>
        <DialogContent>
          <EventForm onAlert={giveMessage} onClose={handleClose} />
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default Events;
