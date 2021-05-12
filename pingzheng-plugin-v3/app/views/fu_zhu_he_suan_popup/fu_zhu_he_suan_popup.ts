
/* eslint-disable */

// @ts-nocheck
import Vuex from '../../boozjs-vuex/3.x';
import {useEditPingZhengMixin} from './fu_zhu_he_suan_popup_store';


export const fuZhuHeSuanPopup = {
  mixins: [useEditPingZhengMixin()],
  props: ['value', 'pingZhengRow'],
  data() {
    return {
      requireFuZhuList: []
    };
  },
  computed: {
    ...Vuex.mapState([
      'pingZhengModel'
    ]),
    cc: function() {
      return this.value;
    }
  },

  // template: require('pingzheng/views/fu_zhu_he_suan_popup/fu_zhu_he_suan_popup.html'),
  directives: {
    focus: function(el) {
      el.focus();
    }
  },
  methods: {
    focusFirstFuZhuHeSuanSelect() {
      let _this = this;
      const interval = setInterval(() => {
        if (_this.abx != null && _this.abx.length != 0) {
          _this.abx[0].elm.click();
          window.clearInterval(interval);

        }
      }, 100);

    },
    ok() {
      this.$parent.showPopper = false;
      this.$emit('ok');
    },
    // 边界检测
    boundsdDtection(isOpen) {
      if (isOpen) {
        window.onclick = function(event) {
          if (this.value != '') {
            this.boundsdDtection(false);
            // this.confirmAbandon('辅助核算必填项,是否放弃')
          } else {
            this.$emit('assistSet', this.value);
          }
        }.bind(this);
      } else {
        window.onclick = null;
      }
    }
  },
  // template:'<div>{{cc}}</div>',
  async mounted() {
    this.$watch('value', {
      deep: true,
      handler: async (value) => {
        const handleRequireFuZhuHeSuan = async () => {
          return [
            await this.getDeptList(),
            await this.getPersonList(),
            await this.getCustomerList(),
            await this.getGYList(),
            await this.getCHList(),
            await this.getItemList()
          ];
        };
        this.requireFuZhuList = await handleRequireFuZhuHeSuan();
      },
      immediate: true
    });
  },
  render(h) {
    if (this.requireFuZhuList < 1) {
      return h('div');
    } else if (this.requireFuZhuList == null) {
      return h('div');
    } else {
      return toFuZhuHeSuanRender({instance: this, h, requireFuZhuList: this.requireFuZhuList, row: this.value});
    }

  }
};

