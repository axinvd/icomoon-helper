import React from 'react'
import {Text, TextStyle, View} from 'react-native'
import {IRenderIconProps, ISymbol} from './interfaces'

export const renderIcon: React.FC<IRenderIconProps> = (props) => {
  return (
    <View>
      {props.symbols.map((symbol, index) => (
        <Text key={symbol.value} style={getStyles(symbol, props, index)}>
          {symbol.value}
        </Text>
      ))}
    </View>
  )
}

const getStyles = (
  symbol: ISymbol,
  {size, color, opacity, fontFamily}: IRenderIconProps,
  index: number,
): TextStyle => {
  const propsColor = typeof color === 'object' ? color?.[index] : color
  const propsOpacity = typeof opacity === 'object' ? opacity?.[index] : opacity

  return {
    fontSize: size || symbol.size,
    lineHeight: size || symbol.size,
    fontFamily,
    color: propsColor || symbol.color,
    opacity: propsOpacity || symbol.opacity,
    position: index === 0 ? 'relative' : 'absolute',
  }
}
