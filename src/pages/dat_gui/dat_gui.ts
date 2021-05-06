import * as THREE from 'three';
import { createCube } from '../../functions/three_js_helpers';
import { DatGuiHelper } from './../../classes/dat_gui_helper';
import { MouseCoordinates } from './../../classes/mouse_cordinates';
import { VanillaCanvas } from './../../classes/vanilla_canvas';

enum Element {
  DAT_GUI_CANVAS = 'dat-gui-canvas',
}

export class DatGuiExample {
  canvas: VanillaCanvas;
  testCube: THREE.Mesh;
  mouseCoordinates = new MouseCoordinates();
  cursorPosition = { x: 0, y: 0 };
  debugGui: DatGuiHelper;
  canvasElement = document.getElementById(Element.DAT_GUI_CANVAS) as HTMLCanvasElement;

  constructor() {
    this.mouseCoordinates.coordinates$.subscribe((cursorPosition) => {
      this.cursorPosition = cursorPosition;
    });
    this.canvas = new VanillaCanvas(this.canvasElement, true);
    if (!this.canvasElement) return;
    this.testCube = createCube(this.canvas.scene);
    this.debugGui = new DatGuiHelper();
    this.debugGui.addAllControls(this.testCube);
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
