FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY src src

ENV PORT=3000

CMD ["node", "src/index.js"]