FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json .
RUN npm ci



FROM grc.io/distroless/nodejs:22

WORKDIR /app

COPY --from=build /app/node_modules node_modules  
COPY . .

ENV PORT=3000

CMD ["index.js"]