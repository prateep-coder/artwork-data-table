import React, { useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

interface CustomSelectionPanelProps {
  onCustomSelection: (count: number) => void;
  totalRecords: number;
  currentSelected: number;
}

export const CustomSelectionPanel: React.FC<CustomSelectionPanelProps> = ({
  onCustomSelection,
  totalRecords,
  currentSelected
}) => {
  const [selectCount, setSelectCount] = useState<number | null>(null);
  const overlayPanelRef = React.useRef<OverlayPanel>(null);

  const handleApply = () => {
    if (selectCount !== null && selectCount > 0) {
      onCustomSelection(selectCount);
      setSelectCount(null);
      overlayPanelRef.current?.hide();
    }
  };

  const handleCancel = () => {
    setSelectCount(null);
    overlayPanelRef.current?.hide();
  };

  return (
    <>
      <Button
        icon="pi pi-plus"
        label="Select Multiple Rows"
        onClick={(e) => overlayPanelRef.current?.toggle(e)}
        className="p-button-outlined"
      />

      <OverlayPanel ref={overlayPanelRef} dismissable style={{ width: '350px' }}>
        <div className="p-fluid">
          <h4 className="mt-0 mb-2">Select Multiple Rows</h4>
          <p className="mt-0 mb-3 text-color-secondary">Enter number of rows to select across all pages</p>
          
          <div className="field mb-3">
            <label htmlFor="selectCount" className="font-bold block mb-2">
              Number of rows
            </label>
            <InputNumber
              id="selectCount"
              value={selectCount}
              onValueChange={(e) => setSelectCount(e.value ?? 0)}
              min={0}
              max={totalRecords}
              showButtons
              buttonLayout="horizontal"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              className="w-full"
              placeholder="Enter number"
            />
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button
              label="Apply"
              icon="pi pi-check"
              onClick={handleApply}
              className="p-button-primary flex-1"
              disabled={!selectCount || selectCount <= 0}
            />
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={handleCancel}
              className="p-button-secondary flex-1"
            />
          </div>
          
          <div className="mt-4 p-3 surface-50 border-round">
            <div className="text-sm">
              <div className="flex justify-content-between">
                <span>Currently selected:</span>
                <strong>{currentSelected} rows</strong>
              </div>
              <div className="flex justify-content-between">
                <span>Total available:</span>
                <strong>{totalRecords} rows</strong>
              </div>
            </div>
          </div>
        </div>
      </OverlayPanel>
    </>
  );
};