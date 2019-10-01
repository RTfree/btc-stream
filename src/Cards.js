import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 1080,
    margin: "20px auto"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  let jsonData = props.data;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Bitcoin Data
        </Typography>
        <Typography variant="body2" component="p">
          Input Address: {jsonData["x"]["inputs"][0]["prev_out"]["addr"]} <br/>
          Input Value: {jsonData["x"]["inputs"][0]["prev_out"]["value"]}
        </Typography>
      </CardContent>
    </Card>
  );
}