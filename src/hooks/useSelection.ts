import { useState, useCallback } from 'react';
import { Artwork } from '../types/artwork';

export const useSelection = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const selectRow = useCallback((artwork: Artwork) => {
    setSelectedIds(prev => new Set(prev).add(artwork.id));
  }, []);

  const deselectRow = useCallback((artwork: Artwork) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(artwork.id);
      return newSet;
    });
  }, []);

  const selectAllOnPage = useCallback((artworks: Artwork[]) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      artworks.forEach(artwork => newSet.add(artwork.id));
      return newSet;
    });
  }, []);

  const deselectAllOnPage = useCallback((artworks: Artwork[]) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      artworks.forEach(artwork => newSet.delete(artwork.id));
      return newSet;
    });
  }, []);

  const clearAllSelections = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isRowSelected = useCallback((artwork: Artwork) => {
    return selectedIds.has(artwork.id);
  }, [selectedIds]);

  const areAllRowsSelected = useCallback((artworks: Artwork[]) => {
    return artworks.length > 0 && artworks.every(artwork => selectedIds.has(artwork.id));
  }, [selectedIds]);

  const areSomeRowsSelected = useCallback((artworks: Artwork[]) => {
    return artworks.some(artwork => selectedIds.has(artwork.id));
  }, [selectedIds]);

  return {
    selectedIds,
    selectedCount: selectedIds.size,
    selectRow,
    deselectRow,
    selectAllOnPage,
    deselectAllOnPage,
    clearAllSelections,
    isRowSelected,
    areAllRowsSelected,
    areSomeRowsSelected,
    setSelectedIds
  };
};