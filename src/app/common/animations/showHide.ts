import { trigger, state, style, animate, transition } from '@angular/animations';

export function showHideAnimation (triggerName: string = 'showFilterState', duration: number = 500) {
    return trigger(triggerName, [
        state('inactive', style({
            overflow: 'hidden',
            opacity: '0',
            height: '0px',
            padding: '0px'
        })),
        state('active', style({
            overflow: 'hidden',
            opacity: '1',
            height: '*'
          })),
        transition('inactive => active', animate(`${duration}ms ease-in`)),
        transition('active => inactive', animate(`${duration}ms ease-out`))
    ]);
}
