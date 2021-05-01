import { route } from './src/functions/router';
import { BasicScene } from './src/pages/basic_scene/basic_scene';
import { Homepage } from './src/pages/homepage/homepage';

class Index {
  constructor() {
    route();
  }
}

new Index();
new BasicScene();
new Homepage();
