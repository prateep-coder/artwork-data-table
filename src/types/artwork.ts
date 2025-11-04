export interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
  image_id?: string;
}

export interface ApiResponse {
  data: Artwork[];
  pagination: {
    current_page: number;
    total_pages: number;
    total: number;
    limit: number;
  };
  config: {
    iiif_url: string;
  };
}

export interface SelectionState {
  selectedIds: Set<number>;
  lastSelectedCount: number;
}