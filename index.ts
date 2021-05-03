import { route } from './src/functions/router';
import { BasicScene } from './src/pages/basic_scene/basic_scene';
import { ThreeCameraPlayground } from './src/pages/cameras/cameras';
import { Homepage } from './src/pages/homepage/homepage';
import { SpaceEffect } from './src/pages/space_effect/space_effect';

class Index {
  constructor() {
    route();
  }
}

new Index();
new BasicScene();
new Homepage();
new SpaceEffect();
new ThreeCameraPlayground();
