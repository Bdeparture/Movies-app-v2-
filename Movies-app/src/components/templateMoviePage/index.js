import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovie} from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import { ImagesearchRoller } from "@mui/icons-material";

const TemplateMoviePage = ({ movie, children }) => {
    const { data, error, isLoading, isError } = useQuery(
        ["images", { id: movie.id }],
        getMovie
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const images = data.posters
    return (
        <>
            <MovieHeader movie={movie} />
            <Grid container sx={{ padding: "15px", paddingLeft: "100px", paddingRight: "150px" }}>
                <Grid item xs={3}>
                    <div sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                    }}>
                        <ImageListItem key={images} cols={1}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={ImagesearchRoller}
                            />
                        </ImageListItem>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;