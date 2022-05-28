import { defineComponent, ref, watch, computed, inject } from "vue";

export default defineComponent({
	name: "cl-yx-search-key",

	props: {
		// 绑定值
		modelValue: String,
		// 选中字段
		field: {
			type: String,
			default: "keyWord"
		},
		// 字段列表
		fieldList: {
			type: Array,
			default: () => []
		},
		// 搜索时的钩子
		onSearch: Function,
		// 输入框占位内容
		placeholder: String
	},

	emits: ["update:modelValue", "change", "field-change"],

	setup(props, { emit }) {
		// 选中字段
		const selectField = ref<string>(props.field);
		const refresh: any = inject("refresh");

		// 文字提示
		const placeholder2 = computed<string>(() => {
			if (props.placeholder) {
				return props.placeholder;
			} else {
				if (props.fieldList.length > 0) {
					return "请输入";
				} else {
					return "请输入关键字";
				}
			}
		});

		// 搜索内容
		const value = ref<any>(null);

		watch(
			() => props.modelValue,
			(val: any) => {
				value.value = val;
			},
			{
				immediate: true
			}
		);

		// 搜索
		function search() {
			const params: any = {};

			props.fieldList.forEach((e: any) => {
				params[e.value] = null;
			});

			function next(newParams?: any) {
				refresh({
					page: 1,
					...params,
					[selectField.value]: value.value || null,
					...newParams
				});
			}

			if (props.onSearch) {
				props.onSearch(params, { next });
			} else {
				next();
			}
		}

		// 回车搜索
		function onKeydown({ keyCode }: any) {
			if (keyCode === 13) {
				search();
			}
		}

		// 监听输入
		function onInput(val?: string) {
			emit("update:modelValue", val || null);
			emit("change", val || null);
		}

		// 监听字段选择
		function onFieldChange() {
			emit("field-change", selectField.value);
			onInput();
			value.value = null;
		}

		return {
			value,
			placeholder2,
			selectField,
			search,
			onKeydown,
			onInput,
			onFieldChange
		};
	},

	render(ctx: any) {
		return (
			<div class="cl-search-key">
				<el-select
					class="cl-search-key__select"
					filterable
					size="mini"
					v-model={ctx.selectField}
					v-show={ctx.fieldList.length > 0}
					onChange={ctx.onFieldChange}>
					{ctx.fieldList.map((e: any, i: number) => (
						<el-option key={i} label={e.label} value={e.value} />
					))}
				</el-select>

				<el-input
					class="cl-search-key__input"
					v-model={ctx.value}
					placeholder={ctx.placeholder2}
					onKeydown={ctx.onKeydown}
					onInput={ctx.onInput}
					clearable
					size="mini"
				/>

				<el-button
					class="cl-search-key__button"
					type="primary"
					size="mini"
					onClick={ctx.search}>
					搜索
				</el-button>
			</div>
		);
	}
});
