<template>
  <table>
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
</template>

<script>
export default {
  name: 'FullTableMobile',
  props: {
    shipment: Object,
    calculation: String,
    types: Array,
  },
};
</script>

<style scoped>
table {
  border: 1px solid rgb(121, 152, 133);

  font-family: 'Roboto', sans-serif;
  border-collapse: collapse;
  width: 100%;

  text-align: left;
  font-size: 0.7rem;

  overflow: hidden;
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

.center-div {
  display: flex;
  align-items: center;
  justify-content: left;
}

#separate {
  display: flex;
  align-items: center;
  justify-content: left;
}

#center {
  width: 30%;
}

@media only screen and (max-width: 410px) {
  th,
  td {
    padding: 5px;
  }
}
</style>
