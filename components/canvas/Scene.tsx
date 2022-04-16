import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import { Box, OrbitControls, Sky, Cylinder } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

const Test: React.VFC<any> = (props) => {
  const group = useRef();
  // @ts-ignore
  const { nodes, materials } = useGLTF("./3d/test.glb");
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={(e) => {
        console.log(e.object);
      }}
    >
      <mesh
        geometry={nodes.Cilinder.geometry}
        material={nodes.Cilinder.material}
      />
      <mesh
        geometry={nodes.Cude.geometry}
        material={nodes.Cude.material}
        position={[0.97, 0.32, 1.05]}
      />
    </group>
  );
};

export const Scene: React.VFC<any> = () => {
  const [renderTarget] = useState(
    new THREE.WebGLCubeRenderTarget(1024, {
      format: THREE.RGBAFormat,
      generateMipmaps: true,
    }),
  );
  const cubeCamera = useRef();

  useFrame(({ gl, scene }) => {
    // @ts-ignore
    cubeCamera?.current && cubeCamera.current.update(gl, scene);
  });
  return (
    <>
      <Sky
        // @ts-ignore
        layers={[11]}
        sunPosition={[Math.PI, 0, Math.PI / 2]}
        turbidity={8}
        rayleigh={1}
        mieCoefficient={0.0005}
        mieDirectionalG={0.8}
      />
      <cubeCamera
        // @ts-ignore
        layers={[11]}
        name="cubeCamera"
        ref={cubeCamera}
        position={[0, 0, 0]}
        args={[0.1, 100, renderTarget]}
      />

      {/* <Cylinder args={[5, 5, 15, 35, 1]}>
        <meshPhysicalMaterial
          color="#ff0000"
          envMap={renderTarget.texture}
          metalness={1}
          roughness={0}
        />
      </Cylinder> */}
      <Suspense fallback={null}>
        <Test />
      </Suspense>

      <OrbitControls />
      <ambientLight />
    </>
  );
};
