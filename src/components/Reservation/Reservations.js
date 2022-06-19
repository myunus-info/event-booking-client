import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReservationForm from './ReservationForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reservations = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const giveMessage = () => {
    toast.success('Reservation made successfully!', {
      position: 'top-center',
    });
  };

  return (
    <div style={{ marginLeft: 'auto' }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Make Reservation
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dynamic Event Name</DialogTitle>
        <DialogContent>
          <ReservationForm handleClose={handleClose} giveAlert={giveMessage} />
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default Reservations;
