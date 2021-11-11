import { defineComponent, h, reactive, watch } from 'vue';
import WlogCard from "./wlogcard.vue";

export default defineComponent({
  name: "cl-wloglist",

  conponents: {
    WlogCard
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup() {
    
    return {

    }
  },
  render(ctx: any) {
    let wlog_dom : any = [];

    if (this.data.value) {
      this.data.value.forEach((item : any) => {
        wlog_dom.push(h(WlogCard, { wlog: item, style: {  } }, []));
      });
    }

    return (
      h(<el-row></el-row>, {
					class: "wlog-list",
					width: "100%",
          style: {
            'display': 'flex',
            'flex-direction': 'column',
            'flex-wrap': 'wrap'
          }
				}, [
        	...wlog_dom
      	]
			)
    )
  }
});