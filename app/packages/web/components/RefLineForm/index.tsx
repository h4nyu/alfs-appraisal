import React from 'react';
import Line from '@sivic/core/line'
import Point from '@sivic/core/point'
import File from '@sivic/core/file'
import Image from '@sivic/core/image'
import SvgCharPlot from '@sivic/web/components/SvgCharPlot'


const RefLineForm = (props: Readonly<{
  image: Image,
  files: File[],
  points: Point[],
  lines: [Line, Line],
  onSubmit: () => void;
}>) => {
  const file = React.useMemo(
    () => props.files.find(x => x.id === props.image.fileId), 
    [props.image.fileId, props.files]
  )
  // const 

  return (
    <div>
      <SvgCharPlot 
        data={file?.data}
        points={props.points}
        lines={props.lines}
      />
    </div>
  )
}
export default RefLineForm
