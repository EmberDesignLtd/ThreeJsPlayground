import * as THREE from 'three';
import { createPlane } from '../../functions/three_js_helpers';
import { DatGuiHelper } from './../../classes/dat_gui_helper';
import { VanillaCanvas } from './../../classes/vanilla_canvas';
import { MiscAsset } from './../../enums/misc_assets';
import fragment from './glsl/fragment.glsl';
import vertex from './glsl/vertex.glsl';

enum Element {
  SHADER_CANVAS = 'shader-basic-canvas',
}

enum ShaderAttribute {
  RANDOM_COORDS = 'randomCoords',
}

enum ShaderUniform {
  TIME = 'uTime',
}

export class ShaderBasicsScene {
  private readonly canvasElement = document.getElementById(
    Element.SHADER_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);
  private readonly textureLoader = new THREE.TextureLoader();
  private readonly shaderTexture = this.textureLoader.load(MiscAsset.MALE);
  private shaderMaterial = new THREE.RawShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
      uWaveFrequency: { value: new THREE.Vector2(25, 1) },
      uTime: { value: 0 },
      uTexture: { value: this.shaderTexture },
    },
  });
  private readonly plane = createPlane(this.canvas.scene, this.shaderMaterial, 0.4, 0.6);
  private readonly clock = new THREE.Clock();

  constructor() {
    if (!this.canvasElement) return;
    const gui = new DatGuiHelper();
    gui.addAllControls(this.plane);
    this.addCustomAttributeToVertexShader();
    this.tick();

    // TODO(Munro): Start refactoring the gui tools to accomodate shader uniform values
    gui.gui
      .add(this.shaderMaterial.uniforms.uWaveFrequency.value, 'x')
      .min(0)
      .max(50)
      .step(0.01)
      .name('frequencyX');
  }

  private addCustomAttributeToVertexShader(): void {
    const verticesCount = this.plane.geometry.attributes.position.count;
    let randomCoords = new Float32Array(verticesCount);
    for (let i = 0; i < verticesCount; i++) {
      randomCoords[i] = Math.random();
    }
    this.plane.geometry.setAttribute(
      ShaderAttribute.RANDOM_COORDS,
      new THREE.BufferAttribute(randomCoords, 1)
    );
  }

  private tick(): void {
    const elapsedTime = this.clock.getElapsedTime();
    this.shaderMaterial.uniforms[ShaderUniform.TIME].value = elapsedTime;
    this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    requestAnimationFrame(this.tick.bind(this));
  }
}
