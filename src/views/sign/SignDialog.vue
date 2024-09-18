<template>
  <div class="dialog-overlay">
    <div class="sign-dialog">
      <!---->
      <div class="sign-close-icon" @click="$emit('hideEvent')">
        <svg-icon icon-name="icon-captcha-close" class="icon-captcha-close" size="24"></svg-icon>
      </div>
      <!-- 左侧 -->
      <div class="sign-scan-wp">
        <div class="sign-scan-title">扫描二维码登录</div>
        <div class="sign-scan-hover-wp">
          <div class="login-scan-box">
            <div class="" style="width: 160px; height: 160px">
              <div
                style=""
                title="https://passport.bilibili.com/h5-app/passport/login/scan?navhide=1&amp;qrcode_key=04ad5eb3e353b71157a5a5e1edd628b3&amp;from=main-fe-header"
              >
                <canvas width="160" height="160" style="display: none"></canvas>
                <img
                  alt="Scan me!"
                  style="display: block"
                  src="data:image/png;base64,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"
                />
              </div>
            </div>
          </div>
          <div class="scan-tips-icon" style="display: none"></div>
          <div class="login-client-qr-code" style="display: none">
            <div class="" style="width: 173px; height: 173px">
              <div title="https://app.bilibili.com">
                <canvas width="173" height="173" style="display: none"></canvas>
                <img
                  alt="Scan me!"
                  src="data:image/png;base64,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"
                  style="display: block"
                />
              </div>
            </div>
            <i class="login-icon"></i>
          </div>
        </div>
        <div class="sign-scan-desc">
          <p>请打开 <a href="https://app.bilibili.com/" target="_blank">微信关注公众号</a></p>
          <p>扫码关注自动登录此网站</p>
        </div>
      </div>
      <!-- 中部竖线 -->
      <div class="sign-line"></div>
      <!-- 右侧 -->
      <div class="sign-right-wp">
        <div class="login-tab-wp">
          <div
            class="login-tab-item"
            :class="{ activeTab: loginParam.loginType == 1 }"
            @click.stop="loginParam.loginType = 1"
          >
            密码登录
          </div>
          <div class="login-tab-line"></div>
          <div class="login-tab-item" :class="{ activeTab: loginParam.loginType == 2 }" @click="loginParam.loginType = 2">
            邮箱登录
          </div>
        </div>
        <div v-if="loginParam.loginType == 1" class="login-pwd-wp">
          <form class="tab__form">
            <!-- 账号 -->
            <div class="form__item">
              <div class="form_info">账号</div>
              <input
                autocomplete="on"
                maxlength="32"
                oninput="value=value.replace(/\s+/g, '')"
                placeholder="请输入账号"
                type="text"
                v-model="loginParam.username"
              />
            </div>
            <div class="form__separator-line"></div>
            <!-- 密码 -->
            <div class="form__item">
              <div class="form_info">密码</div>
              <input
                autocomplete="on"
                maxlength="32"
                oninput="value=value.replace(/\s+/g, '')"
                placeholder="请输入密码"
                :type="pwdVisible ? 'text' : 'password'"
                v-model="loginParam.password"
              />
              <!-- 密码的显示与隐藏 -->
              <div class="eye-btn" @click="pwdVisible = !pwdVisible">
                <svg-icon
                  v-if="pwdVisible"
                  icon-name="icon-pwd-show"
                  icon-style="pwd-hide"
                ></svg-icon>
                <svg-icon v-else icon-name="icon-pwd-hide" icon-style="pwd-hide"></svg-icon>
              </div>
              <!-- 忘记密码 -->
              <div
                class="clickable"
                @click.stop="forgetPwd = true"
                v-click-outside="() => (forgetPwd = false)"
              >
                忘记密码？
              </div>
              <div class="forget-tip" v-show="forgetPwd">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAABLCAMAAADXsOyXAAAAY1BMVEUAAAAODg4LCwsGBgYMDAwHBwcFBQUDAwP9/f3+/v7t7e2lpaV9fX309PT09PTExMSysrL6+vrx8fHLy8v19fXj4+Pt7e27u7ujo6P+/v7n5+f09PSVlZX+/v76+vre3t7////QvYHdAAAAIHRSTlMABQcJCw0QE+HviTIiloY/L9N3KqZsaCwb0nulG/GjOfvtLI4AAARmSURBVGje7ZnrcuIwDIVrg5PANrTQG7Dd1u//lBvrajMtjCAx/OC0zUw60+Eb6ViS1Ye77rrrrrvuGk3uwTl4yvvNKcEhI6AiobtBVCCEB4veb4k0sZSQXlEB1N1MZHNI7/HhfRnZKweX3aigICdPxb1iXDWtOaUENX9D0qvSuiyewMSawTcqkcJjwLyaC1yeeCeYg+CBT0VGXad0SfY9k84AtZAXudy3FeUQUkGBikI5xx95ohvYtfUDW1gUEBEONFut5iT2gpcCVtmxZFPPohjOibWPsWfW9FsKulj2oRotfBKFNKUXw4mUIcw/v+Kg188QiLW0LZDWQ9WYUuqZM8zD5y6Cdtv0VhgBSKuaQMtT6dGEFj66SOo+QpL4gA6Y4k4t7DveOSUFTAAlUmWdAyzw5i6oULOkR3k+94lhACU1QKqszxjX9KWurRlXIvUeQZMSZmiap0UstHhqmoZhQVxnK4RVZxO1KIAmvTOpsr41CRZIQ0DDsg0mZaWz6x0lHwSJB23iD9o0BDvHwNayAHJqfYLEMuky/qhlg8JjN7AK7YRjrCObpk+CjwzKWZKWrG0LqI2ULgCdDtWBpI1K6lFt28df1QMrwMrhwpFgGlYkdXTymZRBH1/jEf19bNkE6AGYC6aqrzLy4bBXgA6ku3hU68e2ZVpuXegCarGTTFI0QyWbMmj7p4sn1P0hVvAANa8p4urKaorJN5ASa1YKsj7Lq4IRi5Q0fayQBlJhpVIA0sblx7saOERN0pAqKTbT01o8ASvB5hMBWcCNSqqFn0Hbt5Ok2mThDzJWoB2zwOrVhJOfke6jQXuNqzQugwVspFillHQZTVoKK3VZnrdpqTDW1URtWpLaWUE4cGNcHWqUo6/Z15BCM7Wqz/zKrH5Gc9ZI2fdEyqjHmumJJlvCzpJ0C3fxhKLpV9J1PEtrYGXSIFUAddFtn1Ep++Fo4Tc2A7XrRQMBLUXl7OOd4xJSZdWzJSXrErsSqaafSRsiHYO1jKtDnbnsk4WUGvVoMzU0WUTluMqofY6KYUpjerSZGpqsHq0kXhZK37IPqNqk1Kj7OIL2yqqrF+cV1F6oeDGho/QyjqJlWQWSZPdmtGp5pJKphHRM1pB0MLg4GymjHhq1j6OpL5uWZ9RzDJA7FVHtzfT0TRYvWwSrM5bdqsVd6lQztTfZ0gIzx6yG/Bf3UzbqcxdHVvfMFpglqQfsKx9QACHpJKxSsOwd67BRzZV0AtYgBQthB0wjqp7/ADI0U2OTDaB8m3nOhkJu/UHWvOOzvtPBUtYHZ4lpQtU5pdnECbXh0qrDoIH1YEOxipNqxW61TlicfllQmEntrEBqX2E4UHb++zi5eihX1hVx0agG1O1XrKDXbTZeeWce/30i3cUqWm/zfdvAYPkXKuT/pYuV1L0AqaG1uqKt1iBVVg/5J1SLV6uRKmsWVuNC7ftfrKrFN8QVu4Bp+/NejVSbrOGfxc7J9m8Tr6ANt1ZL/lfxKlr92gH+A2phwRjU8Di5AAAAAElFTkSuQmCC"
                  alt=""
                  class="arrow"
                />
                <div class="forget-tip-line">
                  <p class="title">发送短信快速登录</p>
                  <p class="desc">未注册或绑Vault的手机号，将帮你注册新账号</p>
                </div>
                <div class="forget-tip-line">
                  <p class="title">去找回密码</p>
                  <p class="desc">通过绑定的手机号/邮箱重置密码</p>
                </div>
              </div>
            </div>
          </form>
          <div class="btn_wp">
            <div class="btn_other" @click="loginParam.loginType = 2">注册</div>
            <div class="btn_primary" @click="captcha.isShow = true">登录</div>
          </div>
        </div>
        <div v-else class="login-sms-wp">
          <form class="tab__form">
            <div class="form__item">
              <div class="login-sms-wp__cid">
                邮箱
              </div>
              <input
                maxlength="15"
                oninput="value=value.replace(/[^\d]/g, '')"
                placeholder="请输入邮箱"
              />
              <div class="login-sms-wp__vertical-line"></div>
              <div class="login-sms-send clickable disable">获取验证码</div>
            </div>
            <div class="form__separator-line"></div>
            <div class="form__item">
              <div>验证码</div>
              <input
                placeholder="请输入邮箱验证码"
                maxlength="6"
                v-model="loginParam.code"
                oninput="value=value.replace(/[^\d]/g, '')"
              />
            </div>
          </form>
          <div class="btn_wp" style="justify-content: center">
            <div class="btn_primary">登录/注册</div>
          </div>
          <div class="area-code-select" style="display: none">
            <div class="option checked"><span>中国大陆</span><span>+86</span></div>
            <div class="option"><span>中国香港特别行政区</span><span>+852</span></div>
            <div class="option"><span>中国澳门特别行政区</span><span>+853</span></div>
            <div class="option"><span>中国台湾</span><span>+886</span></div>
          </div>
        </div>
        <div class="login-sns-wp">
          <div class="login-sns-title">其他方式登录</div>
          <div class="login-sns-content">
            <div class="login-sns-item">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAgVBMVEUAAABXu0BYt0BQt0BXu0BWu0BXu0BXu0BXu0BWukBWukBXvEBXu0BXvEBXvEBYukBVukBXu0BWt0BXukBXuEBXu0D////1+/Pq9+fV7s/A5rer3aBsw1jg89uBzHBiwEy14auL0Xug2ZOW1YeBzG93yGSW1YjL6sO14azL6cN2yGP3XpzOAAAAFXRSTlMA3yAQ78+/r5+AUI9w74BgYEBAkHDBb56KAAACF0lEQVRIx52W6XKDIBRGwT3GZmsRUXFP0vb9H7AKGS8aiCXnR0TCmU/gOoh0uJck8jEZwUGYXND/cOPggyz4CE//0HZgKeDIsdSA3Qs1Bk2XejLF7ckGe1fnOT7ZBDsaDxNiZ4Jna4Jnb7rgbeKrK7QnFuzBOxIrYrsJAth9iIdl/9CwLE0pv/elqfoegWpfXdAUYINW9GRkRIBWakBemiOVGRbpE1lpijwaPDANCxvCc8qBbcVF47vq5EQ1YjCK3nyXiXE3QqrpSseeu+jptc96XgWmHSGDEGtCmDHygpK5nUuRdr2MvvfNdMvzXCN+KVNk6RO0qOpr37fXJzFCwdzmT9532THZovmqFHxlF3/WcdWQGUsBI2g3K/G3WG3o4oEVsVqOK4RHaTpfaKkXCVsWzPTL65pPN7X4kxnEX6qIXS4mJqfOH5tVKSJWzJsiXqlcklxe5AI0yuL4RDUpiKkGphRrRFRK+lLk88AQSg4KXVC9TvwSRQ4MU5m1xZ2xlmnEm1LkrqeKTVbU5rcaNtJDCAWqCOutq90CpjiKMTFQZuuah/9Oo+h6ZtPkYTSxI0YKReWLtxFBpJ5bzjOasWYsoBp6HQSRW5R5tz4C4HS0PltjO/H05sH6iQDXtz0d3/94ANPes/9Asjd9572PwE8X6Tm+DPViZMQ5mLUDxGnVCFtqwDH0VlYQS22bcxIGIhn7UXLWWn+10s6FZo+4YQAAAABJRU5ErkJggg=="
                class="login-sns-item-icon"
              /><span class="login-sns-name">微信登录</span>
            </div>
            <div class="login-sns-item">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAh1BMVEUAAADXQDjTQDzaQzfcRTfbRDfcRDbcQzbbRDbbRDfcQzbaQzbbRDbbRDbaRDfcQzbbRDfaQjjaQjXcQzfYRDfbRDTbRDf////gW1D99PPtoZvyubT76Ob20M3pioLdT0Tvrajkc2n20c3rlo7mfnb0xcD43NrrlY7kcmniZ1343driZ1z0xMEgvW1iAAAAFnRSTlMAIBDf34Dv78+/n1BAj7CvcGBgkHBwDUc+aAAAAmpJREFUSMeVlueCqjAQRgOI0qy7m0YVsN297/98OwEdCUQ05w8WDt/MkIjEhJv8RIFHAS/c/CTkM9w4XFKN5ebwgeaDNWURObYa4s+oMWrG1MOruDV9w9o1eU5A37JwDN6CUksTPWsTPXvTRe89wXBCa2rB+ukd6By3K6ca8WcNVoyxLB26i0ex/mxgzRTiMlx990A6C09PZ6XKwXbpIyP6Fn4C8zKONHVYFrJ4tJWfoUMJ5k2PPBi0igHZrX8j4HVLITPXB7udeK1gHem9ziJjouTwQYmnhCCuxh5UhSJO9qKmWwxrTcZeyh5UpcyFyOH0Bi5SaYNNyG7qYeK95CttWUWlJn6PW5RsSgVtlyqxoEhEQs1rNEPrldf5cI8Qb+hxYRKlaVsSY4NZKqU81aynpQY0kTNF3pS4fsDFvTESx4Gi0b4vMqWKdl4UcHWukmSeZXnRV9Gb5VgcDucIJ3B11JbckSmKyXAC7V7I52hxI2WmyYYk0m7+Dbd8JR7boTYlbshOE9WBsYb+MglBZ6r4p8TxXL+Hi7zov2dCnY1N8v7ViIS4z21V9q3U7Ap9YkzOulnrLAkZLtYTA4f+CpYLHEjFgCMdtwhiTBGedT+D/NwtIHU2V3li4tE9iO5qaILQwvF4LNUtTLsr8InnTX6Pebfq8qopmup/V29W0CkRIaNISDmxJwLqNeEYHwG8repzltVpA/Ua8UmP61ErPHy2xnbiniBflg9WxA0sCnXJAMezadDSRM/aRM/eDMCb4n7Z/glE9rOhq5i8xPFfaz7GmdXIs9aw4O1qZIUxam9IdtuwS/aCaJcYrT+uh9kYccQkXQAAAABJRU5ErkJggg=="
                class="login-sns-item-icon"
              /><span class="login-sns-name">微博登录</span>
            </div>
            <div class="login-sns-item">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAb1BMVEUAAABMouVIn+NEn99MouVMouVMo+ZMouVKouRKouJMn+NMouZLouRLo+VMoeNMouZLoeVLoeVNn+RMouX///+83Pal0PL0+v6x1vRireiay/FXqOfS6Pl5uevH4vePxe+Ev+1utOrp9Pzp8/yEv+7XzqLPAAAAE3RSTlMA3yAQ74C/n2BQQK9wz5CPz7BwJ8NfpgAAAbNJREFUSMe1lutygjAQhTeEOyi2AQIC3t//GcvYqk3OYsh0+v1yMN+czc4mQBwyL5ONUDMiLsqc1iGzOFQGYZGu0KLZQkQSrNSQ6I2aGRqkpktxlXJQSc4LNsqJCBhPOCQwwXOa6PmbErxlNpJeVMqD6uWliqOfprPiyN5tcOp0PaObntnmo9hIAV39pFNA9BOogKb+RQN/h9+RCfzR1gbtQqSArtQmemAjUy4QI7GxBTy92qKGJfEshlgp0DO15srmhuIRFuX0Cc/2KO5hUUkF1xt3dxKKuUS3uCPBjA0w4rySwqYyDLCM+EqxVrd45UTtFm81ywlEuzkHXhyhOfY1DArfntg+jRMY/PB80CeODaLhHigpt7fYNSgeuvpgD7k0j9V4Gfbc6RjN7oRE1rCeejVo27vMD4/WFokynB33qUpnUYb+t5zg7+OhNYrVxx5PIzGRJ9ijniwxIC7y3DV3urZ9/DrDfQxvR793a+YnpvRk6+Nt6YXceRQq//rxgKb/h87/fVrtAmKQW2c/JfGkb0PDjBYJomUtMuJQTcRKDUmL0LLiDDWevCzie7LYJGXOWl/BnLhvbq/sWgAAAABJRU5ErkJggg=="
                class="login-sns-item-icon"
              /><span class="login-sns-name">QQ登录</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部说明 -->
      <div class="login-agreement-wp">
        <p>未注册过Vault的手机号，我们将自动帮你注册账号</p>
        <p>
          登录或完成注册即代表你同意 <span> 用户协议 <span class="link_word"> 和 </span></span
          ><span> 隐私政策 <span class="link_word"> </span></span>
        </p>
      </div>
    </div>
  </div>

  <div v-if="captcha.isShow" class="verify-overlay">
    <WordCaptcha class="verify-captcha"
                 @captcha-close-event="handleVerifySuccess"
    ></WordCaptcha>
  </div>

