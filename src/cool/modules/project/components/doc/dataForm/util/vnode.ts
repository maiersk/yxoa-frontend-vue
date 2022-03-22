import { h, resolveComponent, toRaw, VNode } from "vue";

/**
 * 解析节点
 * @param {*} vnode
 * @param {{ scope, prop, children, _data }} options
 */
export function parseNode(vnode: any, options: any): VNode {
  const el: any = toRaw(resolveComponent(vnode.name))
  const props = {
    ...vnode.props
  }
  return h(el, props, {
    default: () => {
      return []
    }
  })
}

export function renderNode() {

}