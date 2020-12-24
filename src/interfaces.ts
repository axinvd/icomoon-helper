export interface IOptions {
  selection: string
  icons: string[]
  outputFont: string[]
  outputAll?: string
  outputNames?: string
  force: boolean
  visible: boolean
}

export interface IIconProps {
  size?: number
  color?: string | string[]
  opacity?: number | number[]
}

export interface IRenderIconProps extends IIconProps {
  fontFamily: string
  symbols: ISymbol[]
}

export interface ISymbol {
  value: string
  color?: string
  opacity?: number
  size: number
}

export interface IIcomoonConfig {
  metadata: { name: string }
  preferences: {
    showQuickUse: boolean
    showGlyphs: boolean
    showSVGs: boolean
    gridSize: number
    showQuickUse2: boolean
    imagePref: IImagePerf
    showCodes: boolean
    quickUsageToken: { [key: string]: string }
    fontPref: IFontPerf
    showGrid: boolean
    historySize: number
  }
  IcoMoonType: string
  icons: IIcon[]
  height: number
}

interface IAttributes {
  strokeWidth?: number
  strokeLinejoin?: string
  strokeLinecap?: string
  fill?: string
  stroke?: string
  strokeMiterlimit?: string
  opacity?: number
}

interface IProperties {
  code: number
  name: string
  id: number
  prevSize: number
  order: number
  codes?: number[]
}

interface IImagePerf {
  color: number
  bgColor: number
  prefix: string
  classSelector: string
  png: boolean
  useClassSelector: boolean
}

interface IFontPerf {
  includeMetadata: boolean
  showSelector: boolean
  metadata: {
    fontFamily: string
    majorVersion: number
    minorVersion: number
  }
  prefix: string
  noie8: boolean
  showMetadata: boolean
  ie7: boolean
  metrics: {
    emSize: number
    baseline: number
    whitespace: number
  }
  embed: boolean
  autoHost: boolean
}

interface IIcon {
  icon: {
    colorPermutations: { [key: string]: { f?: number }[] }
    paths: string[]
    grid: number
    isMulticolor2: boolean
    isMulticolor: boolean
    attrs: IAttributes[]
    tags: string[]
  }
  setIdx: number
  setId: number
  iconIdx: number
  properties: IProperties
  attrs: IAttributes[]
}
