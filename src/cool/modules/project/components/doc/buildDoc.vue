<template>
	<el-container class="doc-build">
		<main>
			<el-row class="doc-build__body">
				<el-col class="form-data">
					<data-template
						v-model="doc.data"
						:docId="doc.id"
						:projectId="projectObj?.value?.id ?? null"
						:test-mode="testMode"
					></data-template>
					<data-form
						v-model="doc.data"
						:docId="doc.id"
						:test-mode="testMode"
						@build-doc="handelBuild"
					></data-form>
				</el-col>
				<el-col class="doc-perview">
					<doc-perview :url="doc.templateFile"></doc-perview>
				</el-col>
			</el-row>
		</main>
	</el-container>
</template>

<script lang="ts">
import { inject, ref } from "vue";
import { useCool } from "/@/cool";
import { isEmpty } from "/@/cool/core/utils";
import { ElMessage } from "element-plus";
import DataForm from "./dataForm/";
import DataTemplate from "./dataTemplate.vue";
import DocPerview from "./perview.vue";

export default {
	components: {
		DataForm,
		DataTemplate,
		DocPerview
	},
	props: {
		testMode: {
			type: Boolean,
			default: false
		}
	},
	setup(props: any, ctx: any) {
		const { service } = useCool();
		const doc: any = inject("doc");
		const projectObj: any = inject("project");

		const handelBuild = async (form: any) => {
			let projectId;

			if (props.testMode) {
				projectId = form.projectId;

				delete form.projectId;
			} else if (!isEmpty(projectObj)) {
				projectId = projectObj.value.id;
			}

			let id = doc.value.id;
			if (!props.testMode) {
				id = doc.value.docId;
			}

			const res = await service.project.doc.generate(id, {
				projectId,
				fields: {
					...form
				}
			});

			const { fileName, file } = res;
			const fileurl = new URL(file).pathname;

			const fileRes = await fetch(
				"/dev/" + fileurl.split("/").splice(1, fileurl.length).join("/")
			);
			console.log(fileRes);
			const blob = await fileRes.blob();
			const objectUrl = await URL.createObjectURL(blob);
			const a = await document.createElement("a");
			a.setAttribute("target", "_blank");
			a.setAttribute("download", fileName);
			a.href = objectUrl;
			a.style.display = "none";

			document.body.appendChild(a);

			a.dispatchEvent(
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
					view: window
				})
			);

			document.body.removeChild(a);

			ElMessage.success("生成成功");
		};

		return {
			doc,
			projectObj,
			handelBuild
		};
	}
};
</script>

<style lang="scss" scoped>
.doc-build {
	> main {
		width: 100%;
	}
}
.doc-build__body {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;

	.form-data {
		flex-shrink: 2;
		margin-right: 20px;
		> :nth-child(2) {
			margin-top: 20px;
		}
	}

	.doc-perview {
		flex-shrink: 1;
	}
}
</style>