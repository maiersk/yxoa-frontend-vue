<script lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElMessage } from "element-plus";
import { defineComponent, ref, reactive, toRefs, watch, h, onMounted } from "vue";
import { useCool } from "/@/cool/core";
import components from "./dataTableClass";

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
			showOperator: false,
			vnodes: []
		});
		const form = reactive<any>({});
		const json = reactive<any>({});

		watch(
			() => form,
			() => {
				emit("update:modelValue", JSON.stringify(json.value));
			}
		);


		const initJson = function () {
			try {
				if (props.modelValue === "{}") {
					ElMessage.warning("请填写数据模板");
					return;
				}
				console.log(props.modelValue);
				json.value = JSON.parse(props.modelValue);
	
				if (json?.value?.template ?? false) {
					Object.keys(json.value.template).forEach((k) => {
						const template = json.value.template[k];
						if (template.value !== undefined || template.value !== null) {
							form[k] = reactive<any>(json.value.template[k].value)
							data.vnodes.push(createFormItem(k, template));
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
			const Component: any = components[item.tag]

			if (Component) {
				const compObj = new Component(k, item);
				const template = json.value.template[k];

				form[k] = template.value !== "" ? `${template.value}` : form[k];

				compObj.props({
					modelValue: form[k].value
				});
				compObj.on("input", (value: any) => {
					console.log("on", value);

					form[k] = value;
					json.value.template[k].value = value;
				});

				vnode = compObj.create();
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

		onMounted(() => {
			initJson()
		})

		return {
			onMounted,
			...toRefs(data),
			form,
			json,
			initJson,
			refs,
			setRefs,
			createFormItem
		};
	},
	render(ctx: any) {
		return h(ElCard, {}, {
			header: () => h("div", { class:"data-card" }, {
				default: () => [
					h("span", "数据填写"),
					h("div", { class: "operator" }, [
						h(
							ElButton,
							{
								type: "text",
								onClick: () => {
									ctx.$forceUpdate();
									ctx.initJson();
									ctx.refs["ruleForm"].resetFields();
								}
							},
							"刷新表单"
						)
					])
				]
			}),
			default: () => h(
				ElForm,
				{
					ref: ctx.setRefs("ruleForm"),
					class: "form-datatab",
					model: ctx.form,
					"label-position": "right",
					"label-width": "80px",
				},
				{
					default: () => [
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
								"测试生成"
							)
						]) : null
					]
				}
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