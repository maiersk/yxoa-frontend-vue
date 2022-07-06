<template>
	<el-button
		size="mini"
		:type="type"
		:plain="plain"
		:round="round"
		:circle="circle"
		:icon="icon"
		:loading="loading"
		:disabled="disabled"
		@click="openForm"
	>
		<slot>导入</slot>
		<cl-form :ref="setRefs('form')">
			<template #slot-template>
				<el-button type="text" size="mini" @click="buildTemplate">
					<slot>点击下载模板</slot>
				</el-button>
			</template>
			<template #slot-import>
				<el-button
					@click="toImport"
					size="mini"
					type="primary"
				>
					<input style="display: none;"
						type="file" ref="fileRef" @change="onFile($event)"
						accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					>
					<slot>选择文件</slot>
				</el-button>
			</template>
		</cl-form>
	</el-button>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { readXlsxFile, SelectSheet } from '../utils/import2sql';
import { export_json_to_excel } from '../utils/export2excel';
import { currentDate, customEncode, customDecode } from '../utils';
import { useCool } from '/@/cool/core';

export default defineComponent({
  name: "cl-import-btn",
	props: {
		filename: [Function, String],
		autoWidth: {
			type: Boolean,
			default: true
		},
		bookType: {
			type: String,
			default: "xlsx"
		},
		header: Array,
		columns: {
			type: Array,
			required: true
		},
		data: [Function, Array],
		size: {
			type: String,
			default: "mini"
		},
		// { data }
		onImport: Function,
		disabled: Boolean,
		type: String,
		plain: Boolean,
		round: Boolean,
		circle: Boolean,
		icon: String
	},
  setup(props, ctx) {
		const { refs, setRefs, service } = useCool();
		const loading = ref<boolean>(false);
		const fileRef: any = ref<string>();
		const data = ref<any>();
		
		const toImport = async () => {
			fileRef.value.click();
		}
		const onFile = async (e: any) => {
			const files = e.target.files; if (files.length === 0) return;
      const f = files[0];
			let re: any, le: any;
      eval("re = /xlsx/g; le = /xls/g;");
      if (!re.test(f .name) && !le.test(f.name)) {
        ElMessage.error(`仅支持读取xlsx或xls格式!`);
        return;
      }
			console.log(files, f, e);
      const workbook = await readXlsxFile(f);
			data.value = await SelectSheet(workbook);

			const decode_data = ref<any>([]);
			data.value.map((item: any, i: number) => {
				if (i !== 0) {
					let temp_item: any = {};
					Object.keys(item).forEach(key => {
						const dc_key = customDecode(key);
						temp_item[dc_key] = item[key];
					});
					decode_data.value.push(temp_item);
				}
			})

			if (props.onImport) props.onImport(decode_data.value);
			fileRef.value.value = null;
		}

		async function getHeader(columns: any[], fields: any[]) {
			return (
				props.header || columns.filter((e) => fields.includes(e.prop)).map((e) => customEncode(e.prop))
			);
		}

		async function getFileName() {
			if (typeof props.filename === "function") {
				return await props?.filename();
			} else {
				const { year, month, day, hour, minu, sec } = currentDate();
				return props.filename || `报表（${year}-${month}-${day} ${hour}_${minu}_${sec}）`;
			}
		}

		async function buildTemplate() {
			if (!props.columns) {
				return console.error("columns 不能为空！");
			}

			// 加载
			loading.value = true;

			// 表格列
			const columns = props.columns.filter(
				(e: any) =>
					!["selection", "expand", "index"].includes(e.type) &&
					!(e.filterExport || e["filter-export"])
			);

			// 字段
			const fields = columns.map((e: any) => e.prop).filter(Boolean);

			// 表头
			let header = await getHeader(columns, fields);

			// 数据
			let _data: any = {};
			columns.map((e: any) => { _data[customEncode(e.prop)] = e.label })
			let data = [ _data ];

			if (!data) {
				loading.value = false;
				return console.error("导出数据异常");
			}

			// 文件名
			let filename = await getFileName();

			// 过滤
			data = data.map((d: any) => fields.map((f) => d[customEncode(f)]));

			// 导出 excel
			export_json_to_excel({
				header,
				data,
				filename,
				autoWidth: props.autoWidth,
				bookType: props.bookType
			});

			loading.value = false;
		}

		function openForm() {
			refs.value.form.open({
				title: "导入向导",
				width: "550px",
				props: {
					labelWidth: "100px"
				},
				items: [
					{
						label: "数据模板",
						prop: "none",
						component: {
							name: "slot-template"
						}
					},
					{
						label: "导入文件",
						prop: "file",
						component: {
							name: "slot-import"
						}
					}
				],
				form: {},
				op: {
					buttons: ["close"]
				},
				on: {}
			});
		}

    return {
			refs, setRefs,
			fileRef,
			toImport,
			openForm,
			buildTemplate,
			onFile
    }
  }
})
</script>

<style>

</style>