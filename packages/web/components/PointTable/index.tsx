import React, { useState } from 'react';
import Divider from "@alfs-appraisal/web/components/Divider"
import Point from "@alfs-appraisal/core/point"

export const PointTable = (props: {
  points?: Point[],
  onChange?: (p:Point) => void,
  style?:React.CSSProperties,
}) => {
  return (
    <div style={props.style}>
      <span className="label">
        Points
      </span>
      <Divider/>
      {props.points?.map((p, i) => {
          return (
            <div
              key={i}
            >
              <div
                style={{ 
                  display: "grid",
                  gridTemplateColumns: "auto 1fr  auto",
                  alignItems: "center",
                }}
              >
                <div 
                  className="p-1" 
                  style={{
                    height: "1em",
                    width: "1em",
                    borderRadius: "50%",
                  }}
                />
                <input 
                  className="input" type="number" value={p.positionId}
                  onChange={e => e.target.value ?? props.onChange?.(Point({
                    ...p,
                    positionId: e.target.value
                  }))
                  }
                /> 
                <a className="p-1" > { p.id } </a>
              </div>
              <Divider/>
            </div>
          );
        })}
    </div>
  );
};
export default PointTable;

