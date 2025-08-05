import type { Genre } from '../genre/genre.type';
import type { Theater } from '../theater/theater.type';

export interface Movie {
  _id: string;
  title: string;
  genre: Pick<Genre, 'name' | '_id'>;
  thumbnail: string;
  thumbnailUrl: string;
}

type MovieTheater = Movie & {
  theaters: Pick<Theater, '_id' | 'city'>[];
}

export interface MovieExplore {
  filteredMovies: Movie[];
  allMovies: MovieTheater[];
}
