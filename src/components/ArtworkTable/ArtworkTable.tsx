import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { Artwork } from '../../types/artwork';

interface ArtworkTableProps {
  artworks: Artwork[];
  loading: boolean;
  selectedRows: Artwork[];
  onRowSelect: (artwork: Artwork) => void;
  onRowUnselect: (artwork: Artwork) => void;
  isRowSelected: (artwork: Artwork) => boolean;
  areAllRowsSelected: boolean;
  areSomeRowsSelected: boolean;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export const ArtworkTable: React.FC<ArtworkTableProps> = ({
  artworks,
  loading,
  selectedRows,
  onRowSelect,
  onRowUnselect,
  isRowSelected,
  areAllRowsSelected,
  areSomeRowsSelected,
  onSelectAll,
  onDeselectAll
}) => {
  const selectAllCheckbox = (
    <div className="flex align-items-center">
      <Checkbox
        onChange={(e) => {
          if (e.checked) {
            onSelectAll();
          } else {
            onDeselectAll();
          }
        }}
        checked={areAllRowsSelected}
        className={areSomeRowsSelected && !areAllRowsSelected ? 'p-checkbox-indeterminate' : ''}
      />
      <span className="ml-2">Select All</span>
    </div>
  );

  const rowCheckbox = (rowData: Artwork) => {
    return (
      <Checkbox
        checked={isRowSelected(rowData)}
        onChange={(e) => {
          if (e.checked) {
            onRowSelect(rowData);
          } else {
            onRowUnselect(rowData);
          }
        }}
      />
    );
  };

  const inscriptionBodyTemplate = (rowData: Artwork) => {
    return rowData.inscriptions || 'N/A';
  };

  const dateStartBodyTemplate = (rowData: Artwork) => {
    return rowData.date_start || 'N/A';
  };

  const dateEndBodyTemplate = (rowData: Artwork) => {
    return rowData.date_end || 'N/A';
  };

  return (
    <div className="artwork-table">
      <DataTable
        value={artworks}
        loading={loading}
        selection={selectedRows}
        onRowSelect={(e) => onRowSelect(e.data)}
        onRowUnselect={(e) => onRowUnselect(e.data)}
        dataKey="id"
        responsiveLayout="scroll"
        size="small"
        selectionMode="multiple"
      >
        <Column
          selectionMode="multiple"
          header={selectAllCheckbox}
          body={rowCheckbox}
          style={{ width: '3rem' }}
        />
        <Column field="title" header="Title" sortable />
        <Column field="place_of_origin" header="Place of Origin" sortable />
        <Column field="artist_display" header="Artist" sortable />
        <Column field="inscriptions" header="Inscriptions" body={inscriptionBodyTemplate} />
        <Column field="date_start" header="Start Date" sortable body={dateStartBodyTemplate} />
        <Column field="date_end" header="End Date" sortable body={dateEndBodyTemplate} />
      </DataTable>
    </div>
  );
};