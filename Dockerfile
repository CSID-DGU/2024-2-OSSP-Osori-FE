FROM node:14 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# nginx 설정
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html  # 여기서 하이픈을 사용
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
