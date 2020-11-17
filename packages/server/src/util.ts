import sharp from 'sharp'

const getLqip = async (
  url: string | Readonly<string>,
  width?: number
): Promise<string> => {
  try {
    const imageRes = await fetch(`${url}`)
    const blob = await imageRes.blob()
    const mimeType = blob.type
    const arrayBuffer = await blob.arrayBuffer()
    const lqipSrc = await transform(arrayBuffer, mimeType, width)
    return lqipSrc
  } catch (e) {
    console.log('Failed to fetch base64 image', url)
    throw e
  }
}

const getLqips = async (
  urls: Array<string> | Readonly<Array<string>>,
  width?: number
) => {
  const lqips = await sequenceArray<string, string | null>(
    urls,
    async (url) => {
      try {
        const b64 = await getLqip(url, width)
        // return {
        //   lqip: b64,
        //   src: url,
        // };
        return b64
      } catch (e) {
        return null
      }
    }
  )
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

async function transform(ab: ArrayBuffer, mimeType: string, width = 30) {
  return new Promise<string>((resolve, reject) => {
    const buffer = Buffer.from(ab)
    sharp(buffer)
      .normalise()
      .modulate({
        saturation: 1.1,
        brightness: 1
      })
      .removeAlpha()
      .resize(width, null, {fit: 'inside'})
      .jpeg()
      .toBuffer((err, buffer) => {
        if (err) return reject(err)
        resolve(toBase64(buffer, mimeType))
      })
  })
}

export {getLqip, getLqips}
