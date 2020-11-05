import {GetStaticProps} from 'next'
import React, {useCallback} from 'react'
import {ThenImage} from '../lib/client'
import {getLqips} from '../lib/server'

type Props = {
  lqips: {[key: string]: string}
}

const width = 1600
const height = 1200

const images = [
  'https://i.picsum.photos/id/331/1600/1200.jpg?hmac=nZh0-xyTrR-KYnKf4yuIcfjYVHlF0vFBGkW9fFUagno',
  'https://i.picsum.photos/id/505/1600/1200.jpg?hmac=iIbF5yQxVkVqiTnprPHozBoaHQIMSGsebGnQrT9uDXE',
  'https://i.picsum.photos/id/668/1600/1200.jpg?hmac=fFrRS5cua2r-Blmcg7Se9EfYSHemg2joOSJP7nddxt4',
  'https://i.picsum.photos/id/696/1600/1200.jpg?hmac=yu3W0mITnTl73_CK_rSfabd7b_ZSSKoqUsoGuTHRrY4',
  'https://i.picsum.photos/id/206/1600/1200.jpg?hmac=N4Mxs2nnDxNKjnCV_Duad2LurgwoMWlbQcs73Cc8_hk',
  'https://i.picsum.photos/id/556/1600/1200.jpg?hmac=aPtmObCHPD6PzvYeUW9TuNopV-c-CtzGQGz1ccelKAo',
  'https://i.picsum.photos/id/110/1600/1200.jpg?hmac=H52onTYJcETlHNE3XnLvUkOGa7kX0GCQc9wMex1Sn84',
  'https://i.picsum.photos/id/363/1600/1200.jpg?hmac=PFCHX-iutRQ4k9AeeedbLqb6oHd15O1AdIMapTR7Bik',
  'https://i.picsum.photos/id/158/1600/1200.jpg?hmac=gL3Cs78gHHWRKWMn91JTaE2zhAN6KEN4aTaO46-oeaM',
  'https://i.picsum.photos/id/999/1600/1200.jpg?hmac=ErM4wrTuHanWzkaZITxw20u6O_xjkzt5pFfG04i62Wo',
  'https://i.picsum.photos/id/1005/1600/1200.jpg?hmac=iGSniZx3hrqezsogCVSO7pclCEeuG4z7W8gKebwSKF8',
  'https://i.picsum.photos/id/317/1600/1200.jpg?hmac=BdYUsfU9GLjNJ5cnwytnz0npF0MxcCt1cvSgPKRu7v8',
  'https://i.picsum.photos/id/873/1600/1200.jpg?hmac=GfNIlC2M9nZL1lL0eOUx6kRv8zeA-Mh2FkA4LtGKC9E',
  'https://i.picsum.photos/id/16/1600/1200.jpg?hmac=le6ieN_7ibWWJ42ZobqD9QFhOjNsNdaZEGtG53OU5u8',
  'https://i.picsum.photos/id/596/1600/1200.jpg?hmac=YCAvpBwQ2889DKtyiyf0Un-ESM7jG9Grl5yugaLgxN8'
]

const [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15
] = images

const IndexPage = ({lqips}: Props) => {
  const Spacing = useCallback(
    () => <div style={{marginTop: 64, marginBottom: 64}} />,
    []
  )
  return (
    <main className="App">
      <div>
        <ThenImage
          src={img1}
          width={width}
          height={height}
          placeholder={lqips.img1}
        />
        <Spacing />
        <ThenImage
          src={img2}
          width={width}
          height={height}
          placeholder={lqips.img2}
        />
        <Spacing />
        <ThenImage
          src={img3}
          width={width}
          height={height}
          placeholder={lqips.img3}
        />
        <Spacing />
        <ThenImage
          src={img4}
          width={width}
          height={height}
          placeholder={lqips.img4}
        />
        <Spacing />
        <ThenImage
          src={img5}
          width={width}
          height={height}
          placeholder={lqips.img5}
        />
        <Spacing />
        <ThenImage
          src={img6}
          width={width}
          height={height}
          placeholder={lqips.img6}
        />
        <Spacing />
        <ThenImage
          src={img7}
          width={width}
          height={height}
          placeholder={lqips.img7}
        />
        <Spacing />
        <ThenImage
          src={img8}
          width={width}
          height={height}
          placeholder={lqips.img8}
        />
        <Spacing />
        <ThenImage
          src={img9}
          width={width}
          height={height}
          placeholder={lqips.img9}
        />
        <Spacing />
        <ThenImage
          src={img10}
          width={width}
          height={height}
          placeholder={lqips.img10}
        />
        <Spacing />
        <ThenImage
          src={img11}
          width={width}
          height={height}
          placeholder={lqips.img11}
        />
        <Spacing />
        <h2>No Transition</h2>
        <Spacing />
        <ThenImage
          src={img12}
          width={width}
          height={height}
          transition={false}
          placeholder={lqips.img12}
        />
        <Spacing />
        <ThenImage
          src={img13}
          width={width}
          height={height}
          transition={false}
          placeholder={lqips.img13}
        />
        <Spacing />
        <ThenImage
          src={img14}
          width={width}
          height={height}
          transition={false}
          placeholder={lqips.img14}
        />
        <Spacing />
        <ThenImage
          src={img15}
          width={width}
          height={height}
          transition={false}
          placeholder={lqips.img15}
        />
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15
    ] = await getLqips(images)
    return {
      props: {
        lqips: {
          img1,
          img2,
          img3,
          img4,
          img5,
          img6,
          img7,
          img8,
          img9,
          img10,
          img11,
          img12,
          img13,
          img14,
          img15
        }
      },
      revalidate: 5
    }
  } catch (e) {
    return {props: {lqips: {}}}
  }
}

export default IndexPage
