import './docmenu.scss';
import { defineComponent, inject } from 'vue';
import { changeNumToHan } from '/$/project/utils';

export default defineComponent({
  name: 'doc-menu-generate',
  props: {
    tree: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(props, ctx) {
    const selectNode = inject("select-node");

    return {
      selectNode
    }
  },
  render(ctx: any) {
    const getTrs = () => {
      const trs: any = [];
      this.tree.map((node: any, k) => {
        let rowspan = null;
        if (node.children) rowspan = node.children.length + 1;

        trs.push((
          <tr class={`__docmenu_tr ${node.id === ctx.selectNode.id ? "selectnode": ''}`}>
            <td rowspan={rowspan}>
              第{changeNumToHan(k + 1)}册
            </td>
            <td rowspan={rowspan}>
              {node.name}
            </td>
            {
              !node.children ? [1,2,3].map(() => {
                return (<td></td>)
              }) : null
            }
          </tr>
        ));

        if (node.children) {
          node.children.map((child: any, i: any) => {
            trs.push((
              <tr class={`__docmenu_tr tr_child ${node.id === ctx.selectNode.id ? "selectnode" : ''}`}>
                <td>{i + 1}</td>
                <td>
                  {child.name}
                </td>
                <td>{child.remark}</td>
              </tr>
            ))
          })
        }
      })

      return trs;
    }

    return (
      <table class="__docmenu"
        cellspacing="0" cellpadding="0">
        <tr>
          <th>册序号</th>
          <th>名称</th>
          <th>文档序号</th>
          <th>内&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;容</th>
          <th>备注</th>
        </tr>
        { getTrs() }
      </table>
    )
  }
})