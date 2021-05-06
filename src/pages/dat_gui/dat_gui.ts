import { createCube } from '../../functions/three_js_helpers';
import { DatGuiHelper } from './../../classes/dat_gui_helper';
import { VanillaCanvas } from './../../classes/vanilla_canvas';

enum Element {
  DAT_GUI_CANVAS = 'dat-gui-canvas',
}

export class DatGuiExample {
  private readonly canvasElement = document.getElementById(
    Element.DAT_GUI_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);
  private readonly testCube = createCube(this.canvas.scene);
  private debugGui: DatGuiHelper;

  constructor() {
    if (!this.canvasElement) return;
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
