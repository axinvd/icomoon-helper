import chalk from 'chalk'

export const getLogString = (message: string): string => {
  return '[icomoon-helper] ' + message
}

const log = (message: string): void => {
  process.stdout.write(getLogString(message) + '\n')
}

export const loggerNode = {
  error: (message: string): void => log(chalk.red(message)),
  warn: (message: string): void => log(chalk.yellow(message)),
  log,
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

export const needRenderIcon = (platform: string): void => {
  logger.error('For ' + platform + ' need provide renderIcon function')
}
