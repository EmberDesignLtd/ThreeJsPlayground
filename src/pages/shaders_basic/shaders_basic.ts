import { VanillaCanvas } from './../../classes/vanilla_canvas';
import { createPlane } from './../../functions/three_js_helpers';
enum Element {
  SHADER_CANVAS = 'shader-basic-canvas',
}

export class ShaderBasicsScene {
  private readonly canvasElement = document.getElementById(
    Element.SHADER_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);
  private readonly plane = createPlane(this.canvas.scene);

  constructor() {
    if (!this.canvasElement) return;
    this.tick();
  }

  tick() {
    this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    requestAnimationFrame(this.tick.bind(this));
  }
}
