import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/system/Box';
import Reservations from '../Reservation/Reservations';
import useHttp from '../../hooks/useHttp';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';

const Main = () => {
  const [eventData, setEventData] = useState([]);
  const [query, setQuery] = useState('');
  const { sendRequest, error, isLoading } = useHttp();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm();

  const onSubmit = data => {
    const eventSlug = data.queryString.toLowerCase().split(' ').join('-');
    setQuery(eventSlug);
  };

  useEffect(() => {
    const getEventData = data => setEventData(data);

    if (query) {
      sendRequest({ url: `http://localhost:5000/api/events?eventName=${query}` }, getEventData);
    } else {
      sendRequest({ url: 'http://localhost:5000/api/events' }, getEventData);
    }

    if (isSubmitSuccessful) reset();
  }, [query, sendRequest, isSubmitSuccessful, reset]);

  return (
    <>
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: '5px 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by Event Name"
          inputProps={{ 'aria-label': 'search google maps' }}
          {...register('queryString')}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Box sx={{ minHeight: '90vh', maxWidth: '95%', margin: '.75rem auto 0' }}>
        <Grid container spacing={2} alignItems="center">
          {isLoading ? (
            <h1 style={{ width: '20%', margin: '3rem auto 0' }}>Loading...</h1>
          ) : error || eventData.data?.events?.length < 1 ? (
            <h1 style={{ width: '20%', margin: '3rem auto 0' }}>No data found!</h1>
          ) : (
            eventData.data?.events?.map(
              ({ _id, eventName, hostName, venue, photo, dateTime, description }) => (
                <Grid item xs={4} key={_id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={require(`../../backend/public/img/${photo}`)}
                        alt={eventName}
                      />
                      <CardContent>
                        <Typography
                          sx={{ fontWeight: 'bold' }}
                          gutterBottom
                          variant="h5"
                          component="div"
                        >
                          {eventName}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                          <span style={{ fontWeight: 'bold' }}>Hosted by</span> {hostName}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          component="div"
                          marginBottom={1}
                        >
                          <span style={{ fontWeight: 'bold' }}>Takes place on</span> {dateTime}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" marginBottom={1}>
                          <span style={{ fontWeight: 'bold' }}>Address</span>: {venue.house} {venue.city}
                          {venue.district}
                          {venue.division}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      {/*IMPORT COMPONENT Reservations */}
                      <Reservations eventId={_id} />
                      {/*IMPORT COMPONENT Reservations */}
                    </CardActions>
                  </Card>
                </Grid>
              )
            )
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Main;
