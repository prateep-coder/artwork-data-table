import { useState, useEffect } from 'react';
import { Artwork, ApiResponse } from '../types/artwork';
import { artworkService } from '../services/artworkService';

export const useArtworkData = (page: number) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalRecords: 0
  });

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: ApiResponse = await artworkService.getArtworks(page);
        setArtworks(response.data);
        setPagination({
          currentPage: response.pagination.current_page,
          totalPages: response.pagination.total_pages,
          totalRecords: response.pagination.total
        });
      } catch (err) {
        setError('Failed to fetch artworks');
        console.error('Error fetching artworks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [page]);

  return { artworks, loading, error, pagination };
};