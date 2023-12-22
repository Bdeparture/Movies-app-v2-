const baseUrl = 'https://api.themoviedb.org/3/';
const lang = 'en-US';

export const getMovies = () => {
  return fetch(
    `${baseUrl}discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getUpcomingMovies = (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `${baseUrl}movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (args) => {
  // console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMoviesPage = (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `${baseUrl}movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getToprateMovies = (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `${baseUrl}movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getTvPage = async (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `${baseUrl}tv/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getTV = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getPeoplePage = (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `${baseUrl}person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getPeople = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getGenres = async () => {
  return fetch(
    `${baseUrl}genre/movie/list?api_key=` +
    process.env.REACT_APP_TMDB_KEY +
    "&language=en-US"
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();

  })
    .catch((error) => {
      throw error
    });
};

export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getMovieCredits = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getPeopleMovieCredits = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};
