import type { BaseResponse } from '@/types/response';
import { z } from 'zod';
import type { Theater } from './theater.type';
import { privateInstance } from '@/lib/axios';

export const theaterSchema = z.object({
  name: z.string().min(3),
  city: z.string({ required_error: 'Please select a theater city location' }),
});

export type TheaterValues = z.infer<typeof theaterSchema>;

export const getTheaters = (type: 'admin' | 'customer' = 'admin'): Promise<BaseResponse<Theater[]>> =>
  privateInstance.get(`/${type}/theaters`).then((res) => res.data);

export const createTheater = (data: TheaterValues) =>
  privateInstance.post('/admin/theaters', data).then((res) => res.data);

export const getDetailTheater = (id: string): Promise<BaseResponse<Theater>> =>
  privateInstance.get(`/admin/theaters/${id}`).then((res) => res.data);

export const updateTheater = (data: TheaterValues, id: string) =>
  privateInstance.put(`/admin/theaters/${id}`, data).then((res) => res.data);

export const deleteTheater = (id: string) =>
  privateInstance.delete(`/admin/theaters/${id}`).then((res) => res.data);
