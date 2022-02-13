import * as THREE from "three";

// init

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 500;

const scene = new THREE.Scene();

/**
 * cube
 */

// const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
// const material = new THREE.MeshNormalMaterial();

// const mesh = new THREE.Mesh(geometry, material);

/**
 * heart
 */
const heartShape = new THREE.Shape();

heartShape.moveTo(25, 25);
heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

const extrudeSettings = {
  depth: 8,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 1,
  bevelThickness: 1,
};

const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation

export function animation(time: number) {
  //   mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
