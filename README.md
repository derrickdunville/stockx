# StockX Coding Challenge

This is an interview coding challenge created for StockX. It is a backend HTTP API

## Technologies  
- NodeJS
- Postgres
- Docker

## docker-compose

The project is setup to be used with docker-compose.

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
