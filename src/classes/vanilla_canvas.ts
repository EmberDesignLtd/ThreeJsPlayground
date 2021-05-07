import * as THREE from 'three';
import { routeChange$ } from '../functions/router';
import { addOrbitControls, resizeCanvasListener, setupCanvas } from '../functions/three_js_helpers';

export class VanillaCanvas {
  private withOrbiter = false;
  readonly scene = new THREE.Scene();
  readonly perspectiveCamera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  canvasElementSelector: HTMLCanvasElement;

  constructor(
    canvasElementSelector: HTMLCanvasElement,
    withOrbiter = false,
    cameraProperties = {
      fov: 45,
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
    this.perspectiveCamera.position.set(0, 5, 10);
    routeChange$.subscribe(this.setupCanvasAndOrbiter.bind(this));
  }

  private setupCanvasAndOrbiter(): void {
    if (!this.scene) return;
    // this.scene.add(this.perspectiveCamera);

    // Setup canvas and renderer
    const canvasAndRenderer = setupCanvas(this.canvasElementSelector);
    if (!canvasAndRenderer || !canvasAndRenderer.canvasElement || !canvasAndRenderer.renderer)
      return;
    const { canvasElement, renderer } = canvasAndRenderer;
    this.renderer = renderer;

    if (this.withOrbiter) {
      addOrbitControls(canvasElement, this.perspectiveCamera);
    }

    resizeCanvasListener(this.renderer, this.perspectiveCamera);
  }

  addSceneLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    this.scene.add(ambientLight);
    this.scene.add(pointLight);
  }
}
