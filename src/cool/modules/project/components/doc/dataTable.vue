<script lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElMessage } from "element-plus";
import { defineComponent, onMounted, reactive, toRefs, watch, h } from "vue";
import { useCool } from "/@/cool/core";
import components from "./dataTableClass";

export default defineComponent({
	props: {
		modelValue: {
			type: String,
			default: "{}"
		}
	},
	setup(props: any, { emit, attrs, set }: any) {
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
				emit("input", JSON.stringify(data.json));
			}
		);

		const initJson = function () {
			if (props.modelValue === "{}") {
				ElMessage.warning("请填写数据模板");
				return;
			}
			console.log(props.modelValue);
			data.json = JSON.parse(props.modelValue);

			Object.keys(data.json.template).forEach((k) => {
				const template = data.json.template[k];
				if (template.value !== undefined || template.value !== null) {
					data.form[k] = data.json.template[k].value
				}
			});
			data.showOperator = true;
		};

		onMounted(() => {
			try {
				initJson();
			} catch (err) {
				ElMessage.warning("错误的JSON数据");
			}
		})

		const createFormItem = function (k: string, item: any) {
			let vnode;
			const Component: any = components[item.tag];

			if (Component) {
				const compObj = new Component(k, item);
				const template = data.json.template[k];

				data.form[k] = template.value !== "" ? `${template.value}` : data.form[k];

				compObj.props({
					value: data.form[k]
				});
				// compObj.on("input", (value: any) => {
				// 	ctx.form[k] = value;
				// 	ctx.form.template[k].value = value;
				// });

				vnode = compObj.create();
			}

			return h(
				ElFormItem,
				{
					label: item.cname,
					props: {
						rules: item.rules,
						prop: k
					}
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
					// ctx.vnodes.push(ctx.createFormItem(ctx, k, template));
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
								ctx.refs.value.ruleForm.resetFields();
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