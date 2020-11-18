import sharp from 'sharp'
export interface Lqip {
  b64: string | null
  ratio: number | null
  url: string
  width?: number
  height?: number
}
const getLqip = async (
  url: string | Readonly<string>,
  width?: number
): Promise<Lqip> => {
  try {
    const imageRes = await fetch(`${url}`)
    const blob = await imageRes.blob()
    const mimeType = blob.type
    const arrayBuffer = await blob.arrayBuffer()
    const lqip = await transform(arrayBuffer, mimeType, width, url)
    return lqip
  } catch (e) {
    console.log('Failed to fetch base64 image', url)
    throw e
  }
}

const getLqips = async (
  urls: Array<string> | Readonly<Array<string>>,
  width?: number
) => {
  const lqips = await sequenceArray<string, Lqip>(urls, async (url) => {
    try {
      const obj = await getLqip(url, width)
      // return {
      //   lqip: b64,
      //   src: url,
      // };
      return obj
    } catch (e) {
      return {url, b64: null, ratio: null}
    }
  })
  return lqips

  // const reduced = lqips.reduce((prev, curr) => {
  //   const {src, lqip} = curr;
  //   return {
  //     ...prev,
  //     [src]: lqip,
  //   };
  // });

  // return reduced;
}

async function sequenceArray<T, U = T>(
  array: T[] | Readonly<T[]>,
  fn: (args: T) => Promise<U>
) {
  const results = []
  for (let i = 0; i < array.length; i++) {
    const r = await fn(array[i])
    results.push(r)
  }
  return results
}

function toBase64(buffer: Buffer, mimeType: string) {
  return `data:${mimeType};base64,${buffer.toString('base64')}`
}

async function transform(
  ab: ArrayBuffer,
  mimeType: string,
  lqipWidth = 20,
  url: string
) {
  const buffer = Buffer.from(ab)
  const metaPromise = new Promise<{
    ratio: Lqip['ratio']
    width?: Lqip['width']
    height?: Lqip['height']
  }>((resolve) => {
    sharp(buffer).metadata((err, metadata) => {
      const {width, height} = metadata
      if (err || !width || !height) return {ratio: null, width, height}
      resolve({ratio: (height / width) * 100, width, height})
    })
  })
  const lqipPromise = new Promise<string>((resolve, reject) => {
    sharp(buffer)
      .normalise()
      .modulate({
        saturation: 1.1,
        brightness: 1
      })
      .removeAlpha()
      .resize(lqipWidth, null, {fit: 'inside'})
      .jpeg()
      .toBuffer((err, buffer) => {
        if (err) return reject(err)
        resolve(toBase64(buffer, mimeType))
      })
  })
  const {width, height, ratio} = await metaPromise
  const b64 = await lqipPromise
  return {url, ratio, width, height, b64}
}

export {getLqip, getLqips}
