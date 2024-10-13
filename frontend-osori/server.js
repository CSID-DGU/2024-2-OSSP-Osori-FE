const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')
const path = require('path')

const app = express()

// CORS 설정
app.use(cors())

// 정적 파일 서빙 (Vue에서 빌드된 파일이 있을 경우, dist 폴더 서빙)
app.use(express.static(path.join(__dirname, 'dist')))

// API 요청을 백엔드 서버로 프록시
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:8082', // 백엔드 서버 주소 (IntelliJ에서 실행 중인 Java Spring 서버)
    changeOrigin: true
  })
)

// 서버 시작
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Express 서버가 http://localhost:${PORT}에서 실행 중입니다.`)
})
