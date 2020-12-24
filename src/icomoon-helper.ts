import {
  copyFileSync,
  promises,
  readdirSync,
  readFileSync,
  rmdirSync,
  statSync,
  writeFileSync,
} from 'fs'
import {basename, dirname, extname, join} from 'path'
import {tmpdir} from 'os'
import {pipeline} from 'icomoon-cli'
import glob from 'glob'
import {Command} from 'commander'
import camelcase from 'camelcase'
import {IIcomoonConfig, IOptions} from './interfaces'
import {loggerNode} from './logger'

interface IIcomooonHelperParams extends IOptions {
  iconKeysCreator?: (config: IIcomoonConfig) => string
}

export async function icomoonHelper({
  selection,
  icons,
  outputAll,
  outputNames,
  force,
  outputFont,
  visible,
  iconKeysCreator,
}: IIcomooonHelperParams): Promise<void> {
  const files = icons?.map(path => glob.sync(path)) || []
  if (files.length == 0) {
    loggerNode.error('No new icons found')
    process.exit(1)
  }
  let selectionPath: string
  try {
    await promises.access(selection)
    const stat = statSync(selection)
    if (stat.isDirectory()) {
      const selectionJson = join(selection, 'icomoon.json')
      try {
        await promises.access(selectionJson)
      } catch (e) {
        copyFileSync(join(__dirname, '../icomoon.json'), selectionJson)
        loggerNode.warn('Created new config')
      }
      selectionPath = selectionJson
    } else {
      selectionPath = selection
    }
  } catch (e) {
    const selectionJson = selection + '.json'
    try {
      await promises.access(selectionJson)
      selectionPath = selectionJson
    } catch (e) {
      const parentName = basename(dirname(selection))
      try {
        await promises.access(parentName)
        const stat = statSync(parentName)
        if (stat.isDirectory()) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const initialConfig = require(join(__dirname, '../icomoon.json'))
          const fontName = basename(selection).split('.')[0]
          const fontExt = extname(selection)
          selectionPath = fontExt == '.json' ? selection : selection + '.json'
          initialConfig.metadata.name = fontName
          initialConfig.preferences.fontPref.metadata.fontFamily = fontName
          writeFileSync(selectionPath, JSON.stringify(initialConfig))
          loggerNode.warn('Created new config')
        } else {
          loggerNode.error('Wrong selection path')
          process.exit(1)
        }
      } catch (e) {
        loggerNode.error('Wrong selection path')
        process.exit(1)
      }
    }
  }

  const allPath = outputAll || join(tmpdir(), 'icomoon-helper')
  await rmdirSync(allPath, {recursive: true})
  await delayPromise(500)

  pipeline({
    icons: files.reduce((prev, current) => prev.concat(current)),
    selectionPath,
    outputDir: allPath,
    forceOverride: force,
    visible,
  }).then(({didOutput}) => {
    if (didOutput) {
      const selectionResultPath = join(allPath, 'selection.json')
      copyFileSync(selectionResultPath, selectionPath)

      const selectionResult = JSON.parse(
        readFileSync(selectionResultPath) as unknown as string,
      ) as IIcomoonConfig
      if (outputNames) {
        const content = (iconKeysCreator
          || initialIconKeysCreator)(selectionResult)
        writeFileSync(outputNames, content)
      }
      const fontPath = join(allPath, 'fonts')
      const files = readdirSync(fontPath)
      const fonts = files.reduce((prev, current) => {
        prev[extname(current).slice(1)] = join(fontPath, current)
        return prev
      }, {} as { [key: string]: string })
      outputFont.forEach(item => {
        const [path, fontType] = item.split(',')
        copyFileSync(fonts[fontType], join(path, basename(fonts[fontType])))
      })
    }
  }).finally(() => {
    process.exit()
  })
}

function initialIconKeysCreator(config: IIcomoonConfig) {
  return config.icons.reduce((prev, {properties: {name}}) => {
    return prev + `\n  ${camelcase(name)}: '${name}',`
  }, 'export const IconNames = {') + '\n}\n'
}

export function delayPromise(millis: number): Promise<void> {
  return new Promise((resolve): void => {
    setTimeout((): void => {
      resolve()
    }, millis)
  })
}

if (module.parent == null) {
  const program = new Command()

  /* eslint-disable max-len */
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  program.version(require('../package.json').version)
    .option('-s, --selection [string]', 'path to icomoon selection file', './')
    .option('-i, --icons <sting...>', 'path to icons need to be imported')
    .option('-f, --outputFont [string...]', 'output font path with type, separated by coma', './')
    .option('-a, --outputAll [string]', 'all icomoon generated files path')
    .option('-n, --outputNames [string]', 'path to icons enum')
    .option('-f, --force', 'force override current icon when icon name duplicated', false)
    .option('-v, --visible', 'run a GUI chrome instead of headless mode', false)

  program.parse(process.argv)
  icomoonHelper(program as unknown as IOptions)
}
