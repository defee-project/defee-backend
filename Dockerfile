FROM node:22.11

WORKDIR /app

COPY package.json package-lock.json /app/   

RUN npm install -g npm@8

RUN npm install

RUN npm install @nestjs/cli

COPY . /app/

RUN npm run prisma:generate

CMD ["npm", "start:dev"]

EXPOSE 3000
