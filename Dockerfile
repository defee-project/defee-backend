FROM node:22.11

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install -g npm@8

RUN npm install

RUN npm install @nestjs/cli

COPY . /app/

RUN npm run prisma:generate

CMD ["sh", "-c", "npx prisma migrate deploy && npx nest start"]

EXPOSE 3000
