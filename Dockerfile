FROM node:10

WORKDIR /grass-invaders

COPY . .

RUN npm install

RUN npm install pm2 -g

EXPOSE 3000

CMD ["npm", "start"]