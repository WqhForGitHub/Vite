// 在配置中使用环境变量 —— 使用 loadEnv 手动加载 .env 文件
// 注意：在 vite.config.* 运行时，.env 文件中的变量不会自动注入到 process.env 中
// 如果配置本身需要使用 .env 中的值，必须使用 loadEnv 手动加载
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 第三个参数设为 '' 可以加载所有环境变量，不管是否有 `VITE_` 前缀
  const env = loadEnv(mode, process.cwd(), "");

  console.log("当前模式:", mode);
  console.log("APP_ENV:", env.APP_ENV);
  console.log("APP_PORT:", env.APP_PORT);
  console.log("VITE_APP_TITLE:", env.VITE_APP_TITLE);

  return {
    define: {
      // 提供从环境变量派生的显式应用程序级常量
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    // 使用环境变量有条件地设置开发服务器端口
    server: {
      port: env.APP_PORT ? Number(env.APP_PORT) : 5173,
    },
  };
});
