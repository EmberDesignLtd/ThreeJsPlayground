import { VanillaCanvas } from '../../classes/vanilla_canvas';
import { createSphere } from './../../functions/three_js_helpers';
enum Element {
  PARTICLE_CANVAS = 'particle-canvas',
}

export class ParticlesScene {
  private readonly canvasElement = document.getElementById(
    Element.PARTICLE_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);
  private readonly sphere = createSphere(this.canvas.scene);

  constructor() {
    if (!this.canvasElement) return;
    this.tick();
  }

  private tick(): void {
    this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    requestAnimationFrame(this.tick.bind(this));
  }
}
