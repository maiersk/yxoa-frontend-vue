import { useCool } from '/@/cool';
import { defineComponent, h, reactive, toRefs, watch, ref, toRaw, resolveComponent, onMounted } from 'vue'
import DataCard from './dataCard.vue';
import { ElButton, ElForm, ElFormItem, ElMessage } from 'element-plus';
import _ from "lodash";
import {} from './util';

export default defineComponent({
  name: "dataForm",
  components: {
    DataCard,
    ElForm,
    ElFormItem,
    ElButton
  },
  props: {
    modelValue: {
      type: String,
      defalut: "{}"
    }
  },
  emits: ["update:modelValue"],
  setup(props: any, { emit }: any) {
    const { refs, setRefs } = useCool();
  
    const data = reactive<any>({
      showOperator: false,
      vnodes: []
    });

    const form = reactive<any>({});
    const json = reactive<any>({});
    const loading = ref<boolean>(true);

    watch(
      () => form,
      (val: any) => {
        emit("update:modelValue", JSON.stringify(json.value));
      },
      { deep: true }
    )

    const initJson = () => {
      try {
        data.vnodes = [];
        if (props.modelValue === "{}") {
          ElMessage.warning("请填写数据模板");
          return;
        }

        json.value = JSON.parse(props.modelValue);

        if (json?.value?.template ?? false) {
          Object.keys(json.value.template).forEach((k) => {
            const template = json.value.template[k];
            if (template.value !== undefined || template.value !== null) {
              form[k] = ref<any>(json.value.template[k].value);
            }
          })
        };
        loading.value = false
      } catch (err) {
        ElMessage.error("错误的JSON数据")
      }
    }

    const handelRefresh = function() {
      initJson()
      refs.value['ruleForm'].resetFields()
    }
    const handelBuild = () => {
      console.log("build")
    };

    onMounted(() => {
      initJson();
    })

    return {
      refs,
      form,
      json,
      loading,
      setRefs,
      ...toRefs(data),
      handelRefresh,
      handelBuild,
    }
  },
  render(ctx: any) {
    // 渲染表单组件项
    const renderFormItem = () => {
      if (ctx.json.value?.template ?? false) {
        const children = Object.keys(ctx.json.value.template).map((k) => {
          const e = ctx.json.value.template[k]

          // 使用组件名获取组件对象
          const renderEl: any = toRaw(resolveComponent(e.component.name))        

          // 读取模板内保存的值
          ctx.form[k] = e.value !== "" ? `${e.value}` : ctx.form[k]

          return (
            <el-col span={24}>
              {
                e.component && h(
                  <el-form-item></el-form-item>,
                  {
                    rules: e.rules,
                    label: e.label,
                    prop: k,
                  },
                  {
                    default: () => {
                      return (
                        h(renderEl,
                          {
                            modelValue: ctx.form[k],
                            "onUpdate:modelValue": function(val: any) {
                              ctx.form[k] = val;
                              e.value = val;
                            }
                          }    
                        )
                      )
                    }
                  }
                )
              }
            </el-col>
          )
        })

        return (
          <el-row gutter={10} v-loading={ctx.loading}>
            { children }
          </el-row>
        )
      }
    }

    const FormItems = (
      <div>
        { renderFormItem() }
        <el-form-item>
          <el-button type="primary" onClick={ctx.handelBuild} >
            测试生成
          </el-button>
        </el-form-item>
      </div>
    )

    return (
      <data-card onRefresh={ctx.handelRefresh}>
        {
          h(
            ElForm,
            {
              ref: ctx.setRefs("ruleForm"),
              class: "data-form",
              model: ctx.form,
              "labelPosition": "right",
              "labelWidth": "80px",
            },
            {
              default: () => {
                return FormItems
              }
            }
          )
        }
      </data-card>
    )
  }
})