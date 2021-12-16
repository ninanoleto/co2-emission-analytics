<template>
  <div>
    <div class="btn-wrapper">
      <button @click="$emit('sort-data')" class="btn">
        sort by Drop Off Time
      </button>
    </div>
    <div class="table-wrapper">
      <table v-if="shipments.length === 0">
        <tr v-if="noShipments">
          <th>Shipment ID</th>
          <td id="no-shipments">No shipments in the date range selected</td>
        </tr>
        <tr v-else>
          <th>Shipment ID</th>
          <td></td>
        </tr>
        <tr>
          <th>Weight (kg)</th>
          <td></td>
        </tr>
        <tr>
          <th>Distance (km)</th>
          <td></td>
        </tr>
        <tr>
          <th>Pickup Time</th>
          <td></td>
        </tr>
        <tr>
          <th>Drop Off Time</th>
          <td></td>
        </tr>
        <tr>
          <th>CO&sup2; Emission</th>
          <td></td>
        </tr>
      </table>

      <table v-else v-for="shipment in shipments" :key="shipment.id">
        <tr>
          <th>Shipment ID</th>
          <td>{{ shipment.id }}</td>
        </tr>
        <tr>
          <th>Weight (kg)</th>

          <td>{{ shipment.weightKg }}</td>
        </tr>
        <tr>
          <th>Distance (km)</th>
          <td>{{ shipment.distanceKm }}</td>
        </tr>
        <tr>
          <th>Pickup Time</th>
          <div class="center-div">
            <td>{{ shipment.pickupTime.toLocaleDateString() }}</td>
            <td>
              {{ shipment.pickupTime.toLocaleTimeString().slice(0, 5) }}
            </td>
          </div>
        </tr>
        <tr>
          <th>Drop Off Time</th>
          <div class="center-div">
            <td>{{ shipment.dropoffTime.toLocaleDateString() }}</td>
            <td>
              {{ shipment.dropoffTime.toLocaleTimeString().slice(0, 5) }}
            </td>
          </div>
        </tr>
        <tr>
          <th>CO&sup2; Emission</th>
          <div
            id="separate"
            v-for="(value, name) in shipment.co2Emission"
            :key="calculation + value"
          >
            <td id="center">
              <strong>{{ name }}</strong>
            </td>
            <td>{{ value }}</td>
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableMobile',
  props: {
    shipments: Array,
    noShipments: Boolean,
    search: Boolean,
  },
  data() {
    return {
      calculation: 'default',
      types: ['default', 'modeled', 'primary', 'all types'],
    };
  },
};
</script>

<style scoped>
.table-wrapper {
  margin-top: 1rem;
}

table {
  border: 1px solid rgb(121, 152, 133);

  font-family: 'Roboto', sans-serif;
  border-collapse: collapse;
  width: 100%;

  text-align: left;
  font-size: 0.7rem;
}

table:nth-child(even) {
  background-color: rgb(212, 227, 217);
}

tr {
  height: 2rem;
  border-bottom: 1px dashed rgb(121, 152, 133);
}

th {
  border-right: 1px solid rgb(121, 152, 133);
  width: 30%;
  text-align: right;
}

th,
td {
  padding: 0.5rem 1rem;
}

td {
  text-align: left;
}

.btn-wrapper {
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 0.5rem;
}

.btn {
  background-color: rgb(121, 152, 133);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.3rem 1rem;
  letter-spacing: 1px;
  font-size: 0.7rem;
  cursor: pointer;

  height: 2rem;
}

.center-div {
  display: flex;
  align-items: center;
  justify-content: left;
}

#center {
  width: 90px;
}

#no-shipments {
  text-align: center;
}

@media only screen and (max-width: 410px) {
  th,
  td {
    padding: 5px;
    text-align: center;
  }

  .center-div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
