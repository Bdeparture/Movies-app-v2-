import React from 'react';
import Spinner from '../components/spinner';
import { getMoviesPage, getToprateMovies, getUpcomingMovies } from '../api/tmdb-api';
import { useQueries } from 'react-query';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Movie from "../components/movieCard";
import Grid from "@mui/material/Grid";

const HomePage = () => {
  const results = useQueries([
    { queryKey: ['popularMovies1', { page: 1 }], queryFn: getMoviesPage },
    { queryKey: ['toprateMovies1', { page: 1 }], queryFn: getToprateMovies },
    { queryKey: ['upComingMovies1', { page: 1 }], queryFn: getUpcomingMovies },
  ]);

  if (
    results[0].isLoading ||
    results[1].isLoading ||
    results[2].isLoading
  ) {
    return <Spinner />;
  }

  if (results[0].isError || results[1].isError || results[2].isError) {
    return <h1>Error in fetching data</h1>;
  }

  const popularMovies = results[0].data.results;
  const toprateMovies = results[1].data.results;
  const upcoimgMovies = results[2].data.results;

  const styles = {
    sectionHeader: {
      marginLeft: '10%',
      width: '100%',
      display: 'inline-block',
    },
    h2: {
      padding: '10px',
      float: 'left',
    },
    button: {
      marginRight: '20%',
      float: 'right',
    },
  };
  return (
    <>
      <Typography gutterBottom variant="h1" component="p" sx={{ textAlign: 'center' }}>
        Discover
      </Typography>

      <div className="section1" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          <h2>Popular Movies
          <Button
            component={Link}
            to="/movies"
            variant="contained"
            color="primary"
            style={styles.button}>
            MORE
          </Button>
          </h2>
        </div>
        <Grid container spacing={2} direction="row"  justifyContent="center" alignItems="center">
          {popularMovies.slice(0, 5).map((m) => (
            <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Movie key={m.id} movie={m} />
            </Grid>
          ))}
        </Grid>
      </div>

      <div className="section2" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          <h2>Top Rated Movies
          <Button
            component={Link}
            to="/movies/toprate"
            variant="contained"
            color="primary"
            style={styles.button}>
            MORE
          </Button>
          </h2>
        </div>
        <Grid container spacing={2} direction="row"  justifyContent="center" alignItems="center">
          {toprateMovies.slice(0, 5).map((m) => (
            <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Movie key={m.id} movie={m} />
            </Grid>  
            ))}
        </Grid>
      </div>

      <div className="section3" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          <h2>Upcoming Movies
          <Button
            component={Link}
            to="/movies/upcoming"
            variant="contained"
            color="primary"
            style={styles.button}>
            MORE
          </Button>
          </h2>
        </div>
        <Grid container spacing={2} direction="row"  justifyContent="center" alignItems="center">
          {upcoimgMovies.slice(0, 5).map((m) => (
            <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Movie key={m.id} movie={m} />
            </Grid>  
            ))}
        </Grid>
      </div>
    </>
  );
};

export default HomePage;