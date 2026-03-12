FROM grc.io/distroless/nodejs:22
# FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

ENV PORT=3000

CMD ["node", "index.js"]