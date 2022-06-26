import React, { useEffect, useState } from 'react';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';

import { useForm } from 'react-hook-form';
import useHttp from '../../hooks/useHttp';
import { DialogTitle } from '@mui/material';

const ReservationForm = props => {
  const [eventById, setEventById] = useState({ eventName: '', hostName: '', dateTime: '' });
  const { register, handleSubmit } = useForm();
  const { sendRequest } = useHttp();

  useEffect(() => {
    const getEventById = data => setEventById(data?.data?.event);

    sendRequest({ url: `http://localhost:5000/api/event/${props.eventId}` }, getEventById);
  }, [props.eventId, sendRequest]);

  const createBooking = data => {
    console.log('Create booking data: ', data);
  };

  const createBookingHandler = async bookingData => {
    sendRequest(
      {
        url: 'http://localhost:5000/api/booking',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      },
      createBooking
    );
  };

  const onSubmit = ({ firstName, lastName, email, phone, age }) => {
    const bookingData = {
      firstName,
      lastName,
      email,
      phone,
      age,
      eventName: eventById.data?.event?.eventName,
      hostName: eventById.data?.event?.hostName,
      dateTime: eventById.data?.event?.dateTime,
    };
    console.log(bookingData);
    createBookingHandler(bookingData);
    //////////////////////////////////
    // Handle ModalClose and GiveAlert
    props.giveAlert();
    props.handleClose();
  };

  return (
    <>
      <DialogTitle style={{ marginLeft: '-1.5rem' }}>{eventById.eventName}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          fullWidth
          sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}
        >
          <TextField
            type="text"
            label="First name"
            variant="outlined"
            margin="normal"
            {...register('firstName')}
            required
          />

          <TextField
            type="text"
            label="Last name"
            variant="outlined"
            margin="normal"
            {...register('lastName')}
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            type="email"
            label="Email address"
            variant="outlined"
            margin="normal"
            {...register('email')}
            required
          />
        </FormControl>

        <FormControl
          fullWidth
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: '1rem',
          }}
        >
          <TextField
            type="text"
            label="Phone number"
            variant="outlined"
            margin="normal"
            {...register('phone')}
            required
          />

          <TextField
            type="number"
            label="Age"
            variant="outlined"
            margin="normal"
            {...register('age')}
            required
          />
        </FormControl>

        <FormLabel>Event</FormLabel>

        <FormControl fullWidth>
          <TextField
            value={eventById.eventName}
            type="text"
            variant="outlined"
            margin="normal"
            {...register('eventName')}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            value={eventById.hostName}
            type="text"
            variant="outlined"
            margin="normal"
            {...register('hostName')}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '0.75rem' }}>
          <TextField
            value={eventById.dateTime}
            type="text"
            variant="outlined"
            margin="normal"
            {...register('dateTime')}
          />
        </FormControl>

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button type="submit" variant="contained" color="primary" size="large">
            Submit
          </Button>
        </div>
      </Box>
    </>
  );
};

export default ReservationForm;
