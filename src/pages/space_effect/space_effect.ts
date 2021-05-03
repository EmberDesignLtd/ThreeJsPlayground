import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';
import { Colour } from '../../enums/colour';
import { routeChange$ } from '../../functions/router';
import { mathRandomNegativePositivePosition } from '../../functions/three_js_helpers';
import { VanillaCanvas } from './../../classes/vanilla_canvas';

enum Element {
  CANVAS_SCENE = 'space-scene',
}

/**
 * TODO(Munro): At the moment this class cant be reused that effectively update accordingly if
 * you decide to reuse this class, at the moment its fine as you're just experimenting.
 */
export class SpaceEffect {
  private readonly starMeshes: THREE.Mesh[] = [];
  private zAxisBoundary = 5;
  private canvas: VanillaCanvas;

  constructor() {
    this.canvas = new VanillaCanvas(Element.CANVAS_SCENE, true);
    routeChange$.subscribe(this.init.bind(this));
  }

  private init() {
    this.createStarParticles();
    this.randomlyPlaceStars();
    this.tick();
  }

  // Updates animation frame
  private tick(): void {
    this.animateStars();
    if (this.canvas.renderer) {
      this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    }
    requestAnimationFrame(this.tick.bind(this));
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
      this.canvas.scene.add(starMesh);
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
