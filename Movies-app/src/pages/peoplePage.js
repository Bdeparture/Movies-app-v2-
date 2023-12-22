import React , { useState } from "react";
import { getPeoplePage } from "../api/tmdb-api";
import PageTemplate from '../components/templatePeopleListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { Pagination } from '@mui/material';

const PeoplePage = (props) => {
    let [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const { data, error, isLoading, isError } = useQuery([`popularPeople${page}`, { page: page }],
        getPeoplePage)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const people = data.results;

    return (
        <>
            <PageTemplate
                title="Popular People"
                people={people}
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
export default PeoplePage;