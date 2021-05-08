import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { THREEMaterial } from '../types/three_material';
import { Colour } from './../enums/colour';
import { Event } from './../enums/events';

export const mathRandomNegativePositivePosition = (range: number): number => {
  return Math.random() * range * (Math.round(Math.random()) ? 1 : -1);
};

export const addOrbitControls = (
  canvas: HTMLCanvasElement,
  camera: THREE.Camera
): OrbitControls => {
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.autoRotate = true;
  controls.update();
  return controls;
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
  material: THREEMaterial = new THREE.MeshBasicMaterial({ color: Colour.RED }),
  dimensions = 2,
  segments = 10
): THREE.Mesh => {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(dimensions, dimensions, dimensions, segments, segments, segments),
    material
  );
  mesh.position.y = 4;
  scene.add(mesh);
  return mesh;
};

export const createSphere = (
  scene: THREE.Scene,
  material: THREEMaterial = new THREE.MeshBasicMaterial({
    color: Colour.RED,
  })
): THREE.Mesh => {
  const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
  sphereMesh.position.y = 4;
  scene.add(sphereMesh);
  return sphereMesh;
};

export const createPlane = (
  scene: THREE.Scene,
  material: THREEMaterial = new THREE.MeshBasicMaterial({ color: Colour.RED })
): THREE.Mesh => {
  const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  planeMesh.position.y = 4;
  scene.add(planeMesh);
  return planeMesh;
};

export const createTorus = (
  scene: THREE.Scene,
  material: THREEMaterial = new THREE.MeshBasicMaterial({ color: Colour.RED })
): THREE.Mesh => {
  const torusMesh = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material);
  torusMesh.position.y = 4;
  scene.add(torusMesh);
  return torusMesh;
};
