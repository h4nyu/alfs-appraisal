import React, { useRef, RefObject, useState, useEffect } from "react";
import { Image } from "@alfs-appraisal/core/image";
import Box from "@alfs-appraisal/core/box";
import Tag from "@alfs-appraisal/core/tag";
import { Workspace } from "@alfs-appraisal/core/workspace";
import { File } from "@alfs-appraisal/core/file";
import Point from "@alfs-appraisal/core/point";
import DateView from "@alfs-appraisal/web/components/DateView";
import ImageView from "@alfs-appraisal/web/components/ImageView";
import DeleteBtn from "@alfs-appraisal/web/components/DeleteBtn";
import ImageTags from "@alfs-appraisal/web/components/ImageTags";
import ReferenceTag from "@alfs-appraisal/web/components/ReferenceTag";

export const BoxView = (props: {
  box: Box,
  files?: File[],
  points?: Point[],
  tags?: Tag[],
  isSelected?: boolean,
  onClick?: () => void
  className?: string,
}) => {
  const className = props.className ?? "card p-1"
  const file = props.files?.find(x => x.id === props.box?.fileId);
  const points = props.points?.filter(p => p.boxId === props.box.id)
  const tag = props.tags?.find(x => x.id === props.box.tagId)
  return (
    <div
      className={className}
      style={{
        cursor: props.onClick && "pointer",
        border: props.isSelected ? "solid" : undefined,
      }}
      onClick={props.onClick && (() => props.onClick?.())}
    >
      <a
        className="is-size-7"
      >
        {props.box.id}
      </a>
      <div
        style={{display: "flex"}}
      >
        <div
          style={{
            display: "flex",
            height: 70,
            width: 70,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {
            file && <img 
              style={{
                maxHeight: 70,
                maxWidth: 70,
              }}
              src={`data:image;base64,${file.data}`}
            /> 
          }
        </div>
        <div>
          <div>
            {
              points && <span className="tag is-rounded is-small is-light">{points.length}</span>
            }
          </div>
          <div>
            {
              tag && <span className="tag is-rounded is-small is-light"> {tag.name} </span>
            }
          </div>
          <div>
          {
            tag?.referenceBoxId === props.box.id && <ReferenceTag/> 
          }
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoxView;
