import React from "react";
import LoadingButton from "./LoadingButton"

const SaveBtn = (props:{
  onClick?:() => Promise<void>
}) => {
  return (
    <LoadingButton
      className="is-info"
      onClick={props.onClick}
    >
      Save
    </LoadingButton>
  );
};
export default SaveBtn;
