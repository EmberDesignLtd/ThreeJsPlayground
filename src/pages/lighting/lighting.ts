import * as THREE from 'three';
import { VanillaCanvas } from '../../classes/vanilla_canvas';
import { createCube, createPlane } from './../../functions/three_js_helpers';

enum Element {
  LIGHTING_CANVAS = 'lighting-canvas',
}

export class LightingExample {
  private readonly canvasElement = document.getElementById(
    Element.LIGHTING_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);
  private readonly cube = createCube(this.canvas.scene, new THREE.MeshNormalMaterial());
  private readonly groundPlane = createPlane(
    this.canvas.scene,
    new THREE.MeshStandardMaterial({ side: THREE.DoubleSide }),
    50,
    50
  );

  constructor() {
    if (!this.canvasElement) return;
    this.setGroundPlanePosition();
    this.canvas.addSceneLighting();
    this.tick();
  }

  private setGroundPlanePosition(): void {
    this.groundPlane.rotation.x = -Math.PI * 0.5;
    this.groundPlane.position.y = -2;
  }

  private tick(): void {
    this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    requestAnimationFrame(this.tick.bind(this));
  }
}
