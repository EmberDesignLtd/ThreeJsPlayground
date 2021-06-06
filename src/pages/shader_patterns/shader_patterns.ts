import SimplexNoise from 'simplex-noise';
import * as THREE from 'three';
import { Colour } from '../../enums/colour';
import { VanillaCanvas } from './../../classes/vanilla_canvas';
import { MiscAsset } from './../../enums/misc_assets';
import { COMPUTE_CURL } from './../../functions/computeCurl';
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
  private readonly flatRedMaterial = new THREE.MeshBasicMaterial({ color: Colour.RED });
  private readonly shaderTexture = this.textureLoader.load(MiscAsset.MALE);
  private shaderMaterial = new THREE.RawShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
  });
  private readonly clock = new THREE.Clock();

  private simplex = new SimplexNoise();

  private curve = new THREE.CatmullRomCurve3(this.getCurve(new THREE.Vector3(0, 0, 0)));
  private curveGeometry = new THREE.TubeBufferGeometry(this.curve, 200, 0.01, 8, false);
  private curveMesh = new THREE.Mesh(this.curveGeometry, this.flatRedMaterial);

  constructor() {
    // this.canvas.scene.add(this.curveMesh);
    this.generateTubes(200);
    if (!this.canvasElement) return;
    this.tick();
    console.log(this.computeCurl(0, 2, 3));
  }
  private tick(): void {
    const elapsedTime = this.clock.getElapsedTime();
    this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    requestAnimationFrame(this.tick.bind(this));
  }

  generateTubes(tubeCount = 50) {
    for (let index = 0; index < tubeCount; index++) {
      const curve = new THREE.CatmullRomCurve3(
        this.getCurve(
          new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        )
      );
      const curveGeometry = new THREE.TubeBufferGeometry(curve, 200, 0.01, 8, false);
      const curveMesh = new THREE.Mesh(curveGeometry, this.shaderMaterial);
      this.canvas.scene.add(curveMesh);
    }
  }

  computeCurl(x, y, z) {
    return COMPUTE_CURL(x, y, z, this.simplex, new THREE.Vector3());
  }

  getCurve(startingVector: THREE.Vector3) {
    let points = [];
    // Lower = higher randomness
    let randomnesStrength = 5;
    points.push(startingVector);
    let currentPoint = startingVector.clone();
    for (let index = 0; index < 400; index++) {
      let velocity = this.computeCurl(
        currentPoint.x / randomnesStrength,
        currentPoint.y / randomnesStrength,
        currentPoint.z / randomnesStrength
      );
      // TODO(Munro): Look up what adding scaled vector does in terms of how it plots the tube.
      currentPoint.addScaledVector(velocity, 0.001);
      points.push(currentPoint.clone());
      // points.push(new THREE.Vector3(index / 10, 0, 0));
      // points.push(new THREE.Vector3(Math.sin((50 * index) / 10), index / 10, 0));
    }
    return points;
  }
}
