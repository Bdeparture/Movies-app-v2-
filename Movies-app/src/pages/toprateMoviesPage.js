import React , { useState } from "react";
import AddToWatchIcon from '../components/cardIcons/addToWatch'
import { getToprateMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import Pagination from '@mui/material/Pagination';

const ToprateMoviesPage = (props) => {

    let [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const { data, error, isLoading, isError } = useQuery([`toprateMovies${page}`, { page: page }],
    getToprateMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;

    return (
        <>
            <PageTemplate
                title="Toprate Movies"
                movies={movies}
                action={(movie) => {
                    return <AddToWatchIcon movie={movie} />
                }}
            />
            <Pagination
                count={10}
                page={page}
                shape="rounded"
                size="large"
                onChange={handleChange}
                sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }} />
        </>
    );
};
export default ToprateMoviesPage;