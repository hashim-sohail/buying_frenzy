# Buying Frenzy

Food Delivery Platform!

---
## Requirements

For development, you will need [Docker](https://docs.docker.com/engine/install/), [Node](https://nodejs.org/en/download/) and [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed in your environment.

## Configure app

Create `.env` file and add the following configurations:

```
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=postgres
  DB_PASSWORD=SuperSecret!23
  DB_NAME=buying_frenzy
```

### Create Database
```
CREATE DATABASE buying_frenzy;
```
## Running the project

#### Development
##### To start DB containers
```
  docker-compose up
```

#### Install Node Modules
```
  yarn
```

### Run Seeder
```
  yarn seed
```
#### Run App In Development Mode
```
  yarn start:dev
```

#### To stop containers
```
  docker-compose down
```

#### Production

```
  yarn build
  yarn start
```

## GraphQL Playground
### The playground can be accessed at http://localhost:3000/graphql