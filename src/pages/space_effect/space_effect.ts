import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';
import { Colour } from '../../enums/colour';
import { routeChange$ } from '../../functions/router';

const CANVAS_SCENE = 'space-scene';

const SIZES = {
  w: 800,
  h: 600,
};

export class SpaceEffect {
  // Scene
  private readonly scene = new THREE.Scene();

  // Camera
  private readonly perspectiveCamera = new THREE.PerspectiveCamera(30, SIZES.w / SIZES.h);

  // Renderer
  private renderer: THREE.WebGLRenderer;

  private readonly starMeshes: THREE.Mesh[] = [];

  constructor() {
    this.perspectiveCamera.position.set(0, 0, 10);
    routeChange$.subscribe(this.init.bind(this));
  }

  private tick(): void {
    this.animateStars();
    this.renderer.render(this.scene, this.perspectiveCamera);
    requestAnimationFrame(this.tick.bind(this));
  }

  private init(): void {
    if (!this.scene) return;
    this.createStarParticles();
    this.randomlyPlaceStars();
    this.scene.add(this.perspectiveCamera);

    const canvas = document.getElementById(CANVAS_SCENE) as HTMLCanvasElement;
    if (!canvas) return;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
    });

    this.renderer.setSize(SIZES.w, SIZES.h);
    this.tick();
  }

  private createStarMaterial(): MeshBasicMaterial {
    const colourNumber = Math.floor(Math.random() * 20);
    switch (colourNumber) {
      case 1:
        return new THREE.MeshBasicMaterial({ color: Colour.PURE_WHITE });
      case 2:
        return new THREE.MeshBasicMaterial({ color: Colour.SOFTER_WHITE });
      case 3:
        return new THREE.MeshBasicMaterial({ color: Colour.ORANGE });
      default:
        return new THREE.MeshBasicMaterial({ color: Colour.SOFTER_WHITE });
    }
  }

  private createStarParticles(starDensity = 2000): void {
    for (let i = 0; i < starDensity; i++) {
      const starSize = Math.random() * 0.01;
      const starGeometry = new THREE.OctahedronGeometry(starSize);

      const starMesh = new THREE.Mesh(starGeometry, this.createStarMaterial());
      this.starMeshes.push(starMesh);
      this.scene.add(starMesh);
    }
  }

  private mathRandomNegativePositivePosition(range: number): number {
    return Math.random() * range * (Math.round(Math.random()) ? 1 : -1);
  }

  private randomlyPlaceStars(): void {
    for (const starMesh of this.starMeshes) {
      starMesh.position.set(
        this.mathRandomNegativePositivePosition(3),
        this.mathRandomNegativePositivePosition(3),
        this.mathRandomNegativePositivePosition(15)
      );
    }
  }

  private animateStars(): void {
    for (const starMesh of this.starMeshes) {
      starMesh.position.z += 0.04;
      if (starMesh.position.z > 9) {
        starMesh.position.z = 0;
        starMesh.position.set(
          this.mathRandomNegativePositivePosition(3),
          this.mathRandomNegativePositivePosition(3),
          0
        );
      }
    }
  }
}
