import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { ArtworkTable } from "./components/ArtworkTable";
import { CustomSelectionPanel } from "./components/CustomSelectionPanel";
import { useArtworkData } from "./hooks/useArtworkData";
import { useSelection } from "./hooks/useSelection";
import { selectionUtils } from "./utils/selectionUtils";
import { MESSAGES, TABLE_CONFIG } from "./utils/constants";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { artworks, loading, pagination } = useArtworkData(currentPage);
  const {
    selectedIds,
    selectedCount,
    selectRow,
    deselectRow,
    selectAllOnPage,
    deselectAllOnPage,
    clearAllSelections,
    isRowSelected,
    areAllRowsSelected,
    areSomeRowsSelected,
    setSelectedIds,
  } = useSelection();

  const toastRef = useRef<Toast>(null);

  const selectedRows = artworks.filter((artwork) =>
    selectedIds.has(artwork.id)
  );

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    setCurrentPage(event.page + 1);
  };

  const handleCustomSelection = (selectCount: number) => {
    if (selectCount <= 0) {
      toastRef.current?.show({
        severity: "warn",
        summary: "Invalid Input",
        detail: MESSAGES.SELECTION.INVALID_NUMBER,
        life: 3000,
      });
      return;
    }

    if (selectCount > pagination.totalRecords) {
      toastRef.current?.show({
        severity: "warn",
        summary: "Limit Exceeded",
        detail: MESSAGES.SELECTION.EXCEEDS_TOTAL(pagination.totalRecords),
        life: 3000,
      });
      return;
    }

    const availableRows = selectionUtils.getAvailableRowsOnPage(
      artworks,
      selectedIds
    );
    const { needed, canSelectFromCurrentPage, remaining } =
      selectionUtils.calculateRemainingSelections(
        selectCount,
        selectedCount,
        availableRows.length
      );

    if (needed <= 0) {
      const newSelectedIds = new Set(
        Array.from(selectedIds).slice(0, selectCount)
      );
      setSelectedIds(newSelectedIds);
      toastRef.current?.show({
        severity: "success",
        summary: "Selection Updated",
        detail: MESSAGES.SELECTION.SUCCESS(selectCount),
        life: 3000,
      });
    } else {
      const newSelectedIds = new Set(selectedIds);
      const rowsToSelect = availableRows.slice(0, canSelectFromCurrentPage);

      rowsToSelect.forEach((row) => newSelectedIds.add(row.id));
      setSelectedIds(newSelectedIds);

      if (remaining > 0) {
        toastRef.current?.show({
          severity: "info",
          summary: "Selection Incomplete",
          detail: MESSAGES.SELECTION.PARTIAL(
            canSelectFromCurrentPage,
            remaining
          ),
          life: 5000,
        });
      } else {
        toastRef.current?.show({
          severity: "success",
          summary: "Selection Complete",
          detail: MESSAGES.SELECTION.SUCCESS(selectCount),
          life: 3000,
        });
      }
    }
  };

  return (
    <div className="app-container p-4">
      <Toast ref={toastRef} />

      <div className="app-header mb-4">
        <h1 className="text-3xl font-bold mb-2">
          Art Institute of Chicago - Artworks
        </h1>
        <p className="text-color-secondary m-0">
          Interactive data table with persistent row selection
        </p>
      </div>

      <div className="controls-section mb-4">
        <div className="flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap">
            <CustomSelectionPanel
              onCustomSelection={handleCustomSelection}
              totalRecords={pagination.totalRecords}
              currentSelected={selectedCount}
            />
            <Button
              icon="pi pi-times"
              label="Clear All Selections"
              onClick={clearAllSelections}
              className="p-button-outlined p-button-secondary"
              disabled={selectedCount === 0}
            />
          </div>
          <div className="selection-info">
            <span className="text-lg font-semibold">
              Selected: {selectedCount} rows
            </span>
          </div>
        </div>
      </div>

      <div className="table-section card mb-4">
        <ArtworkTable
          artworks={artworks}
          loading={loading}
          selectedRows={selectedRows}
          onRowSelect={selectRow}
          onRowUnselect={deselectRow}
          isRowSelected={isRowSelected}
          areAllRowsSelected={areAllRowsSelected(artworks)}
          areSomeRowsSelected={areSomeRowsSelected(artworks)}
          onSelectAll={() => selectAllOnPage(artworks)}
          onDeselectAll={() => deselectAllOnPage(artworks)}
        />
      </div>

      <div className="pagination-section">
        <Paginator
          first={(currentPage - 1) * TABLE_CONFIG.ROWS_PER_PAGE}
          rows={TABLE_CONFIG.ROWS_PER_PAGE}
          totalRecords={pagination.totalRecords}
          onPageChange={handlePageChange}
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        />
      </div>
    </div>
  );
};

export default App;
