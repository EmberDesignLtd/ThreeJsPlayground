import * as THREE from 'three';
import { createTestCube } from '../../functions/three_js_helpers';
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
  canvasElement = document.getElementById(Element.TEXTURE_CANVAS) as HTMLCanvasElement;

  constructor() {
    this.mouseCoordinates.coordinates$.subscribe((cursorPosition) => {
      this.cursorPosition = cursorPosition;
    });
    this.canvas = new VanillaCanvas(this.canvasElement, true);
    if (!this.canvasElement) return;
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
