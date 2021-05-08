import * as THREE from 'three';
import { EnvironmentMap2 } from '../../enums/environment_map';
import { VanillaCanvas } from './../../classes/vanilla_canvas';
import { createSphere } from './../../functions/three_js_helpers';

enum Element {
  TEXTURE_CANVAS = 'jamie-g-canvas',
}

const SPHERE_SPEED = 0.008;
const SPHERE_TIMEOUT_DELAY = 2400;

/**
 * Used to create this masterpiece - https://www.youtube.com/watch?v=WFNLue8socA&t=31s
 */
export class JameiG {
  private readonly canvasElement = document.getElementById(
    Element.TEXTURE_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);
  private readonly cubeTextureLoader = new THREE.CubeTextureLoader();
  private readonly environmentTextureMapOne = this.cubeTextureLoader.load([
    EnvironmentMap2.PX,
    EnvironmentMap2.NX,
    EnvironmentMap2.PY,
    EnvironmentMap2.NY,
    EnvironmentMap2.PZ,
    EnvironmentMap2.NZ,
  ]);
  private readonly jimJamGroup = new THREE.Group();
  private readonly spheresHorizontalPlane: THREE.Mesh[] = [];
  private readonly spheresVerticalPlane: THREE.Mesh[] = [];
  private readonly spheresDiagonalPlaneOne: THREE.Mesh[] = [];
  private readonly spheresDiagonalPlaneTwo: THREE.Mesh[] = [];

  constructor() {
    if (!this.canvasElement) return;
    this.createInitialSpheres();
    this.canvas.addSceneLighting();
    this.canvas.scene.add(this.jimJamGroup);
    this.addHorizontalPlanedSpheres();
    this.addVerticalPlanedSpheres();
    this.addDiagonalPlanedSpheresOne();
    this.addDiagonalPlanedSpheresTwo();
    this.tick();
  }

  private createInitialSpheres(): void {
    this.createMoreSpheres(0.5, 5.5);
    this.createMoreSpheres(0.5, 4);
    this.createMoreSpheres(-1, 4);
    this.createMoreSpheres(-1, 5.5);
  }

  private createMoreSpheres(x: number, y: number): THREE.Mesh {
    const newSphere = createSphere(
      this.canvas.scene,
      new THREE.MeshPhysicalMaterial({
        metalness: 1,
        roughness: 0,
        envMap: this.environmentTextureMapOne,
      })
    );
    newSphere.position.x = x;
    newSphere.position.y = y;
    this.jimJamGroup.add(newSphere);
    return newSphere;
  }

  private addHorizontalPlanedSpheres(timeout = SPHERE_TIMEOUT_DELAY): void {
    setTimeout(() => {
      this.spheresHorizontalPlane.push(this.createMoreSpheres(0.5, 4));
      this.spheresHorizontalPlane.push(this.createMoreSpheres(-1, 5.5));
      this.spheresHorizontalPlane.push(this.createMoreSpheres(0.5, 5.5));
      this.spheresHorizontalPlane.push(this.createMoreSpheres(-1, 4));
      this.addHorizontalPlanedSpheres(timeout);
    }, timeout);
  }

  private addVerticalPlanedSpheres(timeout = SPHERE_TIMEOUT_DELAY): void {
    setTimeout(() => {
      this.spheresVerticalPlane.push(this.createMoreSpheres(0.5, 5.5));
      this.spheresVerticalPlane.push(this.createMoreSpheres(-1, 4));
      this.spheresVerticalPlane.push(this.createMoreSpheres(-1, 5.5));
      this.spheresVerticalPlane.push(this.createMoreSpheres(0.5, 4));
      this.addVerticalPlanedSpheres(timeout);
    }, timeout);
  }

  private addDiagonalPlanedSpheresOne(timeout = SPHERE_TIMEOUT_DELAY): void {
    setTimeout(() => {
      this.spheresDiagonalPlaneOne.push(this.createMoreSpheres(-1, 4));
      this.spheresDiagonalPlaneOne.push(this.createMoreSpheres(0.5, 5.5));
      this.addDiagonalPlanedSpheresOne(timeout);
    }, timeout);
  }

  private addDiagonalPlanedSpheresTwo(timeout = SPHERE_TIMEOUT_DELAY): void {
    setTimeout(() => {
      this.spheresDiagonalPlaneTwo.push(this.createMoreSpheres(0.5, 4));
      this.spheresDiagonalPlaneTwo.push(this.createMoreSpheres(-1, 5.5));
      this.addDiagonalPlanedSpheresTwo(timeout);
    }, timeout);
  }

  private moveSpheresAlongRespectivePlanes(): void {
    if (this.spheresHorizontalPlane.length > 0) {
      let count = 0;
      for (const sphere of this.spheresHorizontalPlane) {
        count++;
        if (count % 2 !== 0) {
          sphere.position.x += SPHERE_SPEED;
        } else {
          sphere.position.x -= SPHERE_SPEED;
        }
      }
    }

    if (this.spheresVerticalPlane.length > 0) {
      let count = 0;
      for (const sphere of this.spheresVerticalPlane) {
        count++;
        if (count % 2 !== 0) {
          sphere.position.y += SPHERE_SPEED;
        } else {
          sphere.position.y -= SPHERE_SPEED;
        }
      }
    }

    if (this.spheresDiagonalPlaneOne.length > 0) {
      let count = 0;
      for (const sphere of this.spheresDiagonalPlaneOne) {
        count++;
        if (count % 2 !== 0) {
          sphere.position.y -= SPHERE_SPEED;
          sphere.position.x -= SPHERE_SPEED;
        } else {
          sphere.position.y += SPHERE_SPEED;
          sphere.position.x += SPHERE_SPEED;
        }
      }
    }

    if (this.spheresDiagonalPlaneTwo.length > 0) {
      let count = 0;
      for (const sphere of this.spheresDiagonalPlaneTwo) {
        count++;
        if (count % 2 !== 0) {
          sphere.position.y -= SPHERE_SPEED;
          sphere.position.x += SPHERE_SPEED;
        } else {
          sphere.position.y += SPHERE_SPEED;
          sphere.position.x -= SPHERE_SPEED;
        }
      }
    }
  }

  private tick(): void {
    this.canvas.orbitControls.update();
    this.canvas.orbitControls.update();
    this.jimJamGroup.rotation.y += 0.01;
    this.moveSpheresAlongRespectivePlanes();

    if (this.canvas.renderer) {
      this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    }
    requestAnimationFrame(this.tick.bind(this));
  }
}
