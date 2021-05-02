import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';
import { routeChange$ } from './../../functions/router';

const SIZES = {
  w: 800,
  h: 600,
};

enum Colour {
  RED = 'red',
  BLUE = 'blue',
  ORANGE = 'orange',
  GREEN = 'green',
}

const CANVAS_SCENE = 'basic-scene-canvas';

export class BasicScene {
  // Scenes
  private readonly scene = new THREE.Scene();

  // Geometries
  private readonly cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

  // Materials
  private readonly flatRedMaterial = new THREE.MeshBasicMaterial({ color: Colour.RED });
  private readonly flatBlueMaterial = new THREE.MeshBasicMaterial({ color: Colour.BLUE });
  private readonly flatOrangeMaterial = new THREE.MeshBasicMaterial({ color: Colour.ORANGE });
  private readonly flatGreenMaterial = new THREE.MeshBasicMaterial({ color: Colour.GREEN });

  // Cameras
  private readonly perspectiveCamera = new THREE.PerspectiveCamera(100, SIZES.w / SIZES.h);

  private readonly cubes: THREE.Mesh[] = [];
  private readonly cubeGroup = new THREE.Group();
  private renderer: THREE.WebGLRenderer;

  constructor() {
    this.perspectiveCamera.position.set(0, 0, 15);
    routeChange$.subscribe(this.init.bind(this));
  }

  private init(): void {
    if (!this.scene) return;
    this.scene.add(this.cubeGroup);
    this.scene.add(this.perspectiveCamera);
    this.buildAndAddCubes();

    const canvas = document.getElementById(CANVAS_SCENE) as HTMLCanvasElement;

    if (!canvas) return;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
    });
    this.renderer.setSize(SIZES.w, SIZES.h);
    this.tick();
    this.spinTheCubes();
  }

  private buildAndAddCubes(): void {
    for (let i = 0; i < 20; i++) {
      const colourNumber = Math.floor(Math.random() * 5);
      let material: MeshBasicMaterial;

      switch (colourNumber) {
        case 1:
          material = this.flatBlueMaterial;
          break;
        case 2:
          material = this.flatRedMaterial;
          break;
        case 3:
          material = this.flatGreenMaterial;
          break;
        case 4:
          material = this.flatOrangeMaterial;
          break;
      }
      const cubeMesh = new THREE.Mesh(this.cubeGeometry, material);
      this.cubes.push(cubeMesh);
      this.scene.add(cubeMesh);
    }
  }

  private tick(): void {
    this.spinTheCubes();
    this.renderer.render(this.scene, this.perspectiveCamera);
    window.requestAnimationFrame(this.tick.bind(this));
  }

  private mathRandomNegativePositivePosition(range: number): number {
    return Math.floor(
      Math.floor(Math.random() * 2) === 0 ? Math.random() * range : Math.random() * -range
    );
  }

  private spinTheCubes(): void {
    for (const cube of this.cubes) {
      cube.position.set(
        this.mathRandomNegativePositivePosition(15),
        this.mathRandomNegativePositivePosition(15),
        this.mathRandomNegativePositivePosition(2)
      );
      cube.rotation.set(
        this.mathRandomNegativePositivePosition(360),
        this.mathRandomNegativePositivePosition(360),
        this.mathRandomNegativePositivePosition(360)
      );
      this.perspectiveCamera.lookAt(this.cubes[Math.floor(Math.random() * 21)].position);
    }
  }
}
