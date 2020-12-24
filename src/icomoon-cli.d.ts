declare module 'icomoon-cli' {
  interface IParams {
    icons: string[],
    selectionPath: string,
    outputDir: string,
    forceOverride: boolean,
    visible: boolean,
  }

  interface IOutput {
    outputDir: string
    didOutput: boolean
  }

  export const pipeline: (params: IParams) => Promise<IOutput>
}
