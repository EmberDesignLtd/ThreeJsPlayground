/**
* Transforms the coordinates into clip space (Not entirely sure what clip space is
* but from what I can gather it's essentially the box that we place objects in)
*/
uniform mat4 projectionMatrix;
// Applies transformations relative to the camera FOV, rotaion ect
uniform mat4 viewMatrix;
// Used for transforming the mesh (Position, rotation, scale ect)
uniform mat4 modelMatrix;
uniform vec2 uWaveFrequency;
uniform float uTime;
// Contains the XYZ of each vertex - I'm going to go out on a limb here and assume that THREE.PlaneGeometry
// is what accesses and sets this
attribute vec3 position;
attribute vec2 uv;
attribute float randomCoords;


// Used to pass down properties to the fragment
varying float vRandomCoords;
varying vec2 vUv;
varying float vElevation;

void main(){
  // modelPosition.z += randomCoords * 0.1;
  /**
  * Vec4 is for something known as homogeneous coordinates which pertains to perspective I believe
  */
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float elevation = (sin(modelPosition.x * uWaveFrequency.x - (uTime / 2.0)) * 0.02) + (sin(modelPosition.y * uWaveFrequency.y -(uTime / 2.0)) * 0.05);
  modelPosition.z += elevation;
 
  /**
  * These have to come after the above ^ as we are modifiying the modelPosition then setting it
  * in the viewPosition
  */
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  /**
  * Okay so the gl_Position is the container/information about the vertex(Geometry)
  * What puzzles me right now though is if this plots the vertex information what is 
  * new THREE.PlaneGeometry doing as that seems to control the dimensions of said geometry
  */
  gl_Position = projectedPosition;

  vRandomCoords = randomCoords;
  vUv = uv;
  vElevation = elevation;
}