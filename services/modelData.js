/**
 * Reduces duplicate data from database to single object with unique id
 * that contains all the types of calculations of CO2
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Object}
 */
export const getModeledData = async (startDate, endDate) => {
  const API_URL = 'http://localhost:3000';

  console.log(typeof startDate, typeof endDate);
  const dateStart = (startDate ?? new Date()).toUTCString();

  const dateEnd = (endDate ?? new Date()).toUTCString();

  const dbData = await fetch(
    `${API_URL}/api/emissions?start=${dateStart}&end=${dateEnd}`
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
