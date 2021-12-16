/**
 * Reduces duplicate data from database to single object with unique id
 * that contains all the types of calculations of CO2
 * @param {Date} startDate
 * @param {Date} endDate
 */
export const getModeledData = async (startDate, endDate) => {
  const dbData = await fetch(
    `http://localhost:3000/api/emissions?start=${startDate.toUTCString()}&end=${endDate.toUTCString()}`
  ).then((res) => res.json());

  const allModeledData = {};

  for (const data of dbData) {
    const modeledData = {
      id: data.id,
      weightKg: data.weight_kg,
      distanceKm: data.distance_km,
      pickupTime: new Date(data.pickup_time),
      dropoffTime: new Date(data.dropoff_time),
      // deconstruct exiting co2Emission object if not null, or an empty object
      // add new type_of_calculations key value pair to object
      co2Emission: {
        ...(allModeledData[data.id]?.co2Emission || {}),
        [data.type_of_calculations]: data.co2_emission,
      },
    };

    // assign/reassing the new modeledData to the object of allMoledData
    allModeledData[data.id] = modeledData;
  }

  return allModeledData;
};
