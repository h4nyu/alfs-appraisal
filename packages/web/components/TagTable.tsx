import React from "react"
import { Tag } from "@alfs-appraisal/core/tag"
import { Image } from "@alfs-appraisal/core/image"
import { File } from "@alfs-appraisal/core/file"
import Point from "@alfs-appraisal/core/point"
import AddBtn from "@alfs-appraisal/web/components/AddBtn"
import BoxView from "@alfs-appraisal/web/components/BoxView"
import Box from "@alfs-appraisal/core/box"
import FileUpload, { ChangeFn } from "@alfs-appraisal/web/components/FileUpload"
import { sortBy } from "lodash"

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
  const tags = sortBy(props.tags || [], x => x.name)
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
        tags.map((tag, i) => {
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
          return [undefined, ...(tags ?? [])].map((tag, rowIdx) => {
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
                        key={box.id}
                        box={box}
                        files={props.files}
                        points={props.points}
                        tags={tags}
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
