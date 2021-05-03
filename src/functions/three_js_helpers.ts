import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
  canvasElementSelector: string
): { canvas: HTMLCanvasElement; renderer: THREE.WebGLRenderer } | undefined => {
  const canvas = document.getElementById(canvasElementSelector) as HTMLCanvasElement;
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  return { canvas, renderer };
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
