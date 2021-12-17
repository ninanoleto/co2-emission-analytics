<template>
  <table>
    <tr>
      <th>Shipment ID</th>
      <th>Weight (kg)</th>
      <th>Distance (km)</th>
      <th>Pickup Time</th>
      <th>
        Drop Off Time
        <button
          @click="$emit('sort-data', calculation)"
          class="btn"
          :disabled="shipments && shipments.length === 0"
        >
          &#8597;
        </button>
      </th>
      <th>
        CO&sup2;
        <select
          v-model="calculation"
          @change="$emit('get-shipments', calculation)"
        >
          <option v-for="type in types" :value="type" :key="type">
            {{ type }}
          </option>
        </select>
      </th>
    </tr>
    <tr v-if="shipments && shipments.length === 0 && noShipments">
      <td :class="[search && 'animation', 'no-td']" colspan="6">
        No shipments in the date range selected
      </td>
    </tr>
    <tr v-else-if="shipments && shipments.length === 0">
      <td colspan="6"></td>
    </tr>
    <FullTable
      v-else
      v-for="shipment in shipments"
      :key="shipment.id"
      :shipment="shipment"
      :calculation="calculation"
    />
  </table>
</template>

<script>
import FullTable from './FullTable.vue';

export default {
  name: 'Table',
  props: {
    shipments: Array,
    noShipments: Boolean,
    search: Boolean,
    calcType: String,
  },
  components: {
    FullTable,
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

  70% {
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

.btn:disabled {
  background-color: #c0c4c1;
  cursor: auto;
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
}
</style>
