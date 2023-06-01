// model by eon/sketchfab https://sketchfab.com/3d-models/elven-ranger-statue-71aec2d9f7724ae09992435ce8ff7258

import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useMemo } from 'react'
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber'
import { useGLTF, Stage } from '@react-three/drei'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { AdditiveBlendingShader, VolumetricLightShader } from './shaders'

extend({ EffectComposer, RenderPass, ShaderPass })

const DEFAULT_LAYER = 0
const OCCLUSION_LAYER = 1

// Component auto-generated by GLTFJSX: https://github.com/react-spring/gltfjsx
function Elf({ layer = DEFAULT_LAYER }) {
  const group = useRef()
  const { nodes } = useGLTF('/mock/models/wraith.glb')
  const material = useMemo(() => {
    if (layer === DEFAULT_LAYER)
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2a2a2a'),
        roughness: 1,
        metalness: 0.9,
      })
    else return new THREE.MeshBasicMaterial({ color: new THREE.Color('black') })
  }, [layer])

  useFrame(() => (group.current.rotation.y += 0.004))

  return (
    <group ref={group}>
      <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <mesh
          geometry={nodes.jumpkit_1.geometry}
          material={material}
          layers={layer}
          receiveShadow
          castShadow
        />
        <mesh
          geometry={nodes.eye_base_1.geometry}
          material={material}
          layers={layer}
          receiveShadow
          castShadow
        />
        <mesh
          geometry={nodes.head_1.geometry}
          material={material}
          layers={layer}
          receiveShadow
          castShadow
        />
        <mesh
          geometry={nodes.body_1.geometry}
          material={material}
          layers={layer}
          receiveShadow
          castShadow
        />
        <mesh
          geometry={nodes.gauntlet_1.geometry}
          material={material}
          layers={layer}
          receiveShadow
          castShadow
        />
        <mesh
          geometry={nodes.helm_1.geometry}
          material={material}
          layers={layer}
          receiveShadow
          castShadow
        />
      </group>
    </group>
  )
}

function Effects() {
  const { gl, scene, camera, size } = useThree()
  const occlusionRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
  const occlusionComposer = useRef()
  const composer = useRef()

  useEffect(() => {
    occlusionComposer.current.setSize(size.width, size.height)
    composer.current.setSize(size.width, size.height)
  }, [size])

  useFrame(() => {
    camera.layers.set(OCCLUSION_LAYER)
    occlusionComposer.current.render()
    camera.layers.set(DEFAULT_LAYER)
    composer.current.render()
  }, 1)

  return (
    <>
      <mesh layers={OCCLUSION_LAYER} position={[1, 13, -10]}>
        <sphereBufferGeometry args={[3, 32, 32]} />
        <meshBasicMaterial />
      </mesh>
      <effectComposer
        ref={occlusionComposer}
        args={[gl, occlusionRenderTarget]}
        renderToScreen={false}
      >
        <renderPass attachArray='passes' args={[scene, camera]} />
        <shaderPass
          attachArray='passes'
          args={[VolumetricLightShader]}
          needsSwap={false}
        />
      </effectComposer>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray='passes' args={[scene, camera]} />
        <shaderPass
          attachArray='passes'
          args={[AdditiveBlendingShader]}
          uniforms-tAdd-value={occlusionRenderTarget.texture}
        />
        <shaderPass
          attachArray='passes'
          args={[FXAAShader]}
          uniforms-resolution-value={[1 / size.width, 1 / size.height]}
          renderToScreen
        />
      </effectComposer>
    </>
  )
}

export default function App() {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 12], fov: 35 }}
      gl={{ antialias: false }}
    >
      <color attach='background' args={['#050505']} />
      <Suspense fallback={null}>
        <Stage intensity={1.5}>
          <Elf />
          <Elf layer={OCCLUSION_LAYER} />
        </Stage>
        <Effects />
      </Suspense>
    </Canvas>
  )
}