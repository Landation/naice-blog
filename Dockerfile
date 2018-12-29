FROM node:10.15.0-alpine AS base
WORKDIR /app
EXPOSE 80

FROM node:10.15.0 AS build
WORKDIR /src
COPY . .
RUN npm install && npm audit fix
RUN npm run build
RUN ls

FROM base AS final
WORKDIR /app
ENV NODE_ENV development
ENV SERVER_URL http://127.0.0.1:3009/api/
ENV HOST 127.0.0.1
ENV PORT 80
COPY --from=build /src/build ./build
COPY --from=build /src/.nuxt ./.nuxt


CMD ["node", "build/main.js"]













