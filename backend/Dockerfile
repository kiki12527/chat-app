# backend/Dockerfile
FROM node:18

WORKDIR /app

COPY package.json ./
RUN npm install

COPY app/ ./app

CMD ["node", "app/server.js"]
