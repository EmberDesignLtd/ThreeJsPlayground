import { VanillaCanvas } from './../../classes/vanilla_canvas';

enum Element {
  TEXTURE_CANVAS = 'material_and_textures',
}

export class MaterialAndTextureExample {
  private readonly canvasElement = document.getElementById(
    Element.TEXTURE_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);

  constructor() {
    if (!this.canvasElement) return;
    this.tick();
  }

  private tick(): void {
    if (this.canvas.renderer) {
      this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    }
    requestAnimationFrame(this.tick.bind(this));
  }
}
