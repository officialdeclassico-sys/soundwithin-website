import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({command}) => {
  const basePath =
    process.env.VITE_BASE_PATH ||
    (command === 'build' ? '/soundwithin-website/' : '/');

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ and creates 404.html + .nojekyll for GitHub Pages
      {
        name: 'copy-unbundled-src-assets-and-gh-pages',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
          const indexHtml = path.resolve(distDir, 'index.html');
          const notFoundHtml = path.resolve(distDir, '404.html');
          const noJekyllFile = path.resolve(distDir, '.nojekyll');
          if (fs.existsSync(indexHtml)) {
            fs.copyFileSync(indexHtml, notFoundHtml);
          }
          if (fs.existsSync(distDir)) {
            fs.writeFileSync(noJekyllFile, '', 'utf-8');
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
