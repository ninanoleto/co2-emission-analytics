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
    <div :class="[page === 1 && 'change-flex', 'btns-wrapper']">
      <button
        class="btn-prev"
        :hidden="(page === 1 && 'null') || shipments.length === 0"
        @click="prevPage"
      >
        &#8592; Prev
      </button>
      <button
        class="btn-next"
        :hidden="
          ((hideNextButton || lastPage === 1) && 'null') ||
          shipments.length === 0
        "
        @click="nextPage"
      >
        Next &#8594;
      </button>
    </div>
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
    <div :class="[page === 1 && 'change-flex', 'btns-wrapper']">
      <button
        class="btn-prev"
        :hidden="(page === 1 && 'null') || shipments.length === 0"
        @click="prevPage"
      >
        &#8592; Prev
      </button>
      <button
        class="btn-next"
        :hidden="
          ((hideNextButton || lastPage === 1) && 'null') ||
          shipments.length === 0
        "
        @click="nextPage"
      >
        Next &#8594;
      </button>
    </div>
  </div>
</template>

<script>
import DatePicker from '../components/DatePicker.vue';
import Table from '../components/Table.vue';
import TableMobile from '../components/TableMobile.vue';
import { getModeledData } from '../services/modelData';

export default {
  components: {
    DatePicker,
    Table,
    TableMobile,
  },
  data() {
    return {
      allShipments: {},
      shipments: [],
      ascOrder: true,
      noShipments: false,
      search: false,
      page: Number,
      lastPage: Number,
      hideNextButton: false,
    };
  },
  methods: {
    async setShipments(dateRange) {
      // get modeled data
      const shipmentsObj = await getModeledData(dateRange.start, dateRange.end);

      // get object with all shipments separated by page numbers and set allShipments props
      this.allShipments = this.getShipmentsPages(shipmentsObj);

      // set other props values
      this.shipments = this.allShipments[1] || [];
      this.page = 1;
      this.ascOrder = true;
      this.setNoShipmentProps();
      this.setSearchProps();
      console.log(this.lastPage);
    },
    nextPage() {
      this.page += 1;

      const shipmentsPage = this.allShipments[this.page];
      this.shipments = shipmentsPage || [];

      this.hideNextButton = this.page === this.lastPage ? true : false;
      this.scrollToTop();
    },
    prevPage() {
      this.page -= 1;

      const shipmentsPage = this.allShipments[this.page];
      this.shipments = shipmentsPage || [];

      this.hideNextButton = false;
      this.scrollToTop();
    },
    sortTable() {
      if (!this.ascOrder) {
        this.shipments &&
          this.shipments.sort(
            (a, b) => new Date(b.dropoffTime) - new Date(a.dropoffTime)
          );

        this.ascOrder = true;
      } else {
        this.shipments &&
          this.shipments.sort(
            (a, b) => new Date(a.dropoffTime) - new Date(b.dropoffTime)
          );

        this.ascOrder = false;
      }
    },
    getShipmentsPages(shipmentsObj) {
      const shipments = Object.values(shipmentsObj).sort(
        (a, b) => new Date(b.dropoffTime) - new Date(a.dropoffTime)
      );

      const allShipmentsPages = this.setShipmentsByPage(shipments);

      return allShipmentsPages;
    },
    setShipmentsByPage(shipmentsArray) {
      let results = {};
      let len = shipmentsArray.length;
      let chunkSize = 50;
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

.btns-wrapper {
  display: flex;
  align-content: center;
  justify-content: space-between;
  margin: 5px 3rem;
}

.change-flex {
  justify-content: flex-end;
}

.btn-prev,
.btn-next {
  color: rgb(47, 58, 51);
  border: none;
  background-color: white;
  font-weight: 800;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 2px;
  font-size: 0.8rem;
  text-transform: uppercase;
  cursor: pointer;
  height: 2rem;
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

  .btns-wrapper {
    margin: 5px 1rem;
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

  .btns-wrapper {
    margin: 5px 0.5rem;
  }
}
@media only screen and (max-width: 410px) {
  .container {
    max-width: 300px;
  }

  .btns-wrapper {
    margin: 5px 0rem;
  }
}
</style>
