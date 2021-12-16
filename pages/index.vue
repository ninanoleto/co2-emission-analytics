<template>
  <div class="container">
    <div class="header-container">
      <header>
        <h1 class="title">CO&sup2; Emission Analytics</h1>
      </header>
      <client-only>
        <DatePicker v-on:set-shipments="setShipments" />
      </client-only>
    </div>
    <client-only>
      <Table
        :shipments="shipments"
        :noShipments="noShipments"
        :search="search"
        @sort-data="sortTable"
      />
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
      noShipments: false,
      search: false,
    };
  },
  methods: {
    // Adjust Sort
    sortTable() {
      console.log('before sort: ' + this.ascOrder);
      if (!this.ascOrder) {
        this.shipments.sort(
          (a, b) => new Date(b.dropoffTime) - new Date(a.dropoffTime)
        );
        this.ascOrder = true;
      } else {
        this.shipments.sort(
          (a, b) => new Date(a.dropoffTime) - new Date(b.dropoffTime)
        );
        this.ascOrder = false;
      }
    },
    async setShipments(dateRange) {
      const shipmentsObj = await getModeledData(dateRange.start, dateRange.end);

      this.shipments = Object.values(shipmentsObj).sort(
        (a, b) => new Date(b.dropoffTime) - new Date(a.dropoffTime)
      );

      this.ascOrder = true;

      this.shipments.length === 0
        ? (this.noShipments = true)
        : (this.noShipments = false);

      this.search = true;

      setTimeout(() => {
        this.search = false;
      }, 1000);
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

  created() {
    console.log(this.ascOrder);
  },
};
</script>

<style>
.container {
  max-width: 1000px;
  margin: 2rem auto;
  overflow: hidden;
  padding: 1rem 2rem 4rem;
  border-radius: 5px;
  background: #fff;
}

.header-container {
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin: 2rem;
}

header {
  text-align: center;
}

header::after {
  display: inline-block;
  content: '';
  border-bottom: 0.15rem solid rgb(91, 152, 113);
  width: 70%;
}

.title {
  font-size: 2.8rem;

  color: rgb(47, 58, 51);
  font-weight: 300;
  margin: 0.5rem;
}
</style>
