import React from "react";
import LoadingButton from "@sivic/web/components/LoadingButton"

const DetectBtn = (props:{
  onClick?:() => Promise<void>
}) => {
  return (
    <LoadingButton
      className="is-info is-light"
      onClick={props.onClick}
    >
      検出
    </LoadingButton>
  );
};
export default DetectBtn;
