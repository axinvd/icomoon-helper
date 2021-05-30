export const getLogString = (message: string): string => {
  return '[icomoon-helper] ' + message
}

export const logger = {
  error: (message: string): void => console.error(getLogString(message)),
  warn: (message: string): void => console.warn(getLogString(message)),
  log: (message: string): void => console.log(getLogString(message)),
}

export const checkSymbolsCount = (symbol: string, count: number): void => {
  if (count > 10) {
    logger.error('In icon "' + symbol +
      '" more than ten colors(' + count +
      '), strongly not recommend use such icons')
  } else if (count > 3) {
    logger.warn('In icon "' + symbol +
      '" more than three colors(' + count +
      '), this can be a performance issue')
  }
}

export const needRenderIcon = (): void => {
  logger.error('For current platform need provide renderIcon function')
}
