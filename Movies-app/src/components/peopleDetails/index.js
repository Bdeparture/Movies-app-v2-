import React from "react";
import Grid from "@mui/material/Grid";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { getPeople, getPeopleMovieCredits } from "../../api/tmdb-api";
import { useQueries } from "react-query";
import Spinner from '../spinner'
import Typography from "@mui/material/Typography";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Chip from "@mui/material/Chip";
import StarRate from "@mui/icons-material/StarRate";
import { Link } from "react-router-dom";
import PeopleHeader from "../headerPeople";
import Box from '@mui/material/Box';


const PeopleDetails = ({ people, children }) => {
    const results = useQueries([
        { queryKey: ["people", { id: people.id }], queryFn: getPeople },
        { queryKey: ["movieCredit", { id: people.id }], queryFn: getPeopleMovieCredits }
    ]);

    const { data, error, isLoading, isError } = results[0];
    const movieCreditData = results[1]
    const gender = people.gender === 1 ? "Female" : "Male";

    const genderIcon = (gender) => {
        if (gender === "Female")
            return <FemaleIcon />
        else
            return <MaleIcon />
    }

    if (isLoading || movieCreditData.isLoading) {
        return <Spinner />;
    }

    if (isError || movieCreditData.isError) {
        return <><h1>{error.message}</h1><h1>{movieCreditData.error.message}</h1></>;
    }
    const image = data.profile_path;
    const movies = movieCreditData.data.cast;
    const itemData = movies.slice(0, 6).map(movie => ({
        img: `${movie.poster_path}`,
        title: movie.title,
        id: movie.id
    }));

    return (
        <>
            <PeopleHeader people={people} />
            <Grid container sx={{ padding: "15px", paddingLeft: "100px", paddingRight: "150px" }}>
                <Grid item xs={3}>
                    <div sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                    }}>
                        <ImageListItem key={image} cols={1}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${image}`}
                                alt={image}
                            />
                        </ImageListItem>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <Box sx={{ padding: '15px', }}>
                        <Typography variant="h4" gutterBottom>
                            {people.name}{genderIcon(gender)}
                        </Typography>
                        <Chip
                            icon={<StarRate />}
                            label={`${people.popularity}`}
                        />
                        <Typography variant="body1" gutterBottom>
                            {people.biography}
                        </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ paddingLeft: '15px' }}>Movie Credits</Typography>
                    <ImageList sx={{ width: '100%', paddingLeft: '15px' }} cols={6}>
                        {itemData.map((item) => (
                            <Link key={item.id} to={`/movies/${item.id}`} style={{ textDecoration: 'none' }}>
                                <ImageListItem key={item.img}>
                                    <img
                                        srcSet={`https://image.tmdb.org/t/p/w500/${item.img}`}
                                        src={`https://image.tmdb.org/t/p/w500/${item.img}`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <Typography align="center" color='black'>{item.title}</Typography>
                                </ImageListItem>
                            </Link>
                        ))}
                    </ImageList>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};
export default PeopleDetails;