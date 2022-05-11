import { isArray, isObject, isFunction, isString } from '/@/cool/utils';
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

/**
 * 渲染节点
 * @param {*} vnode
 * @param {*} options
 */
 export function renderNode(vnode: any, { prop, scope, slots, type, _data }: any): VNode | any {
	if (!vnode) {
		return null;
	}

	if (vnode.__v_isVNode) {
		return vnode;
	}

	// 组件名渲染
	if (isString(vnode)) {
		return parseNode({ name: vnode }, { scope, slots, _data });
	}

	// 方法回调
	if (isFunction(vnode)) {
		return vnode({ scope, h, ..._data });
	}

	// jsx 模式
	if (isObject(vnode)) {
		if (vnode.name) {
			// 扩展组件
			const elms: string[] = ["el-select", "el-radio-group", "el-checkbox-group"];

			if (elms.includes(vnode.name)) {
				let list: any[] = [];

				if (isFunction(vnode.options)) {
					list = vnode.options({ scope, ..._data });
				}

				if (isArray(vnode.options)) {
					list = vnode.options;
				}

				// 设置内容
				const children = (
					<div>
						{list.map((e: any, i: number) => {
							// 下拉框
							if (vnode.name == "el-select") {
								let label: any, value: any;

								if (isString(e)) {
									label = value = e;
								} else if (isObject(e)) {
									label = e.label;
									value = e.value;
								} else {
									return (
										<cl-error-message
											title={`组件渲染失败，options 参数错误`}
										/>
									);
								}

								return (
									<el-option key={i} label={label} value={value} {...e.props} />
								);
							}
							// 单选框组
							else if (vnode.name == "el-radio-group") {
								return h(<el-radio key={i} label={e.value}></el-radio>, e.props, {
									default() {
										return <span>{e.label}</span>;
									}
								});
							}
							// 多选框组
							else if (vnode.name == "el-checkbox-group") {
								return (
									<el-checkbox key={i} label={e.value} {...e.props}>
										{e.label}
									</el-checkbox>
								);
							} else {
								return null;
							}
						})}
					</div>
				);

				return parseNode(vnode, { prop, scope, _data, children });
			}

			// 默认
			return parseNode(vnode, { prop, scope, slots, _data });
		} else {
			//  列表操作栏
			if (type == "table-op") {
				return (
					<el-button
						type="text"
						size="mini"
						onClick={() => {
							vnode.onClick({ scope });
						}}>
						{vnode.label}
					</el-button>
				);
			}

			//  表单操作栏
			if (type == "form-op") {
				return (
					<el-button
						size="small"
						onClick={() => {
							vnode.onClick({ scope });
						}}>
						{vnode.label}
					</el-button>
				);
			}

			return <cl-error-message title={`组件渲染失败，组件 name 不能为空`} />;
		}
	}
}