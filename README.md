# CO² Emission Analytics

## About

Web app for data visualization of CO² emission analytics. It presents a calendar picker for start and end period date, and displays a table with the modeled data.

## Tech Stack

Application with responsive UI built with JavaScript, Vue 3, Nuxt.js using an Express.js middleware. PostgesSQL was the dabase used.

## Running the project locally

### Setting up Postgres

1. Make sure Postgres is running
2. Create database `homeworks`
3. Create user `test` with password `TestUser`
4. Grant all privilegies to `test` on database `homeworks`
5. Default postgres host and port are: `localhost:5432` - custom values can be used with env vars `PGHOST` and `PGPORT`
6. Make sure to create the `co2_emission_analytics` schema and load the data from `co2_emission_analytics.shipments.dmp` and `co2_emission_analytics.shipment_co2_emissions.dmp`(not included in the repo)

## Running the App

```bash
# install dependencies
$ npm install
# run project
$ npm run dev
```

App will be running on port `3000`
