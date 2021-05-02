import { BehaviorSubject } from 'rxjs';
import { Route } from './../enums/routes';

const ROUTER_OUTLET = 'router-outlet';

/**
 * Used as interim measure until I make the node server
 * TODO(Munro): Remove once BE handles routing
 */
export const routeChange$ = new BehaviorSubject(null);

export const route = (pageLocation: string = Route.SPACE_SCENE) => {
  fetch(pageLocation)
    .then((data) => data.text())
    .then((html) => {
      document.getElementById(ROUTER_OUTLET).innerHTML = html;
      routeChange$.next(pageLocation);
    });
};
