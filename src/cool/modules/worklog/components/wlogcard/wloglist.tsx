import { defineComponent, h, inject } from 'vue';
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
  setup(props: any, ctx: any) {
    const service = inject<any>('service')

    const delWlog = (id: any) => {
      ctx.message({

      })
      const ids: any = []
      ids.push(id)
      service.worklog.wlog.delete({ ids }).then((res: any) => {
        console.log(res)
      })
    }

    return {
      delWlog
    }
  },
  render(ctx: any) {
    let wlog_dom : any = [];

    if (this.data.value) {
      this.data.value.forEach((item : any) => {
        wlog_dom.push(h(WlogCard, { wlog: item, style: {  }, onDelWlog: this.delWlog }, []));
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