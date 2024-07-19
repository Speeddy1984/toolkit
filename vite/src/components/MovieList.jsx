import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/favoritesSlice";
import { Card, Button } from "react-bootstrap";

const MovieList = () => {
  const movies = useSelector((state) => state.movies.movies);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const isFavorite = (movie) => {
    return favorites.some((fav) => fav.imdbID === movie.imdbID);
  };

  const handleFavoriteClick = (movie) => {
    if (isFavorite(movie)) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <Card key={movie.imdbID} style={{ width: "18rem", margin: "1rem" }}>
          <Link to={`/movie/${movie.imdbID}`}>
            <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
          </Link>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Year}</Card.Text>
            <Button
              variant={isFavorite(movie) ? "danger" : "primary"}
              onClick={() => handleFavoriteClick(movie)}
            >
              {isFavorite(movie) ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MovieList;
