FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package*.json .
RUN npm ci

FROM gcr.io/distroless/nodejs22-debian12


WORKDIR /app

COPY --from=build-stage /app/node_modules node_modules
COPY . .

ENV PORT=3000

CMD ["index.js"]
