<template>
  <table>
    <tr>
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
      <td v-if="noShipments" class="no-shipments">
        No shipments in the date range selected
      </td>
      <td v-else></td>
    </tr>
    <tr>
      <th>CO&sup2; Emission</th>
      <td></td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'EmptyTableMobile',
  props: {
    noShipments: Boolean,
    search: Boolean,
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

tr {
  height: 2rem;
  border-bottom: 1px dashed rgb(121, 152, 133);
}

th {
  border-right: 1px solid rgb(121, 152, 133);
  width: 30%;
  text-align: right;
  background-color: rgb(212, 227, 217);
}

th,
td {
  padding: 0.5rem 1rem;
}

td {
  text-align: left;
}

.no-shipments {
  text-align: center;
  color: rgb(47, 58, 51);
  font-weight: 700;
}

@media only screen and (max-width: 410px) {
  th,
  td {
    padding: 5px;
  }
}
</style>
