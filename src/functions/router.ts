import { BehaviorSubject } from 'rxjs';
import { BasicScene } from '../pages/basic_scene/basic_scene';
import { ThreeCameraPlayground } from '../pages/cameras/cameras';
import { DatGuiExample } from '../pages/dat_gui/dat_gui';
import { Homepage } from '../pages/homepage/homepage';
import { SpaceEffect } from '../pages/space_effect/space_effect';
import { TexturesExample } from '../pages/textures/textures';
import { Route } from './../enums/routes';

const ROUTER_OUTLET = 'router-outlet';

/**
 * Used as interim measure until I make the node server
 * TODO(Munro): Remove once BE handles routing
 */
export const routeChange$ = new BehaviorSubject(null);

export const route = (pageLocation: string = Route.TEXTURE_SCENE) => {
  fetch(pageLocation)
    .then((data) => data.text())
    .then((html) => {
      document.getElementById(ROUTER_OUTLET).innerHTML = html;
      routeChange$.next(pageLocation);
      new BasicScene();
      new Homepage();
      new SpaceEffect();
      new ThreeCameraPlayground();
      new DatGuiExample();
      new TexturesExample();
    });
};
