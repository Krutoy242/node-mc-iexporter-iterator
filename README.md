# mc-iexporter-iterator

Make generator that iterate over each item icon generated with [IconExporter](https://www.curseforge.com/minecraft/mc-mods/iconexporter) mod.

Since item names are serialized, and NBT data stored in separate files, additional parsing required. This what that lib does.

This lib used in [E2E-E Icons](https://github.com/Krutoy242/E2E-E-icons) and [node-mc-gatherer](https://github.com/Krutoy242/node-mc-gatherer).

## Usage

```js
import iconIterator from 'mc-iexporter-iterator'

for (const icon of iconIterator('x32')) {
  console.log(`${icon.namespace}:${icon.name}:${icon.meta}`)
}
```

## Api

Returned by generator object format:

```ts
interface ItemIcon {
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
```