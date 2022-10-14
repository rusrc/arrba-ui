import { Observable } from 'rxjs';
export interface IStateService<TState> {
    /**
     * Current observable active state
     */
    state$: Observable<TState>;
    /**
     * Set current state and lounch observable
     */
    setState(state: TState);
    /**
     * Current active state
     */
    getState(): TState;
}
