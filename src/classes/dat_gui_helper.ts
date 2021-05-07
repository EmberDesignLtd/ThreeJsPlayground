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
    this.roughnessControl(mesh.material);
    this.shininessControl(mesh.material);
    this.specularControl(mesh.material);
    this.metalnessControl(mesh.material);
    this.ambientOcclusionIntensityControl(mesh.material);
    this.displacementStengthControl(mesh.material);
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

  roughnessControl(meshMaterial: THREE.Material | THREE.Material[]): void {
    if (!this.hasKey(meshMaterial, MeshProperty.ROUGHNESS)) return;
    this.gui.add(meshMaterial, MeshProperty.ROUGHNESS, 0, 1, 0.01);
  }

  shininessControl(meshMaterial: THREE.Material | THREE.Material[]): void {
    if (!this.hasKey(meshMaterial, MeshProperty.SHININESS)) return;
    this.gui.add(meshMaterial, MeshProperty.SHININESS, 0, 1, 0.01);
  }

  specularControl(meshMaterial: THREE.Material | THREE.Material[]): void {
    if (!this.hasKey(meshMaterial, MeshProperty.SPECULAR)) return;
    this.gui.add(meshMaterial, MeshProperty.SPECULAR, 0, 1, 0.01);
  }

  metalnessControl(meshMaterial: THREE.Material | THREE.Material[]): void {
    if (!this.hasKey(meshMaterial, MeshProperty.METALNESS)) return;
    this.gui.add(meshMaterial, MeshProperty.METALNESS, 0, 1, 0.01);
  }

  displacementStengthControl(meshMaterial: THREE.Material | THREE.Material[]): void {
    if (!this.hasKey(meshMaterial, MeshProperty.DISPLACEMENT_STRENGTH)) return;
    this.gui.add(meshMaterial, MeshProperty.DISPLACEMENT_STRENGTH, -1, 1, 0.01);
  }

  ambientOcclusionIntensityControl(meshMaterial: THREE.Material | THREE.Material[]): void {
    if (!this.hasKey(meshMaterial, MeshProperty.AMBIENT_OCCLUSION_INTENSITY)) return;
    this.gui.add(meshMaterial, MeshProperty.AMBIENT_OCCLUSION_INTENSITY, 0, 2, 0.01);
  }

  private hasKey(meshMaterial: THREE.Material | THREE.Material[], key: MeshProperty): boolean {
    return key in meshMaterial;
  }
}
