FROM node:20.9.0-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm install

#COPY .env .env.local ./

FROM node:20.9.0-alpine AS BUILD_IMAGE

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN  npx prisma generate && npx prisma db push && npx prisma db seed && npm run build

RUN rm -rf node_modules
RUN npm install

FROM node:20.9.0-alpine

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/package.json /app/package-lock.json ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/public ./public
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.next ./.next


USER nextjs

EXPOSE 3000

CMD [ "npm", "start" ]

#docker build --build-arg ENV_FILE=.env -t myimage .
