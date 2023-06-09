/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 cube.glb --transform --simplify -ts
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube002_Cube005: THREE.Mesh
    Cube003_Cube006: THREE.Mesh
  }
  materials: {
    Tess: THREE.MeshStandardMaterial
    cube: THREE.MeshStandardMaterial
  }
}

export default function Model(
  props: JSX.IntrinsicElements['group'] & { _dark: boolean },
) {
  const { nodes, materials } = useGLTF(
    '/three/scene/home/cube.glb',
  ) as GLTFResult
  return (
    <group {...props} dispose={null}>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_Cube005.geometry}
        material={materials.Tess}
        scale={0.5}
      /> */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_Cube006.geometry}
        material={materials.cube}
        scale={0.5}
      >
        <meshStandardMaterial
          {...materials.cube}
          emissiveIntensity={2}
          // envMap={material.envMap}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/three/scene/home/cube.glb')