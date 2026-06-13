// JSON 与 Oxc 配置：namedExports、stringify、oxc
//
// json.namedExports：是否支持从 .json 文件中进行按名导入
// json.stringify：导入的 JSON 是否转换为 JSON.parse("...") 形式
// oxc：Oxc 转换选项（替代已弃用的 esbuild 选项）
import { defineConfig } from "vite";

export default defineConfig({
  // ========== JSON 配置 ==========
  json: {
    // 是否支持按名导入 JSON 的字段
    // 默认 true，可以直接 import { name } from './package.json'
    // 设为 false 则只能 import pkg from './package.json' 然后 pkg.name
    namedExports: true,

    // 是否将 JSON 字符串化
    // true：导入的 JSON 转换为 export default JSON.parse("...")
    //   比转译成对象字面量性能更好，尤其是大 JSON 文件
    // 'auto'（默认）：只有数据大于 10kB 时才字符串化
    // false：始终转为对象字面量
    stringify: "auto",
  },

  // ========== Oxc 配置 ==========
  // Oxc 是 Vite 内置的转换引擎，替代了之前的 esbuild
  // 默认应用于 ts、jsx、tsx 文件
  oxc: {
    // JSX 配置
    jsx: {
      // JSX 运行时：'automatic'（默认，自动导入）| 'classic'（需手动导入 React）
      runtime: "classic",

      // classic 模式下的 JSX 工厂函数
      pragma: "h",

      // classic 模式下的 Fragment 组件
      pragmaFrag: "Fragment",
    },

    // 自动为每个被 Oxc 转换的文件注入代码
    // 例如在使用 classic JSX 运行时但不使用 React 时
    jsxInject: `import { h } from 'preact'`,

    // 自定义要处理的文件类型（正则表达式或 picomatch 模式）
    // include: [/\.vue$/],
    // exclude: [/\.test\.ts$/],
  },

  // ========== esbuild（已弃用） ==========
  // 此选项在内部被转换为 oxc 选项，请使用 oxc 选项代替
  // esbuild: {
  //   jsxFactory: 'h',
  //   jsxFragment: 'Fragment',
  // },

  // 设为 false 可禁用 Oxc 转换
  // oxc: false,
});
