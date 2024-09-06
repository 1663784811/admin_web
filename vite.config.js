import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import {viteSingleFile} from 'vite-plugin-singlefile';


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
            open: false,
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
        minify: 'terser',
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



// ============================================================
// ============================================================    打包为一个html大文件
// ============================================================
// export default defineConfig({
//     envDir: "env",
//     base: '/enterprise',
//     resolve: {
//         // 配置路径别名
//         alias: [
//             {find: '@', replacement: srcPath},
//         ],
//     },
//     plugins: [
//         vue(),
//         viteSingleFile(),
//     ],
//     build: {
//         outDir: 'enterprise',
//         // 确保 assetsInLine 配置正确，这会影响资源内联到单个 HTML 文件中的行为
//         assetsInlineLimit: 100000000,
//         rollupOptions: {
//             inlineDynamicImports: true,
//             output: {
//                 manualChunks: undefined, // 强制将所有代码打包到一个块中
//             }
//         }
//     }
// });