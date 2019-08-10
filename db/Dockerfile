FROM postgres:11.2-alpine
COPY ./schema/*.sql /docker-entrypoint-initdb.d/
EXPOSE 5432
