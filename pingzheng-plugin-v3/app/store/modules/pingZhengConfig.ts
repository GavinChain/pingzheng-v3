import {defineStore} from 'pinia';
import {store} from '../index';


// @ts-ignore
export const usePingZhengConfigStore = defineStore({
    id: 'pingzhengconfig',
    state: (): any => ({
        isTextModel:false
    }),
    getters: {
        getIsTextModel() {
            return this.isTextModel;
        }
    },
    actions: {

        commitIsTextModel(isTextModel) {
            this.isTextModel = isTextModel;
        },
    }
});

// Need to be used outside the setup
export function usePingZhengConfigStoreWidthOut() {
    return usePingZhengConfigStore(store);
}
