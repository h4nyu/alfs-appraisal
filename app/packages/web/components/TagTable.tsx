import React from "react"
import { Tag } from "@sivic/core/tag"
import { Image } from "@sivic/core/image"
import { File } from "@sivic/core/file"
import AddBtn from "@sivic/web/components/AddBtn"
import Box from "@sivic/core/box"

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
  onImageAdd?:() => void,
  onTagAdd?:() => void,
  onImageClick?: (imageId:string) => void,
  onTagClick?:(tagId:string) => void,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `auto repeat(${props.tags?.length ?? 0}, 1fr)`,
      }}
    >
      <div
        className="card p-1 has-text-weight-semibold"
        style={{
          ...centerStyle,
          minHeight: "1em",
        }}
      >
        Images / Tags
      </div>
      <div
        className="card p-1 has-text-weight-semibold"
        style={{
          ...centerStyle,
          minHeight: "1em",
          gridRow: 1,
          gridColumn: 2,
        }}
      >
        NoTag
      </div>
      {
        props.tags?.map((t, i) => {
          return (
            <div
              className="card p-1 has-text-weight-semibold"
              key={t.id}
              style={{
                ...centerStyle,
                gridRow: 1,
                gridColumn: i + 3,
              }}
            >
              <a
                onClick={() => props.onTagClick?.(t.id)}
              > 
                { t.name } 
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
                gridRow: rowIdx + 2,
                gridColumn: 1,
              }}
            >
              <a onClick={() => props.onImageClick && props.onImageClick(p.id)}> 
                { p.name } 
              </a>
            </div>
          )
        })
      }
      {
        props.images?.map((p, rowIdx) => {
          return [undefined, ...(props.tags ?? [])].map((t, colIdx) => {
            const boxes = props.boxes?.filter(b => b.tagId === t?.id && b.imageId === p.id)
            return (
              <div
                className="card"
                key={`${rowIdx}-${colIdx}`}
                style={{
                  gridRow: rowIdx + 2,
                  gridColumn: colIdx + 2,
                }}
              >
                {
                  boxes?.map(b => {
                    const file = props.files?.find(x => x.id === b.fileId)
                    return(
                      file && <img 
                        key={file.id}
                        src={`data:image;base64,${file.data}`}
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
