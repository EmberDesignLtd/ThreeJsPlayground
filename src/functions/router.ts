import { Route } from './../enums/routes';

const ROUTER_OUTLET = 'router-outlet';

export const route = (pageLocation: string = Route.HOMEPAGE) => {
  fetch(pageLocation)
    .then((data) => data.text())
    .then((html) => (document.getElementById(ROUTER_OUTLET).innerHTML = html));
};
