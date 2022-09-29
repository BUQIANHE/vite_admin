<script lang="ts" name="FormItem" setup>
import { titleCase, isChildComponent } from '@/utils'
import { FormInstance, FormRules } from 'element-plus'
import { ColumnProps } from '../ProTable/types'

const props = withDefaults(
  defineProps<{
    columns: Partial<ColumnProps>[]
    isAdd?: boolean
    readonly?: boolean
    formTitle?: string
  }>(),
  {
    columns: () => [],
    isAdd: false,
    readonly: false,
    formTitle: '标题'
  }
)

const emits = defineEmits(['submit'])

const formRef = ref()
const visibleDrawer = ref<boolean>(false)

const formColumns = computed((): any[] => props.columns.filter((item) => !item.hideInForm))

const model = ref<any>({})
formColumns.value.map((item) => (model.value[item.prop] = item.value))
const rules: FormRules = {}
formColumns.value.map((item) => (rules[item.prop] = item.rules))

// 重置表单
const resetFormItem = () => {
  if (!formRef) return
  formRef.value.resetFields()
}

// 关闭抽屉弹窗
const close = () => {
  visibleDrawer.value = false
  resetFormItem()
}

// 验证表单字段值
const validateForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('submit', model)
    } else {
      console.log('请填写必填字段', fields)
    }
  })
}

defineExpose({
  model,
  visibleDrawer,
  close
})
</script>

<template>
  <div class="form_item">
    <el-drawer
      v-model="visibleDrawer"
      :title="`${readonly ? '查看' : isAdd ? '新增' : '修改'}${props.formTitle}`"
      @close="close"
    >
      <template #default>
        <el-scrollbar class="scroll_form">
          <el-form
            ref="formRef"
            :model="model"
            :rules="rules"
            label-position="top"
            status-icon
            class="main_form flex jsb wrap"
          >
            <template v-for="item in formColumns" :key="item.prop">
              <el-form-item :label="item.label" :prop="item.prop">
                <slot :name="`form${titleCase(item.prop!)}`" :row="item">
                  <component
                    :is="`el-${item.type}`"
                    v-bind="item.attrs"
                    v-model="model[item.prop!]"
                    :disabled="readonly"
                  >
                    <template v-if="item?.children?.length">
                      <template v-for="(child, i) in item.children" :key="i">
                        <template v-if="item.type === 'select'">
                          <component
                            v-bind="child.attrs"
                            :is="`el-${isChildComponent(item.type)}`"
                            :disabled="readonly"
                            :label="child.label"
                            :value="child.value"
                          />
                        </template>
                        <template
                          v-if="item.type === 'radio-group' || item.type === 'checkbox-group'"
                        >
                          <component
                            v-bind="child.attrs"
                            :is="`el-${isChildComponent(item.type!)}`"
                            :label="child.value"
                            :disabled="readonly"
                            >{{ child.label }}</component
                          >
                        </template>
                      </template>
                    </template>
                  </component>
                </slot>
              </el-form-item>
            </template>
          </el-form>
        </el-scrollbar>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="close">取消</el-button>
          <el-button v-if="!readonly" type="primary" @click="validateForm(formRef)">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.form_item {
  :deep(.el-drawer) {
    min-width: 500px;
  }

  :deep(.el-drawer__header) {
    border-bottom: 1px solid var(--el-border-color-light);
    padding: 14px 18px;
    margin-bottom: 0;

    h4 {
      margin: 0;
    }
  }

  :deep(.el-drawer__body) {
    padding: 0;
  }

  :deep(.el-input__wrapper) {
    width: calc(100% - 22px);
  }

  :deep(.el-select-v2) {
    width: 100%;
  }

  :deep(.el-select) {
    width: 100%;
  }

  .scroll_form {
    height: 100%;
    padding: 0 18px;

    :deep(.el-form) {
      padding-top: 18px;
    }
  }

  :deep(.el-form-item) {
    width: 100%;
  }

  :deep(.el-drawer__footer) {
    border-top: 1px solid var(--el-border-color-light);
    padding: 12px 18px;
  }

  @media screen and (max-width: 1440px) {
    :deep(.el-form-item) {
      width: 100%;
    }
  }
}
</style>
