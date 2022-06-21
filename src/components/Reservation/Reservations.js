import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReservationForm from './ReservationForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reservations = props => {
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const giveMessage = () => {
    toast.success('Reservation made successfully!', {
      position: 'top-center',
    });
  };

  const fetchEventName = name => setEventName(name);

  return (
    <div style={{ marginLeft: 'auto' }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Make Reservation
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{eventName}</DialogTitle>
        <DialogContent>
          <ReservationForm
            eventId={props.eventId}
            handleClose={handleClose}
            giveAlert={giveMessage}
            eventsName={fetchEventName}
          />
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default Reservations;
