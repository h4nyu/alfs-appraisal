import React from "react";
import DataGrid, { SelectCellFormatter } from 'react-data-grid';
import { Box } from "@sivic/core/box"
import { Point } from "@sivic/core/point"
import { Line } from "@sivic/core/line"
import Summary from "@sivic/core/summary"
import { exportToCsv } from "@sivic/web/utils"
import { first, keyBy, flatMap } from "lodash"
import { Workspace } from "@sivic/core/workspace"
import { Tag } from "@sivic/core/tag"
import { File } from "@sivic/core/file";
import BoxView from "@sivic/web/components/BoxView"


export const SummaryTable = (props: { 
  workspace?:Workspace,
  tag:Tag,
  rows: Summary[],
  files?: File[],
  onBoxClick?:(box: Box) => void;
}) => {
  const columns = [
    { key: 'positionId', name: 'position' },
    { key: 'axis', name: 'axis' },
    ...(props.rows?.map(r => {
      return {
        key: r.box.id,
        name: <a onClick={() => props.onBoxClick?.(r.box)}>{r.box.id} k=${r.line.length}</a>,
      }
    }) ?? [])
  ];
  const firstColumn = first(props.rows)
  const lineName = `${firstColumn?.line.start.positionId}-${firstColumn?.line.end.positionId}`
  const fileName =`${props.workspace?.name}-${props.tag.name}-${lineName}.csv`
  const rows = flatMap(firstColumn?.points, (p) =>  {
    const rowX = {}
    const rowY = {}
    rowX["positionId"] = p.positionId
    rowY["positionId"] = p.positionId
    rowX["axis"] = "X"
    rowY["axis"] = "Y"
    for(const pr of props.rows) {
      const posPoint = pr.points.find(pp => pp.positionId === p.positionId)
      rowX[pr.box.id] = posPoint?.x
      rowY[pr.box.id] = posPoint?.y
    }
    return [rowX, rowY]
  })??[]
   const grid =  <DataGrid 
     columns={columns} 
     rows={rows} 
   />
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span> { fileName }</span>
        <div/>
        <div className="button is-small"
          onClick={() => exportToCsv(grid, fileName)}
        > donwload </div>
      </div>
      {grid}
    </div>
  )
}


export default SummaryTable
