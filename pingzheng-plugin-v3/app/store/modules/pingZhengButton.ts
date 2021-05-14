import { defineStore } from 'pinia';
import { store } from '../index';


// @ts-ignore
export const usePingZhengButtonStore = defineStore({
    id: 'pingzhengbutton',
    state: (): any => ({
        bottomRightInstance:{}
    }),
    getters: {

        getBottomRightInstance(){
            return this.bottomRightInstance
        }
    },

    actions: {
        commitBottomRihtInstance(bottomRightInstance:any){
          this.bottomRightInstance=bottomRightInstance
        }
    }
});

// Need to be used outside the setup
export function usePingZhengButtonWidthOut() {
    return usePingZhengButtonStore(store);
}
