import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';
import { Colour } from '../../enums/colour';
import { Axis } from './../../enums/axis';
import { routeChange$ } from './../../functions/router';

const SIZES = {
  w: 800,
  h: 600,
};

const CANVAS_SCENE = 'basic-scene-canvas';

export class BasicScene {
  // Scenes
  private readonly scene = new THREE.Scene();

  // Geometries
  private readonly cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  private readonly coneGeometry = new THREE.ConeGeometry(1, 1, 5);

  // Materials
  private readonly flatRedMaterial = new THREE.MeshBasicMaterial({ color: Colour.RED });
  private readonly flatBlueMaterial = new THREE.MeshBasicMaterial({ color: Colour.BLUE });
  private readonly flatOrangeMaterial = new THREE.MeshBasicMaterial({ color: Colour.ORANGE });
  private readonly flatGreenMaterial = new THREE.MeshBasicMaterial({ color: Colour.GREEN });
  private readonly flatPinkMaterial = new THREE.MeshBasicMaterial({ color: Colour.PINK });
  private readonly flatPurpleMaterial = new THREE.MeshBasicMaterial({ color: Colour.PURPLE });

  // Cameras
  private readonly perspectiveCamera = new THREE.PerspectiveCamera(90, SIZES.w / SIZES.h);

  private readonly meshCollection: THREE.Mesh[] = [];
  private renderer: THREE.WebGLRenderer;

  constructor() {
    this.perspectiveCamera.position.set(0, 0, 15);
    routeChange$.subscribe(this.init.bind(this));
  }

  private init(): void {
    if (!this.scene) return;
    this.scene.add(this.perspectiveCamera);
    this.buildCubesAndCones(50);
    this.randomlyPlaceMesh();

    const canvas = document.getElementById(CANVAS_SCENE) as HTMLCanvasElement;

    if (!canvas) return;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
    });
    this.renderer.setSize(SIZES.w, SIZES.h);
    this.tick();
  }

  private buildCubesAndCones(number = 20): void {
    for (let i = 0; i < number; i++) {
      const colourNumber = Math.floor(Math.random() * Object.keys(Colour).length) + 1;
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
        case 5:
          material = this.flatPinkMaterial;
          break;
        case 6:
          material = this.flatPurpleMaterial;
          break;
      }
      const cubeMesh = new THREE.Mesh(this.cubeGeometry, material);
      const coneMesh = new THREE.Mesh(this.coneGeometry, material);
      this.meshCollection.push(cubeMesh);
      this.meshCollection.push(coneMesh);
      this.scene.add(cubeMesh);
      this.scene.add(coneMesh);
    }
  }

  private tick(): void {
    this.spinAndTranslateMesh();
    this.renderer.render(this.scene, this.perspectiveCamera);
    requestAnimationFrame(this.tick.bind(this));
  }

  private mathRandomNegativePositivePosition(range: number): number {
    return Math.floor(
      Math.floor(Math.random() * 2) === 0 ? Math.random() * range : Math.random() * -range
    );
  }

  private randomlyPlaceMesh() {
    for (const cube of this.meshCollection) {
      cube.position.set(
        this.mathRandomNegativePositivePosition(25),
        this.mathRandomNegativePositivePosition(25),
        this.mathRandomNegativePositivePosition(2)
      );
    }
  }

  private meshBoundaries(mesh: THREE.Mesh, coordinates: number, axisY = false): void {
    const xOrY = axisY ? Axis.Y : Axis.X;
    if (mesh.position[xOrY] >= coordinates) {
      mesh.position[xOrY] += -coordinates * 2;
    }

    if (mesh.position[xOrY] <= -coordinates) {
      mesh.position[xOrY] += coordinates * 2;
    }
  }

  private rotateMesh(mesh, rotationFactor = 0.05): void {
    mesh.rotateX(Math.random() * rotationFactor);
    mesh.rotateY(Math.random() * rotationFactor);
    mesh.rotateZ(Math.random() * rotationFactor);
  }

  private spinAndTranslateMesh(): void {
    let counter = 0;
    for (const mesh of this.meshCollection) {
      counter++;
      this.meshBoundaries(mesh, 25);
      mesh.position.x += counter % 2 === 0 ? Math.random() * 0.1 : -(Math.random() * 0.2);
      this.meshBoundaries(mesh, 18, true);
      mesh.position.y += counter % 2 === 0 ? Math.random() * 0.1 : -(Math.random() * 0.2);
      this.rotateMesh(mesh);
    }
  }
}
