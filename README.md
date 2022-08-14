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
### The playground can be accessed at http://localhost:5001/graphql

### APIs
#### List all restaurants that are open at a certain datetime
```
  query{
    restaurantsByTime(day:"Sunday", time:"16:00:00"){
      id
      name
      timings{
        id
        day
      }
    }
  }
```

#### List top y restaurants that have more or less than x number of dishes within a price range, ranked alphabetically. More or less (than x) is a parameter that the API allows the consumer to enter.
```
  query {
    findAllByDishPrice(take: 4, maxPrice: 20, operation: LESS, dishCount: 3) {
      id
      name
      balance
    }
  }
```

#### Search for restaurants or dishes by name, ranked by relevance to search term
```
  query{
    restaurants(search:"Ha"){
      id
      name
    }
  }
```