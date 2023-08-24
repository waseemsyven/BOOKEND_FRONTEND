"use client";

import React, { useState } from "react";

function DatasetDropdown({ datasets }) {
  console.log(datasets);
  const [selectedDataset, setSelectedDataset] = useState("");

  // Handle the change event when an option is selected
  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  return (
    <div className="border rounded-lg">
      <select
        id="dataset"
        value={selectedDataset}
        onChange={handleDatasetChange}
      >
        <option value="" className="text-sm font-normal">
          Select a Dataset
        </option>
        {datasets &&
          datasets.map((dataset) => (
            <option key={dataset.id} value={dataset.name} className="text-sm">
              {dataset}
            </option>
          ))}
      </select>
      {selectedDataset && <p>You selected: {selectedDataset}</p>}
    </div>
  );
}

export default DatasetDropdown;
