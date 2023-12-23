import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import SiteHeader from './components/siteHeader'
import MovieReviewPage from "./pages/movieReviewPage";
import HomePage from "./pages/homePage";
import Movie from "./pages/moviePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage"
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import People from './pages/peoplePage'
import ToprateMoviesPage from './pages/toprateMoviesPage'
import PeopleDetailsPage from "./pages/peopleDetailsPage";
import LoginPage from './pages/loginPage'
import SignupPage from './pages/signupPage'
import AuthContextProvider from './contexts/authContext'
import ProtectedRoutes from "./protectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <AuthContextProvider>
          <MoviesContextProvider>
            <Routes>
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/toprate" element={<ToprateMoviesPage />} />
              <Route path="/movies" element={<Movie />} />
              <Route path="/people" element={<People />} />
              <Route path="/people/:id" element={<PeopleDetailsPage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              </Route>
            </Routes>
          </MoviesContextProvider></AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"))

rootElement.render(<App />);