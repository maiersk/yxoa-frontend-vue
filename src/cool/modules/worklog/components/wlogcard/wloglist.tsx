import { ElMessage } from 'element-plus';
import { defineComponent, h, inject } from 'vue';
import WlogCard from "./wlogcard.vue";
import { useCool } from '/@/cool';

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
    const { service, refs, setRefs } = useCool();
  
    const delWlog = async (id: any) => {
      let ids = [];
      ids.push(id);
      await service.worklog.wlog.delete({ ids });
      ElMessage.success('删除成功');
      refresh()
    }

    const refresh = () => {
      const wlogsDom = [...refs.value['wlogListRef'].$el.children]
      wlogsDom.map((e: any) => {
        e.remove()
      })
      ctx.emit('onLoad')
    }

    return {
      delWlog,
      refs,
      setRefs
    }
  },
  render(ctx: any) {
    let wlog_dom: any = [];

    if (this.data.value) {
      this.data.value.forEach((item: any) => {
        wlog_dom.push(
          h(
            WlogCard,
            {
              wlog: item,
              style: {},
              onDelWlog: this.delWlog
            },
            {

            }
          )
        );
      });
    }

    return (
      h(<el-row></el-row>, {
        class: "wlog-list",
        width: "100%",
        ref: ctx.setRefs('wlogListRef'),
        style: {
          'display': 'flex',
          'flex-direction': 'column',
          'flex-wrap': 'wrap'
        }
      }, [
        ...wlog_dom
      ])
    )
  }
});