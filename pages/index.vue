<template>
  <div class="container">
    <AppHeader />
    <client-only>
      <Table :shipments="shipments" @sort-data="sortTable" />
    </client-only>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import Table from '../components/Table.vue';
import { getSortedDataAsc, getSortedDataDesc } from '../services/methods';

export default {
  components: {
    AppHeader,
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
      const date = new Date(
        'Mon Jun 21 2021 08:30:00 GMT+0200 (Central European Summer Time)'
      );
      if (this.ascOrder) {
        this.shipments = await getSortedDataDesc(date);
        this.ascOrder = false;
      } else {
        this.shipments = await getSortedDataAsc(date);
        this.ascOrder = true;
      }
    },
    // sortTable() {
    //   this.shipments = [];
    // },
  },
  async created() {
    // this.shipments = await getModeledData();
    const date = new Date(
      'Mon Jun 21 2021 08:30:00 GMT+0200 (Central European Summer Time)'
    );
    this.shipments = await getSortedDataAsc(date);
  },
  head() {
    return {
      title: 'CO² Emission Analytics',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'CO² emission data',
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
  background: #fff;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
</style>
