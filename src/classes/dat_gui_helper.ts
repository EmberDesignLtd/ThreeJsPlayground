import * as datGui from 'dat.gui';
import * as THREE from 'three';
import { Axis } from './../enums/axis';
import { MeshProperty } from './../enums/mesh_properties';

export class DatGuiHelper {
  gui: datGui.GUI;

  constructor() {
    this.gui = new datGui.GUI();
  }

  addAllControls(mesh: THREE.Mesh, meshMaterial: THREE.Material) {
    this.addXYZMeshControl(mesh);
    this.meshVisible(mesh);
    this.wireframeToggle(meshMaterial);
  }

  addXYZMeshControl(mesh: THREE.Mesh, label?: string): void {
    this.gui.add(mesh.position, Axis.X, -10, 10, 0.01).name(label ? label : Axis.X);
    this.gui.add(mesh.position, Axis.Y, -10, 10, 0.01).name(label ? label : Axis.Y);
    this.gui.add(mesh.position, Axis.Z, -50, 50, 0.01).name(label ? label : Axis.Z);
  }

  meshVisible(mesh: THREE.Mesh) {
    this.gui.add(mesh, MeshProperty.VISIBLE);
  }

  wireframeToggle(meshMaterial: THREE.Material) {
    this.gui.add(meshMaterial, MeshProperty.WIREFRAME);
  }
}
