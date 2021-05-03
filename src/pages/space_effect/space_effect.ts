import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';
import { Colour } from '../../enums/colour';
import { routeChange$ } from '../../functions/router';
import { mathRandomNegativePositivePosition, setupCanvas } from '../../functions/three_js_helpers';
import { addOrbitControls, resizeCanvasListener } from './../../functions/three_js_helpers';

enum Element {
  CANVAS_SCENE = 'space-scene',
}

const SIZES = {
  w: window.innerWidth,
  h: window.innerHeight,
};

/**
 * TODO(Munro): At the moment this class cant be reused that effectively update accordingly if
 * you decide to reuse this class, at the moment its fine as you're just experimenting.
 */
export class SpaceEffect {
  // Scene
  private readonly scene = new THREE.Scene();

  // Camera
  private readonly perspectiveCamera = new THREE.PerspectiveCamera(30, SIZES.w / SIZES.h);

  // Renderer
  private renderer: THREE.WebGLRenderer;

  private readonly starMeshes: THREE.Mesh[] = [];
  private zAxisBoundary = 5;

  constructor() {
    this.perspectiveCamera.position.set(0, 0, 10);
    routeChange$.subscribe(this.init.bind(this));
  }

  // Updates animation frame
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
    this.setupCanvasAndOrbiter();
    resizeCanvasListener(this.renderer, this.perspectiveCamera);
    this.tick();
  }

  private setupCanvasAndOrbiter(): void {
    const { canvas, renderer } = setupCanvas(Element.CANVAS_SCENE);
    if (!canvas || !renderer) return;
    this.renderer = renderer;
    addOrbitControls(canvas, this.perspectiveCamera);
  }

  private createStarMaterial(): MeshBasicMaterial {
    // Higher value means more white stars
    const colourDilution = 100;
    const colourNumber = Math.floor(Math.random() * colourDilution);
    switch (colourNumber) {
      case 1:
        return new THREE.MeshBasicMaterial({ color: Colour.BLUE });
      case 2:
        return new THREE.MeshBasicMaterial({ color: Colour.ORANGE });
      case 3:
        return new THREE.MeshBasicMaterial({ color: Colour.ORANGE });
      case 4:
        return new THREE.MeshBasicMaterial({ color: Colour.PURE_WHITE });
      case 5:
        return new THREE.MeshBasicMaterial({ color: Colour.RED });
      case 6:
        return new THREE.MeshBasicMaterial({ color: Colour.SOFT_WHITE });
      default:
        return new THREE.MeshBasicMaterial({ color: Colour.SOFTER_WHITE });
    }
  }

  private createStarParticles(starDensity = 100): void {
    for (let i = 0; i < starDensity; i++) {
      const starSize = Math.random() * 0.2;
      const starGeometry = new THREE.OctahedronGeometry(starSize);
      const starMesh = new THREE.Mesh(starGeometry, this.createStarMaterial());
      this.starMeshes.push(starMesh);
      this.scene.add(starMesh);
    }
  }

  private randomlyPlaceStars(): void {
    for (const starMesh of this.starMeshes) {
      starMesh.position.set(
        mathRandomNegativePositivePosition(5),
        mathRandomNegativePositivePosition(5),
        mathRandomNegativePositivePosition(this.zAxisBoundary)
      );
    }
  }

  private animateStars(): void {
    for (const starMesh of this.starMeshes) {
      // Particle speed
      starMesh.position.z += 0.01;
      if (starMesh.position.z > this.zAxisBoundary) {
        starMesh.position.z = 0;
        starMesh.position.set(
          mathRandomNegativePositivePosition(5),
          mathRandomNegativePositivePosition(5),
          0
        );
      }
    }
  }
}
