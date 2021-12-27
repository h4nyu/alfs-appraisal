import React from "react";
import TagSelector from "./TagSelector";
import Tag from "@alfs-appraisal/core/tag";

export default {
  title: "TagSelector",
  component: TagSelector,
};
const tags = [
  Tag({
    id: "t0",
    name: "aaa",
  }),
  Tag({
    id: "t1",
    name: "bbb",
  })
]

export const Primary = (args) =>( <TagSelector 
  {...args} 
  tags={tags}
/> )
