import { readFileSync } from 'fs'
import { join, parse } from 'path'

import glob from 'glob'

export interface ItemIcon {
  /** Full path of file C:/Path/To/File.png */
  filePath: string

  /** Name of file without folder and extension `actuallyadditions__block_breaker__0` */
  fileName: string

  /** Source of item, mod id or 'fluid' */
  namespace: string

  /** Part of registry name after first : or fluid name */
  name: string

  /** Metadata of item or 0 */
  meta: number

  /** Hash code of sNbt if exists */
  hash?: string

  /** sNbt stored in separate file */
  sNbt?: string
}

/**
 * Make generator from all icons in cpecified dir.
 * @example for (const icon of iconIterator('x32')) { }
 * @param iconsDirectory Directory with all .png and .txt files exported with Icon Exporter Mod
 */
export default function* iconIterator(iconsDirectory = './'): Generator<ItemIcon, void, unknown> {
  for (const filePath of glob.sync(join(iconsDirectory, '*.png'))) {
    const fileName = parse(filePath).name

    const groups = fileName.match(
      /(?<namespace>.+?)__(?<name>.+?)__(?<meta>\d+)(__(?<hash>.+))?|fluid__(?<fluid>.+)/
    )?.groups

    if (!groups) {
      throw new Error("Groups for this file couldn't matched: " + filePath)
    }

    // If we have hashed nbt
    let sNbt: string | undefined
    if (groups.hash != null) {
      sNbt = readFileSync(join(iconsDirectory, `${fileName}.txt`), 'utf8')
    }

    yield {
      filePath,
      fileName,
      namespace: groups.fluid ? 'fluid' : groups.namespace,
      name: groups.fluid ?? groups.name,
      meta: Number(groups.meta) || 0,
      hash: groups.hash,
      sNbt,
    }
  }
}
