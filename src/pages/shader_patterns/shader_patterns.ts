import * as THREE from 'three';
import { VanillaCanvas } from './../../classes/vanilla_canvas';
import { MiscAsset } from './../../enums/misc_assets';
import fragment from './glsl/fragment.glsl';
import vertex from './glsl/vertex.glsl';

enum Element {
  SHADER_CANVAS = 'shader-patterns-canvas',
}

enum ShaderAttribute {}

enum ShaderUniform {}

export class ShaderPatternsScene {
  private readonly canvasElement = document.getElementById(
    Element.SHADER_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);
  private readonly textureLoader = new THREE.TextureLoader();
  private readonly shaderTexture = this.textureLoader.load(MiscAsset.MALE);
  private shaderMaterial = new THREE.RawShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {},
  });
  private readonly clock = new THREE.Clock();

  constructor() {
    if (!this.canvasElement) return;
    this.tick();
  }
  private tick(): void {
    const elapsedTime = this.clock.getElapsedTime();
    this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    requestAnimationFrame(this.tick.bind(this));
  }
}
