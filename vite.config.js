import { defineConfig } from 'vite';
import path from 'path';
import dynamicImport from 'vite-plugin-dynamic-import';

// Vite 설정
export default defineConfig({
  plugins: [
    dynamicImport(),  // 플러그인 추가
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:80', // 백엔드 서버 주소
        changeOrigin: true, // Origin 헤더를 변경하여 백엔드 서버에 맞게 설정
        rewrite: (path) => path.replace(/^\/api/, ''), // /api를 제거하여 백엔드로 요청
        secure: false, // HTTPS를 사용하는 경우 true로 설정
      }
    }
  }
});