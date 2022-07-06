import './App.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import circleImg from './assets/circle.png';
import { Suspense, useCallback, useMemo, useRef } from 'react';

function Points()
{
  const imgTex = useLoader(THREE.TextureLoader, circleImg); // to use our image

  let t = 0;
  let f = 0.002;
  let a = 3;
  const graph = useCallback((x, z) => {
    return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
  }, [t, f, a])

  const count = 150 // number of points
  const sep = 3 // separation 
  let positions = useMemo(() => {
    let positions = []

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = graph(x, z);
        positions.push(x, y, z);
      }
    }
    return new Float32Array(positions);
  }, [count, sep, graph])
 
  // to animate
  useFrame(()=> {

  })

  return (
    <points>
     
      <bufferGeometry attach="geometry">
        <bufferAttribute 
          attach='attributes-position'
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>


      <pointsMaterial
        attach="material"
        map={imgTex}
        color={0x00AAFF}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
        />
    </points>
  )
}

// Our canvas
function AnimationCanvas(){
  return(
    <Canvas
     colorManagement={false}
    camera={{ position: [100, 10, 0], fov: 75 }}
    >
     <Suspense
     fallback={null}
     >
      <Points />
     </Suspense>
      
    </Canvas>
  )
}


// Our main APP
function App() {
  return (
    <div className="anim">
     <Suspense
     fallback={<div>Loading...</div>}
     >
      <AnimationCanvas />
     </Suspense>
    </div>
  );
}

export default App;
