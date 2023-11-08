FROM node:18-buster-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .

# Configura las variables de entorno
ENV NODE_ENV=development
ENV PORT=7001
ENV DATABASE_URL2=mongodb+srv://DB_admin:rbAwmTDQTYokZIZ9@cluster0.0cajvwe.mongodb.net/?retryWrites=true&w=majority

EXPOSE 7001

CMD ["node", "src/server.js"]
