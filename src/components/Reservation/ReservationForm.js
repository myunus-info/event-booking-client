import React, { useState } from 'react';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useForm } from 'react-hook-form';

const ReservationForm = props => {
  const [value, setValue] = useState(new Date());
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);

    //////////////////////////////////
    // Handle ModalClose and GiveAlert
    props.giveAlert();
    props.handleClose();
  };

  return (
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
          type="text"
          label="Event name"
          variant="outlined"
          margin="normal"
          {...register('event')}
          required
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          type="text"
          label="Host name"
          variant="outlined"
          margin="normal"
          {...register('host')}
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: '0.75rem' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={props => (
              <TextField {...props} margin="normal" {...register('dateTime')} required />
            )}
            label="Event Date and Time"
            value={value}
            onChange={newValue => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button type="submit" variant="contained" color="primary" size="large">
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default ReservationForm;
