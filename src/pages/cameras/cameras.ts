import { createCube } from '../../functions/three_js_helpers';
import { MouseCoordinates } from './../../classes/mouse_cordinates';
import { VanillaCanvas } from './../../classes/vanilla_canvas';

enum Element {
  CAMERA_CANVAS = 'camera-playground-canvas',
}

export class ThreeCameraPlayground {
  private readonly canvasElement = document.getElementById(
    Element.CAMERA_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);
  private readonly testCube = createCube(this.canvas.scene);
  private readonly mouseCoordinates = new MouseCoordinates();
  private cursorPosition = { x: 0, y: 0 };

  constructor() {
    if (!this.canvasElement) return;
    this.mouseCoordinates.coordinates$.subscribe((cursorPosition) => {
      this.cursorPosition = cursorPosition;
    });
    this.tick();
  }

  private adjustCameraPositionRelativeToMouse(): void {
    this.canvas.perspectiveCamera.position.x = Math.sin(this.cursorPosition.x * Math.PI * 2) * 10;
    this.canvas.perspectiveCamera.position.z = Math.cos(this.cursorPosition.x * Math.PI * 2) * 10;
    this.canvas.perspectiveCamera.position.y = this.cursorPosition.y * 20;
    this.canvas.perspectiveCamera.lookAt(this.testCube.position);
  }

  private tick(): void {
    this.adjustCameraPositionRelativeToMouse();
    if (this.canvas.renderer) {
      this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    }
    requestAnimationFrame(this.tick.bind(this));
  }
}
