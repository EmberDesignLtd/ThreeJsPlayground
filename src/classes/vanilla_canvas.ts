import * as THREE from 'three';
import { routeChange$ } from '../functions/router';
import { addOrbitControls, resizeCanvasListener, setupCanvas } from '../functions/three_js_helpers';

export class VanillaCanvas {
  private withOrbiter = false;
  readonly scene = new THREE.Scene();
  readonly perspectiveCamera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight
  );
  renderer: THREE.WebGLRenderer;
  canvasElementSelector: string;

  constructor(canvasElementSelector: string, withOrbiter = false) {
    this.canvasElementSelector = canvasElementSelector;
    this.withOrbiter = withOrbiter;
    this.perspectiveCamera.position.set(0, 0, 10);
    routeChange$.subscribe(this.setupCanvasAndOrbiter.bind(this));
  }

  private setupCanvasAndOrbiter(): void {
    if (!this.scene) return;
    this.scene.add(this.perspectiveCamera);

    // Setup canvas and renderer
    const canvasAndRenderer = setupCanvas(this.canvasElementSelector);
    if (!canvasAndRenderer || !canvasAndRenderer.canvas || !canvasAndRenderer.renderer) return;
    const { canvas, renderer } = canvasAndRenderer;
    this.renderer = renderer;

    if (this.withOrbiter) {
      addOrbitControls(canvas, this.perspectiveCamera);
    }

    resizeCanvasListener(this.renderer, this.perspectiveCamera);
  }
}
