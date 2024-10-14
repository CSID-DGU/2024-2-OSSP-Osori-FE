const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')
const app = express()

// // CORS 설정 (Express의 모든 경로에서 허용)
// app.use(
//   cors({
//     origin: 'http://localhost:8080', // 프론트엔드 도메인
//     credentials: true // 쿠키 및 세션을 허용
//   })
// )

// // JSON 데이터 처리
// app.use(express.json())

// // 프록시 설정: '/api' 경로로 시작하는 모든 요청을 백엔드로 전달
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'http://localhost:8082', // 백엔드 서버 주소 (8082번 포트)
//     changeOrigin: true,
//     secure: false, // HTTPS 환경이 아니므로 비활성화
//     onProxyRes: function (proxyRes, req, res) {
//       proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080' // CORS 헤더 추가
//       proxyRes.headers['Access-Control-Allow-Credentials'] = 'true' // 쿠키 허용
//     }
//   })
// )

// Express 서버 시작
app.listen(3000, () => {
  console.log('Express 서버가 3000번 포트에서 실행 중입니다.')
})
