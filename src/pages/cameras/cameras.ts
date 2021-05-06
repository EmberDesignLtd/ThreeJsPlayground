import * as THREE from 'three';
import { createCube } from '../../functions/three_js_helpers';
import { MouseCoordinates } from './../../classes/mouse_cordinates';
import { VanillaCanvas } from './../../classes/vanilla_canvas';

enum Element {
  CAMERA_CANVAS = 'camera-playground-canvas',
}

export class ThreeCameraPlayground {
  canvas: VanillaCanvas;
  testCube: THREE.Mesh;
  mouseCoordinates = new MouseCoordinates();
  cursorPosition = { x: 0, y: 0 };
  canvasElement = document.getElementById(Element.CAMERA_CANVAS) as HTMLCanvasElement;

  constructor() {
    this.mouseCoordinates.coordinates$.subscribe((cursorPosition) => {
      this.cursorPosition = cursorPosition;
    });
    this.canvas = new VanillaCanvas(this.canvasElement, true);
    if (!this.canvasElement) return;
    this.testCube = createCube(this.canvas.scene);
    this.tick();
  }

  private tick(): void {
    this.canvas.perspectiveCamera.position.x = Math.sin(this.cursorPosition.x * Math.PI * 2) * 10;
    this.canvas.perspectiveCamera.position.z = Math.cos(this.cursorPosition.x * Math.PI * 2) * 10;
    this.canvas.perspectiveCamera.position.y = this.cursorPosition.y * 20;
    this.canvas.perspectiveCamera.lookAt(this.testCube.position);
    if (this.canvas.renderer) {
      this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    }
    requestAnimationFrame(this.tick.bind(this));
  }
}
