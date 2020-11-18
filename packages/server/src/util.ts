import Jimp from 'jimp'
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
      return obj
    } catch (e) {
      return {url, b64: null, ratio: null}
    }
  })
  return lqips
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

async function transform(
  ab: ArrayBuffer,
  mimeType: string,
  lqipWidth = 25,
  url: string
) {
  const buffer = Buffer.from(ab)
  const j = await Jimp.read(buffer)
  const width = j.getWidth()
  const height = j.getHeight()
  const ratio = !width || !height ? null : (height / width) * 100

  const b64 = await j
    .normalize()
    // .color([{apply: 'saturate' as any, params: [-50]}])
    .resize(lqipWidth, Jimp.AUTO)
    .getBase64Async(mimeType)
  return {url, ratio, width, height, b64}
}

export {getLqip, getLqips}
