import React from "react";
import DataGrid, { DataGridProps } from 'react-data-grid';
import { exportToCsv } from "@sivic/web/utils"

const SummaryTable = () => {
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
  ];

  const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
  ];
  const grid = <DataGrid columns={columns} rows={rows} />
  return (
    <div>
      <div className="button"
        onClick={() => exportToCsv(grid, "sample.csv")}
      > donwload csv </div>
      { grid }
    </div>
  )
}

export default {
  title: "SummaryTable",
  component: SummaryTable,
};
export const Default = (props) => {
  return (
      <SummaryTable />
  )
}

