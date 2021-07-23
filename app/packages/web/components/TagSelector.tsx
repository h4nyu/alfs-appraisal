import React from 'react';
import Tag from '@sivic/core/tag'

export const TagSelector = (props: {
  tags?: Tag[],
  value?: string,
  onChange?: (value:string) => void;
}) => {
  const tag = props.tags?.find(x => x.id === props.value)
  return (
    <div className="mr-2 dropdown is-hoverable is-fullwidth">
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>
            {tag?.name ?? "Select Tag"}
          </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content is-fullwidth">
          {
            props.tags?.map((x, i) => {
              return (
                <a 
                  key={i}
                  className={`dropdown-item ${x.id === props.value ? "is-active" : ""}`}
                  onClick={() => props.onChange?.(x.id)}
                >
                  {x.name}
                </a>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default TagSelector
