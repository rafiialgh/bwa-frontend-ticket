import type { BaseResponse } from '@/types/response';
import type { Movie, MovieExplore } from './global.type';
import { privateInstance } from '@/lib/axios';
import type { Genre } from '../genre/genre.type';
import type { FilterState } from '@/redux/features/filter/filterSlice';
import { z } from 'zod';

export const filterSchema = z.object ({
  genre: z.string().nullable(),
  city: z.string().nullable(),
  availbility: z.string().nullable(),
  theaters: z.array(z.string()).nullable()
})

export type FilterValues = z.infer<typeof filterSchema>

export const getMovies = async (): Promise<BaseResponse<Movie[]>> =>
  privateInstance.get('/customer/movies').then((res) => res.data);

export const getGenres = async (): Promise<
  BaseResponse<Pick<Genre, '_id' | 'name'>>
> => privateInstance.get('/customer/genres').then((res) => res.data);

export const getMoviesByGenre = async (
  genreId: string,
  params?: FilterState
): Promise<BaseResponse<MovieExplore>> =>
  privateInstance
    .get(`/customer/browse-movies/${genreId}`, {
      params: params
    })
    .then((res) => res.data);