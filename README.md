# StockX Coding Challenge

This is an interview coding challenge created for StockX. It is a backend HTTP API

## Technologies  
- NodeJS
- Postgres
- Docker
- Prometheus
- cAdvisor

## docker-compose

The project is setup to be used with docker-compose. You will need docker-compose installed on your local machine to build and run the application.

## Installing
Clone this repository and use docker-compose to build and run the application.
```
git clone https://github.com/derrickdunville/stockx
```

## Running the Application
### Build
To build the project use
```
docker-compose build
```

### Run
To run the project use
```
docker-compose -f docker-compose.yml up
```

### Stop
To stop the containers use
```
docker-compose down
```

## Testing the Application

### Build
To build the test environment use
```
docker compose -f docker-compose.test.yml build
```

### Test
To run the test suite use
```
docker-compose -f docker-compose.test.yml up
```

## Monitoring
The application is configured to use prometheus and cAdvisor as tool to monitor the containers.
- [Prometheus](https://prometheus.io/) localhost:9090
- [cAdvisor](https://github.com/google/cadvisor) localhost:8080

## Logging
To view the log files for each container
```
docker logs app
docker logs postgres
docker logs cadvisor
docker logs prometheus
```
