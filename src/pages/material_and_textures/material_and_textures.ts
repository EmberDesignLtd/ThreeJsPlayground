import * as THREE from 'three';
import { DatGuiHelper } from './../../classes/dat_gui_helper';
import { VanillaCanvas } from './../../classes/vanilla_canvas';
import { createCube, createSphere, createTorus } from './../../functions/three_js_helpers';

enum Element {
  TEXTURE_CANVAS = 'material_and_textures',
}

enum ImagePath {
  MAT_1 = '../../assets/materialCaps/1.png',
  MAT_2 = '../../assets/materialCaps/2.png',
  MAT_3 = '../../assets/materialCaps/3.png',
  MAT_4 = '../../assets/materialCaps/4.png',
  MAT_5 = '../../assets/materialCaps/5.png',
  MAT_6 = '../../assets/materialCaps/6.png',
  DOOR_TEXTURES_SRC = '../../assets/textures/door/color.jpg',
  MISC_TEXTURES_SRC = '../../assets/textures/misc/minecraft.png',
}

// TODO(Munro): Clean up/refactor this class was just playing around heavily with this one.
export class MaterialAndTextureExample {
  // Canvas & Scene
  private readonly canvasElement = document.getElementById(
    Element.TEXTURE_CANVAS
  ) as HTMLCanvasElement;
  private readonly canvas = new VanillaCanvas(this.canvasElement, true);

  // Debug UI
  private readonly datGUI: DatGuiHelper;

  // Texture loader
  private readonly textureLoader = new THREE.TextureLoader();

  // Materials
  private readonly doorTexture = this.textureLoader.load(ImagePath.DOOR_TEXTURES_SRC);
  private readonly minecraftDiamondTexture = this.textureLoader.load(ImagePath.MISC_TEXTURES_SRC);

  // Textures
  // TODO(Munro): When we have a better understanding of material (i.e which class constructors to use ect)
  // look at abstracting this into a class/dictionary
  private readonly bronzeTexture = new THREE.MeshBasicMaterial({
    map: this.textureLoader.load(ImagePath.MAT_1),
  });
  private readonly silverTexture = new THREE.MeshBasicMaterial({
    map: this.textureLoader.load(ImagePath.MAT_2),
  });
  private readonly mirrorTexture = new THREE.MeshBasicMaterial({
    map: this.textureLoader.load(ImagePath.MAT_3),
  });
  /**
   * Note the use of matcap: not map:
   * This material will render the pixels provided by the image relative to the camera angle and
   * normals/vertice direction.
   * Essentially simulate light without having light in the scene
   */
  private readonly mirrorMatCapTexture = new THREE.MeshMatcapMaterial({
    matcap: this.textureLoader.load(ImagePath.MAT_3),
  });
  private readonly normalMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
  private readonly normalMaterialFlatShading = new THREE.MeshNormalMaterial({ flatShading: true });
  /**
   * Basic material that will react to lights, performant with some artifacts
   * If no lights then it's rendered black
   */
  private readonly meshLambertMaterial = new THREE.MeshLambertMaterial();
  /**
   * Same as above except it's cartoonised
   */
  private readonly meshToonMaterial = new THREE.MeshToonMaterial();
  /**
   * Less performant light material but more realistic and no artifacting.
   * props: { shininess: number; specular: THREE.color (Reflection colour sort of)}
   */
  private readonly meshPhongMaterial = new THREE.MeshPhongMaterial();
  /**
   * Probably the best material better algo for lighting and more attributes to tweak
   */
  private readonly doorMaterial = new THREE.MeshStandardMaterial({
    map: this.doorTexture,
  });
  private readonly minecraftCubeMaterial = new THREE.MeshStandardMaterial({
    map: this.minecraftDiamondTexture,
  });

  // Meshes & Groups
  private readonly sphere = createSphere(this.canvas.scene, this.normalMaterialFlatShading);
  private readonly cube = createCube(this.canvas.scene, this.doorMaterial, 0.8);
  private readonly torus = createTorus(this.canvas.scene, this.doorMaterial);

  private readonly sphere_2 = createSphere(this.canvas.scene, this.mirrorMatCapTexture);
  private readonly cube_2 = createCube(this.canvas.scene, this.minecraftCubeMaterial, 0.8);
  private readonly torus_2 = createTorus(this.canvas.scene, this.normalMaterial);

  private readonly sphere_3 = createSphere(this.canvas.scene, this.meshLambertMaterial);
  private readonly sphere_4 = createSphere(this.canvas.scene, this.meshToonMaterial);
  private readonly torus_3 = createTorus(this.canvas.scene, this.meshPhongMaterial);
  private readonly group = new THREE.Group();
  private readonly group_2 = new THREE.Group();
  private readonly group_3 = new THREE.Group();

  // Lights
  private readonly ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  private readonly pointLight = new THREE.PointLight(0xffffff, 0.5);

  constructor() {
    if (!this.canvasElement) return;
    this.canvas.perspectiveCamera.position.z = 6;
    this.spaceMeshesOut();
    this.addMeshesToGroup();
    this.setPointLightPosition();
    this.minecraftDiamondTexture.magFilter = THREE.NearestFilter;
    this.datGUI = new DatGuiHelper();
    this.datGUI.addAllControls(this.cube);
    this.datGUI.addAllControls(this.cube_2);
    this.canvas.scene.add(this.group);
    this.canvas.scene.add(this.group_2);
    this.canvas.scene.add(this.group_3);
    this.canvas.scene.add(this.pointLight);
    this.canvas.scene.add(this.ambientLight);
    this.tick();
  }

  private setPointLightPosition(): void {
    this.pointLight.position.x = 2;
    this.pointLight.position.y = 3;
    this.pointLight.position.z = 4;
  }

  private addMeshesToGroup(): void {
    this.group.add(this.cube);
    this.group.add(this.torus);
    this.group.add(this.sphere);

    this.group_2.add(this.cube_2);
    this.group_2.add(this.torus_2);
    this.group_2.add(this.sphere_2);

    this.group_3.add(this.sphere_4);
    this.group_3.add(this.torus_3);
    this.group_3.add(this.sphere_3);
    this.group.position.x = -2;
    this.group.position.y = -2.5;
    this.group_2.position.x = -2;
    this.group_2.position.y = -4;
    this.group_3.position.x = -2;
    this.group_3.position.y = -5.5;
  }

  private spaceMeshesOut(): void {
    this.cube.position.x = 2;
    this.torus.position.x = 4;
    this.sphere.position.y = 4.5;
    this.cube.position.y = 4.5;
    this.torus.position.y = 4.5;

    this.cube_2.position.x = 2;
    this.torus_2.position.x = 4;
    this.sphere_2.position.y = 4.5;
    this.cube_2.position.y = 4.5;
    this.torus_2.position.y = 4.5;

    this.sphere_4.position.x = 2;
    this.torus_3.position.x = 4;
    this.sphere_3.position.y = 4.5;
    this.sphere_4.position.y = 4.5;
    this.torus_3.position.y = 4.5;
  }

  private tick(): void {
    if (this.canvas.renderer) {
      this.canvas.renderer.render(this.canvas.scene, this.canvas.perspectiveCamera);
    }
    requestAnimationFrame(this.tick.bind(this));
  }
}
