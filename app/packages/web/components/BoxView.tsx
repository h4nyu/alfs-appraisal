import React, { useRef, RefObject, useState, useEffect } from "react";
import { Image } from "@sivic/core/image";
import Box from "@sivic/core/box";
import Tag from "@sivic/core/tag";
import { Workspace } from "@sivic/core/workspace";
import { File } from "@sivic/core/file";
import Point from "@sivic/core/point";
import DateView from "@sivic/web/components/DateView";
import ImageView from "@sivic/web/components/ImageView";
import DeleteBtn from "@sivic/web/components/DeleteBtn";
import ImageTags from "@sivic/web/components/ImageTags";

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
        cursor: props.onClick && "pointer"
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
              points && <span className="tag is-rounded is-danger is-small is-light">{points.length}</span>
            }
          </div>
          <div>
            {
              tag?.referenceBoxId === props.box.id && <span className="tag is-rounded is-info is-small is-light"> ref </span>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoxView;
