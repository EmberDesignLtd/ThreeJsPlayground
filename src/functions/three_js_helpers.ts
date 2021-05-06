import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Colour } from './../enums/colour';
import { Event } from './../enums/events';

export const mathRandomNegativePositivePosition = (range: number): number => {
  return Math.random() * range * (Math.round(Math.random()) ? 1 : -1);
};

export const addOrbitControls = (canvas: HTMLCanvasElement, camera: THREE.Camera): void => {
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();
};

export const setupCanvas = (
  canvasElement: HTMLCanvasElement
): { canvasElement: HTMLCanvasElement; renderer: THREE.WebGLRenderer } | undefined => {
  if (!canvasElement) return;
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
  });
  return { canvasElement, renderer };
};

export const resizeCanvasListener = (
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera
): void => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  // TODO(Munro): Add throttle function for performance improvement
  window.addEventListener(Event.RESIZE, () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
};

export const createCube = (
  scene: THREE.Scene,
  material = new THREE.MeshBasicMaterial({ color: Colour.RED })
): THREE.Mesh => {
  const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  const mesh = new THREE.Mesh(boxGeometry, material);
  mesh.rotation.x = 0.2;
  mesh.rotation.y = 0.5;
  scene.add(mesh);
  return mesh;
};
