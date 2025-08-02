"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";

// عدد الخطوط في الخلفية
const LINE_COUNT = 3;

function Lines() {
  const linesRef = useRef<THREE.Line[]>([]);

  // نولد خطوط مستقيمة عشوائية
  const geometries = useMemo(() => {
    return new Array(LINE_COUNT).fill(null).map(() => {
      const p1 = new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, 0);
      const p2 = new THREE.Vector3(p1.x + (Math.random() - 0.5) * 4, p1.y + (Math.random() - 0.5) * 4, 0);
      const points = [p1, p2];
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, []);

  useFrame(({ mouse }) => {
    linesRef.current.forEach((line) => {
      if (!line) return;

      const posAttr = line.geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < posAttr.count; i++) {
        let x = posAttr.getX(i);
        let y = posAttr.getY(i);

        // احسب المسافة بين نقطة والخلفية (المحور من -1 لـ 1، فنضرب عشان نحوله)
        const dx = x - mouse.x * 10;
        const dy = y - mouse.y * 10;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2) {
          const factor = (2 - dist) * 0.05;
          x += dx * factor;
          y += dy * factor;
          posAttr.setX(i, x);
          posAttr.setY(i, y);
        }
      }

      posAttr.needsUpdate = true;
    });
  });

  return (
    <>
      {geometries.map((geo, i) => (
        <primitive
          key={i}
          object={new THREE.Line(
            geo,
            new THREE.LineBasicMaterial({ color: "#0056D2", linewidth: 1.5 })
          )}
          ref={(el: THREE.Object3D | null) => {
            if (el instanceof THREE.Line) {
              linesRef.current[i] = el;
            }
          }}
        />
      ))}
    </>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <Lines />
      </Canvas>
    </div>
  );
}
