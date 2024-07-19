import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFavorite } from '../store/slices/favoritesSlice';
import { Card, Button } from 'react-bootstrap';

const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  return (
    <div className="favorites-list">
      {favorites.length === 0 ? (
        <div>No favorites yet</div>
      ) : (
        favorites.map((movie) => (
          <Card key={movie.imdbID} style={{ width: '18rem', margin: '1rem' }}>
            <Link to={`/movie/${movie.imdbID}`}>
              <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
            </Link>
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Button variant="danger" onClick={() => dispatch(removeFavorite(movie))}>
                Remove from Favorites
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default FavoritesList;