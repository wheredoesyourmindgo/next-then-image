import sharp from 'sharp';

const getLqip = async url => {
  try {
    const imageRes = await fetch(`${url}`);
    const blob = await imageRes.blob();
    const mimeType = blob.type;
    const arrayBuffer = await blob.arrayBuffer();
    const lqipSrc = await transform(arrayBuffer, mimeType);
    return lqipSrc;
  } catch (e) {
    console.log("Failed to fetch base64 image", url);
    throw e;
  }
};

const getLqips = async urls => {
  const lqips = await sequenceArray(urls, async url => {
    try {
      const b64 = await getLqip(url); // return {
      //   lqip: b64,
      //   src: url,
      // };

      return b64;
    } catch (e) {
      return null;
    }
  });
  return lqips; // const reduced = lqips.reduce((prev, curr) => {
  //   const {src, lqip} = curr;
  //   return {
  //     ...prev,
  //     [src]: lqip,
  //   };
  // });
  // return reduced;
};

async function sequenceArray(array, fn) {
  const results = [];

  for (let i = 0; i < array.length; i++) {
    const r = await fn(array[i]);
    results.push(r);
  }

  return results;
}

function toBase64(buffer, mimeType) {
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}

async function transform(ab, mimeType) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(ab);
    sharp(buffer).normalise().modulate({
      saturation: 1.2,
      brightness: 1
    }).removeAlpha().resize(30, 30, {
      fit: "inside"
    }).jpeg().toBuffer((err, buffer) => {
      if (err) return reject(err);
      resolve(toBase64(buffer, mimeType));
    });
  });
}

export { getLqip, getLqips };
//# sourceMappingURL=index.modern.js.map
