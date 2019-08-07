FROM node:10

WORKDIR /app

COPY package.json /app

RUN npm install

ENV PGUSER postgres
ENV PGHOST postgres
ENV PGPASSWORD postgres
ENV PGDATABASE postgres
ENV PGPORT 5432

COPY . /app

EXPOSE 3000

CMD [ "node", "server.js" ]