</template>

<script setup lang="ts">
import SvgIcon from '@/components/icon/SvgIcon.vue'
import { reactive, ref } from 'vue'
import type { MemberTypes } from '@/types/member'
import userApi from '@/api/user'
import WordCaptcha from "@/components/canvas/WordCaptcha.vue";
import { useUserStore } from "@/stores/modules/userStore";

const userStore = useUserStore()
defineEmits(['hideEvent'])
// 密码是否隐藏
const pwdVisible = ref<boolean>(false)
// 登录方式[1:密码登录, 2:邮箱登录]
const loginParam = reactive<MemberTypes.LoginReqType>({
  loginType: 1,
  username: '',
  password: '',
  code: ''
})
// 密码忘记提示
const forgetPwd = ref(false)
// 图形验证码配置
const captcha = reactive({
  isShow: false
})
/*
 * 登录函数
 */
const toLogin = () => {
  // 密码登录
  if (loginParam.loginType === 1) {
    userApi.login(loginParam).then((res) => {
      console.log(res)
      // 保存用户信息
      userStore.setUser(res.data)
      // 刷新操作
      refresh()
    }).catch((err) => {
      // 账号或密码错误
      alert('账号或密码错误')
    })
  } else if (loginParam.loginType === 2) {
    // 邮箱登录
  } else {
    // 不存在的登录方式
  }
}
/**
 * 页面刷新
 */
