import { writeFileSync, mkdirSync } from 'node:fs'
import { deflateSync } from 'node:zlib'
const crc32 = (bytes) => {
  let crc = 0xffffffff
  for (const byte of bytes) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)) }
  return (crc ^ 0xffffffff) >>> 0
}
const chunk = (name, data) => {
  const type = Buffer.from(name)
  const size = Buffer.alloc(4); size.writeUInt32BE(data.length)
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([type, data])))
  return Buffer.concat([size, type, data, crc])
}
const png = (size) => {
  const raw = Buffer.alloc(size * (1 + size * 4))
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = (x + .5) / size * 64, v = (y + .5) / size * 64
    const inside = u >= 4 && u < 60 && v >= 4 && v < 60
    const letter = (u >= 20 && u < 28 && v >= 14 && v < 50) || (u >= 20 && u < 48 && v >= 14 && v < 22) || (u >= 28 && u < 44 && v >= 29 && v < 37)
    const color = inside && !letter ? [198, 245, 100, 255] : [23, 24, 23, 255]
    const offset = y * (size * 4 + 1) + 1 + x * 4
    color.forEach((value, channel) => { raw[offset + channel] = value })
  }
  const header = Buffer.alloc(13); header.writeUInt32BE(size, 0); header.writeUInt32BE(size, 4); header[8] = 8; header[9] = 6
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', header), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))])
}
mkdirSync('public', { recursive: true })
const sizes = [16, 32, 48, 64, 128, 256]
const images = sizes.map(png)
const directory = Buffer.alloc(6 + sizes.length * 16); directory.writeUInt16LE(1, 2); directory.writeUInt16LE(sizes.length, 4)
let offset = directory.length
sizes.forEach((size, i) => {
  const entry = 6 + i * 16
  directory[entry] = size === 256 ? 0 : size; directory[entry + 1] = size === 256 ? 0 : size
  directory.writeUInt16LE(1, entry + 4); directory.writeUInt16LE(32, entry + 6)
  directory.writeUInt32LE(images[i].length, entry + 8); directory.writeUInt32LE(offset, entry + 12)
  offset += images[i].length
})
writeFileSync('public/favicon.ico', Buffer.concat([directory, ...images]))
writeFileSync('public/fastcheckout-f.png', png(256))
writeFileSync('public/apple-touch-icon.png', png(180))
console.log('Favicons F generados: ICO multirresolución y PNG.')
