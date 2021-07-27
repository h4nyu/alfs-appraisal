export enum ErrorKind {
  WorkspaceAlreadyExist = "WorkspaceAlreadyExist",
  WorkspaceNotFound = "WorkspaceNotFound",
  TagNotFound="TagNotFound",
  TagAlreadyExist="TagAlreadyExist",
  ImageNotFound = "ImageNotFound",
  ZeroSizeBox = "ZeroSizeBox",
  FileNotFound="FileNotFound",
  BoxNotFound="BoxNotFound",
  InvalidTagNameFormat="InvalidTagNameFormat",
  InvalidWorkspaceNameFormat="InvalidWorkspaceNameFormat",
}
export default ErrorKind;
