import { Event } from '../../enums/events';
import { Route } from '../../enums/routes';
import { route, routeChange$ } from '../../functions/router';

enum ElementId {
  BASIC_SCENE = 'basic-scene',
}

interface RouterButton {
  element: HTMLElement;
  route: Route;
}

export class Homepage {
  constructor() {
    routeChange$.subscribe((pageLocation: Route) => {
      if (pageLocation === Route.HOMEPAGE) {
        this.initNavigationButtons();
      }
    });
  }

  private initNavigationButtons(): void {
    // TODO(Munro): Move this to a class field when routing handled by BE.
    const routerButtons = [
      {
        element: document.getElementById(ElementId.BASIC_SCENE),
        route: Route.BASIC_SCENE,
      },
    ];

    for (const routerButton of routerButtons) {
      if (!routerButton.element) return;
      this.addNavigateEventListener(routerButton);
    }
  }

  private addNavigateEventListener(routerButton: RouterButton): void {
    routerButton.element.addEventListener(Event.CLICK, () => {
      route(routerButton.route);
    });
  }
}
