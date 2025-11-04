export const TABLE_CONFIG = {
  ROWS_PER_PAGE: 12,
  DEFAULT_PAGE: 1
} as const;

export const MESSAGES = {
  SELECTION: {
    INVALID_NUMBER: 'Please enter a valid number',
    EXCEEDS_TOTAL: (total: number) => `Cannot select more than ${total} rows`,
    SUCCESS: (count: number) => `Successfully selected ${count} rows`,
    PARTIAL: (selected: number, remaining: number) => 
      `Selected ${selected} from this page. Navigate to next pages to select ${remaining} more rows.`
  }
} as const;