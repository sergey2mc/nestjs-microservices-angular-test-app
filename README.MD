# Test project
***Backend*** - Nest.js micro-services

***Database*** - MongoDB

***Frontend*** - Angular 14

### Run backend:
**1)** Enter `./server` directory
```
cd server
```
**2)** Copy `./.env.exaple` file data to `./.env`
```
cp .env.example .env
```
**3)** Setup all docker containers 
```
docker-compose up -d
```
By default the public API will be available on `http://localhost:3000`.

### Run frontend:
**1)** Enter `./client` directory
```
cd client
```
**2)** Copy `./.env.exaple` file data to `./.env`
```
cp .env.example .env
```
**3)** Setup docker container
```
docker-compose up -d
```
By default the client app will be available on [`http://localhost:4000`](http://localhost:4000).
