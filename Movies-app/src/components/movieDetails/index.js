import React, { useContext, useState } from "react";
import { MoviesContext } from '../../contexts/moviesContext';
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { useQueries } from "react-query";
import { getMovie, getMovieCredits } from "../../api/tmdb-api";
import Spinner from '../spinner';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);
  const context = useContext(MoviesContext);
  const results = useQueries([
    { queryKey: ["movie", { id: movie.id }], queryFn: getMovie },
    { queryKey: ["Credit", { id: movie.id }], queryFn: getMovieCredits }
  ]);

  const { data, error, isLoading, isError } = results[0];
  const CreditData = results[1]


  const [isFavorite, setIsFavorite] = React.useState(false);
  const addToFavorites = () => {
    context.addToFavorites(movie);
    setIsFavorite(true);
  };
  const removeFromFavorites = () => {
    context.removeFromFavorites(movie);
    setIsFavorite(false);
  };

  if (isLoading || CreditData.isLoading) {
    return <Spinner />;
  }

  if (isError || CreditData.isError) {
    return <><h1>{error.message}</h1><h1>{CreditData.error.message}</h1></>;
  }
  const people = CreditData.data.cast;
  const itemData = people.slice(0, 6).map(p => ({
    img: `${p.profile_path}`,
    name: p.name,
    id: p.id
  }));

  return (
    <>
      <Grid>
        <Box sx={{ padding: '15px', }}>
          <Typography variant="h5" component="h3">
            <IconButton
              aria-label={isFavorite ? 'remove from favorites' : 'add to favorites'}
              onClick={isFavorite ? removeFromFavorites : addToFavorites}
            >
              {isFavorite ? (
                <FavoriteIcon color="error" fontSize="large" />
              ) : (
                <FavoriteBorderOutlinedIcon color="error" fontSize="large" />
              )}
            </IconButton>Overview
          </Typography>

          <Typography variant="h6" component="p">
            {movie.overview}
          </Typography>

          <Paper
            component="ul"
            sx={{ ...root }}
          >
            <li>
              <Chip label="Genres" sx={{ ...chip }} color="primary" />
            </li>
            {movie.genres.map((g) => (
              <li key={g.name}>
                <Chip label={g.name} sx={{ ...chip }} />
              </li>
            ))}
          </Paper>
          <Paper component="ul" sx={{ ...root }}>
            <Chip key="runtime" icon={<AccessTimeIcon />} label={`${data.runtime} min.`} />
            <Chip key="revenue" icon={<MonetizationIcon />} label={`${data.revenue.toLocaleString()}`} />
            <Chip key="vote" icon={<StarRate />} label={`${data.vote_average} (${data.vote_count})`} />
            <Chip key="releaseDate" label={`Released: ${data.release_date}`} />
          </Paper>
          <Paper component="ul" sx={{ ...root }}>
            <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
            {movie.production_countries.map((pc, index) => (
              <Chip key={`productionCountry${index}`} label={pc.name} sx={{ ...chip }} />
            ))}
          </Paper>
        </Box>
        <Typography variant="h5" sx={{ paddingTop: 5, paddingLeft: '15px' }}>Cast</Typography>
        <ImageList sx={{ width: '100%', paddingLeft: '15px' }} cols={6}>
          {itemData.map((item) => (
            <Link key={item.id} to={`/people/${item.id}`} style={{ textDecoration: 'none' }}>
              <ImageListItem key={item.img}>
                <img
                  srcSet={`https://image.tmdb.org/t/p/w500/${item.img}`}
                  src={`https://image.tmdb.org/t/p/w500/${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
                <Typography align="center" color='black'>{item.name}</Typography>
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      </Grid>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};
export default MovieDetails;