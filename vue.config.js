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
        target:
          'http://ec2-43-202-20-87.ap-northeast-2.compute.amazonaws.com:8080', // 실제 서버 주소
        changeOrigin: true,
        secure: false, // HTTPS가 아닌 경우 false로 설정
        pathRewrite: { '^/api': '/api' }, // 프록시 경로 유지
        onProxyReq: (proxyReq) => {
          // 프록시 요청에 쿠키 설정
          proxyReq.setHeader('Cookie', 'SameSite=None; Secure')
        },
        withCredentials: true // 쿠키를 포함하여 전송
      }
    },
    port: 3000
  }
})
