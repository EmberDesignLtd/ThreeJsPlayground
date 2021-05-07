import * as THREE from 'three';
import { DatGuiHelper } from '../../classes/dat_gui_helper';
import { VanillaCanvas } from './../../classes/vanilla_canvas';
import { createPlane, createSphere, createTorus } from './../../functions/three_js_helpers';

enum Element {
  TEXTURE_CANVAS = 'material_and_textures',
}

export class MaterialAndTextureExample {
  private readonly canvasElement = document.getElementById(
    Element.TEXTURE_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);
  private readonly sphere = createSphere(this.canvas.scene);
  private readonly plane = createPlane(this.canvas.scene);
  private readonly torus = createTorus(this.canvas.scene);
  private readonly group = new THREE.Group();
  private readonly datGui = new DatGuiHelper();

  constructor() {
    if (!this.canvasElement) return;
    this.datGui.addAllControls(this.plane);
    this.spaceMeshesOut();
    this.addMeshesToGroup();
    this.canvas.scene.add(this.group);
    this.tick();
  }

  private addMeshesToGroup() {
    this.group.add(this.plane);
    this.group.add(this.torus);
    this.group.add(this.sphere);
    this.group.position.x = -2;
  }

  private spaceMeshesOut() {
    this.plane.position.x = 2;
    this.torus.position.x = 4;
    this.sphere.position.y = 4.5;
    this.plane.position.y = 4.5;
    this.torus.position.y = 4.5;
  }

  private tick(): void {
    if (this.canvas.renderer) {
      this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    }
    requestAnimationFrame(this.tick.bind(this));
  }
}
