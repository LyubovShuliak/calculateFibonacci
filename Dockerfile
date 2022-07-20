FROM node:18-alpine

WORKDIR /
ADD package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "start"]