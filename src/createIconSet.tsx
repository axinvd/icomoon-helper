import React from 'react'
import {renderIcon as initialRenderIcon} from './renderIcon'
import {IIcomoonConfig, IIconProps, IRenderIconProps} from './interfaces'
import {checkSymbolsCount, logger} from './logger'

export function createIconSet(
  config: IIcomoonConfig,
  renderIcon?: (props: IRenderIconProps) => JSX.Element,
): React.FC<IIconProps & { children: string }> {
  const fontFamily = config.metadata.name
  const symbols = config.icons.map((item) => {
    const codes = item.properties.codes || [item.properties.code]
    const values = codes.map((code) => String.fromCharCode(code))
    const colors = item.attrs.map((attr) => attr.fill || attr.stroke)
    const opacities = item.attrs.map((attr) => attr.opacity)

    return values.map((value, index) => ({
      value,
      color: colors[index],
      opacity: opacities[index],
      size: item.properties.prevSize,
    }))
  })
  const iconDictionary = config.icons.reduce((prev, current, index) => {
    prev[current.properties.name] = index

    return prev
  }, {} as { [key: string]: number })

  return ({children, ...props}) => {
    const Component = renderIcon || initialRenderIcon
    const symbolIndex = iconDictionary[children]

    if (symbolIndex != undefined) {
      const currentSymbols = symbols[symbolIndex]
      checkSymbolsCount(children, currentSymbols.length)

      return (
        <Component
          fontFamily={fontFamily}
          symbols={currentSymbols}
          {...props}
        />
      )
    } else {
      logger.error(`icon with name "${children}" not found`)

      return null
    }
  }
}
