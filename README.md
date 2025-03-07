



# 常用配置



```javascript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  	root: path.resolve(__dirname, 'src'),
	base: '/my-app/',
    mode: 'staging',
 	define: {
        __APP_VERSION__: JSON.stringify('v1.0.0'),
        __API_URL__: 'window.__backend_api_url',
  	},
	plugins: [react()],
    publicDir: path.resolve(__dirname, 'static'),
    cacheDir: 'my-cache',
    resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
        dedupe: ['react', 'react-dom'],
        conditions: ['mydep-condition'],
        mainFields: ['module', 'browser'],
        extensions: ['.js', '.vue'],
        preserveSymlinks: true,
  	},
 	html: {
    	cspNonce: 'abcdefg',
    },
 	css: {
    	modules: {
          localsConvention: 'camelCaseOnly',
        },
    },
    server: {
    	host: '0.0.0.0',
        port: 3000,
        strictPort: true,
        https: true,
        open: '/docs/index.html',
        cors: true,
        headers: {
      		'Cache-Control': 'no-cache'
        },
     	hmr: {
      		overlay: false,
    	},
     	watch: {
      		ignored: ['!**/node_modules/your-package-name/**'],
    	},
        allowedHosts: ['.example.com'],
     	proxy: {
            '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
    	}
    },
    build: {
        target: 'es2015',
        outDir: 'build',
        assetsDir: 'static',
        assetsInlineLimit: 8192,
        cssCodeSplit: false,
        cssTarget: 'chrome61',
        cssMinify: 'lightningcss',
        sourcemap: true,
        manifest: true,
        ssrManifest: true,
        ssr: path.resolve(__dirname, 'src/entry-server.js'),
        minify: 'terser',
        write: false,
        emptyOutDir: false,
        reportCompressedSize: false,
        chunkSizeWarningLimit: 1000,
        watch: {
      		// https://rollupjs.org/configuration-options/#watch
    	},
        terserOptions: {
      		// terser options
    	},
     	rollupOptions: {
      		// https://rollupjs.org/configuration-options/
    	},
        modulePreload: {
      		polyfill: false,
    	},
     	lib: {
          entry: path.resolve(__dirname, 'src/my-lib.js'),
          name: 'MyLib',
          fileName: (format) => `my-lib.${format}.js`,
    	},
    },
    preview: {
        host: '0.0.0.0',
        port: 8080,
        strictPort: true,
        https: true,
        open: true,
        cors: true,
        allowedHosts: ['.example.com'],
     	headers: {
      		'Cache-Control': 'no-cache',
    	},
     	proxy: {
      		'/api': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
      		}
    	}
    },
    optimizeDeps: {
    	entries: ['src/main.js', 'src/components/**/*.vue'],
        exclude: ['lodash-es'],
        include: ['my-lib/components/**/*.vue'],
        force: true,
        holdUntilCrawlEnd: false,
        disabled: true,
        needsInterop: ['my-commonjs-lib'],
        esbuildOptions: {
      		// esbuild options
    	},
  	},
 	ssr: {
    	external: ['axios'],
        noExternal: ['my-component-library'],
        target: 'node',
        resolve: {
      		conditions: ['custom-condition'],
            externalConditions: ['node', 'development'],
         	mainFields: ['module', 'main'],
    	},
  	},
    worker: {
    	format: 'es',
        plugins: [myWorkerPlugin()],
        rollupOptions: {
      		// Rollup options for worker
    	},
  	}
});
```

