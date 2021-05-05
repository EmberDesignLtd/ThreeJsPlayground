import * as THREE from 'three';
import { createTestCube } from '../../functions/three_js_helpers';
import { DatGuiHelper } from './../../classes/dat_gui_helper';
import { MouseCoordinates } from './../../classes/mouse_cordinates';
import { VanillaCanvas } from './../../classes/vanilla_canvas';

enum Element {
  TEXTURE_CANVAS = 'texture-canvas',
}

export class TexturesExample {
  canvas: VanillaCanvas;
  testCube: THREE.Mesh;
  mouseCoordinates = new MouseCoordinates();
  cursorPosition = { x: 0, y: 0 };
  debugGui = new DatGuiHelper();

  constructor() {
    this.mouseCoordinates.coordinates$.subscribe((cursorPosition) => {
      this.cursorPosition = cursorPosition;
    });
    this.canvas = new VanillaCanvas(Element.TEXTURE_CANVAS, true);
    this.testCube = createTestCube(this.canvas.scene);
    this.tick();
  }

  // Updates animation frame
  private tick(): void {
    this.canvas.perspectiveCamera.lookAt(this.testCube.position);
    if (this.canvas.renderer) {
      this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    }
    requestAnimationFrame(this.tick.bind(this));
  }
}
