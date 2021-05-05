import { BehaviorSubject } from 'rxjs';
import { Event } from './../enums/events';

export class MouseCoordinates {
  coordinates$ = new BehaviorSubject({ x: 0, y: 0 });

  constructor() {
    window.addEventListener(Event.MOUSE_MOVE, (event: MouseEvent) => {
      this.coordinates$.next({
        x: event.clientX / window.innerWidth - 0.5,
        y: -(event.clientY / window.innerHeight - 0.5),
      });
    });
  }
}
