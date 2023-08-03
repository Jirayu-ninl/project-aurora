import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

import { BtnlineEdge } from '@resources/common/components/button'

function IntroSection({
  _dark,
  isMobile,
}: {
  _dark: boolean
  isMobile: boolean
}) {
  const rTextTitle = useRef<any>(null)
  const scroll = useScroll()

  useFrame(() => {
    rTextTitle.current &&
      (rTextTitle.current.style.transform = `translate3d(${
        10 - (1 - scroll.range(0.03185, 0.10179)) * 100
      }px,0, 0)`)
  })

  return (
    <>
      <div className='absolute top-[140vh] flex flex-col px-6 md:left-[40vw] md:px-0'>
        <h1
          className='mb-10 pl-24 text-2xl font-bold uppercase md:pl-0 md:text-6xl'
          ref={rTextTitle}
        >
          <span className='text-5xl text-primary-0 md:text-8xl'>H</span>I, I AM
        </h1>
        <p className='text-lg font-light leading-relaxed opacity-90 md:text-3xl'>
          {isMobile ? (
            <>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A Creative Developer with a
              passion for pushing the boundaries of web technology. My expertise
              lies in WebGL, GLSL, and 3D dev, and I thrive on creating
              immersive and visually stunning experiences. With a strong
              background in front-end development and NextJS, I excel at
              crafting engaging web animations that captivate users.
            </>
          ) : (
            <>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A Creative Developer with a
              passion for pushing the boundaries
              <br />
              of web technology. My expertise lies in WebGL, GLSL, and 3D dev,
              <br />
              and I thrive on creating immersive and visually stunning
              experiences.
              <br />
              With a strong background in front-end development and NextJS,
              <br /> I excel at crafting engaging web animations that captivate
              users.
            </>
          )}
        </p>
        <BtnlineEdge
          href='/about'
          text='LEARN MORE'
          classParent='ml-auto mt-10'
          _dark={_dark}
        />
      </div>
    </>
  )
}

export default IntroSection
