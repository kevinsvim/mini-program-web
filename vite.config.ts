import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from "vite-plugin-mock";

export default({ command, mode }: any) => {
  console.log(command, mode)
  const targetUrl: string = loadEnv(mode, process.cwd()).VITE_APP_BASE_API
  console.log(loadEnv(mode, process.cwd()))
  return defineConfig({
    envDir: './env',
    server: {
      port: 5000,
      // 解决跨域
      proxy: {
        '/api': {
          target: targetUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      viteMockServe({
        mockPath: './mock',
        enable: true,
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // scss全局变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/settings/variable.scss";`,
          // scss中解析js
          // javascriptEnabled: true
        }
      }
    },
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    }
  })
}
