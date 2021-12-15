<template>
  <table>
    <tr>
      <th>Shipment ID</th>
      <th>Weight (kg)</th>
      <th>Distance (km)</th>
      <th>Pickup Time</th>
      <th>
        Drop Off Time
        <button @click="$emit('sort-data')" class="btn">&#8597;</button>
      </th>
      <th>CO&sup2; Emission</th>
    </tr>
    <tr v-if="shipments.length === 0">
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr v-for="shipment in shipments" :key="shipment.id">
      <td>{{ shipment.id }}</td>
      <td>{{ shipment.weightKg }}</td>
      <td>{{ shipment.distanceKm }}</td>
      <td>
        <div class="center-div">
          <td id="double">{{ shipment.pickupTime.toDateString() }}</td>
          <td id="double">
            {{ shipment.pickupTime.toTimeString().slice(0, 5) }}
          </td>
        </div>
      </td>
      <td>
        <div class="center-div">
          <td id="double">{{ shipment.dropoffTime.toDateString() }}</td>
          <td id="double">
            {{ shipment.dropoffTime.toTimeString().slice(0, 5) }}
          </td>
        </div>
      </td>
      <td>
        <div
          class="center-div"
          id="separate"
          v-for="(value, name) in shipment.co2Emission"
          :key="shipment.id + name"
        >
          <td id="double">
            <strong>{{ name }}</strong>
          </td>
          <td id="double">{{ value }}</td>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    shipments: Array,
  },
};
</script>

<style>
td,
th {
  border: 1px solid gray;
  padding: 5px;
  text-align: center;
  font-size: 0.8rem;
  height: 2rem;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.center-div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 2.5rem;
}

#double {
  border: none;
  padding: 0;
}

#separate {
  border-bottom: 1px solid gray;
}

.btn {
  margin-left: 5px;
  border: 1px solid gray;
  padding: 2px 7px;
  border-radius: 3px;
  cursor: pointer;
}
</style>
