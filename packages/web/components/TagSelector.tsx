import React from 'react';
import Tag from '@sivic/core/tag'

export const TagSelector = (props: {
  tags?: Tag[],
  value?: string,
  onChange?: (tag?:Tag) => void;
}) => {
  const tag = props.tags?.find(x => x.id === props.value)
  return (
    <div className="mr-2 dropdown is-hoverable is-fullwidth">
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span className="icon-text">
            <span>
              {tag?.name ?? "None"}
            </span>
            {
              tag &&<div 
                className="icon is-small"
                onClick={() => props.onChange?.()}
              >
                <i className="fas fa-times"></i>
              </div>
            }
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
                  onClick={() => props.onChange?.(x)}
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
