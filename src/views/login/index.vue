<script lang="ts" name="index" setup>
import { captchaImage } from '@/api/login'
import { useAppStore } from '@/pinia'
import { useStaticFiles } from '@/utils'
import { ElMessage, FormInstance } from 'element-plus'

const appStore = useAppStore()
const router = useRouter()

const loginPic = useStaticFiles('/src/assets/images/login_left.png')

const formParams = reactive<API.LoginParams>({
  uuid: '',
  username: 'errorone',
  password: 'error@123',
  code: ''
})

const formRules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

const loginFormRef = ref<FormInstance>()
const codeUrl = ref<string>('')
const loading = ref<boolean>(false)

onMounted(() => {
  fetchCaptcha()
})

// onActivated(() => {
//   fetchCaptcha()
// })

const fetchCaptcha = async () => {
  formParams.code = ''
  formParams.uuid = ''
  try {
    const res = await captchaImage()
    if (res.code === 200) {
      const { img, uuid } = res
      codeUrl.value = `data:image/gif;base64,${img}`
      formParams.uuid = uuid
    }
  } catch (err) {
    console.log(err)
  }
}

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const res: API.LoginResult = (await appStore.login(formParams)) as API.LoginResult
        if (res.code === 200) {
          await appStore.fetchUserInfos()
          await appStore.fetchMenuList()
          ElMessage.success('登录成功！')
          router.push({ path: '/home' })
        }
      } catch (err) {
        const { code } = err as API.Result
        if (code === 500) {
          formParams.code = ''
          formParams.uuid = ''
          // fetchCaptcha()
        }
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <div class="login_box flex jcc">
    <div class="login_content flex jsa">
      <div class="login_theme flex jcc">
        <Theme />
      </div>
      <div class="login_left flex jcc">
        <el-image style="width: 100%; height: 100%" :src="loginPic" fit="scale-down" />
      </div>

      <div class="login_right">
        <img class="form_img" src="@/assets/images/form_icon.png" alt="form_icon" />
        <div class="login_form_box">
          <div class="login_head flex jcc">
            <div class="img_box flex jcc">
              <img src="@/assets/images/vite.svg" />
            </div>
            <h2 class="title flex jcc">后台管理系统模板</h2>
          </div>
          <el-form
            ref="loginFormRef"
            :model="formParams"
            :rules="formRules"
            status-icon
            class="login_form"
          >
            <el-form-item prop="username">
              <el-input
                v-model.trim="formParams.username"
                clearable
                placeholder="请输入账号"
                @keyup.enter="login(loginFormRef)"
              >
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model.trim="formParams.password"
                type="password"
                clearable
                placeholder="请输入密码"
                @keyup.enter="login(loginFormRef)"
              >
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-row :gutter="16">
              <el-col :span="16">
                <el-form-item prop="code">
                  <el-input
                    v-model.trim="formParams.code"
                    clearable
                    placeholder="请输入验证码"
                    @keyup.enter="login(loginFormRef)"
                  >
                    <template #prefix>
                      <el-icon><Key /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <span class="code_img flex">
                  <el-image
                    style="width: 100%; height: 100%"
                    :src="codeUrl"
                    fit="fill"
                    @click="fetchCaptcha"
                  />
                </span>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button
                class="login_btn"
                type="primary"
                :loading="loading"
                @click="login(loginFormRef)"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &_box {
    width: 100%;
    height: 100%;
    background: url(@/assets/images/login_bg.svg) no-repeat top center/cover;
  }

  &_content {
    width: 96%;
    height: 92vh;
    box-sizing: border-box;
    border-radius: var(--el-border-radius-round);
    background: rgba(255, 255, 255, 0.3);
    // background: var(--el-bg-color);
    backdrop-filter: blur(8px);
    position: relative;
    padding: 2rem 2.5rem;
  }

  &_theme {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 999;
  }

  &_left {
    width: 100%;
    height: 100%;
    max-width: 1024px;

    img {
      width: auto;
      height: 70%;
    }
  }

  &_form_box {
    width: 360px;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    border: var(--el-border);
    border-color: transparent;
    border-radius: var(--el-border-radius-round);
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.05);

    .code_img {
      justify-content: flex-end;
      height: 2rem;
      border-radius: var(--el-border-radius-base);
      border: var(--el-border);
      border-color: var(--el-border-color);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  &_right {
    position: relative;

    .form_img {
      position: absolute;
      top: -50px;
      right: -55px;
    }
  }

  &_head {
    margin-bottom: 24px;
    .img_box {
      margin-right: 1rem;
    }
  }

  &_btn {
    width: 100%;
  }
}
html.dark {
  .login_content {
    background-color: var(--el-mask-color);
  }

  .login_form_box {
    background: rgba(20, 20, 20, 0.7);
    border-color: #4c4d4f;
  }
}
</style>
