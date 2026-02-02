import { apiClient } from './client';
import { TodayNewsSnackResponse } from '../types/newsnack';

export const getTodayNewsSnack = () => apiClient.get<TodayNewsSnackResponse>('/today-newsnack');
