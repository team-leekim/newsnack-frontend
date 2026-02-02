import { apiClient } from './client';
import { ContentsResponse } from '../types/content';
import { ContentDetailResponse } from '../types/contentDetail';
import { CreateReactionRequest } from '../types/reaction';

interface GetContentsParams {
  cursor?: number;
  size?: number;
  category?: string;
}

export const getContents = (params?: GetContentsParams) =>
  apiClient.get<ContentsResponse>('/contents', {
    params: {
      size: 10,
      ...params,
    },
  });

export const getContentDetail = (id: number) =>
  apiClient.get<ContentDetailResponse>(`/contents/${id}`);

export const postContentReaction = (contentId: number, body: CreateReactionRequest) =>
  apiClient.post(`/contents/${contentId}/reactions`, body);
