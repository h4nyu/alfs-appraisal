import React from "react";
import LoadingButton from "@alfs-appraisal/web/components/LoadingButton"

const UpdateBtn = (props:{
  onClick?:() => Promise<void>
}) => {
  return (
    <LoadingButton
      className="is-info is-light"
      onClick={props.onClick}
    >
      変更
    </LoadingButton>
  );
};
export default UpdateBtn;
