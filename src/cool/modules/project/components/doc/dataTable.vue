<script lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElMessage } from "element-plus";
import { defineComponent, ref, reactive, toRefs, watch, h } from "vue";
import { useCool } from "/@/cool/core";
import components from "./dataTableComp";

export default defineComponent({
	props: {
		modelValue: {
			type: String,
			default: "{}"
		}
	},
	emits: ['update:modelValue'],
	setup(props: any, { emit }: any) {
		const { refs, setRefs } = useCool();

		const data = reactive<any>({
			form: {},
			json: {},
			showOperator: false,
			vnodes: []
		});

		watch(
			() => data.form,
			() => {
				emit("update:modelValue", JSON.stringify(data.json));
			}
		);

		watch(
			() => props.modelValue,
			() => {
				initJson();
			}
		)

		const initJson = function () {
			try {
				if (props.modelValue === "{}") {
					ElMessage.warning("请填写数据模板");
					return;
				}
				console.log(props.modelValue);
				data.json = JSON.parse(props.modelValue);
	
				if (data?.json?.template ?? false) {
					Object.keys(data.json.template).forEach((k) => {
						const template = data.json.template[k];
						if (template.value !== undefined || template.value !== null) {
							data.form[k] = ref<any>(data.json.template[k].value)
						}
					});
					data.showOperator = true;
				}

			} catch (err) {
				ElMessage.warning("错误的JSON数据")
			}
		};

		const createFormItem = function (k: string, item: any) {
			let vnode;
			const Component: any = components[item.tag];

			// if (Component) {
			// 	const compObj = new Component(k, item);
			// 	const template = data.json.template[k];

			// 	data.form[k] = template.value !== "" ? `${template.value}` : data.form[k];

			// 	compObj.props({
				// 		modelValue: data.form[k].value
			// 	});
			// 	compObj.on("input", (value: any) => {
				// 		console.log("on", value);
			// 		data.form[k].value = value;
			// 		data.form.template[k].value = value;
			// 	});

			// 	vnode = compObj.create();
			// }
			if (Component) {
				const template = data.json.template[k];
				data.form[k].value = template.value !== "" ? `${template.value}` : data.form[k].value;

				vnode = h(
					Component,
					{
						modelValue: data.form[k].value,
						oninput(value: any) {
							console.log("on", value);
							data.form[k].value = value;
							data.form.template[k].value = value;
						}
					},
					[]
				)
			}

			return h(
				ElFormItem,
				{
					label: item.cname,
					rules: item.rules,
					prop: k
				},
				[vnode]
			);
		};

		return {
			...toRefs(data),
			initJson,
			refs,
			setRefs,
			createFormItem
		};
	},
	render(ctx: any) {
		if (ctx.json?.template ?? false) {
			Object.keys(ctx.json.template).forEach((k) => {
				const template = ctx.json.template[k];

				if (template) {
					ctx.vnodes.push(ctx.createFormItem(k, template));
				}
			});
		}
		console.log(ctx)

		return h(ElCard, {}, {
			header: () => h("div", { class:"data-card" }, [
				h("span", "数据填写"),
				h("div", { class: "operator" }, [
					h(
						ElButton,
						{
							type: "text",
							onClick: () => {
								ctx.$forceUpdate();
								ctx.initJson();
								console.log(ctx.refs.ruleForm)
								ctx.refs.ruleForm.resetFields();
							}
						},
						["刷新表单"]
					)
				])
			]),
			default: () => h(
				ElForm,
				{
					ref: ctx.setRefs("ruleForm"),
					class: "form-datatab",
					model: ctx.form,
					"label-position": "right",
					"label-width": "80px",
				},
				[
					...ctx.vnodes,
					ctx.showOperator ? h(ElFormItem, {}, [
						h(
							ElButton,
							{
								type: "primary",
								onClick: () => {
									ctx.$emit("Submit", ctx.form);
								}
							},
							["测试生成"]
						)
					]) : null
				]
			)
		});
	}
});
</script>

<style lang="scss" scoped>
	.data-card {
		margin: 0;
		padding: 0;
	}
	.data-card::before,
	.data-card::after {
		display: table;
		content: "";
	}
	.data-card::after {
		clear: both;
	}

  .operator {
		float: right;
    > button {
			min-height: 0;
      padding: 0;
    }
  }
</style>