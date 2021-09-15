import React from "react";
import DataGrid from 'react-data-grid';
import { Box } from "@sivic/core/box"
import { Point } from "@sivic/core/point"
import { Line } from "@sivic/core/line"
import { exportToCsv } from "@sivic/web/utils"
import { first, keyBy, flatMap } from "lodash"
import { Tag } from "@sivic/core/tag"


export const SummaryTable = (props: { 
  tag:Tag,
  rows: {
    box: Box,
    points: Point[],
    line: Line,
  }[]
}) => {
  const columns = [
    { key: 'positionId', name: 'position' },
    { key: 'axis', name: 'axis' },
    ...(props.rows?.map(r => {
      return {
        key: r.box.id,
        name: `${r.box.id} k=${r.line.length}`,
      }
    }) ?? [])
  ];
  const firstColumn = first(props.rows)
  const lineName = `${firstColumn?.line.start.positionId}-${firstColumn?.line.end.positionId}`
  const fileName =`${props.tag.name}-${lineName}.csv`
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
  const grid = <DataGrid columns={columns} rows={rows} />
  return (
    <div>
      <div className="button"
        onClick={() => exportToCsv(grid, fileName)}
      > donwload csv </div>
      { grid }
    </div>
  )
}


export default SummaryTable
