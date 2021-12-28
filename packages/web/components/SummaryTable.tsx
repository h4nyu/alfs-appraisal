import React from "react";
import DataGrid, { SelectCellFormatter } from 'react-data-grid';
import { Box } from "@alfs-appraisal/core/box"
import { Point } from "@alfs-appraisal/core/point"
import { Line } from "@alfs-appraisal/core/line"
import Summary from "@alfs-appraisal/core/summary"
import { exportToCsv } from "@alfs-appraisal/web/utils"
import { first, keyBy, flatMap } from "lodash"
import { Workspace } from "@alfs-appraisal/core/workspace"
import { Tag } from "@alfs-appraisal/core/tag"
import { File } from "@alfs-appraisal/core/file";
import BoxView from "@alfs-appraisal/web/components/BoxView"
import { round } from "lodash"


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
        name: <a onClick={() => props.onBoxClick?.(r.box)}>{r.box.id} k={r.line.length}</a>,
      }
    }) ?? [])
  ];
  const firstColumn = first(props.rows)
  const origin = firstColumn?.line.origin
  const lineName = (() => {
    if(origin?.positionId === firstColumn?.line.start.positionId){
      return `${firstColumn?.line.start.positionId}-${firstColumn?.line.end.positionId}`
    }else{
      return `${firstColumn?.line.end.positionId}-${firstColumn?.line.start.positionId}`
    }
  })()
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
      if(!posPoint){ continue }
      rowX[pr.box.id] = round(posPoint.x, 3)
      rowY[pr.box.id] = round(posPoint.y, 3)
    }
    return [rowX, rowY]
  })??[]
   const grid =  <DataGrid 
     columns={columns} 
     rows={rows} 
   />
  return (
    <div
    >
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
