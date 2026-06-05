// mode、envDir、envPrefix：环境模式与变量配置
//
// mode：指定 serve 和 build 的模式
//   - 默认：serve 为 'development'，build 为 'production'
//   - 在配置中指明会覆盖默认值，也可通过 --mode 命令行重写
//
// envDir：加载 .env 文件的目录
//   - 默认：root（项目根目录）
//   - 可以是绝对路径或相对于项目根目录的相对路径
//   - 设为 false 禁用 .env 文件加载
//
// envPrefix：暴露到客户端的环境变量前缀
//   - 默认：'VITE_'
//   - 以此前缀开头的环境变量会通过 import.meta.env 暴露
//   - 不应设为空字符串 ''，否则会暴露所有环境变量
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // 在配置中使用 loadEnv 加载环境变量
  const env = loadEnv(mode, process.cwd(), "");

  console.log("当前模式:", mode);
  console.log("VITE_APP_TITLE:", env.VITE_APP_TITLE);

  return {
    // 覆盖默认模式
    // 设置后 serve 和 build 都会使用此模式
    // 也可通过 --mode staging 覆盖
    // mode: 'production',

    // 指定 .env 文件所在目录
    // 默认从项目根目录加载，可改为其他目录
    // envDir: './env-files',

    // 禁用 .env 文件加载
    // envDir: false,

    // 自定义环境变量前缀
    // 只有以 CUSTOM_ 开头的变量才会暴露到 import.meta.env
    // envPrefix: 'CUSTOM_',

    // 多个前缀：VITE_ 和 APP_ 开头的变量都会暴露
    envPrefix: ["VITE_", "APP_"],

    // 使用环境变量影响配置
    server: {
      port: env.VITE_PORT ? Number(env.VITE_PORT) : 5173,
    },
  };
});
