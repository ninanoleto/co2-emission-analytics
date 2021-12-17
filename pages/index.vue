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
      :hideNextButton="hideNextButton"
      :shipmentsLength="shipments.length"
      v-on:prev-page="prevPage"
      v-on:next-page="nextPage"
    />
    <client-only>
      <mq-layout mq="mmd+">
        <Table
          :shipments="shipments"
          :noShipments="noShipments"
          :search="search"
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
      :hideNextButton="hideNextButton"
      :shipmentsLength="shipments.length"
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
      hideNextButton: false,
    };
  },

  methods: {
    async setShipments(dateRange) {
      // get modeled data and save to props
      this.shipmentsModeledData = await getModeledData(
        dateRange.start,
        dateRange.end
      );

      // get array with all ordered shipments from the modeled data
      const sortedShipmentsArray = sortAllShipments(
        this.shipmentsModeledData,
        'asc'
      );
      // get shipments separated by page numbers and set allShipments props
      this.allShipmentsPages = this.setShipmentsByPage(sortedShipmentsArray);

      // set shipments props that will be used in the page
      this.shipments = this.allShipmentsPages[1] || [];

      // set other props values
      this.page = 1;
      this.ascOrder = true;
      this.setNoShipmentProps();
      this.setSearchProps();
    },

    // sort all shipments pages based on the shipments modeled data and ascOrder props
    sortTable() {
      if (this.ascOrder) {
        // get array with all ordered shipments from the modeled data
        const sortedShipmentsArray = sortAllShipments(
          this.shipmentsModeledData,
          'desc'
        );

        // get shipments separated by page numbers and set allShipments props
        this.allShipmentsPages = this.setShipmentsByPage(sortedShipmentsArray);
        // set shipments props that will be used in the page
        this.shipments = this.allShipmentsPages[this.page] || [];
        this.ascOrder = false;
      } else {
        const sortedShipmentsArray = sortAllShipments(
          this.shipmentsModeledData,
          'asc'
        );

        this.allShipmentsPages = this.setShipmentsByPage(sortedShipmentsArray);
        this.shipments = this.allShipmentsPages[this.page] || [];
        this.ascOrder = true;
      }
    },

    nextPage() {
      this.page = this.page + 1;

      const shipmentsPage = this.allShipmentsPages[this.page];
      this.shipments = shipmentsPage || [];

      this.hideNextButton = this.page === this.lastPage ? true : false;
      this.scrollToTop();
    },

    prevPage() {
      this.page = this.page - 1;

      const shipmentsPage = this.allShipmentsPages[this.page];
      this.shipments = shipmentsPage || [];

      this.hideNextButton = false;
      this.scrollToTop();
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
