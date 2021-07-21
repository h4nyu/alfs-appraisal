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
  const tags = props.tags ?? []
  const boxes = props.boxes ?? []
  const images = props.images ?? []
  const parentImages = images.filter(x => x.boxId === undefined)
  const files = props.files ?? []
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `auto repeat(${tags.length}, 1fr)`,
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
        tags.map((t, i) => {
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
        parentImages.map((p, rowIdx) => {
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
        parentImages.map((p, rowIdx) => {
          return tags.map((t, colIdx) => {
            const cropedImages = images.filter(i => i.parentId === p.id && i.boxId === undefined )
            return (
              <div
                className="card"
                key={`${rowIdx}-${colIdx}`}
                style={{
                  gridRow: rowIdx + 2,
                  gridColumn: 2,
                }}
              >
                {
                  cropedImages.map(c => {
                    const file = files.find(x => x.id === c.fileId)
                    return(
                      file && <img key={c.id}
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
      {
        parentImages.map((p, rowIdx) => {
          return tags.map((t, colIdx) => {
            const boxIds = boxes.filter(b => b.tagId === t.id).map(x => x.id)
            const cropedImages = images.filter(i => i.parentId === p.id && i.boxId && boxIds.includes(i.boxId) )
            return (
              <div
                className="card"
                key={`${rowIdx}-${colIdx}`}
                style={{
                  gridRow: rowIdx + 2,
                  gridColumn: colIdx + 3,
                }}
              >
                {
                  cropedImages.map(c => {
                    const file = files.find(x => x.id === c.fileId)
                    return(
                      file && <img 
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
