import postgres from "postgres";
import WorkspaceStore from "./workspace";
import ImageStore from "./image"
import DetectStore from "./detect"
import BoxStore from "./box"
import PointStore from "./point"
import TransformStore from "./transform"
import TagStore from "./tag"
import FileStore from "./file"
import LineStore from "./line"

export const Store = (args: { 
  url: string; 
  max?: number,
  imageUrl: string,
  detectUrl: string,
}) => {
  const sql = postgres(args.url, {
    max: args.max || 5,
  });
  const close = async () => {
    await sql.end({ timeout: 5 });
  };
  const workspace = WorkspaceStore(sql);
  const image = ImageStore(sql)
  const box = BoxStore(sql)
  const point = PointStore(sql)
  const transform = TransformStore()
  const detect = DetectStore(args.detectUrl)
  const tag = TagStore(sql)
  const file = FileStore(sql)
  const line = LineStore(sql)
  return {
    workspace,
    image,
    transform,
    detect,
    box,
    point,
    line,
    tag,
    file,
    close,
  };
};
export default Store;
