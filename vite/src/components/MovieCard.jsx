import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/favoritesSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

const API_KEY = "64405bd2";

const MovieCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
      );
      setMovie(response.data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
          <strong>Year:</strong> {movie.Year}
          <br />
          <strong>Genre:</strong> {movie.Genre}
          <br />
          <strong>Runtime:</strong> {movie.Runtime}
          <br />
          <strong>Director:</strong> {movie.Director}
          <br />
          <strong>Actors:</strong> {movie.Actors}
          <br />
          <strong>Rating:</strong> {movie.imdbRating}
        </Card.Text>
        <Button
          variant={isFavorite ? "danger" : "primary"}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
