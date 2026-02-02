import { apiClient } from './client';
import { EditorDetailResponse } from '../types/editor';

export const getEditorDetail = (id: number) =>
  apiClient.get<EditorDetailResponse>(`/editors/${id}`);
