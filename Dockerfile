FROM node:10.15.0-alpine
WORKDIR /app
COPY . .
RUN npm install && npm audit fix
RUN npm run build
RUN ls
ENV NODE_ENV development
ENV SERVER_URL http://127.0.0.1:3009/api/
ENV HOST 0.0.0.0
ENV PORT 80
CMD npm run start












