import React from "react";
import People from "../peopleCard";
import Grid from "@mui/material/Grid";

const PeopleList = ({ people, action }) => {
  //console.log(people)
  let peopleCards = people.map((p) => (
    <Grid key={p.id} item xs={12} sm={6} md={3} lg={3} xl={2}>
      <People people={p} action={action} />
    </Grid>
  ));
  return peopleCards;
};

export default PeopleList;
