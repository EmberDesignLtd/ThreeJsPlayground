import * as datGui from 'dat.gui';
import * as THREE from 'three';
import { Axis } from './../enums/axis';
import { MeshProperty } from './../enums/mesh_properties';

const MATERIAL_COLOUR_KEY = 'color';

export class DatGuiHelper {
  gui: datGui.GUI;
  materialColour = {
    color: 0xff0000,
  };

  constructor() {
    this.gui = new datGui.GUI();
  }

  addAllControls(mesh: THREE.Mesh): void {
    this.addXYZMeshControl(mesh);
    this.meshVisible(mesh);
    this.wireframeToggle(mesh.material);
    this.colourControl(mesh.material);
  }

  addXYZMeshControl(mesh: THREE.Mesh, label?: string): void {
    this.gui.add(mesh.position, Axis.X, -10, 10, 0.01).name(label ? label : Axis.X);
    this.gui.add(mesh.position, Axis.Y, -10, 10, 0.01).name(label ? label : Axis.Y);
    this.gui.add(mesh.position, Axis.Z, -50, 50, 0.01).name(label ? label : Axis.Z);
  }

  meshVisible(mesh: THREE.Mesh): void {
    this.gui.add(mesh, MeshProperty.VISIBLE);
  }

  // TODO(Munro): Add logic to handle material array
  wireframeToggle(meshMaterial: THREE.Material | THREE.Material[]): void {
    this.gui.add(meshMaterial, MeshProperty.WIREFRAME);
  }

  // TODO(Munro): Add logic to handle material array
  colourControl(meshMaterial: THREE.Material | THREE.Material[]): void {
    const materialColour = { ...this.materialColour };
    this.gui.addColor(materialColour, MATERIAL_COLOUR_KEY).onChange(() => {
      // TODO(Munro): Extend @THREE.types to include material.color
      // @ts-ignore
      meshMaterial.color.set(materialColour.color);
    });
  }
}
