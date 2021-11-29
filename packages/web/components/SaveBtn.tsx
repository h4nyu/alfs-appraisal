import React from "react";
import LoadingButton from "./LoadingButton"

const SaveBtn = (props:{
  onClick?:() => Promise<void>
}) => {
  return (
    <LoadingButton
      className="is-info is-light"
      onClick={props.onClick}
    >
      保存
    </LoadingButton>
  );
};
export default SaveBtn;
