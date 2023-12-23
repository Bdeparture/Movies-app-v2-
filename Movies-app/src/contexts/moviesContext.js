import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import {getFavouriteMovies,addFavouriteMovies,removeFavouriteMovies} from '../api/tmdb-api';

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const { isAuthenticated, userName } = useContext(AuthContext);
  // const [toWatch, setToWatch] = useState( [] )

  const addToFavorites = async (movie) => {
    let newFavorites = [];
    if (isAuthenticated) {
      newFavorites = await getFavouriteMovies(userName)
    }
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
      await addFavouriteMovies(userName, movie);
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setFavorites([]);
    } else {
      async function fetchData() {
        setFavorites(await getFavouriteMovies(userName))
      }
      fetchData();
    }
  }, [isAuthenticated, userName]);

  // const addToWatch = (movie) => {
  //   let newToWatch = [];
  //   if (!toWatch.includes(movie.id)){
  //     newToWatch = [...toWatch, movie.id];
  //   }
  //   else{
  //     newToWatch = [...toWatch];
  //   }
  //   setToWatch(newToWatch);
  // };
  
  // We will use this function in a later section
  const removeFromFavorites = async (movie) => {
    setFavorites(favorites.filter(
      (mId) => mId !== movie.id
    ))
    await removeFavouriteMovies(userName, movie);
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        // addToWatch
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;