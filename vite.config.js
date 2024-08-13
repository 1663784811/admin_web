import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// 代码块分析工具
import {visualizer} from 'rollup-plugin-visualizer'

const srcPath = path.resolve(__dirname, 'src');


export default defineConfig({
    envDir: "env",
    base: '/enterprise',
    resolve: {
        // 配置路径别名
        alias: [
            {find: '@', replacement: srcPath},
        ],
    },
    plugins: [
        vue(),
        visualizer({
            emitFile: false,
            filename: 'enterprise/stats.html',
            open: true,
            sourcemap: true
        }),
    ],
    server: {
        host: "0.0.0.0"
    },
    build: {
        // 打包输出的文件夹名称
        outDir: 'enterprise',
        // 静态资源文件保存的文件夹名称
        assetsDir: 'static',
        // 是否启用css代码拆分
        cssCodeSplit: true,
        // 打包构建后是否生成 source map 文件。
        sourcemap: true,
        // 打包构建时压缩混淆使用的混淆器
        minify: 'esbuild',
        //
        terserOptions: {
            compress: {
                drop_console: true
            }
        },
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    }
})






