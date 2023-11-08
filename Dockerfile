FROM node:18-buster-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .

# Configura las variables de entorno


EXPOSE 7001

CMD ["node", "src/server.js"]
