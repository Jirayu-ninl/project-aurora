import { TextPlane } from './TextPlane'
import { UI } from '@global/store'

import headerFrontVertShader from '../shaders/headerFront.v.glsl'
import headerFrontFragShader from '../shaders/headerFront.f.glsl'
import headerBackVertShader from '../shaders/headerBack.v.glsl'
import headerBackFragShader from '../shaders/headerBack.f.glsl'

export const Title = ({ _dark }: { _dark: boolean }) => {
  const _setCursor = UI((state) => state.setCursor)

  return (
    <mesh
      onPointerOver={() => {
        _setCursor('lens')
      }}
      onPointerOut={() => {
        _setCursor(false)
      }}
      onPointerMissed={() => {
        _setCursor(false)
      }}
      position={[0, 0, -1]}
    >
      <TextPlane
        text={'TheIceJi'}
        vertexShader={headerFrontVertShader}
        fragmentShader={headerFrontFragShader}
        _dark={_dark}
      />
      <TextPlane
        text={'我叫  林艺'}
        vertexShader={headerBackVertShader}
        fragmentShader={headerBackFragShader}
        _dark={_dark}
      />
    </mesh>
  )
}
