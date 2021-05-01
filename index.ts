import { route } from './src/functions/router';
import { BasicScene } from './src/pages/basic_scene/basic_scene';

class Index {
  constructor() {
    route();
  }
}

new Index();
new BasicScene();
