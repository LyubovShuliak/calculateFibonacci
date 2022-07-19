FROM node:14.16-alpine

RUN yarn global add nodemon
WORKDIR /src
ADD package*.json ./
RUN yarn install
COPY . .

CMD ["npm", "run", "dev"]