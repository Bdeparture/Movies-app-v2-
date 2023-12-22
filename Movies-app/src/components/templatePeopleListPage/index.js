import React, { useState } from "react";
import Header from "../headerMovieList";
import PeopleList from "../peopleList";
import Grid from "@mui/material/Grid";

function PeopleListPageTemplate({ people,title, action }) {
    const [nameFilter] = useState("");
    const [genreFilter] = useState("0");
    const genreId = Number(genreFilter);

    let displayedPeople = people
        .filter((p) => {
            return p.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((p) => {
            return genreId > 0 ? p.genre_ids.includes(genreId) : true;
        });

    return (
        <Grid container sx={{ padding: '20px' }}>
            <Grid item xs={12}>
            <Header title={title} />
            </Grid>
            <Grid item container spacing={5}>
                <PeopleList action={action} people={displayedPeople}></PeopleList>
            </Grid>
        </Grid>
    );
}
export default PeopleListPageTemplate;