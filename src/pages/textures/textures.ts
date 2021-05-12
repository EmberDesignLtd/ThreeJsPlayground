import * as THREE from 'three';
import { createCube } from '../../functions/three_js_helpers';
import { VanillaCanvas } from './../../classes/vanilla_canvas';

enum Element {
  TEXTURE_CANVAS = 'texture-canvas',
}

enum ImagePath {
  DOOR_TEXTURES_SRC = '../../assets/textures/door/color.jpg',
  MISC_TEXTURES_SRC = '../../assets/textures/misc/minecraft.png',
}

export class TexturesExample {
  private readonly canvasElement = document.getElementById(
    Element.TEXTURE_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);

  // Textures/Materials
  private readonly textureLoader = new THREE.TextureLoader();
  private readonly doorTexture = this.textureLoader.load(ImagePath.DOOR_TEXTURES_SRC);
  private readonly minecraftDiamondTexture = this.textureLoader.load(ImagePath.MISC_TEXTURES_SRC);

  // Meshes
  private readonly doorCube = createCube(
    this.canvas.scene,
    new THREE.MeshBasicMaterial({ map: this.doorTexture })
  );
  private readonly minecraftDiamondCube = createCube(
    this.canvas.scene,
    new THREE.MeshBasicMaterial({ map: this.minecraftDiamondTexture })
  );

  constructor() {
    if (!this.canvasElement) return;
    this.canvas.perspectiveCamera.position.z = 6;
    this.setMinecraftTextureMagFilter();
    this.minecraftDiamondCube.position.x += 4;
    this.tick();
  }

  /**
   * When a textures mipmap is not large enough for the mesh it will blur the boundaries between
   * colors, setting nearestFilter helps resolve this issue.
   */
  private setMinecraftTextureMagFilter(): void {
    this.minecraftDiamondTexture.magFilter = THREE.NearestFilter;
  }

  private rotateCubes() {
    this.minecraftDiamondCube.rotation.x += 0.01;
    this.doorCube.rotation.y += 0.02;
  }

  private tick(): void {
    this.rotateCubes();
    if (this.canvas.renderer) {
      this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    }
    requestAnimationFrame(this.tick.bind(this));
  }
}
