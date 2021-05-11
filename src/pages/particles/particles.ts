import * as THREE from 'three';
import { VanillaCanvas } from '../../classes/vanilla_canvas';
import { Colour } from './../../enums/colour';
import { ParticleTexture } from './../../enums/particles_textures';

enum Element {
  PARTICLE_CANVAS = 'particle-canvas',
}

const POSITION_KEY = 'position';

export class ParticlesScene {
  private readonly canvasElement = document.getElementById(
    Element.PARTICLE_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);
  private readonly textureLoader = new THREE.TextureLoader();
  private readonly particleGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
  private readonly pointsMaterial = new THREE.PointsMaterial({
    size: 0.02,
    // Create perspective for the particles so if its near the camera = larger and vice versa
    sizeAttenuation: true,
    map: this.textureLoader.load(ParticleTexture.B),
    color: Colour.ORANGE,
  });
  private readonly points = new THREE.Points(this.particleGeometry, this.pointsMaterial);
  private readonly clock = new THREE.Clock();
  private readonly particlesArray: THREE.BufferGeometry[] = [];
  private readonly particleCount = 1000;

  constructor() {
    if (!this.canvasElement) return;
    this.canvas.scene.add(this.points);
    for (const value in ParticleTexture) {
      const texture = this.textureLoader.load(ParticleTexture[value]);
      this.particlesArray.push(this.createRandomPoints(this.particleCount, texture));
    }
    this.tick();
  }

  private createRandomPoints(particleCount = 500, texture: THREE.Texture): THREE.BufferGeometry {
    const particlesGeometry = new THREE.BufferGeometry();
    /**
     * Float32Array is performant for the GPU (TODO(Munro): Look into why)
     * Multiplied by three cause if we want want 500 particles then we will need 500x3 for the XYZ
     * coordinates
     */
    const positions = new Float32Array(particleCount * 3);
    const colours = new Float32Array(particleCount * 3);
    // Multiplied by 3 for the same reason as above
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
      colours[i] = Math.random();
    }
    /**
     * BufferAttribute I believe behaves something like a stream, and the 3 here is so we send
     * through the data in sets of 3 XYZ for the coordinates for each point.
     */
    particlesGeometry.setAttribute(POSITION_KEY, new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colours, 3));

    const points = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        depthWrite: false,
        transparent: true,
        alphaMap: texture,
        depthTest: false,
        vertexColors: true,
        sizeAttenuation: true,
        size: Math.random() * 1.5,
        // This will increase the brightness of particles as they stack but can also impact performance
        // blending: THREE.AdditiveBlending,
      })
    );
    this.canvas.scene.add(points);
    return particlesGeometry;
  }

  private tick(): void {
    const elapsedTime = this.clock.getElapsedTime();
    for (const particle of this.particlesArray) {
      // TODO(Munro): Bunch of types missing from the particles attributes extend types
      for (let i = 0; i < this.particleCount; i++) {
        const i3 = i * 3;
        /**
         * This will create a wave function by accessing the x but honestly I'm not sure why
         */
        const x = particle.attributes.position.array[i3];
        /**
         * This [i3 + 1] will move the y coord for each particle as I know the coords go XYZ and
         * the i3 indexed the array like 0,3,6,9 ect.... accessing the X property initally.
         */
        // THIS IS BAD PERFORMANCE - Updating hundreds to thousands of particles at once is going
        // to hurt CPU once I've learnt shaders that's the better solution
        particle.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
        particle.attributes.position.needsUpdate = true;
      }
      // particle.rotateY(elapsedTime * 0.2);
    }
    this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    requestAnimationFrame(this.tick.bind(this));
  }
}
