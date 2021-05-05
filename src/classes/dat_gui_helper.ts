import * as datGui from 'dat.gui';
import * as THREE from 'THREE';
import { Axis } from './../enums/axis';

export class DatGuiHelper {
  gui: datGui.GUI;

  constructor() {
    this.gui = new datGui.GUI();
  }

  addXYZMeshControl(mesh: THREE.Mesh, label?: string): void {
    this.gui.add(mesh.position, Axis.X, -10, 10, 0.01).name(label ? label : Axis.X);
    this.gui.add(mesh.position, Axis.Y, -10, 10, 0.01).name(label ? label : Axis.Y);
    this.gui.add(mesh.position, Axis.Z, -50, 50, 0.01).name(label ? label : Axis.Z);
  }
}
