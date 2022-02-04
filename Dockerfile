FROM node:12 

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE $PORT

VOLUME ["/app/data"]

CMD ["node", "app.js"]
