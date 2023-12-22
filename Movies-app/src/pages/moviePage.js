import React , { useState } from "react";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { getMoviesPage } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import Pagination from '@mui/material/Pagination';


const MoviePage = (props) => {

  let [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data, error, isLoading, isError } = useQuery([`popularMovies${page}`, { page: page }],
  getMoviesPage)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <>
      <PageTemplate
        title="Popular Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
      <Pagination
        count={10}
        page={page}
        shape="rounded" 
        size="large"
        onChange={handleChange}
        sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}/>
    </>
  );
};
export default MoviePage;