import * as THREE from 'three';
import { routeChange$ } from '../../functions/router';

const CANVAS_SCENE = 'space-scene';

const SIZES = {
  w: 800,
  h: 600,
};

export class SpaceEffect {
  // Scene
  private readonly scene = new THREE.Scene();

  // Camera
  private readonly perspectiveCamera = new THREE.PerspectiveCamera(90, SIZES.w / SIZES.h);

  // Renderer
  private renderer: THREE.WebGLRenderer;

  constructor() {
    this.perspectiveCamera.position.set(0, 0, 15);
    routeChange$.subscribe(this.init.bind(this));
  }

  tick() {
    requestAnimationFrame(this.tick.bind(this));
  }

  init() {
    if (!this.scene) return;
    this.scene.add(this.perspectiveCamera);

    const canvas = document.getElementById(CANVAS_SCENE) as HTMLCanvasElement;
    if (!canvas) return;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
    });
    this.renderer.setSize(SIZES.w, SIZES.h);
    this.tick();
  }
}
