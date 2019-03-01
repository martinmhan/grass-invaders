FROM node:10

WORKDIR /grass-invaders

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]