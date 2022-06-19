import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Button, FormLabel } from '@mui/material';
import { useForm } from 'react-hook-form';

const EventForm = props => {
  const Input = styled('input')({
    display: 'none',
  });
  const [value, setValue] = useState(new Date());
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);

    ///////////////////////////////////
    // Handle ModalClose and GiveAlert
    props.onAlert();
    props.onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth>
        <TextField
          type="text"
          variant="outlined"
          margin="normal"
          label="Event name"
          {...register('eventName')}
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
        <TextField
          type="text"
          variant="outlined"
          margin="normal"
          label="Host name"
          {...register('hostName')}
          required
        />
      </FormControl>

      <FormLabel>Venues</FormLabel>
      <FormControl
        fullWidth
        sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}
      >
        <TextField
          type="text"
          variant="outlined"
          margin="normal"
          label="House number"
          {...register('houseNumber')}
          required
        />
        <TextField
          type="text"
          variant="outlined"
          margin="normal"
          label="City"
          {...register('city')}
          required
        />
      </FormControl>

      <FormControl
        fullWidth
        sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}
      >
        <TextField
          type="text"
          variant="outlined"
          margin="normal"
          label="District"
          {...register('district')}
          required
        />
        <TextField
          type="text"
          variant="outlined"
          margin="normal"
          label="Division"
          {...register('division')}
          required
        />
      </FormControl>

      <FormControl fullWidth>
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

      <FormControl sx={{ margin: '0.75rem 0 1.25rem 0' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              {...register('image')}
            />
            <Button variant="outlined" component="span">
              Upload Event Image
            </Button>
          </label>
        </Stack>
      </FormControl>

      <FormControl fullWidth>
        <TextareaAutosize
          minRows={2}
          style={{
            padding: '1rem',
            fontSize: '1rem',
            marginBottom: '1.25rem',
            fontFamily: 'Roboto',
            outlineColor: '#1976d2',
          }}
          placeholder="Event Description"
          {...register('description')}
          required
        />
      </FormControl>

      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button type="submit" variant="contained" color="primary" size="large">
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default EventForm;
