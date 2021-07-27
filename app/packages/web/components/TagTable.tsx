import React from "react"
import { Tag } from "@sivic/core/tag"
import { Image } from "@sivic/core/image"
import { File } from "@sivic/core/file"
import Point from "@sivic/core/point"
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
  points?: Point[],
  onImageAdd?:() => void,
  onTagAdd?:() => void,
  onImageClick?:(image:Image) => void,
  onTagClick?:(tag: Tag) => void,
  onBoxClick?:(box: Box) => void;
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `auto repeat(${props.tags?.length ?? 0}, auto)`,
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
                onClick={() => props.onTagClick?.(t)}
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
              <a onClick={() => props.onImageClick?.(p)}> 
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
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: "wrap",
                  alignContent: "start",
                  gridRow: rowIdx + 2,
                  gridColumn: colIdx + 2,
                }}
              >
                {
                  boxes?.map(box => {
                    const file = props.files?.find(x => x.id === box.fileId)
                    const points = props.points?.filter(x => x.boxId === box.id)
                    return {
                      box,
                      file,
                      points
                    }
                  })
                  .sort((a, b) => (a.points?.length ?? 0) - (b.points?.length ?? 0))
                  .map(({box, file, points}) => {
                    return(
                      file && 
                        <div
                          key={box.id}
                          className="is-clickable p-1"
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                          onClick={() => props.onBoxClick?.(box)}
                        >
                          <img 
                            style={{
                              height: 50,
                            }}
                            src={`data:image;base64,${file.data}`}
                          /> 
                          <div>
                            {
                              points && <span className="tag is-rounded is-danger is-small is-light">{points.length}</span>
                            }
                          </div>
                        </div>
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
