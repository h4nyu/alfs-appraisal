import React from "react"
import { Tag } from "@sivic/core/tag"
import { Image } from "@sivic/core/image"
import { File } from "@sivic/core/file"
import Point from "@sivic/core/point"
import AddBtn from "@sivic/web/components/AddBtn"
import BoxView from "@sivic/web/components/BoxView"
import Box from "@sivic/core/box"
import FileUpload, { ChangeFn } from "@sivic/web/components/FileUpload"

const centerStyle = {
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
}

export const TagTable = (props: {
  tags?: Tag[],
  images?: Image[],
  files?: File[],
  boxes?: Box[],
  points?: Point[],
  onAddImage?: ChangeFn,
  onAddTag?:() => void,
  onImageClick?:(image:Image) => void,
  onTagClick?:(tag: Tag) => void,
  onBoxClick?:(box: Box) => Promise<void>;
  onAssignClick?: VoidFunction;
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `auto repeat(${props.images?.length ?? 0}, 1fr)`,
        overflow: "auto"
      }}
    >
      <div
        className="card p-1"
        style={{
          ...centerStyle,
        }}
      >
        <div className="buttons" >
          {
            props.onAddTag && 
              <button className="button" onClick={() => props.onAddTag?.()}>
                +Tag
              </button>
          }
          {
            props.onAddImage && 
              <FileUpload 
                accept="image/*"
                onChange={props.onAddImage}
              >
                <button className="button">
                  +Image
                </button>
              </FileUpload>
          }
        </div>
      </div>
      <div
        className="card p-1 has-text-weight-semibold"
        style={{
          ...centerStyle,
          gridRow: 2,
          gridColumn: 1,
        }} >
        <a onClick={() => props.onAssignClick?.()}>
          Assign Box
        </a>
      </div>
      {
        props.tags?.map((tag, i) => {
          return (
            <div
              className="card p-1 has-text-weight-semibold"
              key={tag.id}
              style={{
                ...centerStyle,
                gridColumn: 1,
                gridRow: i + 3,
              }}
            >
              <a
                onClick={() => props.onTagClick?.(tag)}
              > 
                { tag.name } 
              </a>
            </div>
          )
        })
      }
      {
        props.images?.map((p, rowIdx) => {
          return (
            <div
              key={p.id}
              className="card p-1 has-text-weight-semibold"
              style={{
                ...centerStyle,
                gridColumn: rowIdx + 2,
                gridRow: 1,
              }}
            >
              <a onClick={() => props.onImageClick?.(p)}> 
                { p.name } 
              </a>
            </div>
          )
        })
      }
      {
        props.images?.map((p, colIdx) => {
          return [undefined, ...(props.tags ?? [])].map((tag, rowIdx) => {
            const boxes = props.boxes?.filter(b => b.tagId === tag?.id && b.imageId === p.id)
            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: "wrap",
                  alignContent: "start",
                  gridColumn: colIdx + 2,
                  gridRow: rowIdx + 2,
                }}
              >
                {
                  boxes?.map(box => {
                    return (
                      <BoxView 
                        box={box}
                        files={props.files}
                        points={props.points}
                        tags={props.tags}
                        onClick={props.onBoxClick && (() => props.onBoxClick?.(box))}
                      />
                    )
                  })
                }
              </div>
            )
          })
        })
      }
    </div>
  )
}
export default TagTable
