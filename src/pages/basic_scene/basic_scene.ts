import * as THREE from 'three';

export class BasicScene {
  readonly scene = new THREE.Scene();

  constructor() {
    console.log(this.scene);
  }
}
