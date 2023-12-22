import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { CardActionArea } from '@mui/material';
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';

export default function MovieCard({ movie }) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Link to={`/movies/${movie.id}`}>
          <CardMedia
            sx={{ height: 500 }}
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : img
            }
          /></Link>
        <CardHeader sx={{ height: 60, alignItems: "start", lineHeight: '1.2' }}
          title={
            <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
              {movie.title || movie.name}{" "}
            </Typography>
          }
        />

        <CardContent>
          <Grid container direction="column" justifyContent="flex-end" alignItems="flex-end">
            <Grid item xs={6}>
              <Typography variant="h6" component="p">
                <CalendarIcon fontSize="small" />
                {movie.release_date || movie.first_air_date}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" component="p">
                <Rating name="read-only" value={movie.vote_average / 2} precision={0.5} readOnly />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}