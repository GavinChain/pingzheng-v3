import {defineStore} from 'pinia';
import {store} from '../index';


// @ts-ignore
export const useLayoutStore = defineStore({
    id: 'layoutid',
    state: (): any => ({
        thisLayoutCloseEvent: () => {
        },
        thisInstanceCloseEvent: () => {
        }
    }),
    getters: {
        getInstance() {
            return this.instance;
        }
    },
    actions: {
        layoutCloseEvent() {
            if (this.thisLayoutCloseEvent != null) {
                this.thisLayoutCloseEvent();
            }
            if (this.thisInstanceCloseEvent != null) {
                this.thisInstanceCloseEvent();
            }
        },
        commitLayoutCloseEvent(layoutCloseEvent) {

            this.thisLayoutCloseEvent = layoutCloseEvent;
        },
        commitInstanceCloseEvent(instanceCloseEvent) {
            this.thisInstanceCloseEvent = instanceCloseEvent;
        }
    }
});

// Need to be used outside the setup
export function useLayoutStoreWidthOut() {
    return useLayoutStore(store);
}
