<template>
	<el-container style="width=100%;">
		<!-- 已有生成/完成的文档，提供文档预览，重新上传，编辑，下载功能 -->
		<el-col v-if="selectNode.file" class="doc-success">
			<el-col class="doc-success__info">
				<span class="info-alert">
					<el-icon class="el-icon-warning"></el-icon>&nbsp;
				 	已完成的文档预览，如有错漏请重新上传或重新编辑。
				</span>
			</el-col>
			<el-col class="doc-success__opation">
				<el-upload>
					<el-button type="primary" size="mini" @click="reUpload">
						重新上传
					</el-button>
				</el-upload>
				<el-button type="primary" size="mini" @click="openEdit">
					重新编辑
				</el-button>
				<el-button type="primary" size="mini" @click="download">
					下载
				</el-button>
			</el-col>
			<el-col class="doc-success__perview">
				<doc-perview :url="selectNode.file"></doc-perview>
			</el-col>
		</el-col>
		<!-- 没有则，提供文档模板数据编辑，保存(生成到节点file字段并存档), 上传功能 -->
		<el-col v-else>
			<el-col v-if="selectNode.type === 0">

			</el-col>
			<!-- 有模板文档的，提供编辑，保存，直接上传功能。 -->
			<div v-else-if="doc.type === 0"
				class="doc-build"
			>
				<el-col class="doc-build__info">
					<span class="info-alert">
						<el-icon class="el-icon-warning"></el-icon>&nbsp;
						待完成的模板文档，编辑信息并生成文档，或上传已完成的文档。
					</span>
				</el-col>
				<el-col class="doc-build__opation">
					<el-button type="primary"
						size="mini"
						@click="openEdit"
					>
						编辑
					</el-button>
					<el-upload>
						<el-button type="primary"
							size="mini"
							@click="uploadDoc"
						>
							上传文档
						</el-button>
					</el-upload>
					<el-button type="primary" size="mini" @click="download">
						下载
					</el-button>
				</el-col>
				<el-col class="doc-perview">
					<doc-perview :url="doc.templateFile"></doc-perview>
				</el-col>
			</div>
			<!-- 没有模板文档的待上传 -->
			<div v-else-if="doc.type === 1" class="doc-needupload">
        <div class="doc-needupload__info">
					<span class="info-alert">
						<el-icon class="el-icon-warning"></el-icon>&nbsp;
						请上传 “ {{selectNode.name}} ” 文档
					</span>
        </div>
				<cl-upload active=""
          type="file"
          limit="1"

          v-model="fileUrl"
          size="300px"
          text="上传"
        />
        <el-button type="primary" size="mini" @click="saveDoc">保存</el-button>
			</div>
		</el-col>

		<cl-dialog title="编辑" v-model="showDialog">
			<data-template
				v-model="selectNode.data"
				:docId="doc.id"
				:projectId="projectObj?.value?.id ?? null"
				:test-mode="testMode"
			></data-template>
			<data-form
				v-model="selectNode.data"
				:hide="true"
				:docId="doc.id"
				:test-mode="testMode"
				@build-doc="handelBuild"
			></data-form>
		</cl-dialog>
	</el-container>
</template>

<script lang="ts">
import { inject, ref } from "vue";
import { useCool } from "/@/cool";
import { isEmpty } from "/@/cool/core/utils";
import { ElMessage } from "element-plus";
import DataForm from "../dataForm/";
import DataTemplate from "../dataTemplate.vue";
import DocPerview from "../perview/";

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
		const selectNode: any = inject("select-node");
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

    const fileUrl = ref<string>("");
		const showDialog = ref<boolean>(false);

		function uploadDoc() {

		}

		function reUpload() {

		}

		function openEdit() {
			showDialog.value = !showDialog.value;
		}

    function saveDoc() {

    }

	 async function download() {
			const { name, file } = selectNode.value;
			const fileName = name;
			let fileurl: any
			if (!file) {
				fileurl = new URL(doc.value.templateFile).pathname;
			} else {
				fileurl = new URL(file).pathname;
			}

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
		}

		return {
			doc,
			selectNode,
			projectObj,
			handelBuild,
      fileUrl,
			showDialog,
			openEdit,
			reUpload,
			uploadDoc,
      saveDoc,
			download
		};
	}
};
</script>

<style lang="scss" scoped>

.info-alert {
	padding: 10px;
	background-color: #f4f4f5;
	color: #909399;
	display: flex;
	align-items: center;
}

.doc-success {
  &__opation {
		display: flex;
    margin-bottom: 10px;

		button {
			margin-right: 20px;
		}
  }

	&__info {
		margin-bottom: 10px;
	}
}

.doc-needupload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  &__info {
    // display: flex;
    margin: 10px;
  }

  > button {
    margin: 40px;
  }
}

.doc-build {
	width: 100%;
	height: calc(100% - 10px);
	
	&__info {
		@extend .doc-success__info;
	}
	
	&__opation {
		@extend .doc-success__opation;
	}
}
</style>