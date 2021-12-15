import express from 'express';
import { Client } from 'pg';

const app = express();

app.get('/emissions', async (req, res) => {
  const client = new Client({
    host: process.env.HOST ?? 'localhost',
    user: 'test',
    port: process.env.PORT ?? 5432,
    password: 'TestUser',
    database: 'homeworks',
  });

  await client.connect();

  const result = await client.query(
    `
      SELECT DISTINCT sp.id, em.type_of_calculations, em.co2_emission, 	
      sp.weight_kg, sp.distance_km, sp.pickup_time, sp.dropoff_time
      
      FROM co2_emission_analytics.shipment_co2_emissions em
      INNER JOIN  co2_emission_analytics.shipments sp
      ON em.shipment_id = sp.id
      ORDER BY sp.dropoff_time
    `
  );

  await client.end();

  res.status(200).send(result.rows);
});

export default app;
