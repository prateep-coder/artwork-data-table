import { Artwork } from '../types/artwork';

export const selectionUtils = {
  calculateRemainingSelections: (
    targetCount: number,
    currentSelected: number,
    availableOnPage: number
  ) => {
    const needed = targetCount - currentSelected;
    const canSelectFromCurrentPage = Math.min(needed, availableOnPage);
    const remaining = needed - canSelectFromCurrentPage;
    
    return { needed, canSelectFromCurrentPage, remaining };
  },

  getAvailableRowsOnPage: (artworks: Artwork[], selectedIds: Set<number>) => {
    return artworks.filter(artwork => !selectedIds.has(artwork.id));
  }
};