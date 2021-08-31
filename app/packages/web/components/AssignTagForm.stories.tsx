import React from "react";
import AssignTagForm from "./AssignTagForm";
import Mock from "@sivic/web/components/Mock";
import Box from "@sivic/core/box"
import Tag from "@sivic/core/tag"
import { Workspace } from "@sivic/core/workspace";

export default {
  title: "AssignTagForm",
  component: AssignTagForm,
};
const tags = [
  Tag({
    name: "A"
  }),
  Tag({
    name: "B"
  }),
]

const boxes = [
  Box(),
  Box(),
  Box(),
  Box(),
]

export const Primary = (args) => {
  return (
    <AssignTagForm 
      {...args} 
      boxes={boxes}
      tags={tags}
    />
  )
}

