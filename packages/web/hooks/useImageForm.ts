import React from "react"
import { keyBy, zip, uniqBy } from "lodash";
import Image from "@alfs-appraisal/core/image"


export const useImageForm = (props: { image: Image }) => {
  const [name, setName] = React.useState<string>(props.image.name)
  return {
    name, setName
  }
}
export default useImageForm
