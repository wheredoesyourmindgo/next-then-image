import React, {useCallback, useState} from 'react'
import Image from 'next/image'

const fallback =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAACigAwAEAAAAAQAAABkAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIABkAKAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/3QAEAAP/2gAMAwEAAhEDEQA/APUPDGlIkSfL2rtba1VVHFYXh4Dyk+ldPF0FAB5Ix0qrc2qsp4q/UUvSgDgfE+lI8T/L2rkf7GX+7+lei+IAvlP9K5jC0Af/0PVvDOpK8SfN2rsra4DKOa8v8Jf6tK9AsvuigDY80YqvcXAVTzTe1Ub37poA53xNqSpE/wA3auT/ALWX+9V7xZ/q3rjqAP/Z'

type Props = {
  b64?: string | null
  transition?: boolean
  blurDuration?: number
} & React.ComponentProps<typeof Image>

const ThenImage = ({
  b64: b64LqipProp,
  transition = true,
  blurDuration = 800,
  ...rest
}: Props): JSX.Element => {
  const [loaded, setLoaded] = useState(false)
  const b64 = b64LqipProp ?? fallback

  const onLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        height: 'inherit',
        width: '100%',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      <Image layout="responsive" onLoad={onLoad} {...rest} />
      <img
        aria-hidden="true"
        alt=""
        src={b64}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          /* Adjust the content to fit */
          objectFit: 'cover',
          objectPosition: 'center',
          /* Blur the image and scale to avoid transparent corners */
          filter: 'blur(2rem)',
          transform: 'scale(1.2)',
          transition: transition
            ? `opacity ${blurDuration}ms, filter 1200ms`
            : 'none',
          opacity: !loaded ? 1 : 0
        }}
      />
    </div>
  )
}

export default ThenImage
