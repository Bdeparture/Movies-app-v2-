export const getMovies = async () => {
  const response = await fetch(
    'http://localhost:8080/api/movies', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getMovie = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/${id}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getPopularMovies = async (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/popular/${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getUpcomingMovies = async (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/upcoming/${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};


export const getToprateMovies = async (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/topRated/${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getGenres = async () => {
  const response = await fetch(
    'http://localhost:8080/api/movies/tmdb/genres', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getMovieCredits = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/${id}/movie_credits`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getMovieImages = async ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/${id}/movieImages`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getMovieReviews = async (id) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/${id}/movieReviews`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getFavouriteMovies = async (username) => {
  const response = await fetch(
      `http://localhost:8080/api/users/${username}/favourites`
  )
  return response.json();
}

export const addFavouriteMovies = async (username, movie) => {
  const response = await fetch(`http://localhost:8080/api/users/${username}/favourites`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: username,
          movieId: movie.id
      }),
  });
  return response.json();
}

export const removeFavouriteMovies = async (username, movie) => {
  const response = await fetch(`http://localhost:8080/api/users/${username}/favourites`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, movieId: movie.id}),
  });
  return response.json();
}

export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};

export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};

export const getPeoplePage = async (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  const response = await fetch(
    `http://localhost:8080/api/people/tmdb/people/${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getPeople = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/people/tmdb/${id}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getPeopleMovieCredits = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/people/tmdb/${id}/peopleMovieCredits`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getPeopleImages = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/people/tmdb/${id}/peopleImages`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};