export enum LoaderType {
  Spinner = "spinner",
  Ellipsis = "ellipsis"
}

export interface ILoaderRequest {
  render: boolean,
  type?: LoaderType
}