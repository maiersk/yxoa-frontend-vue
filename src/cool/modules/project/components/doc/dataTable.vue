<script lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElMessage } from "element-plus";
import { defineComponent, reactive, toRefs, watch, h } from "vue";
import { useCool } from "/@/cool/core";
import components from "./dataTableClass";

const craeteFormItem = function (ctx: any, k: string, item: any) {
	let vnode;
	const Component: any = components[item.tag];

	if (Component) {
		const compObj = new Component(k, item);
		const template = ctx.json.template[k];

		ctx.form[k] = template.value !== "" ? `${template.value}` : ctx.form[k];

		compObj.props({
			value: ctx.form[k]
		});
		compObj.on("input", (value: any) => {
			ctx.form[k] = value;
			ctx.form.template[k].value = value;
		});

		vnode = compObj.create();
	}

	return h(
		ElFormItem,
		{
			attrs: {
				label: item.cname
			},
			props: {
				rules: item.rules,
				prop: k
			}
		},
		[vnode]
	);
};

export default defineComponent({
	props: {
		value: {
			type: String,
			default: "{}"
		}
	},
	created() {
		try {
			this.initJson();
		} catch (err) {
			ElMessage.warning("错误的JSON数据");
		}
	},
	setup(props: any, ctx: any) {
		const { refs, setRefs } = useCool();

		const data = reactive<any>({
			form: {},
			json: {},
			showOPerator: false,
			vnodes: []
		});

		watch(
			() => data.from,
			() => {
				ctx.emit("input", JSON.stringify(data.json));
			}
		);

		const initJson = function () {
			if (props.value === "{}") {
				ElMessage.warning("请填写数据模板");
				return;
			}

			data.json = JSON.parse(props.value);
			Object.keys(data.json.template).forEach((k) => {
				const template = data.json.template[k];
				if (template.value !== undefined || template.value !== null) {
					ctx.set(data.form, k, data.json.template[k].value);
				}
			});
			data.showOperator = true;
		};

		return {
			...toRefs(data),
			initJson,
			refs,
			setRefs
		};
	},
	render: function (ctx: any) {
		if (ctx.json?.template ?? false) {
			Object.keys(ctx.json.template).forEach((k) => {
				const template = ctx.json.template[k];

				if (template) {
					ctx.vnodes.push(craeteFormItem(ctx, k, template));
				}
			});
		}
		console.log(ctx)

		return h(ElCard, {}, [
			h("div", { slot: 'header' }, [
				h("span", "数据填写"),
				h("div", { class: "operator" }, [
					h(
						ElButton,
						{
							type: "primary",
							onClick: () => {
								this.$forceUpdate();
								this.initJson();
								this.refs.value["ruleForm"].resetFields();
							}
						},
						["刷新表单"]
					)
				])
			]),
			h(
				ElForm,
				{
					ref: this.setRefs("ruleForm"),
					class: "form-datatab",
					attrs: {
						"label-position": "right",
						"label-width": "80px"
					},
					props: {
						model: ctx.form
					}
				},
				[
					...ctx.vnodes,
					ctx.showOperator ? h(ElFormItem, {}, [
						h(
							ElButton,
							{
								props: {
									type: "primary"
								},
								onClick: () => {
									ctx.emit("Submit", ctx.form);
								}
							},
							["测试生成"]
						)
					]) : null
				]
			)
		]);
	}
});
</script>

<style lang="scss" scoped>
  .operator {
    float: right;

    > button {
      padding: 0;
    }
  }
</style>