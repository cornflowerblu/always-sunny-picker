# Builder
FROM node:lts-alpine as builder
COPY . .
RUN npm install --silent --legacy-peer-deps
RUN npm run build
RUN rm -rf node_modules
RUN rm **/*.ts && rm tsconfig.json
RUN rm app.ts

# Production
FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=builder --chown=node . .
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
