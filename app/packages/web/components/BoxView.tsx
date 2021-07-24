import React, { useRef, RefObject, useState, useEffect } from "react";
import { Image } from "@sivic/core/image";
import Box from "@sivic/core/box";
import { Workspace } from "@sivic/core/workspace";
import { File } from "@sivic/core/file";
import DateView from "@sivic/web/components/DateView";
import ImageView from "@sivic/web/components/ImageView";
import DeleteBtn from "@sivic/web/components/DeleteBtn";
import ImageTags from "@sivic/web/components/ImageTags";

export const BoxView = (props: {
  box: Box,
  files?: File[],
  onNameClick?: (imageId:string) => void
  onTagClick?: ({id: string, tag:ImageTag}) => void;
  onBoxClick?:(id: string) => void;
  onDeleteClick?: (imageId: string) => void
}) => {
  return (
    null
  );

    {/* <div */}
    {/*   className="card" */}
    {/* > */}
    {/*   <div className= "card-header" */}
    {/*     style={{ */}
    {/*       display: "grid", */}
    {/*       gridTemplateColumns: "1fr auto auto auto", */}
    {/*       alignItems: "center", */}
    {/*     }} */}
    {/*   > */}
    {/*     <p className={`card-header-title ${props.onNameClick ? "is-clickable" : ""}` } */}
    {/*       onClick={() => props.onNameClick && props.onNameClick(props.image.id)} */}
    {/*     > */}
    {/*       {props.image.name} */}
    {/*     </p> */}
    {/*     <DateView value={props.image.createdAt} /> */}
    {/*     <div className="pl-2"> */}
    {/*       <ImageTags */} 
    {/*         image={props.image} */} 
    {/*         onClick={props.onTagClick} */}
    {/*       /> */}
    {/*     </div> */}
    {/*     { */}
    {/*       props.onDeleteClick && */} 
    {/*         <div className="p-2"> */}
    {/*           <DeleteBtn onClick={() => props.onDeleteClick && props.onDeleteClick(props.image.id)} /> */} 
    {/*         </div> */}
    {/*     } */}
    {/*   </div> */}
    {/*   <div className="card-content"> */}
    {/*     <div className="content" style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}> */}
    {/*       { */}
    {/*         props.box?.map((b, i) => { */}
    {/*           const file = props.files?.find(f => f.id === b.fileId) */}
    {/*           return file && ( */}
    {/*             <div key={i} className={`p-1 ${props.onBoxClick ? "is-clickable" : ""}`}> */}
    {/*               <img src={`data:image/png;base64, ${file.data}`} width={50} height={50} onClick={() => props.onBoxClick?.(x.id)}/> */}
    {/*             </div> */}
    {/*           ) */}
    {/*         }) */}
    {/*       } */}
    {/*     </div> */}
    {/*   </div> */}
    {/* </div> */}
};
export default BoxView;
