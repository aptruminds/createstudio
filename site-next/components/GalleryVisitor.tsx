'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';

const MODEL = '/models/RobotExpressive.glb';

// A little visitor that walks the gallery. The wall pans behind it while it
// walks in place, and its head tilts up toward the artwork — more so when the
// user pauses, as if stopping to look at each piece.
function Visitor() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL);
  const { actions } = useAnimations(animations, group);
  const head = useRef<THREE.Object3D | null>(null);
  const walking = useRef(false);
  const current = useRef('');

  const fade = (name: string) => {
    if (current.current === name || !actions[name]) return;
    actions[name]!.reset().fadeIn(0.25).play();
    if (current.current) actions[current.current]?.fadeOut(0.25);
    current.current = name;
  };

  useEffect(() => {
    scene.traverse((o) => {
      if (!head.current && o.name?.toLowerCase().includes('head')) head.current = o;
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        // Recolour to a light matte figure so it reads against the dark gallery.
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#d9d9d6', roughness: 0.7, metalness: 0.05,
        });
      }
    });
    fade('Idle');

    const scroller = document.querySelector('.snap-container') as HTMLElement | null;
    if (!scroller) return;
    let last = scroller.scrollTop;
    let stopTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      if (Math.abs(scroller.scrollTop - last) > 1) {
        walking.current = true;
        clearTimeout(stopTimer);
        stopTimer = setTimeout(() => { walking.current = false; }, 150);
      }
      last = scroller.scrollTop;
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => { scroller.removeEventListener('scroll', onScroll); clearTimeout(stopTimer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, actions]);

  useFrame(() => {
    fade(walking.current ? 'Walking' : 'Idle');
    if (head.current) {
      const target = walking.current ? 0.18 : 0.42; // look up; more when paused
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, target, 0.06);
    }
  });

  // rotation.y = PI/2 → right-facing profile, so the walk reads as a side view.
  // The model origin is at its feet; drop it to the bottom of the camera
  // frustum so the feet sit on the canvas base (which CSS pins to the floor).
  return <primitive ref={group} object={scene} rotation={[0, Math.PI / 2, 0]} position={[0, -3.4, 0]} scale={1} />;
}

export default function GalleryVisitor() {
  return (
    <div className="sg-visitor" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 28 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[4, 7, 5]} intensity={1.1} />
        <Suspense fallback={null}><Visitor /></Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL);
