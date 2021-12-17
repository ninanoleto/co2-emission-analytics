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
    <Buttons
      :page="page"
      :lastPage="lastPage"
      :shipmentsLength="shipments && shipments.length"
      v-on:prev-page="prevPage"
      v-on:next-page="nextPage"
    />
    <client-only>
      <mq-layout mq="mmd+">
        <Table
          :shipments="shipments"
          :noShipments="noShipments"
          :search="search"
          @get-shipments="sortByCalcType"
          @sort-data="sortTable"
        />
      </mq-layout>
      <mq-layout mq="md">
        <TableMobile
          :shipments="shipments"
          :noShipments="noShipments"
          :search="search"
          @sort-data="sortTable"
        />
      </mq-layout>
    </client-only>
    <Buttons
      :page="page"
      :lastPage="lastPage"
      :shipmentsLength="shipments && shipments.length"
      v-on:prev-page="prevPage"
      v-on:next-page="nextPage"
    />
  </div>
</template>

<script>
import DatePicker from '../components/DatePicker.vue';
import Buttons from '../components/Buttons.vue';
import Table from '../components/tableComponents/tableComponent/Table.vue';
import TableMobile from '../components/tableComponents/tableMobileComponent/TableMobile.vue';
import { getModeledData } from '../services/modelData';
import { sortAllShipments } from '../services/sortData';

export default {
  components: {
    DatePicker,
    Buttons,
    Table,
    TableMobile,
  },

  data() {
    return {
      shipmentsModeledData: {},
      allShipmentsPages: {},
      shipments: [],
      ascOrder: false,
      noShipments: false,
      search: false,
      page: 1,
      lastPage: 1,
      calcType: 'default',
    };
  },

  methods: {
    // sort shipments by calculation type
    sortByCalcType(calc = 'default') {
      this.calcType = calc;
      this.setSortedShipmentsByType(this.calcType);
    },

    // sort shipments by sort button
    sortTable() {
      this.sortByCalcType();
      this.toggleOrder();
    },

    // set props onSubmit
    async setShipments(dateRange) {
      // get modeled data object and save to props
      this.shipmentsModeledData = await getModeledData(
        dateRange.start,
        dateRange.end
      );

      // short shipments props by type of calculation
      this.sortByCalcType(this.calcType);

      // set other props values
      this.page = 1;
      this.ascOrder = true;
      this.setNoShipmentProps();
      this.setSearchProps();
    },

    setSortedShipmentsByType(calcType) {
      const sortOrder = this.ascOrder ? 'asc' : 'desc';

      // sorts data object by drop off time
      // filter sorted array by calculation type
      const sortedShipmentsOfType = sortAllShipments(
        this.shipmentsModeledData,
        sortOrder
      ).filter((shipment) =>
        calcType === 'all types'
          ? shipment
          : shipment && calcType in shipment.co2Emission
      );

      // sets shipment pagination object to pagination props
      this.allShipmentsPages = this.setShipmentsByPage(sortedShipmentsOfType);

      // update other props
      this.page = this.page > this.lastPage ? this.lastPage : this.page || 1;
      this.calcType = calcType;
      this.shipments = this.allShipmentsPages[this.page] || [];
    },

    // Separates shipments in pages to be displayed in chunks of 25 items per page
    // starting by page 1
    setShipmentsByPage(shipmentsArray) {
      let results = {};
      let len = shipmentsArray.length;
      let chunkSize = 25;
      let page = 1;

      for (let i = 0; i < len; i += chunkSize) {
        results[page] = shipmentsArray.slice(i, i + chunkSize);
        page++;
      }

      this.lastPage = page - 1;

      return results;
    },

    nextPage() {
      this.page = this.page + 1;

      const shipmentsPage = this.allShipmentsPages[this.page];
      this.shipments = shipmentsPage || [];

      this.scrollToTop();
    },

    prevPage() {
      this.page = this.page - 1;

      const shipmentsPage = this.allShipmentsPages[this.page];
      this.shipments = shipmentsPage || [];

      this.scrollToTop();
    },

    toggleOrder() {
      this.ascOrder = !this.ascOrder;
    },

    setNoShipmentProps() {
      this.shipments && this.shipments.length === 0
        ? (this.noShipments = true)
        : (this.noShipments = false);
    },

    setSearchProps() {
      this.search = true;

      setTimeout(() => {
        this.search = false;
      }, 1000);
    },

    scrollToTop() {
      window.scrollTo(0, 0);
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

@media only screen and (max-width: 1024px) {
  .container {
    max-width: 800px;
    margin: 1.5rem auto;
    padding: 0.1rem 1.5rem 2rem;
  }

  .title {
    font-size: 2rem;
  }
}

@media only screen and (max-width: 880px) {
  .container {
    max-width: 700px;
    margin: 1.5rem auto;
    padding: 0.1rem 1.5rem 2rem;
  }

  .title {
    font-size: 1.7rem;
    margin: 0;
  }
}

@media only screen and (max-width: 768px) {
  .container {
    max-width: 450px;
  }

  .header-container {
    flex-direction: column;
    margin: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .title {
    font-size: 1.5rem;
  }
}

@media only screen and (max-width: 480px) {
  .container {
    max-width: 380px;
  }

  .header-container {
    margin: 1rem;
  }

  .title {
    font-size: 1.3rem;
  }
}

@media only screen and (max-width: 410px) {
  .container {
    max-width: 300px;
  }
}
</style>
