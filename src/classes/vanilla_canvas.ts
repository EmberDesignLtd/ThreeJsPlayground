import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { routeChange$ } from '../functions/router';
import { addOrbitControls, resizeCanvasListener, setupCanvas } from '../functions/three_js_helpers';

export class VanillaCanvas {
  private withOrbiter = false;
  readonly scene = new THREE.Scene();
  readonly perspectiveCamera: THREE.PerspectiveCamera;
  orbitControls: OrbitControls;
  renderer: THREE.WebGLRenderer;
  canvasElementSelector: HTMLCanvasElement;
  directionalLight: THREE.DirectionalLight;
  ambientLight: THREE.AmbientLight;

  constructor(
    canvasElementSelector: HTMLCanvasElement,
    withOrbiter = false,
    cameraProperties = {
      fov: 75,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 100,
    }
  ) {
    this.canvasElementSelector = canvasElementSelector;
    this.withOrbiter = withOrbiter;
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      cameraProperties.fov,
      cameraProperties.aspect
    );
    this.perspectiveCamera.position.x = 8;
    this.perspectiveCamera.position.y = 5;
    this.perspectiveCamera.position.z = 8;

    routeChange$.subscribe(this.setupCanvasAndOrbiter.bind(this));
  }

  private setupCanvasAndOrbiter(): void {
    if (!this.scene) return;

    // Setup canvas and renderer
    const canvasAndRenderer = setupCanvas(this.canvasElementSelector);
    if (!canvasAndRenderer || !canvasAndRenderer.canvasElement || !canvasAndRenderer.renderer)
      return;
    const { canvasElement, renderer } = canvasAndRenderer;
    this.renderer = renderer;

    // TODO(Munro): If no orbit controls the perspective camera isn't centered fix this.
    if (this.withOrbiter) {
      this.orbitControls = addOrbitControls(canvasElement, this.perspectiveCamera);
    } else {
      this.scene.add(this.perspectiveCamera);
    }

    resizeCanvasListener(this.renderer, this.perspectiveCamera);
  }

  addSceneLighting(): void {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(10, 10, 10);
    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
  }
}
