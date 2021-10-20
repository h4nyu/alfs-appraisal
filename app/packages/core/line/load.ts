import { Lock, ErrorKind, Store } from "@sivic/core";
import Line, { LineProps } from ".";
import FindBoxFn from "@sivic/core/box/find"
import FilterFn from "./filter"

export type Payload = {
  boxId: string;
  lines: Pick<LineProps, "id"|"start"|"end">[]
};
export type Fn = (payload: Payload) => Promise<Line[] | Error>

export const Fn = (props: {
  store: Store;
}) => {
  return async (payload: Payload) => {
    const findBox = FindBoxFn(props)
    const filter = FilterFn(props)

    return async (payload) => {
      const box = await findBox({id: payload.boxId})
      if(box instanceof Error) { return box }
      if(box.isReference){ return Error(ErrorKind.BoxNotReference)}
      if(payload.lines.length !==2){ return Error(ErrorKind.LineLengthError)}
      const oldLines = await filter({boxId: payload.boxId})
      if(oldLines instanceof Error) { return oldLines }

      for(const ol of oldLines){
        const err = await props.store.line.delete({id: ol.id})
        if(err instanceof Error) { return err }
      }

      const lines = payload.lines.map(l => Line({...l, boxId: payload.boxId}))
      for(const l of lines){
        const err = await props.store.line.create(l)
        if(err instanceof Error) { return err }
      }
      return lines
    }
  }
}
export default Fn

