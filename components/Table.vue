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
      <th>
        CO&sup2;
        <select v-model="calculation">
          <option v-for="type in types" :value="type" :key="type">
            {{ type }}
          </option>
        </select>
      </th>
    </tr>
    <tr v-if="shipments.length === 0 && noShipments" class="all-td">
      <td :class="[search && 'animation', 'no-td']" colspan="6">
        No shipments in the date range selected
      </td>
    </tr>
    <tr v-else-if="shipments.length === 0" class="all-td">
      <td colspan="6"></td>
    </tr>
    <tr
      v-else
      v-for="shipment in shipments.filter((shipment) =>
        calculation === 'all types'
          ? shipment
          : shipment.co2Emission[calculation]
      )"
      :key="shipment.id"
    >
      <td>{{ shipment.id }}</td>
      <td>{{ shipment.weightKg }}</td>
      <td>{{ shipment.distanceKm }}</td>
      <td>
        <div class="center-div">
          <td>{{ shipment.pickupTime.toLocaleDateString() }}</td>
          <td>
            {{ shipment.pickupTime.toLocaleTimeString().slice(0, 5) }}
          </td>
        </div>
      </td>
      <td>
        <div class="center-div">
          <td>{{ shipment.dropoffTime.toLocaleDateString() }}</td>
          <td>
            {{ shipment.dropoffTime.toLocaleTimeString().slice(0, 5) }}
          </td>
        </div>
      </td>
      <td>
        <div v-if="calculation === 'all types'">
          <div
            id="separate"
            v-for="(value, name) in shipment.co2Emission"
            :key="calculation + value"
          >
            <td id="center">
              <strong>{{ name }}</strong>
            </td>
            <td id="center">{{ value }}</td>
          </div>
        </div>
        <div v-else>
          <div>
            <td id="center">{{ shipment.co2Emission[calculation] }}</td>
          </div>
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
table {
  font-family: 'Roboto', sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  padding: 5px;
  text-align: center;
  font-size: 0.8rem;
  height: 2.5rem;
}

th {
  background-color: rgb(47, 58, 51);
  color: white;
  letter-spacing: 1.2px;
  font-weight: 500;
}

th:first-child {
  border-top-left-radius: 5px;
}

th:last-child {
  border-top-right-radius: 5px;
  width: 22%;
}

tr:nth-child(even) {
  background-color: rgb(212, 227, 217);
}

tr:last-of-type td:first-of-type {
  border-bottom-left-radius: 5px;
}

tr:last-of-type td:last-of-type {
  border-bottom-right-radius: 5px;
}

.no-td {
  font-size: 0.9rem;
  color: rgb(47, 58, 51);
}

.animation {
  animation: pulse 2s ease-in-out;
  font-weight: 700;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}

.btn {
  margin-left: 5px;
  border: none;
  background-color: white;
  padding: 3px 5px;
  border-radius: 2px;
  cursor: pointer;
}

select {
  outline: none;
  border: none;
  background-color: white;
  border-radius: 2px;
  margin: 5px;
  padding: 5px;
  font-size: 0.7rem;
}

.center-div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 2.8rem;
}

#separate {
  border: 1px dashed rgb(107, 133, 116);

  display: flex;
  align-items: center;
  justify-content: center;
}

#center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

@media only screen and (max-width: 1024px) {
  table {
    width: 100%;
  }

  td,
  th {
    padding: 3px;
    font-size: 0.7rem;
    height: 2.3rem;
  }

  th {
    letter-spacing: 1px;
    font-weight: 400;
  }

  .no-td {
    font-size: 0.7rem;
  }

  .animation {
    font-weight: 500;
  }

  .btn {
    margin-left: 3px;
    padding: 2px 3px;
  }

  select {
    margin: 3px;
    padding: 3px;
    font-size: 0.65rem;
  }

  .center-div {
    height: 2.5rem;
  }
}

@media only screen and (max-width: 768px) {
  td,
  th {
    padding: 3px;
    font-size: 0.7rem;
    height: 2.3rem;
  }

  th {
    letter-spacing: 1px;
    font-weight: 400;
  }

  .no-td {
    font-size: 0.7rem;
  }

  .animation {
    font-weight: 500;
  }

  .btn {
    margin-left: 3px;
    padding: 2px 3px;
  }

  select {
    margin: 3px;
    padding: 3px;
    font-size: 0.65rem;
  }

  .center-div {
    height: 2.5rem;
  }
}
</style>
