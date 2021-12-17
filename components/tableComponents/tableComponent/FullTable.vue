<template>
  <tr>
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
</template>

<script>
export default {
  name: 'FullTable',
  props: {
    shipment: Object,
    calculation: String,
  },
};
</script>

<style scoped>
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

  .center-div {
    height: 2.5rem;
  }
}
</style>
