<template>
  <div class="container">
    <div class="flex">
      <header class="header">
        <h1 class="title">CO&sup2; Emission Analytics</h1>
      </header>
      <div class="datepicker">
        <DatePicker v-on:set-shipments="setShipments" />
      </div>
    </div>
    <client-only>
      <Table :shipments="shipments" />
    </client-only>
  </div>
</template>

<script>
import DatePicker from '../components/DatePicker.vue';
import Table from '../components/Table.vue';
import { getModeledData } from '../services/methods';

export default {
  components: {
    DatePicker,
    Table,
  },
  data() {
    return {
      shipments: [],
      ascOrder: true,
    };
  },
  methods: {
    async sortTable() {
      if (ascOrder) {
        this.shipments.sort((a, b) =>
          a.dropoffTime.getTime() > b.dropoffTime.getTime() ? 1 : -1
        );
      } else {
        this.shipments.sort((a, b) =>
          a.dropoffTime.getTime() > b.dropoffTime.getTime() ? -1 : 1
        );
      }
    },
    async setShipments(dateRange) {
      const shipments = await getModeledData(dateRange.start, dateRange.end);

      console.log(shipments);
      this.shipments = Object.values(shipments).sort((a, b) =>
        a.dropoffTime.getTime() > b.dropoffTime.getTime() ? 1 : -1
      );
    },
  },
  head() {
    return {
      title: 'CO² Emission Analytics',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Check our analysis of CO² Emission from different types of calculations',
        },
      ],
    };
  },
};
</script>

<style>
.container {
  max-width: 1000px;
  margin: 2rem auto;
  overflow: hidden;
  padding: 2rem 2rem 4rem;
  border-radius: 5px;
  background: #fff;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px dotted #ccc;
  padding: 0 1rem;
}

.title {
  font-size: 2.5rem;

  color: #526488;
  font-weight: 300;
  margin: 1rem;
}

.btn {
  display: inline-block;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1.2rem;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
