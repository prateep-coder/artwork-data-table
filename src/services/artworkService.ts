import { api } from './api';
import { ApiResponse } from '../types/artwork';

export const artworkService = {
  async getArtworks(page: number = 1, limit: number = 12): Promise<ApiResponse> {
    const response = await api.get(`/artworks?page=${page}&limit=${limit}`);
    return response.data;
  },

  async searchArtworks(query: string, page: number = 1): Promise<ApiResponse> {
    const response = await api.get(`/artworks/search?q=${query}&page=${page}&limit=12`);
    return response.data;
  }
};