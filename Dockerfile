FROM node:22.11

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["ts-node", "src/index.ts"]

