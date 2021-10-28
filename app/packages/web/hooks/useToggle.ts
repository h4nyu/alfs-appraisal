import React from "react"

const useToggle = (props?: {value?: boolean }) => {
    const [value, setValue] = React.useState(props?.value ?? false);
    const toggle = () => setValue(!value);
    return {
      value, 
      toggle
    }
}
export default useToggle;
