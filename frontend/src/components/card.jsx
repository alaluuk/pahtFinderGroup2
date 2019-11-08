import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://jooinn.com/images/old-house-35.jpg"
          title="Good House"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Good House
          </Typography>
          <Typography variant="subtitle1" component="p">
            1746
          </Typography>
          <Typography variant="subtitle1" component="p">
            Russia
          </Typography>
          <Slider
            defaultValue={80}
            aria-labelledby="discrete-slider-always"
            valueLabelDisplay="off"
            disabled={true}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}