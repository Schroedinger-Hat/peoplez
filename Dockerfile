FROM node:20-alpine

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma

RUN npm install

COPY . .
COPY .env.docker .env

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "dev"]