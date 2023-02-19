# 一个处理JSON文件的插件

## 安装
```shell
npm i -D rollup-plugin-json-cmd
```

## 使用方法

假设一个vue项目

```typescript
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import JsonCmdPlugin from 'rollup-plugin-json-cmd'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), JsonCmdPlugin("build.json")],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

在`src`目录下创建一个`build.json`文件：

```json
{
    "git-branch": "git branch --show-current",
    "git-commit": "git rev-parse HEAD",
    "time": "date '+%Y_%m_%d %H:%M:%S'"
}
```

使用效果（main.ts）：

```typescript
import build from '@/build.json'

console.log(build)
```
