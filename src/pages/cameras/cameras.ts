import { VanillaCanvas } from './../../classes/vanilla_canvas';

enum Element {
  CAMERA_CANVAS = 'camera-playground-canvas',
}

export class ThreeCameraPlayground {
  canvas: VanillaCanvas;
  constructor() {
    this.canvas = new VanillaCanvas(Element.CAMERA_CANVAS);
  }
}
