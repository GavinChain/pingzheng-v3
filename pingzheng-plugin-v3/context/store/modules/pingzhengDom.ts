import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {store} from '../index';

const NAME = 'PingZhengDom';

@Module({dynamic: true, namespaced: true, store, name: NAME})
class PingZhengDom extends VuexModule {
    private pingZhengEditorScrollY=[]
    private bodyWidth=[]
    get getPingZhengEditorScrollY(){
        return this.pingZhengEditorScrollY
    }

    get getPingZhengBodyWidth(){
        return this.bodyWidth
    }

}

export const pingZhengDomStore = getModule<PingZhengDom>(PingZhengDom);
