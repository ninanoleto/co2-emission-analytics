/**
 * Sorts all shipments Model Objects by property drop off time
 * acording to acsending or descending order passed as a parameter
 * @param {Object} shipmentsObj
 * @param {String} order 'asc' | 'desc'
 * @returns {Array}
 */
//
export const sortAllShipments = (shipmentsObj, order) => {
  if (order === 'asc') {
    return Object.values(shipmentsObj).sort(
      (a, b) => new Date(a.dropoffTime) - new Date(b.dropoffTime)
    );
  }

  return Object.values(shipmentsObj).sort(
    (a, b) => new Date(b.dropoffTime) - new Date(a.dropoffTime)
  );
};
