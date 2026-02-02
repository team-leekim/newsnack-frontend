import { apiClient } from './client';
import { CategoryBestResponse } from '../types/categoryBest';
import { EmotionBestResponse } from '../types/emotionBest';

export const getCategoryBest = () =>
  apiClient.get<CategoryBestResponse>('/contents/curations/category-best');

export const getEmotionBest = () =>
  apiClient.get<EmotionBestResponse>('/contents/curations/emotion-best');
