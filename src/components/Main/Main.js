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

const Main = () => {
  const [eventData, setEventData] = useState([]);
  const { sendRequest, isLoading, error } = useHttp();

  // console.log(eventData);

  useEffect(() => {
    const getEventData = data => setEventData(data);

    sendRequest({ url: 'http://localhost:5000/api/events' }, getEventData);
  }, [sendRequest]);

  return (
    <Box sx={{ minHeight: '90vh', maxWidth: '95%', margin: '5rem auto 0' }}>
      <Grid container spacing={2} alignItems="center">
        {eventData.data?.events?.map(
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
                    <Typography gutterBottom variant="h5" component="div">
                      {eventName}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      Hosted by: {hostName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Takes place on {dateTime}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Houe: {venue.house} City: {venue.city} Discrict: {venue.district} Division:{' '}
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
        )}
      </Grid>
    </Box>
  );
};

export default Main;
