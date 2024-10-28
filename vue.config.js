const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // eslint 룰을 삭제하여 ESLint를 비활성화합니다.
    config.module.rules.delete('eslint')
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8082', // 백엔드 서버 주소
        changeOrigin: true, // 백엔드 서버의 도메인과 상관없이 요청을 보낼 수 있게 허용
        secure: false // HTTPS가 아니므로 설정 (필요한 경우 추가)
      }
    },
    port: 3000
  }
})
