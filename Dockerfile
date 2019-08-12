FROM node:10
WORKDIR /usr/src/app
ADD package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD [ "node", "server.js" ]
