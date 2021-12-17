<template>
  <div>
    <div class="btn-wrapper">
      <button
        v-if="shipments.length > 0"
        @click="$emit('sort-data')"
        class="btn"
      >
        sort by Drop Off Time
      </button>
    </div>
    <div class="table-wrapper">
      <EmptyTableMobile
        v-if="shipments.length === 0"
        :noShipments="noShipments"
      />
      <FullTableMobile
        v-else
        v-for="shipment in shipments"
        :key="shipment.id"
        :shipment="shipment"
        :calculation="calculation"
        :types="types"
      />
    </div>
  </div>
</template>

<script>
import EmptyTableMobile from './EmptyTableMobile.vue';
import FullTableMobile from './FullTableMobile.vue';

export default {
  name: 'TableMobile',
  props: {
    shipments: Array,
    noShipments: Boolean,
    search: Boolean,
  },
  components: {
    EmptyTableMobile,
    FullTableMobile,
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
</style>