const refresh = () => {

}
/**
 * 处理图形验证成功后的逻辑
 */
const handleVerifySuccess = () => {
  captcha.isShow = false
  toLogin()
}
</script>
<style scoped lang="scss">
.verify-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .verify-captcha {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
  }
}

.sign-dialog {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 820px;
  min-height: 430px;
  background: var(--va-bg-color-1);
  border-radius: 8px;
  padding: 52px 65px 29px 92px;
  background-image: url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/22_open.4ea5f239.png),
    url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/33_open.f7d7f655.png);
  background-position:
    0 100%,
    100% 100%;
  background-repeat: no-repeat, no-repeat;
  background-size: 14%;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    min-width: 0;
    -webkit-box-shadow: 0 0 0 1000px #fff inset;
    box-shadow: inset 0 0 0 1000px #fff;
    margin-left: 20px;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px transparent inset;
    -webkit-transition: background-color 5000s ease-in-out 0s;
    transition: background-color 5000s ease-in-out 0s;
  }
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 置于最上层 */
}

.sign-close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 2;
}

.sign-scan-wp {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.sign-scan-title {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 16px;
  color: #505050;
  margin-bottom: 26px;
  color: var(--va-text-color-1);
}

.sign-scan-hover-wp {
  position: relative;
}

.sign-line {
  position: relative;
  display: block;
  width: 1px;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  height: 228px;
  background-color: #e3e5e7;
  margin: 43px 44px 0 45px;
  z-index: 1;
  border-radius: 8px;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}

.sign-scan-desc {
  margin-top: 18px;
}

.sign-right-wp {
  width: 400px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.login-tab-wp {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-line-pack: center;
  align-content: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-bottom: 24px;
}

.login-tab-item {
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: var(--va-text-color-1);
  cursor: pointer;
}

.login-tab-line {
  width: 1px;
  height: 20px;
  background: #e3e5e7;
  border-radius: 8px;
  margin: 0 21px;
}

.activeTab {
  color: #4fa5d9;
  cursor: not-allowed;
}

.login-pwd-wp {
  position: relative;
}

.tab__form {
  width: 400px;
  height: 90px;
  border: 1px solid #e3e5e7;
  border-radius: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #212121;

  .form__item {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    padding: 12px 20px;
    color: var(--va-text-color-2);

    input {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      min-width: 0;
      -webkit-box-shadow: 0 0 0 1000px var(--va-bg-color-1) inset;
      box-shadow: inset 0 0 0 1000px var(--va-bg-color-1);
      margin-left: 20px;
      color: var(--va-text-color-2);
      background-color: var(--va-bg-color-1);

      &::placeholder {
        color: #c9c9c9; /* 设置 placeholder 文本的颜色 */
      }
    }
  }

  .form__separator-line {
    display: block;
    width: 100%;
    height: 0;
    border-bottom: 1px solid #e3e5e7;
  }
}

.sign-dialog input,
.sign-dialog select,
.sign-dialog textarea {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: none;
  overflow: visible;
}

.sign-dialog a,
.sign-dialog i,
.sign-dialog input,
.sign-dialog li,
.sign-dialog ol,
.sign-dialog p,
.sign-dialog ul {
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: 400;
  vertical-align: baseline;
}

.eye-btn,
.eye-btn svg {
  width: 20px;
  height: 20px;
}

.eye-btn {
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
}

.pwd-hide {
  width: 20px;
  height: 20px;
  vertical-align: -0.15em;
  fill: #9499a0;
  overflow: hidden;

  &:hover {
    fill: #00a1d6;
  }
}

.clickable {
  color: #00a1d6;
  cursor: pointer;
}

.btn_wp {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 20px;
  width: 400px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
}

.btn_other {
  width: 194px;
  height: 40px;
  cursor: pointer;
  color: #18191c;
  background-color: #fff;
  border: 1px solid #e3e5e7;
  border-radius: 8px;
}

.btn_primary {
  width: 194px;
  height: 40px;
  cursor: pointer;
  color: #fff;
  background-color: #00aeec;
  border-radius: 8px;

  &:hover {
    background-color: #26baef;
  }
}

.login-sns-wp {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.login-sns-title {
  margin-top: 24px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.login-sns-title {
  text-align: center;
  color: #9499a0;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
}

.login-sns-content,
.login-sns-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.login-sns-content {
  margin-top: 12px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.login-sns-item {
  margin-right: 30px;
  cursor: pointer;
}

.login-sns-item-icon {
  width: 28px;
  height: 28px;
  margin-right: 8px;
}

.login-sns-name {
  text-align: center;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #9499a0;
}

.login-agreement-wp {
  width: 351px;
  position: absolute;
  bottom: 29px;
  left: 50%;
  -webkit-transform: translate(-50%);
  transform: translate(-50%);

  p {
    font-size: 13px;
    color: #999;
    text-align: center;
    line-height: 19px;
    font-weight: 400;
  }
}

.login-sms-wp {
  position: relative;
}

.btn_wp {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 20px;
  width: 400px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  justify-content: center;
}

.login-sms-wp__cid {
  position: relative;
  width: 42px;
  cursor: pointer;
}

.login-sms-wp__vertical-line {
  width: 1px;
  height: 26px;
  border-left: 1px solid #e3e5e7;
  margin-right: 20px;
}

.login-sms-wp .login-sms-send {
  width: 90px;
  text-align: center;
}

.login-sms-wp .disable {
  color: #c9ccd0 !important;
  cursor: not-allowed;
}
circle {
  fill: blue; /* 改变圆圈内部的颜色为蓝色 */
}
.clickable {
  color: #00a1d6;
  cursor: pointer;
}

.forget-tip {
  position: absolute;
  top: 60px;
  right: -115px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 332px;
  height: 120px;
  background: #fff;
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.21);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.21);
  border-radius: 5px;
  z-index: 1;

  .arrow {
    position: absolute;
    width: 34px;
    left: 135px;
    top: -14px;
  }

  .forget-tip-line {
    padding: 11px 0 11px 18px;
    cursor: pointer;
  }

  .title {
    font-size: 14px;
    line-height: 18px;
    color: #212121;
  }

  .desc {
    font-size: 12px;
    color: #999;
    line-height: 18px;
  }
}

.icon-captcha-close {
  width: 20px;
  height: 20px;
  vertical-align: -0.15em;
  fill: var(--va-text-color-1);
  overflow: hidden;

  &:hover {
    fill: #00a1d6;
  }
}
</style>
