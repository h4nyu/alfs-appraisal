export { ErrorKind } from "./error";
import { Workspace } from "./workspace";
import { Image } from "@sivic/core/image"
import { Box } from "@sivic/core/box"
import { Point } from "@sivic/core/point"
import { CropPayload } from "@sivic/core/transform"
import { Line } from "@sivic/core/line";
import { Tag } from "@sivic/core/tag"
import { File } from "@sivic/core/file"

export type WorkspaceStore = {
  find: (payload: {
    id? :string,
    name?: string,
  }) => Promise<Workspace | undefined | Error>;
  filter: (payload: {
    ids?: string[];
  }) => Promise<Workspace[] | Error>;
  insert: (payload: Workspace) => Promise<void | Error>;
  update: (payload: Workspace) => Promise<void | Error>;
  delete: (payload: {
    id: string;
  }) => Promise<void | Error>;
  clear: () => Promise<void | Error>;
};

export type TagStore = {
  find: (payload: {
    id? :string,
    name?: string,
    workspaceId?:string,
  }) => Promise<Tag | undefined | Error>;
  filter: (payload: { 
    ids?: string[],
    workspaceId?:string
  }) => Promise<Tag[] | Error>;
  insert: (payload: Tag) => Promise<void | Error>;
  update: (payload: Tag) => Promise<void | Error>;
  delete: (payload: {
    id?: string;
    workspaceId?:string,
  }) => Promise<void | Error>;
};

export type ImageStore = {
  find: (payload: {id :string, hasData?:boolean}) => Promise<Image | Error>;
  filter: (payload:{workspaceId? :string, parentId?: string, ids?: string[]}) => Promise<Image[] | Error>
  insert: (payload: Image ) => Promise<void | Error>
  update: (payload: Image ) => Promise<void | Error>
  delete: (payload: { id: string} ) => Promise<void | Error>
};

export type DetectStore = {
  box: (payload: {data :string}) => Promise<Box[] | Error>;
};

export type BoxStore = {
  find: (payload: {id?: string;}) => Promise<Box | undefined | Error>;
  filter: (payload: {imageId?: string;}) => Promise<Box[] | Error>;
  load: (payload: Box[]) => Promise<void | Error>;
  delete: (payload: {id?:string}) => Promise<void | Error>;
};

export type PointStore = {
  filter: (payload: {imageId?: string;}) => Promise<Point[] | Error>;
  load: (payload: Point[]) => Promise<void | Error>;
  delete: (payload: {imageId?: string}) => Promise<void | Error>;
};

export type LineStore = {
  filter: (payload: {imageId: string;}) => Promise<Line[] | Error>;
  delete: (payload: {imageId: string}) => Promise<void | Error>
  load: (payload: Line[]) => Promise<void | Error>;
};

export type FileStore = {
  find: (payload: {id?: string;}) => Promise<File | undefined | Error>;
  insert: (payload: File) => Promise<void | Error>;
  delete: (payload: {id?: string}) => Promise<void | Error>
};

export type TransformStore = {
  crop: (payload: CropPayload) => Promise<string | Error>;
};

export type Lock = {
  auto: <T>(fn: () => Promise<T>) => Promise<T>;
};

export type Store = {
  workspace: WorkspaceStore;
  transform: TransformStore;
  image: ImageStore,
  detect: DetectStore,
  box:BoxStore,
  point: PointStore,
  line: LineStore,
  tag: TagStore,
  file: FileStore,
}
