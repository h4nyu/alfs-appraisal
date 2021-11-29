import React from "react";
import LoadingButton from "./LoadingButton";

export default {
  title: "LoadingButton",
  component: LoadingButton
};

export const Default = (args) => (
  <LoadingButton 
    {...args} 
    onClick={async () => {
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
      })
    }}
  >
    aaaa
  </LoadingButton>
)



export const Info = (args) => (
  <LoadingButton 
    {...args} 
    className={"is-info"}
    onClick={async () => {
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
      })
    }}
  >
    aaaa
  </LoadingButton>
)
