import * as THREE from 'three';
import { VanillaCanvas } from '../../classes/vanilla_canvas';
import { Colour } from './../../enums/colour';
import { createPlane, createSphere } from './../../functions/three_js_helpers';

enum Element {
  LIGHTING_CANVAS = 'lighting-canvas',
}

export class LightingExample {
  private readonly canvasElement = document.getElementById(
    Element.LIGHTING_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);
  private readonly cube = createSphere(
    this.canvas.scene,
    new THREE.MeshStandardMaterial({ color: Colour.ORANGE })
  );
  private readonly groundPlane = createPlane(
    this.canvas.scene,
    new THREE.MeshStandardMaterial({ side: THREE.DoubleSide }),
    50,
    50
  );

  constructor() {
    if (!this.canvasElement) return;
    this.canvas.addSceneLighting();
    this.canvas.renderer.shadowMap.enabled = true;
    this.cube.castShadow = true;
    this.groundPlane.receiveShadow = true;
    this.canvas.directionalLight.castShadow = true;
    /**
     * Sets the shadow render quality a bit like adding more vertices to a mesh
     * Try and set the near/far properties on a light source camera to match exactly whats in your
     * scene to improve precision& performance while reducing the chance of artifacting
     */
    this.canvas.directionalLight.shadow.mapSize.width = 1024;
    this.canvas.directionalLight.shadow.mapSize.height = 1024;
    this.setGroundPlanePosition();
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
